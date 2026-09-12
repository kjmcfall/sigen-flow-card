// Shared types for the Sigen Flow Card.

export type Period = "day" | "week" | "month" | "year";

export type NodeKey = "solar" | "battery" | "grid" | "load";

/** The six raw period totals (kWh) the card needs, whichever way they were sourced. */
export interface FlowTotals {
  /** Total solar/PV production for the period (kWh). */
  solar: number;
  /** Total energy that went INTO the battery for the period (kWh). */
  batteryCharge: number;
  /** Total energy that came OUT OF the battery for the period (kWh). */
  batteryDischarge: number;
  /** Total energy imported FROM the grid for the period (kWh). */
  gridImport: number;
  /** Total energy exported TO the grid for the period (kWh). */
  gridExport: number;
  /** Total home/load consumption for the period (kWh). If not directly metered,
   * it is derived as solar + batteryDischarge + gridImport - batteryCharge - gridExport. */
  load: number;
  /** Battery state of charge at the end of the period (%), if available. Display-only. */
  batterySoc?: number;
}

/** A single ribbon in the sankey: how much energy moved from one side to the other. */
export interface Flow {
  from: NodeKey;
  to: NodeKey;
  value: number;
  /** true if this flow came from a directly-metered sub-flow sensor rather than the allocation model. */
  measured?: boolean;
}

export interface EntityMapping {
  solar_energy: string;
  battery_charge_energy: string;
  battery_discharge_energy: string;
  grid_import_energy: string;
  grid_export_energy: string;
  /** Optional: if you have a direct load/consumption energy sensor, set this and it will be
   * used instead of deriving load from the other five. */
  load_energy?: string;
  /** Optional: battery state-of-charge sensor (%), shown on the battery node. */
  battery_soc?: string;
}

export interface SigenFlowCardConfig {
  type: string;
  title?: string;
  entities: EntityMapping;
  /** Default period shown when the card first loads. Defaults to "day". */
  default_period?: Period;
  /** Locale-ish: which day the week starts on. 0 = Sunday, 1 = Monday. Defaults to 1. */
  week_start?: 0 | 1;
  /** Override the default mySigen-inspired palette. */
  colors?: Partial<Record<NodeKey, string>>;
  /** Show the small "as of HH:MM" freshness note. Defaults to true. */
  show_updated?: boolean;
}
