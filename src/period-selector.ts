import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Period } from "./types.ts";
import { PERIODS, PERIOD_LABELS } from "./const.ts";
import { getPeriodRange, stepPeriod } from "./data.ts";

/**
 * The period control row, matched against a real mySigen "Energy Statistics"
 * screenshot: a rounded date pill with `‹ ›` navigation on the left, and a
 * separate rounded dropdown pill (Day/Week/Month/Year) on the right.
 * Deliberately self-contained (not tied to Home Assistant's Energy
 * Dashboard date picker) so the card works standalone for anyone who
 * installs it.
 *
 * Fires a `period-change` CustomEvent with `{ period, anchor }` in `detail`
 * whenever the user changes period or steps forward/back.
 */
@customElement("sigen-period-selector")
export class SigenPeriodSelector extends LitElement {
  @property({ attribute: false }) period: Period = "day";
  @property({ attribute: false }) anchor: Date = new Date();
  @property({ type: Number }) weekStart: 0 | 1 = 1;

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      flex-wrap: wrap;
      padding-bottom: 12px;
    }
    .date-pill,
    .period-pill {
      display: flex;
      align-items: center;
      background: var(--secondary-background-color, #f0f0f0);
      border-radius: 999px;
      color: var(--primary-text-color);
    }
    .date-pill {
      gap: 4px;
      padding: 4px 6px;
    }
    .date-pill button {
      border: none;
      background: none;
      cursor: pointer;
      color: inherit;
      font-size: 1.1em;
      line-height: 1;
      padding: 4px 8px;
      border-radius: 999px;
    }
    .date-pill button:hover {
      background: rgba(127, 127, 127, 0.15);
    }
    .date-pill button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .range-label {
      min-width: 8.5em;
      text-align: center;
      font-size: 0.9em;
      font-weight: 500;
    }
    .period-pill {
      position: relative;
      padding: 0;
    }
    .period-pill select {
      appearance: none;
      -webkit-appearance: none;
      border: none;
      background: transparent;
      color: inherit;
      font: inherit;
      font-weight: 500;
      font-size: 0.9em;
      padding: 8px 30px 8px 16px;
      border-radius: 999px;
      cursor: pointer;
    }
    .period-pill .chevron {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
      font-size: 0.7em;
      opacity: 0.7;
    }
  `;

  render() {
    const isCurrent = this._isCurrentPeriod();
    return html`
      <div class="date-pill">
        <button @click=${() => this._step(-1)} aria-label="Previous ${this.period}">‹</button>
        <span class="range-label">${this._rangeLabel()}</span>
        <button @click=${() => this._step(1)} ?disabled=${isCurrent} aria-label="Next ${this.period}">
          ›
        </button>
      </div>
      <div class="period-pill">
        <select
          .value=${this.period}
          @change=${(ev: Event) =>
            this._setPeriod((ev.target as HTMLSelectElement).value as Period)}
        >
          ${PERIODS.map((p) => html`<option value=${p}>${PERIOD_LABELS[p]}</option>`)}
        </select>
        <span class="chevron">▾</span>
      </div>
    `;
  }

  private _setPeriod(period: Period) {
    this.period = period;
    this._emit();
  }

  private _step(direction: -1 | 1) {
    this.anchor = stepPeriod(this.period, this.anchor, direction);
    this._emit();
  }

  private _emit() {
    this.dispatchEvent(
      new CustomEvent("period-change", {
        detail: { period: this.period, anchor: this.anchor },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _isCurrentPeriod(): boolean {
    const { start, end } = getPeriodRange(this.period, this.anchor, this.weekStart);
    const now = new Date();
    return now >= start && now < end;
  }

  private _rangeLabel(): string {
    const { start, end } = getPeriodRange(this.period, this.anchor, this.weekStart);
    const endInclusive = new Date(end.getTime() - 1);
    const fmt = (d: Date, opts: Intl.DateTimeFormatOptions) =>
      d.toLocaleDateString(undefined, opts);

    switch (this.period) {
      case "day":
        return fmt(this.anchor, { weekday: "short", day: "numeric", month: "short" });
      case "week":
        return `${fmt(start, { day: "numeric", month: "short" })} – ${fmt(endInclusive, {
          day: "numeric",
          month: "short",
        })}`;
      case "month":
        return fmt(start, { month: "long", year: "numeric" });
      case "year":
        return fmt(start, { year: "numeric" });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sigen-period-selector": SigenPeriodSelector;
  }
}
