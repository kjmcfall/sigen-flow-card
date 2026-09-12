import type { HomeAssistant } from "custom-card-helpers";
import type { EntityMapping, Flow, FlowTotals, Period } from "./types.ts";
import { aggregateFlows, deriveLoad } from "./flow-model.ts";

export interface PeriodRange {
  start: Date;
  end: Date;
  /** Statistics bucket size to request for this range -- see the table in
   * the project README for why each period uses this bucket size. */
  bucket: "5minute" | "hour" | "day" | "month";
}

/**
 * Computes the [start, end) window and the statistics bucket size for a
 * given period + "anchor" date, mirroring how Home Assistant's own Energy
 * dashboard buckets things: hourly within a day, daily within a week/month,
 * monthly within a year. Finer buckets matter more than they might look --
 * see flow-model.ts's `aggregateFlows` for why.
 */
export function getPeriodRange(
  period: Period,
  anchor: Date,
  weekStart: 0 | 1 = 1
): PeriodRange {
  const start = new Date(anchor);
  const end = new Date(anchor);

  switch (period) {
    case "day": {
      start.setHours(0, 0, 0, 0);
      end.setTime(start.getTime());
      end.setDate(end.getDate() + 1);
      return { start, end, bucket: "hour" };
    }
    case "week": {
      const day = start.getDay(); // 0 (Sun) - 6 (Sat)
      const diff = (day - weekStart + 7) % 7;
      start.setHours(0, 0, 0, 0);
      start.setDate(start.getDate() - diff);
      end.setTime(start.getTime());
      end.setDate(end.getDate() + 7);
      return { start, end, bucket: "day" };
    }
    case "month": {
      start.setHours(0, 0, 0, 0);
      start.setDate(1);
      end.setTime(start.getTime());
      end.setMonth(end.getMonth() + 1);
      return { start, end, bucket: "day" };
    }
    case "year": {
      start.setHours(0, 0, 0, 0);
      start.setMonth(0, 1);
      end.setTime(start.getTime());
      end.setFullYear(end.getFullYear() + 1);
      return { start, end, bucket: "month" };
    }
  }
}

/** Steps the anchor date backward/forward by one period (for the `< >` nav). */
export function stepPeriod(period: Period, anchor: Date, direction: -1 | 1): Date {
  const next = new Date(anchor);
  switch (period) {
    case "day":
      next.setDate(next.getDate() + direction);
      break;
    case "week":
      next.setDate(next.getDate() + 7 * direction);
      break;
    case "month":
      next.setMonth(next.getMonth() + direction);
      break;
    case "year":
      next.setFullYear(next.getFullYear() + direction);
      break;
  }
  return next;
}

/**
 * Home Assistant's `hass.callWS()` rejects with a plain `{ code, message }`
 * object on a backend error -- NOT a JavaScript `Error` instance. Stringifying
 * that directly (e.g. via `String(err)` or template interpolation) produces
 * the unhelpful "[object Object]" rather than the actual backend message, so
 * every catch block around a `callWS`/`fetchFlows` call should go through
 * this instead of assuming `err` is an `Error`.
 */
export function extractErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (err && typeof err === "object") {
    const anyErr = err as Record<string, unknown>;
    if (typeof anyErr.message === "string") {
      return typeof anyErr.code === "string" ? `${anyErr.message} (${anyErr.code})` : anyErr.message;
    }
    if (typeof anyErr.code === "string") return `Error: ${anyErr.code}`;
    try {
      return JSON.stringify(err);
    } catch {
      // fall through
    }
  }
  return String(err);
}

interface StatisticPoint {
  start: number | string;
  end?: number | string;
  change?: number | null;
  sum?: number | null;
  state?: number | null;
}

type StatisticsResponse = Record<string, StatisticPoint[]>;

