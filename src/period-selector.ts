import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Period } from "./types.ts";
import { PERIODS, PERIOD_LABELS } from "./const.ts";
import { getPeriodRange, stepPeriod } from "./data.ts";

/**
 * The Day / Week / Month / Year tab bar with `< >` navigation, mirroring the
 * period selector at the top of the mySigen app's flow graph. Deliberately
 * self-contained (not tied to Home Assistant's Energy Dashboard date picker)
 * so the card works standalone for anyone who installs it.
 *
 * Fires a `period-change` CustomEvent with `{ period, anchor }` in `detail`
 * whenever the user changes tab or steps forward/back.
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
      padding-bottom: 8px;
    }
    .tabs {
      display: flex;
      gap: 4px;
      background: var(--secondary-background-color, #f0f0f0);
      border-radius: 999px;
      padding: 3px;
    }
    .tabs button {
      border: none;
      background: transparent;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.85em;
      font-weight: 500;
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .tabs button.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.85em;
      color: var(--secondary-text-color);
    }
    .nav button {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--primary-text-color);
      font-size: 1.1em;
      line-height: 1;
      padding: 2px 6px;
      border-radius: 6px;
    }
    .nav button:hover {
      background: var(--secondary-background-color, #f0f0f0);
    }
    .nav button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    .range-label {
      min-width: 9em;
      text-align: center;
    }
  `;

  render() {
    const isCurrent = this._isCurrentPeriod();
    return html`
      <div class="tabs">
        ${PERIODS.map(
          (p) => html`
            <button
              class=${p === this.period ? "active" : ""}
              @click=${() => this._setPeriod(p)}
            >
              ${PERIOD_LABELS[p]}
            </button>
          `
        )}
      </div>
      <div class="nav">
        <button @click=${() => this._step(-1)} aria-label="Previous ${this.period}">‹</button>
        <span class="range-label">${this._rangeLabel()}</span>
        <button @click=${() => this._step(1)} ?disabled=${isCurrent} aria-label="Next ${this.period}">
          ›
        </button>
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
