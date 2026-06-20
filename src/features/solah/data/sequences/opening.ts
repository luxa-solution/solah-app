import type { SolahItem } from "@/features-solah/types";

import { commonAudios, stepImages } from "../media";

export type SequenceItemInput = Omit<SolahItem, "id" | "solah">;

export const openingSequence: SequenceItemInput[] = [
  {
    title: "Standing Facing the Qiblah",
    instruction: { en: "Stand facing the Qiblah with calm focus." },
    entries: [
      {
        arabicText: "لا يوجد شيء لتلاوته",
        transliteration: "Nothing to recite",
        translation: { en: "Intend the prayer in your heart and stand upright." },
        media: { image: stepImages.qiyam },
      },
    ],
  },
  {
    title: "Opening Takbir (Takbirat al-Ihram)",
    instruction: { en: "Raise hands to shoulder/ear level and say the takbir." },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: { en: "Allah is the Greatest." },
        media: { image: stepImages.qiyam, audio: commonAudios.takbir },
      },
    ],
  },
  {
    title: "Opening Supplication",
    instruction: { en: "Place right hand over left on the chest and recite." },
    entries: [
      {
        arabicText:
          "سُبْحَانَكَ ٱللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ ٱسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ",
        transliteration:
          "Subḥānakallāhumma wa biḥamdik, wa tabārakasmuk, wa taʿālā jadduk, wa lā ilāha ghayruk",
        translation: { en: "Opening supplication." },
        media: { image: stepImages.qiyam, audio: commonAudios.openingDua },
      },
    ],
  },
];
