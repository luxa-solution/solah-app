import { commonAudios, stepImages } from "../media";

import { SequenceItemInput } from "./opening";

export const firstTashahhud: SequenceItemInput[] = [
  {
    title: "First Tashahhud",
    instruction: { en: "Sit and recite tashahhud (after 2 rakaʿat)." },
    entries: [
      {
        arabicText:
          "ٱلتَّحِيَّاتُ لِلَّهِ وَٱلصَّلَوَاتُ وَٱلطَّيِّبَاتُ… أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ…",
        transliteration: "At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt…",
        translation: { en: "Tashahhud (testimony and greetings)." },
        media: { image: stepImages.tashahhud, audio: commonAudios.tashahhud },
      },
    ],
  },
  {
    title: "Standing for Next Rakaʿah",
    instruction: { en: "Say the takbir and stand for the next rakaʿah." },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: { en: "Allah is the Greatest." },
        media: { image: stepImages.qiyam, audio: commonAudios.takbir },
      },
    ],
  },
];

export const finalSitting: SequenceItemInput[] = [
  {
    title: "Final Sitting (Tashahhud)",
    instruction: { en: "In the final sitting, recite tashahhud." },
    entries: [
      {
        arabicText:
          "ٱلتَّحِيَّاتُ لِلَّهِ وَٱلصَّلَوَاتُ وَٱلطَّيِّبَاتُ… أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ…",
        transliteration: "At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt…",
        translation: { en: "Tashahhud (testimony and greetings)." },
        media: { image: stepImages.tashahhud, audio: commonAudios.tashahhud },
      },
    ],
  },
  {
    title: "Salawat on the Prophet ﷺ",
    instruction: { en: "Send salutation upon the Prophet ﷺ." },
    entries: [
      {
        arabicText: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ…",
        transliteration: "Allāhumma ṣalli ʿalā Muḥammad…",
        translation: { en: "Salutations upon the Prophet ﷺ." },
        media: { image: stepImages.tashahhud, audio: commonAudios.salawat },
      },
    ],
  },
  {
    title: "Seeking Refuge from Four Things",
    instruction: { en: "Seek protection from four trials and punishments." },
    entries: [
      {
        arabicText: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ…",
        transliteration: "Allāhumma innī aʿūdhu bika min ʿadhābi jahannam…",
        translation: { en: "O Allah, I seek refuge in You from..." },
        media: { image: stepImages.tashahhud, audio: commonAudios.fourThings },
      },
    ],
  },
  {
    title: "Supplication (Duʿaʾ)",
    instruction: { en: "You may supplicate for anything good." },
    entries: [
      {
        arabicText: "",
        transliteration: "",
        translation: { en: "Make personal duʿaʾ in your own words." },
        media: { image: stepImages.tashahhud },
      },
    ],
  },
  {
    title: "Taslim – Right",
    instruction: { en: "Turn to the right and say:" },
    entries: [
      {
        arabicText: "ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ",
        transliteration: "As-salāmu ʿalaykum wa raḥmatullāh",
        translation: { en: "Peace and mercy of Allah be upon you." },
        media: { image: stepImages.tashahhud, audio: commonAudios.tasleemRight },
      },
    ],
  },
  {
    title: "Taslim – Left",
    instruction: { en: "Turn to the left and repeat:" },
    entries: [
      {
        arabicText: "ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّهِ",
        transliteration: "As-salāmu ʿalaykum wa raḥmatullāh",
        translation: { en: "Peace and mercy of Allah be upon you." },
        media: { image: stepImages.tashahhud, audio: commonAudios.tasleemLeft },
      },
    ],
  },
];
