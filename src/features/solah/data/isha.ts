import { SolahGroup } from "@/features-solah/types";

const solahName = "Isha";

export const ishaGuide: SolahGroup = {
  solah: solahName,
  description: {
    en: "Night solah",
  },
  illustration: require("@/assets/guide-illustrations/Isha.png"),
  rakaat: 4,
  items: [
    {
      id: "1",
      solah: solahName,
      title: "Qiyām (Standing)",
      instruction: {
        en: "Face the Qiblah, make takbīrat al-iḥrām, then recite Sūrat al-Fātiḥah and a short sūrah.",
      },
      entries: [
        {
          arabicText: "ٱللّٰهُ أَكْبَر",
          transliteration: "Allāhu akbar",
          translation: { en: "Allah is the Greatest." },
          media: {
            image: require("@/assets/solah/fajr/step-1-qiyam.png"),
            audio: "/audio/solah/common/takbir.mp3",
          },
        },
        {
          arabicText: "بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ …",
          transliteration: "Bismi llāhi r-raḥmāni r-raḥīm …",
          translation: { en: "Recitation of al-Fātiḥah, then a short chapter." },
          media: { audio: "/audio/solah/isha/qiyam-fatiha.mp3" },
        },
      ],
    },
    {
      id: "2",
      solah: solahName,
      title: "Rukūʿ (Bowing)",
      instruction: {
        en: "Bow with hands on knees; back straight.",
      },
      entries: [
        {
          arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
          transliteration: "Subḥāna rabbiyal-ʿaẓīm (×3)",
          translation: { en: "Glory be to my Lord, the Magnificent." },
          media: {
            image: require("@/assets/solah/fajr/step-2-ruku.png"),
            audio: "/audio/solah/common/ruku.mp3",
          },
        },
      ],
    },
    {
      id: "3",
      solah: solahName,
      title: "Qawmah (Standing after Rukūʿ)",
      instruction: {
        en: "Rise to stand fully.",
      },
      entries: [
        {
          arabicText: "سَمِعَ ٱللّٰهُ لِمَنْ حَمِدَهُ",
          transliteration: "Samiʿa llāhu liman ḥamidah",
          translation: { en: "Allah hears those who praise Him." },
          media: {
            image: require("@/assets/solah/fajr/step-3-afterRuku.png"),
            audio: "/audio/solah/common/tasmi.mp3",
          },
        },
        {
          arabicText: "رَبَّنَا وَلَكَ ٱلْحَمْدُ",
          transliteration: "Rabbanā wa laka l-ḥamd",
          translation: { en: "Our Lord, and to You belongs all praise." },
          media: { audio: "/audio/solah/common/tahmid.mp3" },
        },
      ],
    },
    {
      id: "4",
      solah: solahName,
      title: "Sujūd (Prostration)",
      instruction: {
        en: "Prostrate with seven points on the ground.",
      },
      entries: [
        {
          arabicText: "سُبْحَانَ رَبِّيَ الأَعْلَى",
          transliteration: "Subḥāna rabbiyal-aʿlā (×3)",
          translation: { en: "Glory be to my Lord, the Most High." },
          media: {
            image: require("@/assets/solah/fajr/step-4-sujud.png"),
            audio: "/audio/solah/common/sujud.mp3",
          },
        },
      ],
    },
    {
      id: "5",
      solah: solahName,
      title: "Jalsah (Sitting between Sujūd)",
      instruction: {
        en: "Sit briefly between the two prostrations.",
      },
      entries: [
        {
          arabicText:
            "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَارْزُقْنِي وَعَافِنِي وَاجْبُرْنِي",
          transliteration: "Rabbi ighfir lī warḥamnī wahdinī warzuqnī wa ʿāfinī wajburnī",
          translation: {
            en: "My Lord, forgive me, have mercy on me, guide me, provide for me, grant me well-being, and set my affairs right.",
          },
          media: {
            image: require("@/assets/solah/fajr/step-5-jalsah.png"),
            audio: "/audio/solah/common/jalsah.mp3",
          },
        },
      ],
    },
    {
      id: "6",
      solah: solahName,
      title: "Tashahhud (Final Sitting)",
      instruction: {
        en: "In the final sitting, recite tashahhud and ṣalawāt, then conclude with taslīm.",
      },
      entries: [
        {
          arabicText:
            "ٱلتَّحِيَّاتُ لِلّٰهِ وَٱلصَّلَوَاتُ وَٱلطَّيِّبَاتُ… ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللّٰهِ",
          transliteration:
            "At-taḥiyyātu lillāhi waṣ-ṣalawātu waṭ-ṭayyibāt… As-salāmu ʿalaykum wa raḥmatullāh",
          translation: {
            en: "All greetings, prayers and goodness are for Allah… Peace and mercy of Allah be upon you.",
          },
          media: {
            image: require("@/assets/solah/fajr/step-6-tashahhud.png"),
            audio: "/audio/solah/common/tashahhud-tasleem.mp3",
          },
        },
      ],
    },
  ],
};

export const totalIshaSteps = ishaGuide.items.length;
