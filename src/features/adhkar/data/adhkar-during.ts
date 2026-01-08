import { adhkarImages } from "./adhkar-images";
import type { AdhkarGroup } from "./types";

export const adhkarDuring: AdhkarGroup = {
  type: "during",
  items: [
    {
      id: "1",
      type: "during",
      title: "Opening supplication (Du‘ā’ al-Istiftāḥ)",
      illustration: adhkarImages.prostration,
      tags: ["opening"],
      entries: [
        {
          arabicText:
            "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلٰهَ غَيْرُكَ",
          transliteration:
            "Subḥānaka Allāhumma wa biḥamdik, wa tabāraka ismuk, wa ta‘ālā jadduk, wa lā ilāha ghayruk",
          translation: {
            en: "Glory is to You, O Allah, and praise; blessed is Your Name, exalted is Your Majesty, and there is no deity besides You.",
          },
        },
      ],
    },
    {
      id: "2",
      type: "during",
      title: "While bowing (Rukū‘)",
      illustration: adhkarImages.prostration,
      tags: ["ruku"],
      entries: [
        {
          arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
          transliteration: "Subḥāna rabbiyal-‘aẓīm",
          translation: { en: "Glory be to my Lord, the Magnificent." },
        },
      ],
    },
    {
      id: "3",
      type: "during",
      title: "When rising from Rukū‘",
      illustration: adhkarImages.prostration,
      tags: ["ruku"],
      entries: [
        {
          arabicText: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
          transliteration: "Sami‘a Allāhu liman ḥamidah",
          translation: { en: "Allah hears those who praise Him." },
        },
        {
          arabicText: "رَبَّنَا وَلَكَ الْحَمْدُ",
          transliteration: "Rabbana wa laka al-ḥamd",
          translation: { en: "Our Lord, and to You is all praise." },
        },
      ],
    },
    {
      id: "4",
      type: "during",
      title: "While prostrating (Sujūd)",
      illustration: adhkarImages.prostration,
      tags: ["sujud"],
      entries: [
        {
          arabicText: "سُبْحَانَ رَبِّيَ الأَعْلَى",
          transliteration: "Subḥāna rabbiyal-a‘lā",
          translation: { en: "Glory be to my Lord, the Most High." },
        },
      ],
    },
    {
      id: "5",
      type: "during",
      title: "Between the two prostrations",
      illustration: adhkarImages.prostration,
      tags: ["between_sujud"],
      entries: [
        {
          arabicText:
            "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي، اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي",
          transliteration:
            "Rabbī ighfir lī, Rabbī ighfir lī, Allāhumma ighfir lī warḥamnī wahdinī wa ‘āfinī warzuqnī",
          translation: {
            en: "My Lord, forgive me. My Lord, forgive me. O Allah, forgive me, have mercy on me, guide me, grant me health, and provide for me.",
          },
        },
      ],
    },
    {
      id: "6",
      type: "during",
      title: "After Tashahhud (before Taslīm)",
      illustration: adhkarImages.prostration,
      tags: ["tashahhud"],
      entries: [
        {
          arabicText:
            "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
          transliteration:
            "Allāhumma innī a‘ūdhu bika min ‘adhābi jahannam, wa min ‘adhābi al-qabr, wa min fitnati al-maḥyā wa al-mamāt, wa min sharri fitnati al-masīḥ ad-dajjāl",
          translation: {
            en: "O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the False Messiah.",
          },
        },
      ],
    },
  ],
};

export const totalAdhkarDuring = adhkarDuring.items.length;
