// src/features/solah/data/sequences/solahSequences.ts

import type { SolahGroup, SolahItem, SolahName } from "@/features-solah/types";

import { guideIllustrations, stepImages, commonAudios, specificAudios } from "./media";

type ItemInput = Omit<SolahItem, "id" | "solah">;

function withIdPrefix(solah: SolahName, prefix: string, items: ItemInput[]): SolahItem[] {
  return items.map((it, idx) => ({
    ...it,
    id: `${prefix}-${idx + 1}`,
    solah,
  }));
}

const openingSequence: ItemInput[] = [
  {
    title: "Standing Facing the Qiblah",
    instruction: { en: "Stand facing the Qiblah with calm focus." },
    entries: [
      {
        arabicText: "",
        transliteration: "",
        translation: { en: "Intend the prayer in your heart and stand upright." },
      },
    ],
  },
  {
    title: "Opening Takbīr (Takbīrat al-Iḥrām)",
    instruction: { en: "Raise hands to shoulder/ear level and say the takbīr." },
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

function qiyamCore(solah: SolahName): ItemInput[] {
  return [
    {
      title: "Seeking Refuge (Taʿawwudh)",
      instruction: { en: "Seek refuge from Shayṭān before recitation." },
      entries: [
        {
          arabicText: "أَعُوذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
          transliteration: "Aʿūdhu billāhi minash-shayṭānir-rajīm",
          translation: { en: "I seek refuge in Allah from the accursed devil." },
          media: { image: stepImages.qiyam, audio: commonAudios.taawwudh },
        },
      ],
    },
    {
      title: "Recitation: Sūrat al-Fātiḥah",
      instruction: { en: "Recite al-Fātiḥah calmly." },
      entries: [
        {
          arabicText: "بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ …",
          transliteration: "Bismillāhir-Raḥmānir-Raḥīm …",
          translation: { en: "Sūrat al-Fātiḥah." },
          media: { image: stepImages.qiyam, audio: specificAudios[solah].qiyamFatiha },
        },
      ],
    },
    {
      title: "Āmīn",
      instruction: { en: "Say Āmīn after al-Fātiḥah." },
      entries: [
        {
          arabicText: "آمِينَ",
          transliteration: "Āmīn",
          translation: { en: "O Allah, accept." },
          media: { image: stepImages.qiyam, audio: commonAudios.amin },
        },
      ],
    },
    {
      title: "Recitation: Short Sūrah",
      instruction: { en: "Recite a short sūrah or verses after al-Fātiḥah." },
      entries: [
        {
          arabicText: "",
          transliteration: "",
          translation: { en: "Recite a convenient portion from the Qur’an." },
          media: { image: stepImages.qiyam },
        },
      ],
    },
  ];
}

const rukuSequence: ItemInput[] = [
  {
    title: "Going for Rukūʿ",
    instruction: { en: "Say the takbīr and bow." },
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
    title: "Rukūʿ (Bowing)",
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

const afterRukuSequence: ItemInput[] = [
  {
    title: "Rising from Rukūʿ",
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

const sujoodBlock: ItemInput[] = [
  {
    title: "Going for Sujūd",
    instruction: { en: "Say the takbīr and go to prostration." },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: { en: "Allah is the Greatest." },
        media: { image: stepImages.sujud, audio: commonAudios.takbir },
      },
    ],
  },
  {
    title: "1st Sujūd (Prostration)",
    instruction: { en: "Prostrate on seven points; relax in this position." },
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ ٱلْأَعْلَى",
        transliteration: "Subḥāna rabbiyal-Aʿlā (×3 or more)",
        translation: { en: "Glory be to my Lord, the Most High." },
        media: { image: stepImages.sujud, audio: commonAudios.sujud },
      },
      {
        arabicText: "سُبْحَانَكَ ٱللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، ٱللَّهُمَّ ٱغْفِرْ لِي",
        transliteration: "Subḥānakallāhumma rabbanā wa biḥamdik, Allāhumma’ghfir lī",
        translation: { en: "Optional: O Allah forgive me." },
        media: { image: stepImages.sujud, audio: commonAudios.sujudExtra },
      },
    ],
  },
  {
    title: "Sitting (Between Sujūd)",
    instruction: { en: "Sit briefly between the two prostrations." },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: { en: "Allah is the Greatest." },
        media: { image: stepImages.jalsah, audio: commonAudios.takbir },
      },
      {
        arabicText:
          "رَبِّ ٱغْفِرْ لِي، وَٱرْحَمْنِي، وَٱهْدِنِي، وَٱرْزُقْنِي، وَعَافِنِي، وَٱجْبُرْنِي",
        transliteration: "Rabbi’ghfir lī, warḥamnī, wahdinī, warzuqnī, wa ʿāfinī, wajburnī",
        translation: {
          en: "My Lord, forgive me, have mercy on me, guide me, provide for me, grant me well-being, and set my affairs right.",
        },
        media: { image: stepImages.jalsah, audio: commonAudios.jalsah },
      },
    ],
  },
  {
    title: "2nd Sujūd (Prostration)",
    instruction: { en: "Prostrate again and glorify Allah." },
    entries: [
      {
        arabicText: "ٱللّٰهُ أَكْبَر",
        transliteration: "Allāhu Akbar",
        translation: { en: "Allah is the Greatest." },
        media: { image: stepImages.sujud, audio: commonAudios.takbir },
      },
      {
        arabicText: "سُبْحَانَ رَبِّيَ ٱلْأَعْلَى",
        transliteration: "Subḥāna rabbiyal-Aʿlā (×3 or more)",
        translation: { en: "Glory be to my Lord, the Most High." },
        media: { image: stepImages.sujud, audio: commonAudios.sujud },
      },
    ],
  },
];

