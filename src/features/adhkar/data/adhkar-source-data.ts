// adhkar-source-data.ts
//
// This file contains ONLY data sourced from the islamicapi/masnun-dua
// dataset (https://github.com/islamicapi/masnun-dua), restructured into
// your AdhkarGroup/AdhkarItem/AdhkarEntry shape, for the 18 duas relevant
// to your before/during/after prayer phases.
//
// This is a REFERENCE file, not meant to replace your existing
// adhkar-before.ts / adhkar-during.ts / adhkar-after.ts. Use it to compare,
// cherry-pick wording, or pull in the extra fields (category, subCategory)
// you don't have yet.
//
// Field provenance:
//   - arabicText, transliteration: copied directly from the dataset
//     (primary religious source text / phonetic transliteration of it —
//     not creative work, safe to reproduce in full).
//   - translation.en: written independently for this file, not copied
//     verbatim from the dataset's own English translation. The dataset's
//     translation prose is their own curated/written content, so treat it
//     as their copyrighted material — review their repo's license before
//     copying their English wording verbatim into your app.
//   - reference, audio, sourceId, category, subCategory: factual/structural
//     metadata, copied as-is — citations and IDs aren't creative content.
//
// "Good to have" fields added beyond what's in your current types:
//   - category / subCategory: the dataset's own topical grouping, useful
//     if you ever want filtering/search beyond your before/during/after split.

export interface SourceAdhkarEntry {
  arabicText: string;
  transliteration: string;
  translation: { en: string };
  audio: string | null;
  reference: string;
  sourceId: number;
  category: string;
  subCategory: string;
}

export interface SourceAdhkarItem {
  id: string;
  title: string;
  entries: SourceAdhkarEntry[];
}

// ---------------------------------------------------------------------------
// BEFORE PRAYER
// ---------------------------------------------------------------------------

