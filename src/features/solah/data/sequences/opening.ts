import type { SolahItem } from "@/features-solah/types";

import { commonAudios, stepImages } from "../media";

export type SequenceItemInput = Omit<SolahItem, "id" | "solah">;

export const openingSequence: SequenceItemInput[] = [
  {
    title: "Facing the Qiblah & Intention",
    instruction: {
      en: "Stand facing the Qiblah. Make the intention for the prayer in your heart.",
    },
    entries: [
      {
        arabicText: "لا يوجد شيء لتلاوته",
        transliteration: "Nothing to recite",
        translation: {
          en: "The intention is in the heart. Do not pronounce it with the tongue.",
        },
        media: {
          image: stepImages.qiyam,
        },
      },
    ],
  },

  {
    title: "Opening Takbir",
    instruction: {
      en: "Raise your hands to shoulder level and say Takbir.",
    },
    entries: [
      {
        arabicText: "اللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: {
          en: "Allah is the Greatest.",
        },
        media: {
          image: stepImages.qiyam,
          audio: commonAudios.takbir,
        },
      },
    ],
  },

  {
    title: "Placing the Hands",
    instruction: {
      en: "Place the right hand over the left hand on the chest.",
    },
    entries: [
      {
        arabicText: "لا يوجد شيء لتلاوته",
        transliteration: "Nothing to recite",
        translation: {
          en: "Remain calm and focused while standing.",
        },
        media: {
          image: stepImages.qiyam,
        },
      },
    ],
  },
  {
    title: "Opening Supplication",
    instruction: {
      en: "Recite the opening supplication.",
    },
    entries: [
      {
        arabicText:
          "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ",
        transliteration:
          "Subḥānaka Allāhumma wa biḥamdik, wa tabārakasmuk, wa taʿālā jadduk, wa lā ilāha ghayruk",
        translation: {
          en: "Glory is to You, O Allah, and praise is Yours. Blessed is Your Name, Exalted is Your Majesty, and there is no god except You.",
        },
        media: {
          image: stepImages.qiyam,
          audio: commonAudios.openingDua,
        },
      },
    ],
  },
];
