import type { Flow, FlowTotals, NodeKey } from "./types.ts";

/**
 * Allocates ONE interval's worth of the six metered totals across the
 * individual sankey ribbons.
 *
 * IMPORTANT: this is an estimate, not a measurement. Almost no Sigenergy
 * integration (or inverter brand, or the mySigen app itself) meters the
 * individual sub-flows directly — what's actually available is a handful of
 * totals (solar produced, battery charged/discharged, grid imported/exported,
 * load consumed). This function allocates those totals across plausible
 * flows using the same priority order Home Assistant's own core Energy
 * Distribution card uses:
 *
 *   1. Solar covers load first
 *   2. Then whatever solar is left charges the battery
 *   3. Then whatever solar is still left exports to the grid
 *   4. Battery discharge covers any load solar didn't
 *   5. Grid import covers any load neither solar nor battery covered
 *   6. Grid import charges the battery (only happens if grid-charging is
 *      enabled and the numbers don't reconcile otherwise)
 *
 * This waterfall is only valid for a single moment/short interval where the
 * battery is either charging OR discharging (not both) and the grid is
 * either importing OR exporting (not both) — which is true instantaneously,
 * but is NOT true of a whole day/week/month total (a battery routinely
 * charges in the morning and discharges in the evening of the same day).
 * Feeding a whole day's totals into this function directly under-counts real
 * flows — see `aggregateFlows` below, which is what the card actually uses
 * for anything longer than a single short interval.
 *
 * If a future integration exposes true sub-flow sensors, prefer those and
 * mark them `measured: true` instead of running them through this model.
 */
export function computeFlows(totals: FlowTotals, epsilon = 0.01): Flow[] {
  const solar = Math.max(0, totals.solar);
  const batteryCharge = Math.max(0, totals.batteryCharge);
  const batteryDischarge = Math.max(0, totals.batteryDischarge);
  const gridImport = Math.max(0, totals.gridImport);
  const gridExport = Math.max(0, totals.gridExport);
  const load = Math.max(0, totals.load);

  const flows: Flow[] = [];
  const add = (from: Flow["from"], to: Flow["to"], value: number) => {
    if (value > epsilon) {
      flows.push({ from, to, value: round(value) });
    }
  };

  // 1. Solar -> Load
  let solarRemaining = solar;
  let loadRemaining = load;
  const solarToLoad = Math.min(solarRemaining, loadRemaining);
  solarRemaining -= solarToLoad;
  loadRemaining -= solarToLoad;
  add("solar", "load", solarToLoad);

  // 2. Solar -> Battery
  let batteryChargeRemaining = batteryCharge;
  const solarToBattery = Math.min(solarRemaining, batteryChargeRemaining);
  solarRemaining -= solarToBattery;
  batteryChargeRemaining -= solarToBattery;
  add("solar", "battery", solarToBattery);

  // 3. Solar -> Grid (export)
  let gridExportRemaining = gridExport;
  const solarToGrid = Math.min(solarRemaining, gridExportRemaining);
  gridExportRemaining -= solarToGrid;
  solarRemaining -= solarToGrid;
  add("solar", "grid", solarToGrid);

  // 4. Battery -> Load
  const batteryToLoad = Math.min(batteryDischarge, loadRemaining);
  loadRemaining -= batteryToLoad;
  add("battery", "load", batteryToLoad);

  // 5. Grid -> Load
  let gridImportRemaining = gridImport;
  const gridToLoad = Math.min(gridImportRemaining, loadRemaining);
  gridImportRemaining -= gridToLoad;
  loadRemaining -= gridToLoad;
  add("grid", "load", gridToLoad);

  // 6. Grid -> Battery
  const gridToBattery = Math.min(gridImportRemaining, batteryChargeRemaining);
  add("grid", "battery", gridToBattery);

  // Leftover solar (e.g. curtailment, or small meter-timing mismatches) is
  // folded into solar -> grid so the diagram still reconciles visually,
  // rather than silently vanishing.
  if (solarRemaining > epsilon) {
    const existing = flows.find((f) => f.from === "solar" && f.to === "grid");
    if (existing) {
      existing.value = round(existing.value + solarRemaining);
    } else {
      add("solar", "grid", solarRemaining);
    }
  }

  return flows;
}

/**
 * Runs `computeFlows` on each interval (bucket) of a period and sums the
 * results into one aggregate Flow[] for rendering.
 *
 * This is the function the card actually calls for Day/Week/Month/Year: it
 * fetches statistics at a bucket size fine enough that within any one bucket
 * the battery is realistically only charging OR discharging (not both), and
 * the grid is only importing OR exporting (not both) — hourly buckets for a
 * Day view, daily buckets for Week/Month, monthly buckets for Year. Summing
 * per-bucket allocations avoids the under-counting a single whole-period
 * waterfall would produce (see the long comment on `computeFlows`).
 */
export function aggregateFlows(perBucket: FlowTotals[], epsilon = 0.01): Flow[] {
  const totals = new Map<string, number>();
  for (const bucket of perBucket) {
    for (const flow of computeFlows(bucket, epsilon)) {
      const key = `${flow.from}->${flow.to}`;
      totals.set(key, (totals.get(key) ?? 0) + flow.value);
    }
  }
  const result: Flow[] = [];
  for (const [key, value] of totals) {
    if (value > epsilon) {
      const [from, to] = key.split("->") as [NodeKey, NodeKey];
      result.push({ from, to, value: round(value) });
    }
  }
  return result;
}

/** Derives the load total from the other five when there's no direct load/consumption sensor. */
export function deriveLoad(t: Omit<FlowTotals, "load">): number {
  return Math.max(
    0,
    t.solar + t.batteryDischarge + t.gridImport - t.batteryCharge - t.gridExport
  );
}

function round(n: number): number {
  return Math.round(n * 1000) / 1000;
}
