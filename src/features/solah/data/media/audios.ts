// src/features/solah/data/media/solahAudios.ts

import { SolahName } from "@/features-solah/types";

export const commonAudios = {
  takbir: "/audio/solah/common/takbir.mp3",
  taawwudh: "/audio/solah/common/taawwudh.mp3",
  fatiha: "/audio/solah/common/fatiha.mp3",
  amin: "/audio/solah/common/amin.mp3",
  ruku: "/audio/solah/common/ruku.mp3",
  tasmi: "/audio/solah/common/tasmi.mp3",
  tahmid: "/audio/solah/common/tahmid.mp3",
  sujud: "/audio/solah/common/sujud.mp3",
  jalsah: "/audio/solah/common/jalsah.mp3",
  tashahhud: "/audio/solah/common/tashahhud.mp3",
  salawat: "/audio/solah/common/salawat.mp3",
  fourThings: "/audio/solah/common/4-things.mp3",
  tasleemRight: "/audio/solah/common/tasleem-right.mp3",
  tasleemLeft: "/audio/solah/common/tasleem-left.mp3",

  // Optional extras (only if you actually have them)
  openingDua: "/audio/solah/common/opening-dua.mp3",
  rukuExtra: "/audio/solah/common/ruku-extra.mp3",
  sujudExtra: "/audio/solah/common/sujud-extra.mp3",
  qawmahHamd: "/audio/solah/common/qawmah-hamd.mp3",
} as const;

// Per-solah recitation files (you already have these paths in your current guides)
export const specificAudios: Record<SolahName, { qiyamFatiha: string }> = {
  Subhi: { qiyamFatiha: "/audio/solah/fajr/qiyam-fatiha.mp3" },
  Dhuhr: { qiyamFatiha: "/audio/solah/dhuhr/qiyam-fatiha.mp3" },
  Asr: { qiyamFatiha: "/audio/solah/asr/qiyam-fatiha.mp3" },
  Maghrib: { qiyamFatiha: "/audio/solah/maghrib/qiyam-fatiha.mp3" },
  Isha: { qiyamFatiha: "/audio/solah/isha/qiyam-fatiha.mp3" },
};
