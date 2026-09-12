import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant } from "custom-card-helpers";
import type { SigenFlowCardConfig } from "./types.ts";

/**
 * A deliberately simple visual editor: plain text inputs for entity_ids
 * rather than `ha-entity-picker` (an internal HA frontend component whose
 * API isn't part of any stable contract for custom cards to depend on).
 * Every field can also just be edited in YAML mode -- this editor exists so
 * the card is usable without ever touching YAML, not to be the only path.
 */
@customElement("sigen-flow-card-editor")
export class SigenFlowCardEditor extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @state() private _config?: SigenFlowCardConfig;

  static styles = css`
    .row {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
    }
    label {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    input,
    select {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
    }
    h3 {
      margin: 16px 0 4px 0;
      font-size: 0.95em;
    }
    .hint {
      font-size: 0.8em;
      color: var(--secondary-text-color);
      margin-top: -8px;
      margin-bottom: 12px;
    }
  `;

  setConfig(config: SigenFlowCardConfig) {
    this._config = config;
  }

  render() {
    if (!this._config) return html``;
    const e = this._config.entities ?? ({} as SigenFlowCardConfig["entities"]);

    return html`
      <div class="row">
        <label>Title (optional)</label>
        <input
          type="text"
          .value=${this._config.title ?? ""}
          @change=${(ev: Event) => this._set("title", (ev.target as HTMLInputElement).value)}
        />
      </div>

      <h3>Entities</h3>
      <div class="hint">
        Point these at your Sigenergy plant/storage device's daily energy sensors
        (e.g. "Daily PV Energy", "Daily Battery Charge Energy", ...) -- these are
        the totals the flow graph is built from. Check Developer Tools →
        Statistics if you're not sure an entity has long-term statistics.
      </div>

      ${this._entityRow("Solar energy (required)", "solar_energy", e.solar_energy)}
      ${this._entityRow(
        "Battery charge energy (required)",
        "battery_charge_energy",
        e.battery_charge_energy
      )}
      ${this._entityRow(
        "Battery discharge energy (required)",
        "battery_discharge_energy",
        e.battery_discharge_energy
      )}
      ${this._entityRow(
        "Grid import energy (required)",
        "grid_import_energy",
        e.grid_import_energy
      )}
      ${this._entityRow(
        "Grid export energy (required)",
        "grid_export_energy",
        e.grid_export_energy
      )}
      ${this._entityRow(
        "Load / consumption energy (optional -- derived if left blank)",
        "load_energy",
        e.load_energy
      )}
      ${this._entityRow(
        "Battery state of charge % (optional, display only)",
        "battery_soc",
        e.battery_soc
      )}

      <h3>Period</h3>
      <div class="row">
        <label>Default period</label>
        <select
          .value=${this._config.default_period ?? "day"}
          @change=${(ev: Event) =>
            this._set("default_period", (ev.target as HTMLSelectElement).value)}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div class="row">
        <label>Week starts on</label>
        <select
          .value=${String(this._config.week_start ?? 1)}
          @change=${(ev: Event) =>
            this._set(
              "week_start",
              Number((ev.target as HTMLSelectElement).value) as 0 | 1
            )}
        >
          <option value="1">Monday</option>
          <option value="0">Sunday</option>
        </select>
      </div>
    `;
  }

  private _entityRow(label: string, key: string, value?: string) {
    return html`
      <div class="row">
        <label>${label}</label>
        <input
          type="text"
          placeholder="sensor.your_entity_id"
          .value=${value ?? ""}
          @change=${(ev: Event) =>
            this._setEntity(key, (ev.target as HTMLInputElement).value)}
        />
      </div>
    `;
  }

  private _set(key: keyof SigenFlowCardConfig, value: unknown) {
    if (!this._config) return;
    const newConfig = { ...this._config, [key]: value === "" ? undefined : value };
    this._config = newConfig;
    this._fireChanged();
  }

  private _setEntity(key: string, value: string) {
    if (!this._config) return;
    const entities = { ...this._config.entities, [key]: value || undefined };
    this._config = { ...this._config, entities };
    this._fireChanged();
  }

  private _fireChanged() {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sigen-flow-card-editor": SigenFlowCardEditor;
  }
}
