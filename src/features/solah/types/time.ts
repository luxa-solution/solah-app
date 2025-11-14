import { SolahName } from "./enum";

export interface SolahTime {
  title: SolahName;
  time: string; // formatted time string shown in UI (e.g. "05:12" or "5:12 AM")
}

export const ADHAN_TO_SOLAH_MAP: Record<string, SolahName> = {
  fajr: "Subhi",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
};

// export enum CalculationMethod {
//   MuslimWorldLeague = "MuslimWorldLeague",
//   Egyptian = "Egyptian",
//   Karachi = "Karachi",
//   UmmAlQura = "UmmAlQura",
//   Dubai = "Dubai",
//   Qatar = "Qatar",
//   Kuwait = "Kuwait",
//   MoonsightingCommittee = "MoonsightingCommittee",
//   Singapore = "Singapore",
//   Turkey = "Turkey",
//   Tehran = "Tehran",
//   NorthAmerica = "NorthAmerica",
//   Other = "Other",
// }

export type CalculationMethodTypes =
  | "MuslimWorldLeague"
  | "Egyptian"
  | "Karachi"
  | "UmmAlQura"
  | "Dubai"
  | "Qatar"
  | "Kuwait"
  | "MoonsightingCommittee"
  | "Singapore"
  | "Turkey"
  | "Tehran"
  | "NorthAmerica"
  | "Other";
