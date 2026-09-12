import { test } from "node:test";
import assert from "node:assert/strict";
import { computeSankeyLayout } from "../src/sankey-layout.ts";
import type { Flow } from "../src/types.ts";

const sampleFlows: Flow[] = [
  { from: "solar", to: "load", value: 33.02 },
  { from: "solar", to: "battery", value: 14.68 },
  { from: "solar", to: "grid", value: 2.3 },
  { from: "battery", to: "load", value: 4 },
  { from: "grid", to: "load", value: 5.5 },
  { from: "grid", to: "battery", value: 4.51 },
];

test("computeSankeyLayout: produces one link per flow", () => {
  const layout = computeSankeyLayout(sampleFlows, 300);
  assert.equal(layout.links.length, sampleFlows.length);
});

test("computeSankeyLayout: left nodes only include non-zero sources, in mySigen order", () => {
  const layout = computeSankeyLayout(sampleFlows, 300);
  assert.deepEqual(
    layout.leftNodes.map((n) => n.key),
    ["solar", "battery", "grid"]
  );
});

test("computeSankeyLayout: right nodes only include non-zero destinations, in mySigen order", () => {
  const layout = computeSankeyLayout(sampleFlows, 300);
  assert.deepEqual(
    layout.rightNodes.map((n) => n.key),
    ["battery", "load", "grid"]
  );
});

test("computeSankeyLayout: omits a side entirely when its total is zero", () => {
  const soloSolar: Flow[] = [{ from: "solar", to: "load", value: 10 }];
  const layout = computeSankeyLayout(soloSolar, 300);
  assert.deepEqual(layout.leftNodes.map((n) => n.key), ["solar"]);
  assert.deepEqual(layout.rightNodes.map((n) => n.key), ["load"]);
});

test("computeSankeyLayout: no node height is negative and nodes don't overlap", () => {
  const layout = computeSankeyLayout(sampleFlows, 300);
  for (const nodes of [layout.leftNodes, layout.rightNodes]) {
    for (let i = 0; i < nodes.length; i++) {
      assert.ok(nodes[i].y1 >= nodes[i].y0, "node height must be non-negative");
      if (i > 0) {
        assert.ok(nodes[i].y0 >= nodes[i - 1].y1, "nodes must not overlap vertically");
      }
    }
  }
});

test("computeSankeyLayout: each link's left/right spans sit within its node's bounds", () => {
  const layout = computeSankeyLayout(sampleFlows, 300);
  const leftByKey = new Map(layout.leftNodes.map((n) => [n.key, n]));
  const rightByKey = new Map(layout.rightNodes.map((n) => [n.key, n]));
  for (const link of layout.links) {
    const leftNode = leftByKey.get(link.from)!;
    const rightNode = rightByKey.get(link.to)!;
    assert.ok(link.y0Left >= leftNode.y0 - 0.01 && link.y1Left <= leftNode.y1 + 0.01);
    assert.ok(link.y0Right >= rightNode.y0 - 0.01 && link.y1Right <= rightNode.y1 + 0.01);
  }
});

test("computeSankeyLayout: handles the empty-flows case without throwing", () => {
  const layout = computeSankeyLayout([], 300);
  assert.equal(layout.leftNodes.length, 0);
  assert.equal(layout.rightNodes.length, 0);
  assert.equal(layout.links.length, 0);
});

test("computeSankeyLayout: a dominant node's neighbours hitting the height floor never pushes the column past the available height", () => {
  // Regression test for a real bug: a naive "scale = usableHeight / total,
  // then Math.max(raw * scale, minNodeHeight) per node" approach bumps small
  // nodes up to the floor without shrinking anything else to compensate. On
  // a real user's data (a big Solar node dwarfing Battery/Grid), that made
  // the stacked column taller than the canvas, silently clipping the last
  // (Grid) box instead of just cramming its text.
  const lopsided: Flow[] = [
    { from: "solar", to: "load", value: 29.0 },
    { from: "solar", to: "battery", value: 11.2 },
    { from: "solar", to: "grid", value: 7.3 },
    { from: "battery", to: "load", value: 5.6 },
  ];
  const height = 280;
  const gap = 14;
  const minNodeHeight = 57;
  const layout = computeSankeyLayout(lopsided, height, gap, minNodeHeight);

  const maxY1 = Math.max(
    ...layout.leftNodes.map((n) => n.y1),
    ...layout.rightNodes.map((n) => n.y1)
  );
  assert.ok(
    maxY1 <= height + 0.5,
    `stacked column (ends at ${maxY1}) must not exceed the available height (${height})`
  );

  // The small nodes should still get at least the floor (not squeezed below it).
  for (const nodes of [layout.leftNodes, layout.rightNodes]) {
    for (const n of nodes) {
      assert.ok(n.y1 - n.y0 >= minNodeHeight - 0.5);
    }
  }
});