export const adhkarBeforeSource: SourceAdhkarItem[] = [
  {
    id: "before-1",
    title: "When performing ablution (Wudu)",
    entries: [
      {
        arabicText: "بِسْمِ اللَّهِ",
        transliteration: "Bismillāh",
        translation: { en: "In the name of Allah." },
        audio: "/audio/dua/169.mp3",
        reference: "Irwa'ul-Ghalil 1/122, Ibn Majah: 397",
        sourceId: 169,
        category: "ablution-and-bath",
        subCategory: "When starting ablution",
      },
    ],
  },
  {
    id: "before-2",
    title: "After completing ablution",
    entries: [
      {
        arabicText:
          "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration:
          "Ash-hadu an lā ilāha illa Allāhu waḥdahu lā sharīka lahu wa ash-hadu anna Muḥammadan ‘abduhu wa rasūluhu",
        translation: {
          en: "I testify that there is no god but Allah, alone without partner, and I testify that Muhammad is His servant and messenger.",
        },
        audio: "/audio/dua/170.mp3",
        reference: "Muslim: 234, 576",
        sourceId: 170,
        category: "ablution-and-bath",
        subCategory: "Upon completing the ablution",
      },
      {
        arabicText:
          "اَللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ",
        transliteration: "Allāhumma-j‘alnī minat-tawwābīna waj‘alnī minal-mutaṭahhirīn",
        translation: {
          en: "O Allah, count me among those who turn to You in repentance, and count me among those who keep themselves pure.",
        },
        audio: "/audio/dua/171.mp3",
        reference: "Sahih (Albani). Tirmidhi: 55",
        sourceId: 171,
        category: "ablution-and-bath",
        subCategory: "Upon completing the ablution",
      },
    ],
  },
  {
    id: "before-3",
    title: "When leaving for the mosque",
    entries: [
      {
        arabicText:
          "اَللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا وَّفِي لِسَانِي نُورًا وَّاجْعَلْ فِي سَمْعِي نُورًا وَّاجْعَلْ فِي بَصَرِي نُورًا وَّاجْعَلْ مِنْ خَلْفِي نُورًا وَّمِنْ أَمَامِي نُورًا وَّاجْعَلْ مِنْ فَوْقِي نُورًا وَّمِنْ تَحْتِي نُورًا اَللَّهُمَّ أَعْطِنِي نُورًا",
        transliteration:
          "Allāhumma-j‘al fī qalbī nūran, wa fī lisānī nūran, waj‘al fī sam‘ī nūran, waj‘al fī baṣarī nūran, waj‘al min khalfī nūran, wa min amāmī nūran, waj‘al min fawqī nūran, wa min taḥtī nūran, Allāhumma a‘ṭinī nūran",
        translation: {
          en: "O Allah, place light in my heart, light on my tongue, light in my hearing, light in my sight, light behind me and light ahead of me, light above me and light beneath me. O Allah, grant me light.",
        },
        audio: "/audio/dua/173.mp3",
        reference: "Bukhari: 6316",
        sourceId: 173,
        category: "mosque",
        subCategory: "Going to the mosque",
      },
    ],
  },
  {
    id: "before-4",
    title: "Upon entering the mosque",
    entries: [
      {
        arabicText:
          "بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اَللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliteration:
          "Bismillāhi, wa-ṣ-ṣalātu wa-s-salāmu ‘alā rasūlillāh. Allāhumma-ftaḥ lī abwāba raḥmatik.",
        translation: {
          en: "In the name of Allah, and blessings and peace be upon the Messenger of Allah. O Allah, open the doors of Your mercy for me.",
        },
        audio: "/audio/dua/175.mp3",
        reference: "Sahih (Albani). Abu Dawud: 465, Muslim: 713",
        sourceId: 175,
        category: "mosque",
        subCategory: "Entering the mosque",
      },
    ],
  },
  {
    id: "before-5",
    title: "After the Adhaan (Call to Prayer)",
    entries: [
      {
        arabicText:
          "اَللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا وَالْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ",
        transliteration:
          "Allāhumma rabba hādhihi-d-da‘wati-t-tāmmah, wa-ṣ-ṣalāti-l-qā’imah, āti Muḥammadan-il-wasīlata wal-faḍīlah, wab‘ath-hu maqāman maḥmūdan-illadhī wa‘adtah",
        translation: {
          en: "O Allah, Lord of this perfect call and of the prayer about to be established, grant Muhammad the intercession and the favor, and raise him to the praised station You promised him.",
        },
        audio: "/audio/dua/165.mp3",
        reference: "Bukhari: 614",
        sourceId: 165,
        category: "adhaan-and-iqamah",
        subCategory: "Dua after the adhaan",
      },
    ],
  },
  {
    id: "before-6",
    title: "When leaving the house",
    entries: [
      {
        arabicText:
          "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
        transliteration: "Bismillāhi, tawakkaltu ‘ala-llāhi, lā ḥawla wa lā quwwata illā billāh",
        translation: {
          en: "In the name of Allah, I place my trust in Allah; there is no power and no strength except through Allah.",
        },
        audio: "/audio/dua/154.mp3",
        reference: "Sahih (Albani). Abu Dawud: 5095",
        sourceId: 154,
        category: "home",
        subCategory: "When leaving the home",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// DURING PRAYER
// ---------------------------------------------------------------------------

export const adhkarDuringSource: SourceAdhkarItem[] = [
  {
    id: "during-1",
    title: "Opening supplication (Du‘ā’ al-Istiftāḥ)",
    entries: [
      {
        arabicText:
          "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلٰهَ غَيْرُكَ",
        transliteration:
          "Subḥānaka Allāhumma wa biḥamdika, wa tabāraka-smuka, wa ta‘ālā jadduka, wa lā ilāha ghayruk",
        translation: {
          en: "Glory and praise be to You, O Allah. Blessed is Your name, exalted is Your majesty, and there is no god besides You.",
        },
        audio: null,
        reference: "Muslim: 399",
        sourceId: 872,
        category: "salah",
        subCategory: "Duas After Takbeer (Start of prayer)",
      },
    ],
  },
  {
    id: "during-2",
    title: "While bowing (Rukū‘)",
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subḥāna rabbiyal-‘aẓīm",
        translation: { en: "Glory be to my Lord, the Magnificent." },
        audio: "/audio/dua/195.mp3",
        reference: "Sahih (Albani). Tirmidhi: 262",
        sourceId: 195,
        category: "salah",
        subCategory: "Duas in rukoo",
      },
    ],
  },
  {
    id: "during-3",
    title: "When rising from Rukū‘",
    entries: [
      {
        arabicText: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
        transliteration: "Sami‘a Allāhu liman ḥamidah",
        translation: { en: "Allah hears the one who praises Him." },
        audio: null,
        reference: "Bukhari: 796",
        sourceId: 202,
        category: "salah",
        subCategory: "Upon rising from rukoo",
      },
      {
        arabicText:
          "اَللَّهُمَّ رَبَّنَا لَكَ الْحَمْدُ، مِلْءَ السَّمَوَاتِ وَمِلْءَ الْأَرْضِ، وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ، أَهْلَ الثَّنَاءِ وَالْمَجْدِ، أَحَقُّ مَا قَالَ الْعَبْدُ، وَكُلُّنَا لَكَ عَبْدٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
        transliteration:
          "Allāhumma rabbanā laka-l-ḥamdu mil’a-s-samāwāti wa mil’a-l-arḍi, wa mil’a mā shi’ta min shay’in ba‘du, ahla-th-thanā’i wal-majdi, aḥaqqu mā qāla-l-‘abdu, wa kullunā laka ‘abdun. Allāhumma lā māni‘a limā a‘ṭayta, wa lā mu‘ṭiya limā mana‘ta, wa lā yanfa‘u dha-l-jaddi minka-l-jaddu",
        translation: {
          en: "O Allah, our Lord, to You belongs all praise, filling the heavens and filling the earth, and filling whatever You will after that — Owner of all praise and glory, the truest thing any servant has ever said, and we are all Your servants. O Allah, none can withhold what You give, none can give what You withhold, and no one's status can benefit them against You.",
        },
        audio: "/audio/dua/203.mp3",
        reference: "Muslim: 477",
        sourceId: 203,
        category: "salah",
        subCategory: "Upon rising from rukoo",
      },
    ],
  },
  {
    id: "during-4",
    title: "While prostrating (Sujūd)",
    entries: [
      {
        arabicText: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subḥāna rabbiyal-a‘lā",
        translation: { en: "Glory be to my Lord, the Most High." },
        audio: "/audio/dua/213.mp3",
        reference: "Muslim: 772",
        sourceId: 213,
        category: "salah",
        subCategory: "Duas in prostration [sujood]",
      },
    ],
  },
  {
    id: "during-5",
    title: "Between the two prostrations",
    entries: [
      {
        arabicText: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
        transliteration: "Rabbi-ghfir lī, Rabbi-ghfir lī",
        translation: { en: "My Lord, forgive me. My Lord, forgive me." },
        audio: "/audio/dua/222.mp3",
        reference: "Sahih (Albani). Abu Dawud: 874",
        sourceId: 222,
        category: "salah",
        subCategory: "Duas in between two prostrations",
      },
      {
        arabicText: "اَللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَاهْدِنِي وَارْزُقْنِي",
        transliteration: "Allāhumma-ghfir lī, warḥamnī, wa ‘āfinī, wahdinī, warzuqnī",
        translation: {
          en: "O Allah, forgive me, have mercy on me, grant me well-being, guide me, and provide for me.",
        },
        audio: "/audio/dua/223.mp3",
        reference: "Sahih (Albani). Tirmidhi: 284; Hasan (Albani). Abu Dawud: 850",
        sourceId: 223,
        category: "salah",
        subCategory: "Duas in between two prostrations",
      },
    ],
  },
  {
    id: "during-6",
    title: "After Tashahhud (before Taslīm)",
    entries: [
      {
        arabicText:
          "اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
        transliteration:
          "Allāhumma innī a‘ūdhu bika min ‘adhābi jahannam, wa min ‘adhābi-l-qabr, wa min fitnati-l-maḥyā wa-l-mamāti, wa min sharri fitnati-l-masīḥi-d-dajjāl",
        translation: {
          en: "O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the False Messiah.",
        },
        audio: "/audio/dua/232.mp3",
        reference: "Muslim: 588",
        sourceId: 232,
        category: "salah",
        subCategory: "Duas after the last tashahhud & before salam",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// AFTER PRAYER
// ---------------------------------------------------------------------------

export const adhkarAfterSource: SourceAdhkarItem[] = [
  {
    id: "after-1",
    title: "After finishing the prayer (Tasleem)",
    entries: [
      {
        arabicText: "أَسْتَغْفِرُ اللَّهَ",
        transliteration: "Astaghfirullāh",
        translation: { en: "I seek Allah's forgiveness. (said three times)" },
        audio: "/audio/dua/250.mp3",
        reference: "Sahih Muslim: 591",
        sourceId: 250,
        category: "salah",
        subCategory: "Masnun Dhikr after obligatory prayers",
      },
      {
        arabicText:
          "اَللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        transliteration:
          "Allāhumma anta-s-salāmu wa minka-s-salāmu, tabārakta yā dha-l-jalāli wa-l-ikrām",
        translation: {
          en: "O Allah, You are Peace, and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
        },
        audio: "/audio/dua/251.mp3",
        reference: "Muslim: 591",
        sourceId: 251,
        category: "salah",
        subCategory: "Masnun Dhikr after obligatory prayers",
      },
    ],
  },
  {
    id: "after-4",
    title: "Adhkar after prayer",
    entries: [
      {
        arabicText: "اَللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allāhumma a‘innī ‘alā dhikrika, wa shukrika, wa ḥusni ‘ibādatik",
        translation: {
          en: "O Allah, help me to remember You, to thank You, and to worship You in the best way.",
        },
        audio: "/audio/dua/239.mp3",
        reference: "Sahih (Albani). Abu Dawud: 1522",
        sourceId: 239,
        category: "salah",
        subCategory: "Duas after the last tashahhud & before salam",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Aggregate, matching your existing adhkarData shape if you want to spread
// these into it for comparison/testing.
// ---------------------------------------------------------------------------

export const adhkarSourceData = {
  before: adhkarBeforeSource,
  during: adhkarDuringSource,
  after: adhkarAfterSource,
};
