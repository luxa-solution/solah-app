import { AdhkarGroup } from "@/features-adhkar/types";

import { adhkarImages } from "./adhkar-images";

export const adhkarBefore: AdhkarGroup = {
  type: "before",
  items: [
    {
      id: "b1_ablution",
      type: "before",
      title: "Supplications for Ablution (Wudu)",
      cardTitle: "Ablution (Wudu)",
      illustration: adhkarImages.ablution,
      tags: ["ablution", "wudu", "primary"],
      entries: [
        {
          arabicText: "بِسْمِ اللَّهِ",
          transliteration: "Bismillāh",
          translation: { en: "In the name of Allah." },
          audio: "/audio/adhkar/169.mp3",
          reference: { source: "Irwa'ul-Ghalil 1/122, Ibn Majah: 397", grade: "sahih" },
          sourceId: 169,
        },
        {
          arabicText:
            "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
          transliteration:
            "Ashhadu an lā ilāha illā Allāh waḥdahu lā sharīka lah, wa ashhadu anna Muḥammadan ‘abduhu wa rasūluh",
          translation: {
            en: "I bear witness that there is no deity but Allah alone, with no partner, and I bear witness that Muhammad is His servant and Messenger.",
          },
          audio: "/audio/adhkar/170.mp3",
          reference: { source: "Muslim: 234, 576", grade: "sahih" },
          sourceId: 170,
        },
        {
          arabicText:
            "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
          transliteration: "Allāhumma aj‘alnī mina at-tawwābīn, waj‘alnī mina al-mutaṭahhirīn",
          translation: {
            en: "O Allah, make me among those who constantly repent and those who purify themselves.",
          },
          audio: "/audio/adhkar/171.mp3",
          reference: { source: "Tirmidhi: 55", grade: "sahih" },
          sourceId: 171,
        },
      ],
    },
    {
      id: "b2_walking_mosque",
      type: "before",
      title: "Leaving home & walking to the Mosque",
      cardTitle: "Going to Mosque",
      illustration: adhkarImages.ablution,
      tags: ["walking", "leaving_home", "mosque"],
      entries: [
        {
          arabicText:
            "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
          transliteration:
            "Bismillāh, tawakkaltu ʿalā Allāh, wa lā ḥawla wa lā quwwata illā billāh",
          translation: {
            en: "In the name of Allah, I place my trust in Allah, and there is no power nor might except with Allah.",
          },
          audio: "/audio/adhkar/154.mp3",
          reference: { source: "Abu Dawud: 5095", grade: "sahih" },
          sourceId: 154,
        },
        {
          arabicText:
            "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا...",
          transliteration:
            "Allāhumma aj‘al fī qalbī nūran, wa fī lisānī nūran, wa fī sam‘ī nūran, wa fī baṣarī nūran...",
          translation: {
            en: "O Allah, place light in my heart, light on my tongue, light in my hearing, and light in my sight...",
          },
          audio: "/audio/adhkar/173.mp3",
          reference: { source: "Bukhari: 6316", grade: "sahih" },
          sourceId: 173,
        },
      ],
    },
    {
      id: "b3_entering_mosque",
      type: "before",
      title: "Upon entering the Mosque",
      cardTitle: "Entering Mosque",
      illustration: adhkarImages.ablution,
      tags: ["mosque_before", "entering", "primary"],
      entries: [
        {
          arabicText: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
          transliteration: "Allāhumma iftaḥ lī abwāba raḥmatik",
          translation: { en: "O Allah, open for me the doors of Your mercy." },
          audio: "/audio/adhkar/175.mp3",
          reference: { source: "Abu Dawud: 465, Muslim: 713", grade: "sahih" },
          sourceId: 175,
        },
      ],
    },
    {
      id: "b4_after_adhan",
      type: "before",
      title: "Supplication after the Adhaan",
      cardTitle: "After Adhaan",
      illustration: adhkarImages.prostration,
      tags: ["adhan", "supplication", "primary"],
      entries: [
        {
          arabicText:
            "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
          transliteration:
            "Allāhumma rabba hādhihi ad-da‘wati at-tāmmah, waṣ-ṣalāti al-qā’imah, āti Muḥammadan al-wasīlah wa al-faḍīlah, wab‘ath-hu maqāman maḥmūdan alladhī wa‘adtah",
          translation: {
            en: "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and virtue, and raise him to the honored station You have promised him.",
          },
          audio: "/audio/adhkar/165.mp3",
          reference: { source: "Bukhari: 614", grade: "sahih" },
          sourceId: 165,
        },
      ],
    },
  ],
};

export const totalAdhkarBefore = adhkarBefore.items.length;
