import { test } from "node:test";
import assert from "node:assert/strict";
import { computeFlows, aggregateFlows, deriveLoad } from "../src/flow-model.ts";
import type { FlowTotals } from "../src/types.ts";

function sumBy(flows: { from: string; to: string; value: number }[], from: string, to: string) {
  return flows.find((f) => f.from === from && f.to === to)?.value ?? 0;
}

test("computeFlows: solar covers load then exports the rest (real live snapshot)", () => {
  // Taken directly from a real export: shed_solaris_storage_pv_power=2.856,
  // shed_solaris_storage_consumed_power=1.773, shed_solaris_storage_grid_export_power=1.081,
  // battery idle (SoC 100%, charge/discharge both 0).
  const totals: FlowTotals = {
    solar: 2.856,
    batteryCharge: 0,
    batteryDischarge: 0,
    gridImport: 0,
    gridExport: 1.081,
    load: 1.773,
  };
  const flows = computeFlows(totals);
  assert.equal(sumBy(flows, "solar", "load"), 1.773);
  assert.equal(sumBy(flows, "solar", "grid"), 1.081);
  assert.equal(sumBy(flows, "battery", "load"), 0);
  assert.equal(sumBy(flows, "grid", "load"), 0);
});

test("computeFlows: grid covers load when solar and battery can't", () => {
  const totals: FlowTotals = {
    solar: 0,
    batteryCharge: 0,
    batteryDischarge: 0,
    gridImport: 1.2,
    gridExport: 0,
    load: 1.2,
  };
  const flows = computeFlows(totals);
  assert.equal(sumBy(flows, "grid", "load"), 1.2);
  assert.equal(flows.length, 1);
});

test("computeFlows: solar charges the battery once load is covered", () => {
  const totals: FlowTotals = {
    solar: 5,
    batteryCharge: 2,
    batteryDischarge: 0,
    gridImport: 0,
    gridExport: 1,
    load: 2,
  };
  const flows = computeFlows(totals);
  assert.equal(sumBy(flows, "solar", "load"), 2);
  assert.equal(sumBy(flows, "solar", "battery"), 2);
  assert.equal(sumBy(flows, "solar", "grid"), 1);
});

test("deriveLoad: reconciles the six totals when there's no direct load sensor", () => {
  const load = deriveLoad({
    solar: 47.7,
    batteryCharge: 19.19,
    batteryDischarge: 9.51,
    gridImport: 5.86,
    gridExport: 10.86,
  });
  // solar + batteryDischarge + gridImport - batteryCharge - gridExport
  // 47.7 + 9.51 + 5.86 - 19.19 - 10.86 = 33.02 -- matches the real
  // shed_solaris_storage_daily_load_consumption sensor for the same day.
  assert.equal(Math.round(load * 100) / 100, 33.02);
});

test("aggregateFlows: a whole day's totals fed as ONE bucket under-counts real flows", () => {
  // This is the bug a naive implementation has: real daily totals where the
  // battery both charged (morning) and discharged (evening), and solar
  // covered load with room to spare. Feeding the whole day in as a single
  // interval loses the battery-discharge-to-load flow entirely, because by
  // the time step 4 runs, "load remaining" has already been fully consumed
  // by solar in step 1 even though, in reality, solar and battery covered
  // load at different times of day.
  const wholeDayAsOneBucket: FlowTotals = {
    solar: 47.7,
    batteryCharge: 19.19,
    batteryDischarge: 9.51,
    gridImport: 5.86,
    gridExport: 10.86,
    load: 33.02,
  };
  const naive = computeFlows(wholeDayAsOneBucket);
  const naiveTotal = naive.reduce((s, f) => s + f.value, 0);
  // Only ~52.2 of the real 63.07 kWh that moved gets a ribbon -- the bug.
  assert.ok(naiveTotal < 55, `expected naive under-count, got ${naiveTotal}`);

  // The fix: split the same day into two representative buckets (solar
  // hours vs evening/night) that sum to the same six totals, and aggregate.
  const morning: FlowTotals = {
    solar: 47.7,
    batteryCharge: 19.19,
    batteryDischarge: 0,
    gridImport: 0,
    gridExport: 10.86,
    load: 17.65,
  };
  const evening: FlowTotals = {
    solar: 0,
    batteryCharge: 0,
    batteryDischarge: 9.51,
    gridImport: 5.86,
    gridExport: 0,
    load: 15.37,
  };
  const aggregated = aggregateFlows([morning, evening]);
  const aggregatedTotal = aggregated.reduce((s, f) => s + f.value, 0);
  assert.ok(
    aggregatedTotal > naiveTotal,
    `expected aggregated (${aggregatedTotal}) to recover more of the real 63.07 kWh than naive (${naiveTotal})`
  );
  assert.ok(sumBy(aggregated, "battery", "load") > 0, "battery -> load should not be zero");
  assert.ok(sumBy(aggregated, "grid", "load") > 0, "grid -> load should not be zero");
});
