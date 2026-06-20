import { commonAudios, stepImages } from "../media";

import { SequenceItemInput } from "./opening";

export const rukuSequence: SequenceItemInput[] = [
  {
    title: "Going for Rukuʿ",
    instruction: { en: "Say the takbir and bow." },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: { en: "Allah is the Greatest." },
        media: { image: stepImages.ruku, audio: commonAudios.takbir },
      },
    ],
  },
  {
    title: "Ruku Position",
    instruction: {
      en: "Bow with your back straight and place your hands on your knees.",
    },
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subḥāna Rabbiyal-ʿAẓīm",
        translation: {
          en: "Glory be to my Lord, the Most Great.",
        },
        media: {
          image: stepImages.ruku,
          audio: commonAudios.ruku,
        },
      },
    ],
  },
];

export const afterRukuSequence: SequenceItemInput[] = [
  {
    title: "Rising from Rukuʿ",
    instruction: { en: "Rise and say: Samiʿa llāhu liman ḥamidah." },
    entries: [
      {
        arabicText: "سَمِعَ ٱللّٰهُ لِمَنْ حَمِدَهُ",
        transliteration: "Samiʿa llāhu liman ḥamidah",
        translation: { en: "Allah hears those who praise Him." },
        media: { image: stepImages.afterRuku, audio: commonAudios.tasmi },
      },
    ],
  },
  {
    title: "Standing (Qawmah)",
    instruction: { en: "While standing, praise Allah." },
    entries: [
      {
        arabicText: "رَبَّنَا وَلَكَ ٱلْحَمْدُ",
        transliteration: "Rabbanā wa lakal-ḥamd",
        translation: { en: "Our Lord, and to You belongs all praise." },
        media: { image: stepImages.afterRuku, audio: commonAudios.tahmid },
      },
      {
        arabicText: "حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ…",
        transliteration: "Ḥamdan kathīran ṭayyiban mubārakan fīh…",
        translation: { en: "Optional extended praise." },
        media: { image: stepImages.afterRuku, audio: commonAudios.qawmahHamd },
      },
    ],
  },
];