const firstTashahhud: ItemInput[] = [
  {
    title: "First Tashahhud",
    instruction: { en: "Sit and recite tashahhud (after 2 rakaʿāt)." },
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
    instruction: { en: "Say the takbīr and stand for the next rakaʿah." },
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

const finalSitting: ItemInput[] = [
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
    title: "Ṣalawāt on the Prophet ﷺ",
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
    title: "Supplication (Duʿāʾ)",
    instruction: { en: "You may supplicate for anything good." },
    entries: [
      {
        arabicText: "",
        transliteration: "",
        translation: { en: "Make personal duʿāʾ in your own words." },
        media: { image: stepImages.tashahhud },
      },
    ],
  },
  {
    title: "Taslīm – Right",
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
    title: "Taslīm – Left",
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

function buildRakaah1(solah: SolahName): ItemInput[] {
  return [
    ...openingSequence,
    ...qiyamCore(solah),
    ...rukuSequence,
    ...afterRukuSequence,
    ...sujoodBlock,
  ];
}

function buildRakaahN(solah: SolahName): ItemInput[] {
  return [...qiyamCore(solah), ...rukuSequence, ...afterRukuSequence, ...sujoodBlock];
}

export function buildSolahGuide(
  solah: SolahName,
  rakaat: 2 | 3 | 4,
  descriptionEn: string
): SolahGroup {
  const items: SolahItem[] = [];

  // Rakaah 1
  items.push(...withIdPrefix(solah, "r1", buildRakaah1(solah)));

  // Rakaah 2
  const r2 = buildRakaahN(solah);

  if (rakaat === 2) {
    items.push(...withIdPrefix(solah, "r2", [...r2, ...finalSitting]));
  } else {
    items.push(...withIdPrefix(solah, "r2", [...r2, ...firstTashahhud]));
  }

  if (rakaat === 3) {
    items.push(...withIdPrefix(solah, "r3", [...buildRakaahN(solah), ...finalSitting]));
  }

  if (rakaat === 4) {
    items.push(...withIdPrefix(solah, "r3", buildRakaahN(solah)));
    items.push(...withIdPrefix(solah, "r4", [...buildRakaahN(solah), ...finalSitting]));
  }

  return {
    solah,
    description: { en: descriptionEn },
    illustration: guideIllustrations[solah],
    rakaat,
    items,
  };
}
