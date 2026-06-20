import { commonAudios, stepImages } from "../media";

import type { SequenceItemInput } from "./opening";

export const sujoodBlock: SequenceItemInput[] = [
  {
    title: "Going into Sujud",
    instruction: {
      en: "Say the takbir and go down into prostration.",
    },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: {
          en: "Allah is the Greatest.",
        },
        media: {
          image: stepImages.sujud,
          audio: commonAudios.takbir,
        },
      },
    ],
  },
  {
    title: "First Sujud (Prostration)",
    instruction: {
      en: "Prostrate on the seven body parts and glorify Allah.",
    },
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ ٱلْأَعْلَى",
        transliteration: "Subḥāna Rabbiyal-Aʿlā (×3 or more)",
        translation: {
          en: "Glory be to my Lord, the Most High.",
        },
        media: {
          image: stepImages.sujud,
          audio: commonAudios.sujud,
        },
      },
      {
        arabicText: "سُبْحَانَكَ ٱللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، ٱللَّهُمَّ ٱغْفِرْ لِي",
        transliteration: "Subḥānakallāhumma rabbanā wa biḥamdik, Allāhumma’ghfir lī",
        translation: {
          en: "Glory be to You, O Allah, our Lord, and praise is Yours. O Allah, forgive me.",
        },
        media: {
          image: stepImages.sujud,
          audio: commonAudios.sujudExtra,
        },
      },
    ],
  },
  {
    title: "Sitting Between the Two Sujud",
    instruction: {
      en: "Rise from sujud saying the takbir and sit calmly.",
    },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: {
          en: "Allah is the Greatest.",
        },
        media: {
          image: stepImages.jalsah,
          audio: commonAudios.takbir,
        },
      },
      {
        arabicText: "رَبِّ ٱغْفِرْ لِي",
        transliteration: "Rabbi’ghfir lī",
        translation: {
          en: "My Lord, forgive me.",
        },
        media: {
          image: stepImages.jalsah,
          audio: commonAudios.jalsah,
        },
      },
      {
        arabicText: "وَٱرْحَمْنِي وَٱهْدِنِي وَٱرْزُقْنِي وَعَافِنِي وَٱجْبُرْنِي",
        transliteration: "Warḥamnī, wahdinī, warzuqnī, wa ʿāfinī, wajburnī",
        translation: {
          en: "Have mercy on me, guide me, provide for me, grant me wellbeing, and repair my affairs.",
        },
        media: {
          image: stepImages.jalsah,
          audio: commonAudios.jalsah,
        },
      },
    ],
  },
  {
    title: "Second Sujud (Prostration)",
    instruction: {
      en: "Say the takbir and prostrate again.",
    },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: {
          en: "Allah is the Greatest.",
        },
        media: {
          image: stepImages.sujud,
          audio: commonAudios.takbir,
        },
      },
      {
        arabicText: "سُبْحَانَ رَبِّيَ ٱلْأَعْلَى",
        transliteration: "Subḥāna Rabbiyal-Aʿlā (×3 or more)",
        translation: {
          en: "Glory be to my Lord, the Most High.",
        },
        media: {
          image: stepImages.sujud,
          audio: commonAudios.sujud,
        },
      },
    ],
  },
  {
    title: "Standing for Next Rakaah",
    instruction: {
      en: "Say the takbir and stand for the next rakaah.",
    },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
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
];
