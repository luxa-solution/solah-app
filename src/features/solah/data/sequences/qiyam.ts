import { SolahName } from "@/features-solah/types";

import { stepImages, commonAudios, specificAudios } from "../media";

import { SequenceItemInput } from "./opening";
import { buildShortSurah } from "./surahs";

export function qiyamCore(solah: SolahName): SequenceItemInput[] {
  return [
    {
      title: "Seeking Refuge",
      instruction: {
        en: "Seek refuge with Allah from Shaytan.",
      },
      entries: [
        {
          arabicText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
          transliteration: "Aʿūdhu billāhi minash-shayṭānir-rajīm",
          translation: {
            en: "I seek refuge in Allah from the accursed devil.",
          },
          media: {
            image: stepImages.qiyam,
            audio: commonAudios.taawwudh,
          },
        },
      ],
    },
    {
      title: "Bismillah",
      instruction: {
        en: "Say Bismillah before reciting Al-Fatihah.",
      },
      entries: [
        {
          arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          transliteration: "Bismillāhir-Raḥmānir-Raḥīm",
          translation: {
            en: "In the Name of Allah, the Most Gracious, the Most Merciful.",
          },
          media: {
            image: stepImages.qiyam,
          },
        },
      ],
    },
    {
      title: "Surah Al-Fatihah",
      instruction: { en: "Recite Surah Al-Fatihah." },
      entries: [
        {
          arabicText:
            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ\nالرَّحْمَٰنِ الرَّحِيمِ\nمَالِكِ يَوْمِ الدِّينِ\nإِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ\nاهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ\nصِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ\nغَيْرِ الْمَغْضُوبِ عَلَيْهِمْ\nوَلَا الضَّالِّينَ",
          transliteration:
            "Bismillāhir-Raḥmānir-Raḥīm\nAl-ḥamdu lillāhi Rabbil-ʿālamīn\nAr-Raḥmānir-Raḥīm\nMāliki Yawmid-Dīn\nIyyāka naʿbudu wa iyyāka nastaʿīn\nIhdinaṣ-ṣirāṭal-mustaqīm\nṢirāṭalla dhīna anʿamta ʿalayhim\nGhayril-maghḍūbi ʿalayhim\nWa laḍ-ḍāllīn",
          translation: {
            en: "All praise belongs to Allah, the Lord of all creation.\nHe is the Most Merciful, the Especially Merciful.\nHe is the Owner and Judge of the Day of Recompense.\nWe worship Him alone and seek His help alone.\nWe ask Him to guide us to the straight path;\nthe path of those whom He has blessed,\nnot the path of those who earned His anger,\nnor those who went astray.",
          },
          media: {
            image: stepImages.qiyam,
            audio: specificAudios[solah].qiyamFatiha,
          },
        },
      ],
    },
    {
      title: "Amin",
      instruction: {
        en: "Say Amin after Al-Fatihah.",
      },
      entries: [
        {
          arabicText: "آمِين",
          transliteration: "Āmīn",
          translation: {
            en: "O Allah, accept.",
          },
          media: {
            image: stepImages.qiyam,
            audio: commonAudios.amin,
          },
        },
      ],
    },
    { ...buildShortSurah("Ikhlas") },
  ];
}

export function qiyamShort(solah: SolahName): SequenceItemInput[] {
  return [
    {
      title: "Standing for Rakaah",
      instruction: {
        en: "Stand and recite Al-Fatihah.",
      },
      entries: [
        {
          arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
          transliteration: "Bismillāhir-Raḥmānir-Raḥīm",
          translation: {
            en: "In the Name of Allah, the Most Gracious, the Most Merciful.",
          },
          media: {
            image: stepImages.qiyam,
          },
        },
      ],
    },
    {
      title: "Surah Al-Fatihah",
      instruction: {
        en: "Recite Surah Al-Fatihah.",
      },
      entries: [
        {
          arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          transliteration: "Al-ḥamdu lillāhi rabbil-ʿālamīn",
          translation: {
            en: "All praise and thanks are for Allah, the Lord of all that exists.",
          },
          media: {
            image: stepImages.qiyam,
            audio: specificAudios[solah].qiyamFatiha,
          },
        },
      ],
    },
    {
      title: "Amin",
      instruction: {
        en: "Say Amin.",
      },
      entries: [
        {
          arabicText: "آمِين",
          transliteration: "Āmīn",
          translation: {
            en: "O Allah, accept.",
          },
          media: {
            image: stepImages.qiyam,
            audio: commonAudios.amin,
          },
        },
      ],
    },
  ];
}
