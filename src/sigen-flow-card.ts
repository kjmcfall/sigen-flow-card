import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { Flow, FlowTotals, NodeKey, Period, SigenFlowCardConfig } from "./types.ts";
import { DEFAULT_COLORS } from "./const.ts";
import { fetchFlows } from "./data.ts";
import { computeSankeyLayout } from "./sankey-layout.ts";
import { renderSankey } from "./sankey-svg.ts";
import "./period-selector.ts";
import "./editor.ts";

const REQUIRED_ENTITY_KEYS = [
  "solar_energy",
  "battery_charge_energy",
  "battery_discharge_energy",
  "grid_import_energy",
  "grid_export_energy",
] as const;

/** Minimum time between re-fetches triggered by routine `hass` updates
 * (entity state changes elsewhere in HA fire constantly; the statistics
 * this card needs don't change nearly that often). Explicit period changes
 * always refetch immediately regardless of this. */
const MIN_REFETCH_INTERVAL_MS = 60_000;

@customElement("sigen-flow-card")
export class SigenFlowCard extends LitElement {
  @state() private _config?: SigenFlowCardConfig;
  private _hass?: HomeAssistant;

  @state() private _period: Period = "day";
  @state() private _anchor: Date = new Date();
  @state() private _flows: Flow[] = [];
  @state() private _totals?: FlowTotals;
  @state() private _lastUpdated: Date | null = null;
  @state() private _loading = false;
  @state() private _error?: string;

  private _lastFetchAt = 0;
  private _fetchToken = 0;

  static getConfigElement() {
    return document.createElement("sigen-flow-card-editor");
  }

  static getStubConfig(): Partial<SigenFlowCardConfig> {
    return {
      entities: {
        solar_energy: "",
        battery_charge_energy: "",
        battery_discharge_energy: "",
        grid_import_energy: "",
        grid_export_energy: "",
      },
    };
  }

