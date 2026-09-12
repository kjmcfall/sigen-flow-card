import type { NodeKey } from "./types.ts";

/** Palette matched directly against a real mySigen "Energy Statistics"
 * screenshot (Sept 2026). Override via `colors:` in the card config if your
 * app version differs. */
export const DEFAULT_COLORS: Record<NodeKey, string> = {
  solar: "#F0D264", // warm yellow/gold
  battery: "#4FD9C4", // teal / mint
  grid: "#8B93E8", // periwinkle / indigo
  load: "#C79EEA", // light purple / orchid
};

export const PERIOD_LABELS: Record<string, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
};

export const PERIODS = ["day", "week", "month", "year"] as const;
