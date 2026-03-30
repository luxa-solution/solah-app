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
    title: "Rukuʿ (Bowing)",
    instruction: { en: "Hands on knees, back straight; relax in this position." },
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ ٱلْعَظِيمِ",
        transliteration: "Subḥāna rabbiyal-ʿAẓīm (×3 or more)",
        translation: { en: "Glory be to my Lord, the Magnificent." },
        media: { image: stepImages.ruku, audio: commonAudios.ruku },
      },
      {
        arabicText: "سُبْحَانَكَ ٱللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، ٱللَّهُمَّ ٱغْفِرْ لِي",
        transliteration: "Subḥānakallāhumma rabbanā wa biḥamdik, Allāhumma’ghfir lī",
        translation: { en: "Optional: O Allah forgive me." },
        media: { image: stepImages.ruku, audio: commonAudios.rukuExtra },
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
