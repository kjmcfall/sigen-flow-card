import { svg, type SVGTemplateResult } from "lit";
import type { NodeKey } from "./types.ts";
import type { SankeyLayout, LayoutNode } from "./sankey-layout.ts";

const NODE_LABELS: Record<NodeKey, string> = {
  solar: "Solar",
  battery: "Battery",
  grid: "Grid",
  load: "Load",
};

export interface RenderOptions {
  width: number;
  height: number;
  colors: Record<NodeKey, string>;
  /** column x-position of the left node boxes' right edge (boxes span 0..leftX) */
  leftX: number;
  /** column x-position of the right node boxes' left edge (boxes span rightX..width) */
  rightX: number;
  unit: string;
  /** false disables the moving-dot flow animation (e.g. reduced-motion, or a static preview) */
  animate: boolean;
  idPrefix: string;
}

function formatValue(v: number, unit: string): string {
  if (v >= 100) return `${v.toFixed(0)} ${unit}`;
  if (v >= 10) return `${v.toFixed(1)} ${unit}`;
  return `${v.toFixed(2)} ${unit}`;
}

/** Cubic-bezier "sankey ribbon" outline between a left-side span and a right-side span. */
function ribbonPath(
  x0: number,
  y0top: number,
  y0bottom: number,
  x1: number,
  y1top: number,
  y1bottom: number
): string {
  const xMid = (x0 + x1) / 2;
  return [
    `M ${x0} ${y0top}`,
    `C ${xMid} ${y0top} ${xMid} ${y1top} ${x1} ${y1top}`,
    `L ${x1} ${y1bottom}`,
    `C ${xMid} ${y1bottom} ${xMid} ${y0bottom} ${x0} ${y0bottom}`,
    "Z",
  ].join(" ");
}

/** A single-line bezier through the vertical center of a ribbon, used only as
 * an invisible motion path for the animated flow dots (not rendered itself). */
function centerlinePath(x0: number, y0: number, x1: number, y1: number): string {
  const xMid = (x0 + x1) / 2;
  return `M ${x0} ${y0} C ${xMid} ${y0} ${xMid} ${y1} ${x1} ${y1}`;
}

/** Renders a node's label pill / value / share-of-side-total, matching the
 * real mySigen "Energy Statistics" screen: a translucent pill with the node
 * name near the top of the coloured block, a bold kWh value below it, and
 * (space permitting) a "share of this side's total" percentage near the
 * bottom. Smaller nodes (e.g. a modest grid export) simply don't have room
 * for all three -- same as the reference. */
function nodeContent(
  n: LayoutNode,
  side: "left" | "right",
  boxX: number,
  boxWidth: number,
  unit: string,
  sideTotal: number
): SVGTemplateResult {
  const h = n.y1 - n.y0;
  const pad = 10;
  const textX = side === "left" ? boxX + pad : boxX + pad;
  const pillW = Math.min(boxWidth - pad * 2, NODE_LABELS[n.key].length * 7 + 20);
  const pct = sideTotal > 0 ? (n.total / sideTotal) * 100 : 0;

  const showValue = h >= 30;
  const showPct = h >= 55;

  return svg`
    <g>
      <rect
        x=${textX}
        y=${n.y0 + 8}
        width=${pillW}
        height="16"
        rx="8"
        class="sigen-flow-node-pill"
      ></rect>
      <text
        x=${textX + pillW / 2}
        y=${n.y0 + 16}
        text-anchor="middle"
        dominant-baseline="middle"
        class="sigen-flow-node-label"
      >${NODE_LABELS[n.key]}</text>
      ${
        showValue
          ? svg`<text
              x=${textX}
              y=${n.y0 + 40}
              text-anchor="start"
              dominant-baseline="middle"
              class="sigen-flow-node-value"
            >${formatValue(n.total, unit)}</text>`
          : ""
      }
      ${
        showPct
          ? svg`<text
              x=${textX}
              y=${n.y1 - 10}
              text-anchor="start"
              dominant-baseline="middle"
              class="sigen-flow-node-pct"
            >${pct.toFixed(0)}%</text>`
          : ""
      }
    </g>
  `;
}