/** The six statistic_ids we ask for, tagged with which FlowTotals field they fill. */
function statisticIdsFor(entities: EntityMapping): Array<{
  id: string;
  field: keyof FlowTotals;
}> {
  const ids: Array<{ id: string; field: keyof FlowTotals }> = [
    { id: entities.solar_energy, field: "solar" },
    { id: entities.battery_charge_energy, field: "batteryCharge" },
    { id: entities.battery_discharge_energy, field: "batteryDischarge" },
    { id: entities.grid_import_energy, field: "gridImport" },
    { id: entities.grid_export_energy, field: "gridExport" },
  ];
  if (entities.load_energy) {
    ids.push({ id: entities.load_energy, field: "load" });
  }
  return ids.filter((e) => !!e.id);
}

/**
 * Fetches per-bucket energy totals for the six sensors over a period, runs
 * them through the flow-allocation model bucket-by-bucket, and returns the
 * aggregated ribbons ready to render -- plus the raw period totals (for the
 * node labels) and a "last updated" timestamp so the UI can show a small
 * "as of HH:MM" note (long-term statistics can lag live data by up to ~1h).
 */
export async function fetchFlows(
  hass: HomeAssistant,
  entities: EntityMapping,
  period: Period,
  anchor: Date,
  weekStart: 0 | 1 = 1
): Promise<{ flows: Flow[]; totals: FlowTotals; lastUpdated: Date | null }> {
  const { start, end, bucket } = getPeriodRange(period, anchor, weekStart);
  const wanted = statisticIdsFor(entities);
  const statisticIds = wanted.map((w) => w.id);

  const response = (await hass.callWS({
    type: "recorder/statistics_during_period",
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    statistic_ids: statisticIds,
    period: bucket,
    types: ["change"],
  })) as StatisticsResponse;

  // Union of every bucket start-time we got back, across all entities.
  const bucketStarts = new Set<number>();
  for (const id of statisticIds) {
    for (const point of response[id] ?? []) {
      bucketStarts.add(new Date(point.start).getTime());
    }
  }
  const sortedStarts = Array.from(bucketStarts).sort((a, b) => a - b);

  // Index each entity's points by bucket start time for quick lookup.
  const byEntityByStart = new Map<string, Map<number, number>>();
  for (const id of statisticIds) {
    const m = new Map<number, number>();
    for (const point of response[id] ?? []) {
      m.set(new Date(point.start).getTime(), point.change ?? 0);
    }
    byEntityByStart.set(id, m);
  }

  const perBucket: FlowTotals[] = sortedStarts.map((ts) => {
    const values: Partial<FlowTotals> = {};
    for (const { id, field } of wanted) {
      values[field] = byEntityByStart.get(id)?.get(ts) ?? 0;
    }
    const base = {
      solar: values.solar ?? 0,
      batteryCharge: values.batteryCharge ?? 0,
      batteryDischarge: values.batteryDischarge ?? 0,
      gridImport: values.gridImport ?? 0,
      gridExport: values.gridExport ?? 0,
    };
    const load = values.load ?? deriveLoad(base);
    return { ...base, load };
  });

  const flows = aggregateFlows(perBucket);

  const totals: FlowTotals = perBucket.reduce(
    (acc, b) => ({
      solar: acc.solar + b.solar,
      batteryCharge: acc.batteryCharge + b.batteryCharge,
      batteryDischarge: acc.batteryDischarge + b.batteryDischarge,
      gridImport: acc.gridImport + b.gridImport,
      gridExport: acc.gridExport + b.gridExport,
      load: acc.load + b.load,
    }),
    { solar: 0, batteryCharge: 0, batteryDischarge: 0, gridImport: 0, gridExport: 0, load: 0 }
  );

  if (entities.battery_soc) {
    const socState = hass.states[entities.battery_soc];
    if (socState) {
      totals.batterySoc = Number(socState.state);
    }
  }

  const lastUpdated = sortedStarts.length
    ? new Date(sortedStarts[sortedStarts.length - 1])
    : null;

  return { flows, totals, lastUpdated };
}
