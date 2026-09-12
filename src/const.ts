import type { NodeKey } from "./types.ts";

/** mySigen-inspired default palette (from the app's own power/energy charts).
 * Confirm against your own app screenshots and override via `colors:` in the
 * card config if you want an exact match. */
export const DEFAULT_COLORS: Record<NodeKey, string> = {
  solar: "#F5B400", // yellow / amber
  battery: "#4FC3F7", // light blue
  grid: "#1A56C4", // dark blue
  load: "#8E5FD6", // purple
};

export const PERIOD_LABELS: Record<string, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  year: "Year",
};

export const PERIODS = ["day", "week", "month", "year"] as const;
