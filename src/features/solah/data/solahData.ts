// src/features/solah/data/solahData.ts

import type { SolahGroup, SolahName } from "@/features-solah/types";

import { buildSolahGuide } from "./sequences";

export const fajrGuide: SolahGroup = buildSolahGuide("Subhi", 2, "Dawn solah");

export const dhuhrGuide: SolahGroup = buildSolahGuide("Dhuhr", 4, "Midday solah");

export const asrGuide: SolahGroup = buildSolahGuide("Asr", 4, "Afternoon solah");

export const maghribGuide: SolahGroup = buildSolahGuide("Maghrib", 3, "Evening solah");

export const ishaGuide: SolahGroup = buildSolahGuide("Isha", 4, "Night solah");

// FINAL EXPORTS (same as before)
export const solahGuides: Record<SolahName, SolahGroup> = {
  Subhi: fajrGuide,
  Dhuhr: dhuhrGuide,
  Asr: asrGuide,
  Maghrib: maghribGuide,
  Isha: ishaGuide,
};

export const solahNames: SolahName[] = ["Subhi", "Dhuhr", "Asr", "Maghrib", "Isha"];
