import { svg, type SVGTemplateResult } from "lit";
import type { NodeKey } from "./types.ts";
import type { SankeyLayout } from "./sankey-layout.ts";

const NODE_LABELS: Record<NodeKey, string> = {
  solar: "Solar",
  battery: "Battery",
  grid: "Grid",
  load: "Home",
};

export interface RenderOptions {
  width: number;
  height: number;
  colors: Record<NodeKey, string>;
  /** column x-position of the left node boxes' right edge */
  leftX: number;
  /** column x-position of the right node boxes' left edge */
  rightX: number;
  nodeBoxWidth: number;
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

export function renderSankey(layout: SankeyLayout, opts: RenderOptions): SVGTemplateResult {
  const { width, height, colors, leftX, rightX, nodeBoxWidth, unit, animate, idPrefix } = opts;

  const maxValue = layout.links.reduce((m, l) => Math.max(m, l.value), 0.001);

  const ribbons: SVGTemplateResult[] = [];
  const centerlines: SVGTemplateResult[] = [];
  const dots: SVGTemplateResult[] = [];

  layout.links.forEach((link, i) => {
    const color = colors[link.from];
    const pathId = `${idPrefix}-link-${i}`;

    ribbons.push(svg`
      <path
        d=${ribbonPath(leftX, link.y0Left, link.y1Left, rightX, link.y0Right, link.y1Right)}
        fill=${color}
        opacity="0.55"
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
          <circle r="2.6" fill=${color} class="sigen-flow-dot">
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
    const midY = (n.y0 + n.y1) / 2;
    return svg`
      <g class="sigen-flow-node">
        <rect
          x=${leftX - nodeBoxWidth}
          y=${n.y0}
          width=${nodeBoxWidth}
          height=${Math.max(n.y1 - n.y0, 2)}
          rx="3"
          fill=${color}
        ></rect>
        <text
          x=${leftX - nodeBoxWidth - 8}
          y=${midY}
          text-anchor="end"
          dominant-baseline="middle"
          class="sigen-flow-node-label"
        >${NODE_LABELS[n.key]}</text>
        <text
          x=${leftX - nodeBoxWidth - 8}
          y=${midY + 14}
          text-anchor="end"
          dominant-baseline="middle"
          class="sigen-flow-node-value"
        >${formatValue(n.total, unit)}</text>
      </g>
    `;
  });

  const rightNodes = layout.rightNodes.map((n) => {
    const color = colors[n.key];
    const midY = (n.y0 + n.y1) / 2;
    return svg`
      <g class="sigen-flow-node">
        <rect
          x=${rightX}
          y=${n.y0}
          width=${nodeBoxWidth}
          height=${Math.max(n.y1 - n.y0, 2)}
          rx="3"
          fill=${color}
        ></rect>
        <text
          x=${rightX + nodeBoxWidth + 8}
          y=${midY}
          text-anchor="start"
          dominant-baseline="middle"
          class="sigen-flow-node-label"
        >${NODE_LABELS[n.key]}</text>
        <text
          x=${rightX + nodeBoxWidth + 8}
          y=${midY + 14}
          text-anchor="start"
          dominant-baseline="middle"
          class="sigen-flow-node-value"
        >${formatValue(n.total, unit)}</text>
      </g>
    `;
  });

  return svg`
    <svg viewBox="0 0 ${width} ${height}" width="100%" preserveAspectRatio="xMidYMid meet">
      <defs>${centerlines}</defs>
      ${ribbons}
      ${dots}
      ${leftNodes}
      ${rightNodes}
    </svg>
  `;
}
