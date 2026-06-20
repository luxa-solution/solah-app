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
    title: "Final Tashahhud",
    instruction: {
      en: "Sit and recite the final tashahhud.",
    },
    entries: [
      {
        arabicText:
          "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration: "At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt...",
        translation: {
          en: "All greetings, prayers and good things are for Allah. Peace be upon you O Prophet, and Allah's mercy and blessings. Peace be upon us and the righteous servants of Allah. I testify there is no deity worthy of worship except Allah and Muhammad is His servant and Messenger.",
        },
        media: {
          image: stepImages.tashahhud,
          audio: commonAudios.tashahhud,
        },
      },
    ],
  },
  {
    title: "Salawat Ibrahimiyyah",
    instruction: {
      en: "Send prayers upon the Prophet ﷺ.",
    },
    entries: [
      {
        arabicText: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ",
        transliteration: "Allāhumma ṣalli ʿalā Muḥammad wa ʿalā āli Muḥammad",
        translation: {
          en: "O Allah, send prayers upon Muhammad and the family of Muhammad.",
        },
        media: {
          image: stepImages.tashahhud,
          audio: commonAudios.salawat,
        },
      },
    ],
  },
];
