import { stepImages } from "../media";

import { SequenceItemInput } from "./opening";

export type SurahKey = "Ikhlas" | "Kafirun" | "Falaq" | "Nas" | "Asr";

interface ShortSurah {
  title: string;
  arabicText: string;
  transliteration: string;
  translation: {
    en: string;
  };
}

export const shortSurahs: Record<SurahKey, ShortSurah> = {
  Ikhlas: {
    title: "Surah Al-Ikhlas",

    arabicText:
      "قُلْ هُوَ اللَّهُ أَحَدٌ\nاللَّهُ الصَّمَدُ\nلَمْ يَلِدْ وَلَمْ يُولَدْ\nوَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",

    transliteration:
      "Qul huwa Allāhu aḥad\nAllāhuṣ-Ṣamad\nLam yalid wa lam yūlad\nWa lam yakun lahu kufuwan aḥad",

    translation: {
      en: "Say: He is Allah, the One. Allah, the Self-Sufficient. He neither begets nor is born. And there is none comparable to Him.",
    },
  },

  Kafirun: {
    title: "Surah Al-Kafirun",

    arabicText:
      "قُلْ يَا أَيُّهَا الْكَافِرُونَ\nلَا أَعْبُدُ مَا تَعْبُدُونَ\nوَلَا أَنْتُمْ عَابِدُونَ مَا أَعْبُدُ\nلَكُمْ دِينُكُمْ وَلِيَ دِينِ",

    transliteration:
      "Qul yā ayyuhal-kāfirūn\nLā aʿbudu mā taʿbudūn\nWa lā antum ʿābidūna mā aʿbud\nLakum dīnukum wa liya dīn",

    translation: {
      en: "Say: O disbelievers. I do not worship what you worship. For you is your religion, and for me is my religion.",
    },
  },

  Falaq: {
    title: "Surah Al-Falaq",

    arabicText:
      "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ\nمِنْ شَرِّ مَا خَلَقَ\nوَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ\nوَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ\nوَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",

    transliteration:
      "Qul aʿūdhu bi Rabbil-falaq\nMin sharri mā khalaq\nWa min sharri ghāsiqin idhā waqab\nWa min sharrin-naffāthāti fil-ʿuqad\nWa min sharri ḥāsidin idhā ḥasad",

    translation: {
      en: "Say: I seek refuge with the Lord of the daybreak from the evil of what He created, and from the evil of darkness when it settles, and from the evil of those who blow on knots, and from the evil of the envier when he envies.",
    },
  },

  Nas: {
    title: "Surah An-Nas",

    arabicText:
      "قُلْ أَعُوذُ بِرَبِّ النَّاسِ\nمَلِكِ النَّاسِ\nإِلَهِ النَّاسِ\nمِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ\nالَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ\nمِنَ الْجِنَّةِ وَالنَّاسِ",

    transliteration:
      "Qul aʿūdhu bi Rabbin-nās\nMalikin-nās\nIlāhin-nās\nMin sharril-waswāsil-khannās\nAlladhī yuwaswisu fī ṣudūrin-nās\nMinal-jinnati wan-nās",

    translation: {
      en: "Say: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the evil of the whisperer who withdraws, who whispers into the hearts of mankind, from among jinn and mankind.",
    },
  },

  Asr: {
    title: "Surah Al-Asr",

    arabicText:
      "وَالْعَصْرِ\nإِنَّ الْإِنْسَانَ لَفِي خُسْرٍ\nإِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ\nوَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",

    transliteration:
      "Wal-ʿaṣr\nInnal-insāna lafī khusr\nIllalla dhīna āmanū wa ʿamiluṣ-ṣāliḥāt\nWa tawāṣaw bil-ḥaqqi wa tawāṣaw biṣ-ṣabr",

    translation: {
      en: "By time. Indeed mankind is in loss, except those who believe, do righteous deeds, encourage truth and encourage patience.",
    },
  },
};

export function buildShortSurah(key: SurahKey): SequenceItemInput {
  const surah = shortSurahs[key];

  return {
    title: `Recitation: ${surah.title}`,
    instruction: {
      en: "Recite a short surah after Al-Fatihah.",
    },
    entries: [
      {
        arabicText: surah.arabicText,
        transliteration: surah.transliteration,
        translation: surah.translation,
        media: {
          image: stepImages.qiyam,
        },
      },
    ],
  };
}
