import { adhkarImages } from "./adhkar-images";
import type { AdhkarGroup } from "./types";

export const adhkarBefore: AdhkarGroup = {
  type: "before",
  items: [
    {
      id: "1",
      type: "before",
      title: "When performing ablution (Wudu)",
      illustration: adhkarImages.ablution,
      tags: ["ablution"],
      entries: [
        {
          arabicText: "بِسْمِ اللَّهِ",
          transliteration: "Bismillāh",
          translation: { en: "In the name of Allah." },
        },
      ],
    },
    {
      id: "2",
      type: "before",
      title: "After completing ablution",
      illustration: adhkarImages.ablution,
      tags: ["ablution"],
      entries: [
        {
          arabicText:
            "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
          transliteration:
            "Ashhadu an lā ilāha illā Allāh waḥdahu lā sharīka lah, wa ashhadu anna Muḥammadan ‘abduhu wa rasūluh",
          translation: {
            en: "I bear witness that there is no deity but Allah alone, with no partner, and I bear witness that Muhammad is His servant and Messenger.",
          },
        },
        {
          arabicText:
            "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
          transliteration: "Allāhumma aj‘alnī mina at-tawwābīn, waj‘alnī mina al-mutaṭahhirīn",
          translation: {
            en: "O Allah, make me among those who constantly repent and those who purify themselves.",
          },
        },
      ],
    },
    {
      id: "3",
      type: "before",
      title: "When leaving for the mosque",
      illustration: adhkarImages.ablution,
      tags: ["walking"],
      entries: [
        {
          arabicText:
            "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا...",
          transliteration:
            "Allāhumma aj‘al fī qalbī nūran, wa fī lisānī nūran, wa fī sam‘ī nūran, wa fī baṣarī nūran...",
          translation: {
            en: "O Allah, place light in my heart, light on my tongue, light in my hearing, and light in my sight...",
          },
        },
      ],
    },
    {
      id: "4",
      type: "before",
      title: "Upon entering the mosque",
      illustration: adhkarImages.ablution,
      tags: ["mosque_before"],
      entries: [
        {
          arabicText: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
          transliteration: "Allāhumma iftaḥ lī abwāba raḥmatik",
          translation: { en: "O Allah, open for me the doors of Your mercy." },
        },
      ],
    },
    {
      id: "5",
      type: "before",
      title: "After the Adhaan (Call to Prayer)",
      illustration: adhkarImages.prostration,
      tags: ["adhan"],
      entries: [
        {
          arabicText:
            "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
          transliteration:
            "Allāhumma rabba hādhihi ad-da‘wati at-tāmmah, waṣ-ṣalāti al-qā’imah, āti Muḥammadan al-wasīlah wa al-faḍīlah, wab‘ath-hu maqāman maḥmūdan alladhī wa‘adtah",
          translation: {
            en: "O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and virtue, and raise him to the honored station You have promised him.",
          },
        },
      ],
    },
    {
      id: "6",
      type: "before",
      title: "When leaving the house",
      cardTitle: "Leave Home",
      illustration: adhkarImages.ablution,
      tags: ["walking"],
      entries: [
        {
          arabicText:
            "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
          transliteration:
            "Bismillāh, tawakkaltu ʿalā Allāh, wa lā ḥawla wa lā quwwata illā billāh",
          translation: {
            en: "In the name of Allah, I place my trust in Allah, and there is no power nor might except with Allah.",
          },
        },
      ],
    },
  ],
};

export const totalAdhkarBefore = adhkarBefore.items.length;
