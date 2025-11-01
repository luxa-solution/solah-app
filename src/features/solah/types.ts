export type SolahName = "Subhi" | "Dhuhr" | "Asr" | "Maghrib" | "Isha";

export type TimeFormat = "24hr" | "12hr";
export interface SolahTime {
  title: SolahName;
  // formatted time string shown in UI (e.g. "05:12" or "5:12 AM")
  time: string;
  // optional ISO string for exact Date when available
  dateIso?: string | null;
}

/**
 * Map adhan library prayer keys to app SolahName
 */
export const ADHAN_TO_SOLAH_MAP: Record<string, SolahName> = {
  fajr: "Subhi",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
};

/**
 * Calculation methods supported by the app. These names map to the
 * corresponding adhan.CalculationMethod.* factory functions.
 */
export enum CalculationMethodName {
  MuslimWorldLeague = "MuslimWorldLeague",
  Egyptian = "Egyptian",
  Karachi = "Karachi",
  UmmAlQura = "UmmAlQura",
  Dubai = "Dubai",
  Qatar = "Qatar",
  Kuwait = "Kuwait",
  MoonsightingCommittee = "MoonsightingCommittee",
  Singapore = "Singapore",
  Turkey = "Turkey",
  Tehran = "Tehran",
  NorthAmerica = "NorthAmerica",
  Other = "Other",
}

// Backwards-compatible / shared types used elsewhere in the app
// Provide minimal shapes so existing imports keep working.
export type CalendarFormat = string;

// Rich types for guide data
export type Translation = { en?: string; [key: string]: string | undefined };

export type Media = { image?: any; audio?: string };

export type GuideEntry = {
  arabicText?: string;
  transliteration?: string;
  translation?: Translation;
  media?: Media;
};

export type GuideItem = {
  id: string;
  solah: string;
  title: string;
  instruction: Translation;
  entries: GuideEntry[];
};

export type SolahGroup = {
  solah: string;
  description: Translation;
  illustration?: any;
  rakaat?: number;
  items: GuideItem[];
};