  setConfig(config: SigenFlowCardConfig) {
    if (!config.entities) {
      throw new Error("sigen-flow-card: `entities:` is required");
    }
    for (const key of REQUIRED_ENTITY_KEYS) {
      if (!config.entities[key]) {
        throw new Error(`sigen-flow-card: entities.${key} is required`);
      }
    }
    this._config = config;
    this._period = config.default_period ?? "day";
    this._error = undefined;
    this._scheduleFetch(true);
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._scheduleFetch(false);
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  getCardSize() {
    return 5;
  }

  getGridOptions() {
    return { rows: 5, columns: 12, min_rows: 4, min_columns: 6 };
  }

  private _scheduleFetch(force: boolean) {
    if (!this._config || !this._hass) return;
    const now = Date.now();
    if (!force && now - this._lastFetchAt < MIN_REFETCH_INTERVAL_MS) return;
    this._lastFetchAt = now;
    void this._fetch();
  }

  private async _fetch() {
    if (!this._config || !this._hass) return;
    const token = ++this._fetchToken;
    this._loading = this._flows.length === 0; // only show the big spinner on first load
    this._error = undefined;
    try {
      const { flows, totals, lastUpdated } = await fetchFlows(
        this._hass,
        this._config.entities,
        this._period,
        this._anchor,
        this._config.week_start ?? 1
      );
      if (token !== this._fetchToken) return; // a newer fetch superseded this one
      this._flows = flows;
      this._totals = totals;
      this._lastUpdated = lastUpdated;
    } catch (err) {
      if (token !== this._fetchToken) return;
      this._error = err instanceof Error ? err.message : String(err);
    } finally {
      if (token === this._fetchToken) this._loading = false;
    }
  }

  private _onPeriodChange(ev: CustomEvent<{ period: Period; anchor: Date }>) {
    this._period = ev.detail.period;
    this._anchor = ev.detail.anchor;
    this._lastFetchAt = Date.now();
    void this._fetch();
  }

  static styles = css`
    ha-card {
      padding: 16px;
    }
    .title {
      font-size: 1.1em;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .state-message {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 180px;
      color: var(--secondary-text-color);
      text-align: center;
      padding: 0 16px;
    }
    .state-message.error {
      color: var(--error-color, #db4437);
    }
    .updated {
      text-align: right;
      font-size: 0.72em;
      color: var(--secondary-text-color);
      margin-top: 4px;
    }
    .sigen-flow-node-pill {
      fill: rgba(255, 255, 255, 0.55);
    }
    .sigen-flow-node-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.02em;
      fill: #1a1a2e;
      text-transform: uppercase;
    }
    .sigen-flow-node-value {
      font-size: 17px;
      font-weight: 700;
      fill: #1a1a2e;
    }
    .sigen-flow-node-pct {
      font-size: 12px;
      font-weight: 500;
      fill: rgba(26, 26, 46, 0.65);
    }
    .sigen-flow-ribbon {
      transition: opacity 0.3s ease;
    }
    .sigen-flow-dot {
      filter: drop-shadow(0 0 1px rgba(0, 0, 0, 0.25));
    }
    @media (prefers-reduced-motion: reduce) {
      .sigen-flow-dot {
        display: none;
      }
    }
  `;

  render() {
    if (!this._config) return nothing;

    const colors = { ...DEFAULT_COLORS, ...(this._config.colors ?? {}) };
    const showUpdated = this._config.show_updated !== false;

    return html`
      <ha-card>
        ${this._config.title ? html`<div class="title">${this._config.title}</div>` : nothing}

        <sigen-period-selector
          .period=${this._period}
          .anchor=${this._anchor}
          .weekStart=${this._config.week_start ?? 1}
          @period-change=${this._onPeriodChange}
        ></sigen-period-selector>

        ${this._error
          ? html`<div class="state-message error">⚠ ${this._error}</div>`
          : this._loading
            ? html`<div class="state-message">Loading…</div>`
            : this._flows.length === 0
              ? html`<div class="state-message">
                  No energy recorded for this period yet.
                </div>`
              : this._renderGraph(colors)}
        ${showUpdated && this._lastUpdated
          ? html`<div class="updated">
              as of ${this._lastUpdated.toLocaleString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
              })} — long-term statistics can lag live data by up to ~1 hour
            </div>`
          : nothing}
      </ha-card>
    `;
  }

  private _renderGraph(colors: Record<string, string>) {
    const width = 520;
    const height = 260;
    const layout = computeSankeyLayout(this._flows, height - 20, 14, 18);
    // shift layout down slightly to center vertically if it doesn't fill the height
    const usedHeight = Math.max(
      ...layout.leftNodes.map((n) => n.y1),
      ...layout.rightNodes.map((n) => n.y1),
      0
    );
    const yOffset = Math.max(0, (height - 20 - usedHeight) / 2) + 10;

    const shifted = {
      ...layout,
      leftNodes: layout.leftNodes.map((n) => ({ ...n, y0: n.y0 + yOffset, y1: n.y1 + yOffset })),
      rightNodes: layout.rightNodes.map((n) => ({
        ...n,
        y0: n.y0 + yOffset,
        y1: n.y1 + yOffset,
      })),
      links: layout.links.map((l) => ({
        ...l,
        y0Left: l.y0Left + yOffset,
        y1Left: l.y1Left + yOffset,
        y0Right: l.y0Right + yOffset,
        y1Right: l.y1Right + yOffset,
      })),
    };

    return renderSankey(shifted, {
      width,
      height,
      colors: colors as Record<NodeKey, string>,
      leftX: 150,
      rightX: width - 150,
      unit: "kWh",
      animate: true,
      idPrefix: this._config?.entities.solar_energy?.replace(/[^a-zA-Z0-9]/g, "") ?? "sigen",
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sigen-flow-card": SigenFlowCard;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "sigen-flow-card",
  name: "Sigenergy Energy Flow Card",
  description:
    "A mySigen-style colour-coded energy flow graph (Solar/Battery/Grid → Battery/Load/Grid) with a Day/Week/Month/Year period selector, for Sigenergy ESS systems.",
  preview: true,
  documentationURL: "https://github.com/kjmcfall/sigen-flow-card",
});
