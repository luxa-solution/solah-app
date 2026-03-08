// src/features/solah/data/media/solahImages.ts

import { SolahName } from "@/features-solah/types";

export const stepImages = {
  qiyam: require("@/assets/solah/fajr/step-1-qiyam.png"),
  ruku: require("@/assets/solah/fajr/step-2-ruku.png"),
  afterRuku: require("@/assets/solah/fajr/step-3-afterRuku.png"),
  sujud: require("@/assets/solah/fajr/step-4-sujud.png"),
  jalsah: require("@/assets/solah/fajr/step-5-jalsah.png"),
  tashahhud: require("@/assets/solah/fajr/step-6-tashahhud.png"),
} as const;

export const guideIllustrations: Record<SolahName, any> = {
  Subhi: require("@/assets/guide-illustrations/Fajr.png"),
  Dhuhr: require("@/assets/guide-illustrations/Dhuhr.png"),
  Asr: require("@/assets/guide-illustrations/Asr.png"),
  Maghrib: require("@/assets/guide-illustrations/Magrib.png"),
  Isha: require("@/assets/guide-illustrations/Asr.png"), // you had Asr.png for Isha; keep or change later
};