export function renderSankey(layout: SankeyLayout, opts: RenderOptions): SVGTemplateResult {
  const { width, height, colors, leftX, rightX, unit, animate, idPrefix } = opts;

  const maxValue = layout.links.reduce((m, l) => Math.max(m, l.value), 0.001);
  const leftTotal = layout.leftNodes.reduce((s, n) => s + n.total, 0);
  const rightTotal = layout.rightNodes.reduce((s, n) => s + n.total, 0);

  const ribbons: SVGTemplateResult[] = [];
  const gradients: SVGTemplateResult[] = [];
  const centerlines: SVGTemplateResult[] = [];
  const dots: SVGTemplateResult[] = [];

  layout.links.forEach((link, i) => {
    const fromColor = colors[link.from];
    const toColor = colors[link.to];
    const pathId = `${idPrefix}-link-${i}`;
    const gradId = `${idPrefix}-grad-${i}`;

    gradients.push(svg`
      <linearGradient id=${gradId} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color=${fromColor}></stop>
        <stop offset="100%" stop-color=${toColor}></stop>
      </linearGradient>
    `);

    ribbons.push(svg`
      <path
        d=${ribbonPath(leftX, link.y0Left, link.y1Left, rightX, link.y0Right, link.y1Right)}
        fill="url(#${gradId})"
        opacity="0.6"
        class="sigen-flow-ribbon"
      ></path>
    `);

    if (animate) {
      const yMidLeft = (link.y0Left + link.y1Left) / 2;
      const yMidRight = (link.y0Right + link.y1Right) / 2;
      const d = centerlinePath(leftX, yMidLeft, rightX, yMidRight);
      centerlines.push(svg`<path id=${pathId} d=${d} fill="none" stroke="none"></path>`);

      // Faster dots for bigger flows, relative to the biggest flow currently shown.
      const speedFactor = link.value / maxValue; // 0..1
      const duration = 6 - speedFactor * 3.5; // 2.5s (biggest) .. 6s (smallest)
      const dotCount = link.value / maxValue > 0.5 ? 3 : 2;

      for (let d2 = 0; d2 < dotCount; d2++) {
        const beginOffset = -(duration / dotCount) * d2;
        dots.push(svg`
          <circle r="2.6" fill=${fromColor} class="sigen-flow-dot">
            <animateMotion
              dur="${duration}s"
              begin="${beginOffset}s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#${pathId}"></mpath>
            </animateMotion>
          </circle>
        `);
      }
    }
  });

  const leftNodes = layout.leftNodes.map((n) => {
    const color = colors[n.key];
    return svg`
      <g class="sigen-flow-node">
        <rect
          x="0"
          y=${n.y0}
          width=${leftX}
          height=${Math.max(n.y1 - n.y0, 2)}
          rx="10"
          fill=${color}
        ></rect>
        ${nodeContent(n, "left", 0, leftX, unit, leftTotal)}
      </g>
    `;
  });

  const rightNodes = layout.rightNodes.map((n) => {
    const color = colors[n.key];
    return svg`
      <g class="sigen-flow-node">
        <rect
          x=${rightX}
          y=${n.y0}
          width=${width - rightX}
          height=${Math.max(n.y1 - n.y0, 2)}
          rx="10"
          fill=${color}
        ></rect>
        ${nodeContent(n, "right", rightX, width - rightX, unit, rightTotal)}
      </g>
    `;
  });

  return svg`
    <svg viewBox="0 0 ${width} ${height}" width="100%" preserveAspectRatio="xMidYMid meet">
      <defs>
        ${gradients}
        ${centerlines}
      </defs>
      ${ribbons}
      ${dots}
      ${leftNodes}
      ${rightNodes}
    </svg>
  `;
}
