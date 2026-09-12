import type { Flow, NodeKey } from "./types.ts";

/** Visual ordering, top-to-bottom, matching the mySigen graph: battery sits
 * in the middle on both sides since it's the one node that's both a source
 * and a destination. */
export const LEFT_ORDER: NodeKey[] = ["solar", "battery", "grid"];
export const RIGHT_ORDER: NodeKey[] = ["battery", "load", "grid"];

export interface LayoutNode {
  key: NodeKey;
  total: number;
  y0: number;
  y1: number;
}

export interface LayoutLink {
  from: NodeKey;
  to: NodeKey;
  value: number;
  /** vertical span of this link's ribbon where it leaves the left node */
  y0Left: number;
  y1Left: number;
  /** vertical span of this link's ribbon where it arrives at the right node */
  y0Right: number;
  y1Right: number;
}

export interface SankeyLayout {
  leftNodes: LayoutNode[];
  rightNodes: LayoutNode[];
  links: LayoutLink[];
  /** kWh-per-pixel scale actually used, in case the caller wants to draw a legend/ruler */
  scale: number;
}

/**
 * Lays out a small, fixed-shape bipartite sankey (<=3 nodes per side) within
 * a `height`-tall column. This is deliberately hand-rolled rather than
 * pulling in d3-sankey: the graph shape here is fixed (solar/battery/grid on
 * the left, battery/load/grid on the right) so a general-purpose sankey
 * solver is more machinery than the problem needs.
 */
export function computeSankeyLayout(
  flows: Flow[],
  height: number,
  gap = 12,
  minNodeHeight = 4
): SankeyLayout {
  const leftTotals = new Map<NodeKey, number>();
  const rightTotals = new Map<NodeKey, number>();
  for (const f of flows) {
    leftTotals.set(f.from, (leftTotals.get(f.from) ?? 0) + f.value);
    rightTotals.set(f.to, (rightTotals.get(f.to) ?? 0) + f.value);
  }

  const leftKeys = LEFT_ORDER.filter((k) => (leftTotals.get(k) ?? 0) > 0);
  const rightKeys = RIGHT_ORDER.filter((k) => (rightTotals.get(k) ?? 0) > 0);

  const totalLeft = leftKeys.reduce((s, k) => s + (leftTotals.get(k) ?? 0), 0);
  const totalRight = rightKeys.reduce((s, k) => s + (rightTotals.get(k) ?? 0), 0);
  const total = Math.max(totalLeft, totalRight, 0.001);

  const maxNodes = Math.max(leftKeys.length, rightKeys.length, 1);
  const usableHeight = Math.max(height - gap * (maxNodes - 1), minNodeHeight * maxNodes);
  const scale = usableHeight / total;

  const stack = (keys: NodeKey[], totals: Map<NodeKey, number>): LayoutNode[] => {
    let y = 0;
    const nodes: LayoutNode[] = [];
    for (const k of keys) {
      const raw = totals.get(k) ?? 0;
      const h = Math.max(raw * scale, minNodeHeight);
      nodes.push({ key: k, total: raw, y0: y, y1: y + h });
      y += h + gap;
    }
    return nodes;
  };

  const leftNodes = stack(leftKeys, leftTotals);
  const rightNodes = stack(rightKeys, rightTotals);

  const leftNodeByKey = new Map(leftNodes.map((n) => [n.key, n]));
  const rightNodeByKey = new Map(rightNodes.map((n) => [n.key, n]));

  // Cursor per node tracking how much of its height has been allocated so far.
  const leftCursor = new Map<NodeKey, number>(leftNodes.map((n) => [n.key, n.y0]));
  const rightCursor = new Map<NodeKey, number>(rightNodes.map((n) => [n.key, n.y0]));

  const links: LayoutLink[] = [];

  // Assign each link's left-side span by walking left nodes in order, and
  // for each, its outgoing flows in right-key order (keeps ribbons from
  // crossing more than necessary).
  const leftSpans = new Map<Flow, { y0: number; y1: number }>();
  for (const leftKey of leftKeys) {
    const outgoing = flows
      .filter((f) => f.from === leftKey)
      .sort((a, b) => rightKeys.indexOf(a.to) - rightKeys.indexOf(b.to));
    for (const f of outgoing) {
      const node = leftNodeByKey.get(leftKey)!;
      const h = Math.max((f.value / Math.max(node.total, 0.001)) * (node.y1 - node.y0), 0);
      const y0 = leftCursor.get(leftKey)!;
      const y1 = y0 + h;
      leftCursor.set(leftKey, y1);
      leftSpans.set(f, { y0, y1 });
    }
  }

  // Same for the right side, ordered by left-key order.
  const rightSpans = new Map<Flow, { y0: number; y1: number }>();
  for (const rightKey of rightKeys) {
    const incoming = flows
      .filter((f) => f.to === rightKey)
      .sort((a, b) => leftKeys.indexOf(a.from) - leftKeys.indexOf(b.from));
    for (const f of incoming) {
      const node = rightNodeByKey.get(rightKey)!;
      const h = Math.max((f.value / Math.max(node.total, 0.001)) * (node.y1 - node.y0), 0);
      const y0 = rightCursor.get(rightKey)!;
      const y1 = y0 + h;
      rightCursor.set(rightKey, y1);
      rightSpans.set(f, { y0, y1 });
    }
  }

  for (const f of flows) {
    const left = leftSpans.get(f);
    const right = rightSpans.get(f);
    if (!left || !right) continue; // node filtered out (zero total on one side, shouldn't normally happen)
    links.push({
      from: f.from,
      to: f.to,
      value: f.value,
      y0Left: left.y0,
      y1Left: left.y1,
      y0Right: right.y0,
      y1Right: right.y1,
    });
  }

  return { leftNodes, rightNodes, links, scale };
}
