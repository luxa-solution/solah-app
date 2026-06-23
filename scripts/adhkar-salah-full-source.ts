// adhkar-salah-full-source.ts
//
// EVERY dua in the islamicapi/masnun-dua dataset's "Salah" category
// (https://github.com/islamicapi/masnun-dua) — all 17 sub-categories,
// 96 entries total. This is a SUPERSET reference covering far more than
// your current before/during/after groups, including duas you have no
// coverage of at all (Tashahhud text, Durood after tashahhud, after-salaam
// dhikr variants, etc.) and additional authentic variants of moments you
// already cover (rukoo, sujood, post-tashahhud refuge duas).
//
// This is a REFERENCE/staging file — it does not replace your existing
// adhkar-before.ts / adhkar-during.ts / adhkar-after.ts. Use it to pick
// which variants you want to fold into your real data, or to build new
// adhkar items for the gaps (Tashahhud, Durood, after-salaam) you
// currently don't have at all.
//
// Field provenance — same policy as adhkar-source-data.ts:
//   - arabicText, transliteration: copied directly from the dataset
//     (primary religious source text — safe to reproduce in full).
//   - translation.en: written independently, not copied from the
//     dataset's own curated English translation (their wording is their
//     own written content).
//   - reference, audio, sourceId: factual/structural metadata, copied as-is.
//
// 9 entries in the dataset (ids 194, 210, 211, 212, 224, 269, 270, 271, 272)
// have an empty `arabic` field upstream — they're hadith citations pointing
// to text duplicated elsewhere in this file, not standalone duas. Marked
// `arabicText: null` below rather than fabricated.

export interface SalahSourceEntry {
  sourceId: number;
  title: string;
  arabicText: string | null;
  transliteration: string | null;
  translation: { en: string } | null;
  audio: string | null;
  reference: string;
  /** True if this dataset entry has no standalone Arabic text (citation-only). */
  isCitationOnly?: boolean;
}

export interface SalahSourceSubCategory {
  subCategory: string;
  /** Maps loosely to your existing before/during/after groups, where applicable. */
  suggestedPhase: "during" | "after" | null;
  entries: SalahSourceEntry[];
}

export const adhkarSalahFullSource: SalahSourceSubCategory[] = [
  {
    subCategory: "Duas After Takbeer (Start of prayer)",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 186,
        title: "Dua for Salah (At the beginning of the prayer)",
        arabicText:
          "وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ، إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ، لَا شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا مِنَ الْمُسْلِمِينَ",
        transliteration:
          "Wajjahtu wajhiya lilladhī faṭara-s-samāwāti wa-l-arḍa ḥanīfan wa mā anā mina-l-mushrikīn, inna ṣalātī wa nusukī wa maḥyāya wa mamātī lillāhi rabbi-l-‘ālamīn, lā sharīka lahu wa bidhālika umirtu wa anā mina-l-muslimīn",
        translation: {
          en: "I have turned my face toward the One who created the heavens and the earth, upright, and I am not among those who associate partners with Him. My prayer, my acts of worship, my living and my dying are all for Allah, Lord of all worlds, who has no partner. This is what I am commanded, and I am among those who submit.",
        },
        audio: null,
        reference: "Muslim: 771",
      },
      {
        sourceId: 187,
        title: "Dua after Takbeer in Salah",
        arabicText:
          "اَللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اَللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اَللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ",
        transliteration:
          "Allāhumma bā‘id baynī wa bayna khaṭāyāya kamā bā‘adta bayna-l-mashriqi wa-l-maghrib, Allāhumma naqqinī min khaṭāyāya kamā yunaqqa-th-thawbu-l-abyaḍu mina-d-danas, Allāhumma-ghsilnī min khaṭāyāya bi-th-thalji wa-l-mā’i wa-l-barad",
        translation: {
          en: "O Allah, put as much distance between me and my sins as You have put between the East and the West. O Allah, cleanse me of my sins the way a white garment is cleansed of dirt. O Allah, wash my sins away with snow, water, and hail.",
        },
        audio: "/audio/dua/187.mp3",
        reference: "Bukhari: 744, Muslim: 598",
      },
      {
        sourceId: 188,
        title: "Dua When Starting Tahajjud Prayer",
        arabicText:
          "اَللَّهُمَّ رَبَّ جِبْرَائِيلَ وَمِيكَائِيلَ وَإِسْرَافِيلَ، فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، عَالِمَ الْغَيْبِ وَالشَّهَادَةِ، أَنْتَ تَحْكُمُ بَيْنَ عِبَادِكَ فِيمَا كَانُوا فِيهِ يَخْتَلِفُونَ، اهْدِنِي لِمَا اخْتُلِفَ فِيهِ مِنَ الْحَقِّ بِإِذْنِكَ، إِنَّكَ تَهْدِي مَنْ تَشَاءُ إِلَى صِرَاطٍ مُسْتَقِيمٍ",
        transliteration:
          "Allāhumma rabba Jibrā’īla wa Mīkā’īla wa Isrāfīl, fāṭira-s-samāwāti wa-l-arḍ, ‘ālima-l-ghaybi wa-sh-shahādah, anta taḥkumu bayna ‘ibādika fīmā kānū fīhi yakhtalifūn, ihdinī limā-khtulifa fīhi mina-l-ḥaqqi bi-idhnik, innaka tahdī man tashā’u ilā ṣirāṭin mustaqīm",
        translation: {
          en: "O Allah, Lord of Jibra'il, Mika'il, and Israfil; Originator of the heavens and the earth; Knower of the unseen and the seen — You judge between Your servants in what they used to dispute about. Guide me, by Your permission, to the truth in what they differ over, for You guide whoever You will to a straight path.",
        },
        audio: "/audio/dua/188.mp3",
        reference: "Muslim: 770",
      },
      {
        sourceId: 189,
        title: "Dua for Tahajjud Prayer (At Beginning)",
        arabicText:
          "اَللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ لَكَ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ الْحَقُّ، وَوَعْدُكَ الْحَقُّ، وَلِقَاؤُكَ حَقٌّ، وَقَوْلُكَ حَقٌّ، وَالْجَنَّةُ حَقٌّ، وَالنَّارُ حَقٌّ، وَالسَّاعَةُ حَقٌّ",
        transliteration:
          "Allāhumma laka-l-ḥamdu anta qayyimu-s-samāwāti wa-l-arḍi wa man fīhinn, wa laka-l-ḥamdu laka mulku-s-samāwāti wa-l-arḍi wa man fīhinn, wa laka-l-ḥamdu anta nūru-s-samāwāti wa-l-arḍi wa man fīhinn, wa laka-l-ḥamdu anta-l-ḥaqq, wa wa‘duka-l-ḥaqq, wa liqā’uka ḥaqq, wa qawluka ḥaqq, wa-l-jannatu ḥaqq, wa-n-nāru ḥaqq, wa-s-sā‘atu ḥaqq",
        translation: {
          en: "O Allah, all praise is for You — You are the Sustainer of the heavens and the earth and everyone in them. All praise is for You — Yours is the dominion of the heavens and the earth and everyone in them. All praise is for You — You are the light of the heavens and the earth and everyone in them. All praise is for You — You are the Truth, Your promise is true, meeting You is true, Your word is true, Paradise is true, the Fire is true, and the Hour is true.",
        },
        audio: null,
        reference: "Bukhari: 1120, Muslim: 769",
      },
      {
        sourceId: 190,
        title: "Dua at Tahajjud (At Beginning)",
        arabicText:
          "اَللَّهُمَّ أَنْتَ الْمَلِكُ لَا إِلَهَ إِلَّا أَنْتَ، أَنْتَ رَبِّي وَأَنَا عَبْدُكَ، ظَلَمْتُ نَفْسِي وَاعْتَرَفْتُ بِذَنْبِي فَاغْفِرْ لِي ذُنُوبِي جَمِيعًا، إِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
        transliteration:
          "Allāhumma anta-l-maliku lā ilāha illā ant, anta rabbī wa anā ‘abduk, ẓalamtu nafsī wa-‘taraftu bi-dhanbī fa-ghfir lī dhunūbī jamī‘an, innahu lā yaghfiru-dh-dhunūba illā ant",
        translation: {
          en: "O Allah, You are the Sovereign — there is no god but You. You are my Lord and I am Your servant. I have wronged myself and I admit my sin, so forgive me all my sins, for none forgives sins but You.",
        },
        audio: "/audio/dua/190.mp3",
        reference: "Bukhari: 1120, Muslim: 769",
      },
      {
        sourceId: 191,
        title: "Dua at the start of the prayer (after takbeer)",
        arabicText:
          "لَبَّيْكَ وَسَعْدَيْكَ، وَالْخَيْرُ كُلُّهُ بِيَدَيْكَ، وَالشَّرُّ لَيْسَ إِلَيْكَ، أَنَا بِكَ وَإِلَيْكَ، تَبَارَكْتَ وَتَعَالَيْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
        transliteration:
          "Labbayka wa sa‘dayk, wa-l-khayru kulluhu bi-yadayk, wa-sh-sharru laysa ilayk, anā bika wa ilayk, tabārakta wa ta‘ālayt, astaghfiruka wa atūbu ilayk",
        translation: {
          en: "Here I am, answering Your call, ready to obey; all good is in Your hands, and evil is not attributed to You. I exist by You and return to You. Blessed and exalted are You; I seek Your forgiveness and turn back to You in repentance.",
        },
        audio: "/audio/dua/191.mp3",
        reference: "Muslim: 771",
      },
      {
        sourceId: 192,
        title: "Dua at the Beginning of Salah (Allahu Akbar Kabira)",
        arabicText:
          "اَللَّهُ أَكْبَرُ كَبِيرًا، اَللَّهُ أَكْبَرُ كَبِيرًا، اَللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا (ثَلَاثًا)",
        transliteration:
          "Allāhu akbaru kabīrā (×3), wa-l-ḥamdu lillāhi kathīrā (×3), wa subḥāna-llāhi bukratan wa aṣīlā (×3)",
        translation: {
          en: "Allah is the greatest, greatly. All praise is for Allah, abundantly. Glory be to Allah, morning and evening. (each phrase repeated three times)",
        },
        audio: "/audio/dua/192.mp3",
        reference: "Muslim: 601",
      },
      {
        sourceId: 872,
        title: "Sana Dua (Subhanaka Allahumma Wa Bihamdika)",
        arabicText:
          "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلٰهَ غَيْرُكَ",
        transliteration:
          "Subḥānaka Allāhumma wa biḥamdika, wa tabāraka-smuka, wa ta‘ālā jadduka, wa lā ilāha ghayruk",
        translation: {
          en: "Glory and praise be to You, O Allah. Blessed is Your name, exalted is Your majesty, and there is no god besides You.",
        },
        audio: null,
        reference: "Muslim: 399",
      },
    ],
  },
  {
    subCategory: "If afflicted by whisperings in prayer or recitation",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 193,
        title: "Dua for Whisperings in Prayer (Auzubillah Minashaitan Nirajeem)",
        arabicText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        transliteration: "A‘ūdhu billāhi mina-sh-shayṭāni-r-rajīm",
        translation: { en: "I seek refuge in Allah from the accursed, expelled Satan." },
        audio: "/audio/dua/193.mp3",
        reference: "Muslim: 2203",
      },
    ],
  },
  {
    subCategory: "Duas in rukoo",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 194,
        title: "Dua in Ruku (Hadith)",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "[1] Bukhari: 791 [2] Sahih (Albani). Mishkat: 885",
        isCitationOnly: true,
      },
      {
        sourceId: 195,
        title: "Dua in Ruku (Subhana Rabbiyal Azeem)",
        arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
        transliteration: "Subḥāna rabbiyal-‘aẓīm",
        translation: { en: "Glory be to my Lord, the Magnificent." },
        audio: "/audio/dua/195.mp3",
        reference: "Sahih (Albani). Tirmidhi: 262",
      },
      {
        sourceId: 196,
        title: "Dua For Ruku (Subhana Rabbiyal Adheem Wa Bihamdihi)",
        arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
        transliteration: "Subḥāna rabbiyal-‘aẓīmi wa biḥamdih",
        translation: { en: "Glory and praise be to my Lord, the Magnificent." },
        audio: "/audio/dua/196.mp3",
        reference: "Sahih (Albani). Abu Dawud: 888",
      },
      {
        sourceId: 197,
        title: "Dua in Ruku (Subbuhun Quddusun Rabbul Mala Ikati War Ruh)",
        arabicText: "سُبُّوحٌ قُدُّوسٌ رَبُّ الْمَلَائِكَةِ وَالرُّوحِ",
        transliteration: "Subbūḥun quddūsun rabbu-l-malā’ikati wa-r-rūḥ",
        translation: { en: "Exalted in His perfection, the Holy One, Lord of the angels and the Spirit." },
        audio: "/audio/dua/197.mp3",
        reference: "Muslim: 487",
      },
      {
        sourceId: 198,
        title: "Dua For Ruku (Allahumma Laka Rakatu Wa Bika Amantu)",
        arabicText:
          "اَللَّهُمَّ لَكَ رَكَعْتُ، وَبِكَ آمَنْتُ، وَلَكَ أَسْلَمْتُ، خَشَعَ لَكَ سَمْعِي وَبَصَرِي وَمُخِّي وَعَظْمِي وَعَصَبِي",
        transliteration:
          "Allāhumma laka raka‘tu, wa bika āmantu, wa laka aslamtu, khasha‘a laka sam‘ī wa baṣarī wa mukhkhī wa ‘aẓmī wa ‘aṣabī",
        translation: {
          en: "O Allah, to You I have bowed, in You I have believed, to You I have submitted. My hearing, my sight, my mind, my bones, and my sinews are humbled before You.",
        },
        audio: "/audio/dua/198.mp3",
        reference: "Muslim: 771",
      },
      {
        sourceId: 199,
        title: "Dua at Ruku",
        arabicText: "سُبْحَانَ ذِي الْجَبَرُوتِ وَالْمَلَكُوتِ وَالْكِبْرِيَاءِ وَالْعَظَمَةِ",
        transliteration: "Subḥāna dhi-l-jabarūti wa-l-malakūti wa-l-kibriyā’i wa-l-‘aẓamah",
        translation: {
          en: "Glory be to the Possessor of power, sovereignty, greatness, and majesty.",
        },
        audio: "/audio/dua/199.mp3",
        reference: "Sahih (Albani). Abu Dawud: 873",
      },
      {
        sourceId: 200,
        title: "Dua in Rukoo (Subhanaka wa Bihamdika Astaghfiruka)",
        arabicText: "سُبْحَانَكَ وَبِحَمْدِكَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ",
        transliteration: "Subḥānaka wa biḥamdika astaghfiruka wa atūbu ilayk",
        translation: {
          en: "Glory and praise be to You; I ask Your forgiveness and turn back to You in repentance.",
        },
        audio: "/audio/dua/200.mp3",
        reference: "Bukhari: 4967, Muslim: 484",
      },
      {
        sourceId: 201,
        title: "Dua in Ruku (Dua for forgiveness)",
        arabicText: "سُبْحَانَكَ اَللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، اَللَّهُمَّ اغْفِرْ لِي",
        transliteration: "Subḥānaka Allāhumma rabbanā wa biḥamdik, Allāhumma-ghfir lī",
        translation: {
          en: "Glory be to You, O Allah our Lord, and praise be to You; O Allah, forgive me.",
        },
        audio: "/audio/dua/201.mp3",
        reference: "Bukhari: 794, Muslim: 484",
      },
      {
        sourceId: 871,
        title: "Dua in Rukoo",
        arabicText:
          "اَللَّهُمَّ لَكَ رَكَعْتُ، وَبِكَ آمَنْتُ، وَلَكَ أَسْلَمْتُ، أَنْتَ رَبِّي، خَشَعَ سَمْعِي وَبَصَرِي وَمُخِّي وَعَظْمِي وَعَصَبِي لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration:
          "Allāhumma laka raka‘tu, wa bika āmantu, wa laka aslamtu, anta rabbī, khasha‘a sam‘ī wa baṣarī wa mukhkhī wa ‘aẓmī wa ‘aṣabī lillāhi rabbi-l-‘ālamīn",
        translation: {
          en: "O Allah, to You I have bowed, in You I have believed, to You I have submitted; You are my Lord. My hearing, my sight, my mind, my bones, and my sinews are humbled before Allah, Lord of all worlds.",
        },
        audio: null,
        reference: "Sahih (Albani). Mishkat: 885",
      },
      {
        sourceId: 873,
        title: "Dua for Ruku",
        arabicText: "سُبْحَانَكَ اَللَّهُمَّ وَبِحَمْدِكَ لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration: "Subḥānaka Allāhumma wa biḥamdika lā ilāha illā ant",
        translation: { en: "Glory and praise be to You, O Allah; there is no god but You." },
        audio: null,
        reference: "Abu Dawud: 879",
      },
    ],
  },
  {
    subCategory: "Upon rising from rukoo",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 202,
        title: "Dua After Ruku (Sami Allahu Liman Hamidah)",
        arabicText: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ",
        transliteration: "Sami‘a Allāhu liman ḥamidah",
        translation: { en: "Allah hears the one who praises Him." },
        audio: null,
        reference: "Bukhari: 796",
      },
      {
        sourceId: 203,
        title: "Dua After Ruku (Allahumma Rabbana Wa Lakal-Hamd)",
        arabicText:
          "اَللَّهُمَّ رَبَّنَا لَكَ الْحَمْدُ، مِلْءَ السَّمَوَاتِ وَمِلْءَ الْأَرْضِ، وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ، أَهْلَ الثَّنَاءِ وَالْمَجْدِ، أَحَقُّ مَا قَالَ الْعَبْدُ، وَكُلُّنَا لَكَ عَبْدٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
        transliteration:
          "Allāhumma rabbanā laka-l-ḥamdu mil’a-s-samāwāti wa mil’a-l-arḍi, wa mil’a mā shi’ta min shay’in ba‘du, ahla-th-thanā’i wal-majdi, aḥaqqu mā qāla-l-‘abdu, wa kullunā laka ‘abdun. Allāhumma lā māni‘a limā a‘ṭayta, wa lā mu‘ṭiya limā mana‘ta, wa lā yanfa‘u dha-l-jaddi minka-l-jaddu",
        translation: {
          en: "O Allah, our Lord, to You belongs all praise, filling the heavens and filling the earth, and filling whatever You will after that — Owner of all praise and glory, the truest thing any servant has ever said, and we are all Your servants. O Allah, none can withhold what You give, none can give what You withhold, and no one's status can benefit them against You.",
        },
        audio: "/audio/dua/203.mp3",
        reference: "Muslim: 477",
      },
    ],
  },
  {
    subCategory: "Duas while in a state of rukoo",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 204,
        title: "Rabbana Lakal Hamd (Dua After Ruku)",
        arabicText: "(اَللَّهُمَّ) رَبَّنَا لَكَ الْحَمْدُ",
        transliteration: "(Allāhumma) rabbanā laka-l-ḥamd",
        translation: { en: "(O Allah,) our Lord, to You belongs all praise." },
        audio: "/audio/dua/204.mp3",
        reference: "Bukhari: 796",
      },
      {
        sourceId: 205,
        title: "Rabbana Wa Lakal Hamd (Dua After Rukoo)",
        arabicText: "(اَللَّهُمَّ) رَبَّنَا وَلَكَ الْحَمْدُ",
        transliteration: "(Allāhumma) rabbanā wa laka-l-ḥamd",
        translation: { en: "(O Allah,) our Lord, and to You belongs all praise." },
        audio: "/audio/dua/205.mp3",
        reference: "Bukhari: 796",
      },
      {
        sourceId: 206,
        title: "Dua When Raising from Ruku #1",
        arabicText: "رَبَّنَا وَلَكَ الْحَمْدُ، حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ",
        transliteration: "Rabbanā wa laka-l-ḥamdu, ḥamdan kathīran ṭayyiban mubārakan fīh",
        translation: {
          en: "Our Lord, and to You belongs all praise — abundant, good, and blessed praise.",
        },
        audio: "/audio/dua/206.mp3",
        reference: "Bukhari: 799",
      },
      {
        sourceId: 207,
        title: "Dua After Raising from Ruku",
        arabicText:
          "اَللَّهُمَّ رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَوَاتِ وَمِلْءَ الْأَرْضِ وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
        transliteration:
          "Allāhumma rabbanā laka-l-ḥamdu mil’a-s-samāwāti wa mil’a-l-arḍi wa mil’a mā shi’ta min shay’in ba‘du",
        translation: {
          en: "O Allah, our Lord, to You belongs all praise, filling the heavens and filling the earth, and filling whatever You will after that.",
        },
        audio: null,
        reference: "Muslim: 476",
      },
      {
        sourceId: 208,
        title: "Dua When Raising From Ruku #2",
        arabicText:
          "اَللَّهُمَّ رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَوَاتِ وَمِلْءَ الْأَرْضِ وَمَا بَيْنَهُمَا، وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ",
        transliteration:
          "Allāhumma rabbanā laka-l-ḥamdu mil’a-s-samāwāti wa mil’a-l-arḍi wa mā baynahumā, wa mil’a mā shi’ta min shay’in ba‘du",
        translation: {
          en: "O Allah, our Lord, to You belongs all praise, filling the heavens, the earth, and everything between them, and filling whatever You will after that.",
        },
        audio: "/audio/dua/208.mp3",
        reference: "Muslim: 476",
      },
      {
        sourceId: 209,
        title: "Dua Praising Allah (Dua After Ruku)",
        arabicText:
          "اَلْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، مُبَارَكًا عَلَيْهِ، كَمَا يُحِبُّ رَبُّنَا وَيَرْضَى",
        transliteration:
          "Al-ḥamdu lillāhi ḥamdan kathīran ṭayyiban mubārakan fīh, mubārakan ‘alayh, kamā yuḥibbu rabbunā wa yarḍā",
        translation: {
          en: "All praise is for Allah — abundant, good, and blessed praise, just as our Lord loves and is pleased with.",
        },
        audio: null,
        reference: "Sahih (Albani). Bukhari (Mu'allaq): 1/95",
      },
      {
        sourceId: 874,
        title: "Dua after Ruku in Namaz",
        arabicText: "لِرَبِّيَ الْحَمْدُ",
        transliteration: "Li-rabbiya-l-ḥamd",
        translation: { en: "To my Lord belongs all praise." },
        audio: null,
        reference: "Sahih (Albani). Mishkat: 880",
      },
      {
        sourceId: 876,
        title: "Dua After Ruku",
        arabicText:
          "اَللَّهُمَّ رَبَّنَا لَكَ الْحَمْدُ مِلْءَ السَّمَوَاتِ وَمِلْءَ الأَرْضِ وَمِلْءَ مَا بَيْنَهُمَا وَمِلْءَ مَا شِئْتَ مِنْ شَيْءٍ بَعْدُ، أَهْلَ الثَّنَاءِ وَالْمَجْدِ",
        transliteration:
          "Allāhumma rabbanā laka-l-ḥamdu mil’a-s-samāwāti wa mil’a-l-arḍi wa mil’a mā baynahumā wa mil’a mā shi’ta min shay’in ba‘du, ahla-th-thanā’i wa-l-majd",
        translation: {
          en: "O Allah, our Lord, to You belongs all praise, filling the heavens, filling the earth, filling everything between them, and filling whatever You will after that — Owner of all praise and glory.",
        },
        audio: null,
        reference: "Sahih (Albani). Mishkat: 879",
      },
    ],
  },
  {
    subCategory: "Duas in prostration [sujood]",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 210,
        title: "Dua during Sujood (Hadith)",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "Muslim: 482",
        isCitationOnly: true,
      },
      {
        sourceId: 211,
        title: "Sujood Dua (Hadith)",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "Muslim: 479",
        isCitationOnly: true,
      },
      {
        sourceId: 212,
        title: "Dua for Ruku and Sujood",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "Sahih (Albani). Mishkat: 885",
        isCitationOnly: true,
      },
      {
        sourceId: 213,
        title: "Dua in Sujood (Subhana Rabbiyal Ala)",
        arabicText: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
        transliteration: "Subḥāna rabbiyal-a‘lā",
        translation: { en: "Glory be to my Lord, the Most High." },
        audio: "/audio/dua/213.mp3",
        reference: "Muslim: 772",
      },
      {
        sourceId: 214,
        title: "Dua for Sajdah (Sajda Dua)",
        arabicText: "سُبْحَانَ رَبِّيَ الْأَعْلَى وَبِحَمْدِهِ",
        transliteration: "Subḥāna rabbiyal-a‘lā wa biḥamdih",
        translation: { en: "Glory and praise be to my Lord, the Most High." },
        audio: "/audio/dua/214.mp3",
        reference: "Sahih (Albani). Abu Dawud: 888",
      },
      {
        sourceId: 215,
        title: "Dua for Sujood (Allahumma Maghfir Lee)",
        arabicText:
          "اَللَّهُمَّ اغْفِرْ لِي ذَنْبِي كُلَّهُ، دِقَّهُ وَجِلَّهُ، وَأَوَّلَهُ وَآخِرَهُ، وَعَلَانِيَتَهُ وَسِرَّهُ",
        transliteration:
          "Allāhumma-ghfir lī dhanbī kullah, diqqahu wa jillah, wa awwalahu wa ākhirah, wa ‘alāniyatahu wa sirrah",
        translation: {
          en: "O Allah, forgive me all my sins — small and great, first and last, open and hidden.",
        },
        audio: "/audio/dua/215.mp3",
        reference: "Muslim: 483",
      },
      {
        sourceId: 216,
        title: "Dua After Ruku (Supplication Upon Rising From Bowing)",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَعُوذُ بِرِضَاكَ مِنْ سَخَطِكَ، وَبِمُعَافَاتِكَ مِنْ عُقُوبَتِكَ، وَأَعُوذُ بِكَ مِنْكَ، لَا أُحْصِي ثَنَاءً عَلَيْكَ، أَنْتَ كَمَا أَثْنَيْتَ عَلَى نَفْسِكَ",
        transliteration:
          "Allāhumma innī a‘ūdhu bi-riḍāka min sakhaṭik, wa bi-mu‘āfātika min ‘uqūbatik, wa a‘ūdhu bika mink, lā uḥṣī thanā’an ‘alayk, anta kamā athnayta ‘alā nafsik",
        translation: {
          en: "O Allah, I seek refuge in Your pleasure from Your displeasure, in Your pardon from Your punishment, and I seek refuge in You from You. I cannot fully enumerate praise of You — You are as You have praised Yourself.",
        },
        audio: "/audio/dua/216.mp3",
        reference: "Muslim: 486",
      },
      {
        sourceId: 217,
        title: "Dua When Raising From Ruku (Dua Noor)",
        arabicText:
          "اَللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا، وَعَنْ يَمِينِي نُورًا، وَعَنْ يَسَارِي نُورًا، وَفَوْقِي نُورًا، وَتَحْتِي نُورًا، وَأَمَامِي نُورًا، وَخَلْفِي نُورًا، وَاجْعَلْ لِي نُورًا",
        transliteration:
          "Allāhumma-j‘al fī qalbī nūran, wa fī sam‘ī nūran, wa fī baṣarī nūran, wa ‘an yamīnī nūran, wa ‘an yasārī nūran, wa fawqī nūran, wa taḥtī nūran, wa amāmī nūran, wa khalfī nūran, wa-j‘al lī nūran",
        translation: {
          en: "O Allah, place light in my heart, light in my hearing, light in my sight, light on my right, light on my left, light above me, light below me, light ahead of me, light behind me, and grant me light.",
        },
        audio: "/audio/dua/217.mp3",
        reference: "Bukhari: 6316, Muslim: 763",
      },
      {
        sourceId: 218,
        title: "Dua in Sajdah",
        arabicText: "سُبْحَانَكَ اَللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، اَللَّهُمَّ اغْفِرْ لِي",
        transliteration: "Subḥānaka Allāhumma rabbanā wa biḥamdik, Allāhumma-ghfir lī",
        translation: {
          en: "Glory be to You, O Allah our Lord, and praise be to You; O Allah, forgive me.",
        },
        audio: "/audio/dua/218.mp3",
        reference: "Bukhari: 794, Muslim: 484",
      },
      {
        sourceId: 219,
        title: "Dua in Sujood (Subbuhun Quddusun Rabbul Mala Ikati War Ruh)",
        arabicText: "سُبُّوحٌ، قُدُّوسٌ، رَبُّ الْمَلَائِكَةِ وَالرُّوحِ",
        transliteration: "Subbūḥun, quddūsun, rabbu-l-malā’ikati wa-r-rūḥ",
        translation: { en: "Exalted in His perfection, the Holy One, Lord of the angels and the Spirit." },
        audio: "/audio/dua/219.mp3",
        reference: "Muslim: 487",
      },
      {
        sourceId: 220,
        title: "Dua in Sujood (Allaahumma Laka Sajadtu wa Laka Aslamtu)",
        arabicText:
          "اَللَّهُمَّ لَكَ سَجَدْتُ، وَلَكَ أَسْلَمْتُ، وَبِكَ آمَنْتُ، سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ، وَصَوَّرَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ، تَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ",
        transliteration:
          "Allāhumma laka sajadtu, wa laka aslamtu, wa bika āmantu, sajada wajhiya lilladhī khalaqahu, wa ṣawwarahu, wa shaqqa sam‘ahu wa baṣarah, tabāraka-llāhu aḥsanu-l-khāliqīn",
        translation: {
          en: "O Allah, to You I have prostrated, to You I have submitted, and in You I have believed. My face has prostrated to the One who created it, shaped it, and opened its hearing and sight. Blessed is Allah, the best of creators.",
        },
        audio: "/audio/dua/220.mp3",
        reference: "Muslim: 771",
      },
      {
        sourceId: 221,
        title: "Dua for Sujood",
        arabicText: "سُبْحَانَ ذِي الْجَبَرُوتِ، وَالْمَلَكُوتِ، وَالْكِبْرِيَاءِ، وَالْعَظَمَةِ",
        transliteration: "Subḥāna dhi-l-jabarūt, wa-l-malakūt, wa-l-kibriyā’, wa-l-‘aẓamah",
        translation: { en: "Glory be to the Possessor of power, sovereignty, greatness, and majesty." },
        audio: "/audio/dua/221.mp3",
        reference: "Sahih (Albani). Abu Dawud: 873",
      },
    ],
  },
  {
    subCategory: "Duas in between two prostrations",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 222,
        title: "Dua between two Sujood",
        arabicText: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
        transliteration: "Rabbi-ghfir lī, Rabbi-ghfir lī",
        translation: { en: "My Lord, forgive me. My Lord, forgive me." },
        audio: "/audio/dua/222.mp3",
        reference: "Sahih (Albani). Abu Dawud: 874",
      },
      {
        sourceId: 223,
        title: "Dua between Sujood (Allahummaghfirli Warhamni Wahdini Warzuqni)",
        arabicText: "اَللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَعَافِنِي وَاهْدِنِي وَارْزُقْنِي",
        transliteration: "Allāhumma-ghfir lī, warḥamnī, wa ‘āfinī, wahdinī, warzuqnī",
        translation: {
          en: "O Allah, forgive me, have mercy on me, grant me well-being, guide me, and provide for me.",
        },
        audio: "/audio/dua/223.mp3",
        reference: "Sahih (Albani). Tirmidhi: 284; Hasan (Albani). Abu Dawud: 850",
      },
    ],
  },
  {
    subCategory: "Prostration due to Quran recitation",
    suggestedPhase: null,
    entries: [
      {
        sourceId: 224,
        title: "Dua For Sajdah in Quran (Hadith)",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "Muslim: 81",
        isCitationOnly: true,
      },
      {
        sourceId: 225,
        title: "Dua For Sajdah in Quran",
        arabicText:
          "اَللَّهُمَّ اكْتُبْ لِي بِهَا عِنْدَكَ أَجْرًا، وَضَعْ عَنِّي بِهَا وِزْرًا، وَاجْعَلْهَا لِي عِنْدَكَ ذُخْرًا، وَتَقَبَّلْهَا مِنِّي كَمَا تَقَبَّلْتَهَا مِنْ عَبْدِكَ دَاوُدَ",
        transliteration:
          "Allāhumma-ktub lī bihā ‘indaka ajran, wa ḍa‘ ‘annī bihā wizran, wa-j‘alhā lī ‘indaka dhukhran, wa taqabbalhā minnī kamā taqabbaltahā min ‘abdika Dāwūd",
        translation: {
          en: "O Allah, record a reward for me with You for this prostration, remove a burden from me through it, store it for me with You as a treasure, and accept it from me as You accepted it from Your servant David.",
        },
        audio: "/audio/dua/225.mp3",
        reference: "Sahih (Albani). Tirmidhi: 580",
      },
      {
        sourceId: 226,
        title: "Sajdah Dua for night recitation",
        arabicText:
          "سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ، فَتَبَارَكَ اللَّهُ أَحْسَنُ الْخَالِقِينَ",
        transliteration:
          "Sajada wajhiya lilladhī khalaqah, wa shaqqa sam‘ahu wa baṣarahu bi-ḥawlihi wa quwwatih, fa-tabāraka-llāhu aḥsanu-l-khāliqīn",
        translation: {
          en: "My face has prostrated to the One who created it and opened its hearing and sight by His power and might. Blessed is Allah, the best of creators.",
        },
        audio: "/audio/dua/226.mp3",
        reference: "Sahih (Albani). Tirmidhi: 580",
      },
      {
        sourceId: 227,
        title: "Dua after Reciting the Verses of Prostration",
        arabicText:
          "سَجَدَ وَجْهِيَ لِلَّذِي خَلَقَهُ، وَشَقَّ سَمْعَهُ وَبَصَرَهُ بِحَوْلِهِ وَقُوَّتِهِ",
        transliteration: "Sajada wajhiya lilladhī khalaqah, wa shaqqa sam‘ahu wa baṣarahu bi-ḥawlihi wa quwwatih",
        translation: {
          en: "My face has prostrated to the One who created it and opened its hearing and sight by His power and might.",
        },
        audio: "/audio/dua/227.mp3",
        reference: "Sahih (Albani). Tirmidhi: 580",
      },
    ],
  },
  {
    subCategory: "The Tashahhud",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 228,
        title: "Tashahhud Dua (Attahiyat Lillahi Wa Salawatu)",
        arabicText:
          "اَلتَّحِيَّاتُ لِلَّهِ، وَالصَّلَوَاتُ، وَالطَّيِّبَاتُ، اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration:
          "At-taḥiyyātu lillāh, wa-ṣ-ṣalawātu, wa-ṭ-ṭayyibāt, as-salāmu ‘alayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh, as-salāmu ‘alaynā wa ‘alā ‘ibādi-llāhi-ṣ-ṣāliḥīn, ash-hadu an lā ilāha illa-llāh, wa ash-hadu anna Muḥammadan ‘abduhu wa rasūluh",
        translation: {
          en: "All greetings, prayers, and good things belong to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I testify that there is no god but Allah, and I testify that Muhammad is His servant and messenger.",
        },
        audio: "/audio/dua/228.mp3",
        reference: "Bukhari: 831, Muslim: 402",
      },
      {
        sourceId: 868,
        title: "Tashahud Dua (Attahiyatul Mubarakatus Solawatut Taiyibatu)",
        arabicText:
          "اَلتَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ",
        transliteration:
          "At-taḥiyyātu-l-mubārakātu-ṣ-ṣalawātu-ṭ-ṭayyibātu lillāh, as-salāmu ‘alayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh, as-salāmu ‘alaynā wa ‘alā ‘ibādi-llāhi-ṣ-ṣāliḥīn, ash-hadu an lā ilāha illa-llāhu wa ash-hadu anna Muḥammadan rasūlu-llāh",
        translation: {
          en: "All blessed greetings, prayers, and good things belong to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I testify that there is no god but Allah, and I testify that Muhammad is the messenger of Allah.",
        },
        audio: null,
        reference: "Muslim: 403",
      },
      {
        sourceId: 869,
        title: "Tashahhud Dua (Attahiyyaatu lillaahi ajjakiyaatu lillaahi)",
        arabicText:
          "اَلتَّحِيَّاتُ لِلَّهِ، اَلزَّاكِيَاتُ لِلَّهِ، اَلطَّيِّبَاتُ الصَّلَوَاتُ لِلَّهِ، اَلسَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، اَلسَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
        transliteration:
          "At-taḥiyyātu lillāh, az-zākiyātu lillāh, aṭ-ṭayyibātu-ṣ-ṣalawātu lillāh, as-salāmu ‘alayka ayyuha-n-nabiyyu wa raḥmatu-llāhi wa barakātuh, as-salāmu ‘alaynā wa ‘alā ‘ibādi-llāhi-ṣ-ṣāliḥīn, ash-hadu an lā ilāha illa-llāhu wa ash-hadu anna Muḥammadan ‘abduhu wa rasūluh",
        translation: {
          en: "All greetings belong to Allah, all purity belongs to Allah, all good prayers belong to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I testify that there is no god but Allah, and I testify that Muhammad is His servant and messenger.",
        },
        audio: null,
        reference: "Sahih (Albani). Nasa'i: 1289",
      },
    ],
  },
  {
    subCategory: "Prayers upon the Prophet (ﷺ) after tashahhud",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 229,
        title: "Durood Sharif (Durood Ibrahim)",
        arabicText:
          "اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اَللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
        transliteration:
          "Allāhumma ṣalli ‘alā Muḥammadin wa ‘alā āli Muḥammad, kamā ṣallayta ‘alā Ibrāhīma wa ‘alā āli Ibrāhīm, innaka ḥamīdun majīd. Allāhumma bārik ‘alā Muḥammadin wa ‘alā āli Muḥammad, kamā bārakta ‘alā Ibrāhīma wa ‘alā āli Ibrāhīm, innaka ḥamīdun majīd",
        translation: {
          en: "O Allah, send blessings upon Muhammad and the family of Muhammad, as You sent blessings upon Ibrahim and the family of Ibrahim — You are truly praiseworthy and glorious. O Allah, grant favor to Muhammad and the family of Muhammad, as You granted favor to Ibrahim and the family of Ibrahim — You are truly praiseworthy and glorious.",
        },
        audio: "/audio/dua/229.mp3",
        reference: "Bukhari: 3370, Muslim: 406",
      },
      {
        sourceId: 230,
        title: "Dua after Tashahhud (Darood Sharif)",
        arabicText:
          "اَللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَأَزْوَاجِهِ وَذُرِّيَّتِهِ، كَمَا صَلَّيْتَ عَلَى آلِ إِبْرَاهِيمَ، وَبَارِكْ عَلَى مُحَمَّدٍ وَأَزْوَاجِهِ وَذُرِّيَّتِهِ، كَمَا بَارَكْتَ عَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
        transliteration:
          "Allāhumma ṣalli ‘alā Muḥammadin wa azwājihi wa dhurriyyatih, kamā ṣallayta ‘alā āli Ibrāhīm, wa bārik ‘alā Muḥammadin wa azwājihi wa dhurriyyatih, kamā bārakta ‘alā āli Ibrāhīm, innaka ḥamīdun majīd",
        translation: {
          en: "O Allah, send blessings upon Muhammad, his wives, and his descendants, as You sent blessings upon the family of Ibrahim, and grant favor to Muhammad, his wives, and his descendants, as You granted favor to the family of Ibrahim — You are truly praiseworthy and glorious.",
        },
        audio: "/audio/dua/230.mp3",
        reference: "Bukhari: 3369, Muslim: 407",
      },
    ],
  },
  {
    subCategory: "Duas after the last tashahhud & before salam",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 231,
        title: "Dua Masura #1 (Allahumma Allif Baina Qulubina)",
        arabicText:
          "اَللَّهُمَّ أَلِّفْ بَيْنَ قُلُوبِنَا، وَأَصْلِحْ ذَاتَ بَيْنِنَا، وَاهْدِنَا سُبُلَ السَّلَامِ، وَنَجِّنَا مِنَ الظُّلُمَاتِ إِلَى النُّورِ",
        transliteration:
          "Allāhumma allif bayna qulūbinā, wa aṣliḥ dhāta baynina, wa-hdinā subula-s-salām, wa najjinā mina-ẓ-ẓulumāti ila-n-nūr",
        translation: {
          en: "O Allah, unite our hearts, mend the relations between us, guide us to the paths of peace, and bring us out of darkness into light.",
        },
        audio: "/audio/dua/231.mp3",
        reference: "Sahih (Albani). Abu Dawud: 969",
      },
      {
        sourceId: 232,
        title: "Dua e Masura #2 (Dua For Protection From Hellfire)",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ وَمِنْ عَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
        transliteration:
          "Allāhumma innī a‘ūdhu bika min ‘adhābi jahannam, wa min ‘adhābi-l-qabr, wa min fitnati-l-maḥyā wa-l-mamāti, wa min sharri fitnati-l-masīḥi-d-dajjāl",
        translation: {
          en: "O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of life and death, and from the evil of the trial of the False Messiah.",
        },
        audio: "/audio/dua/232.mp3",
        reference: "Muslim: 588",
      },
      {
        sourceId: 233,
        title: "Dua Masura #3 (Allahummaghfirli Ma Qaddamtu)",
        arabicText:
          "اَللَّهُمَّ اغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ، وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ، وَمَا أَسْرَفْتُ، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي، أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ، لَا إِلَهَ إِلَّا أَنْتَ",
        transliteration:
          "Allāhumma-ghfir lī mā qaddamtu wa mā akhkhart, wa mā asrartu wa mā a‘lant, wa mā asraft, wa mā anta a‘lamu bihi minnī, anta-l-muqaddimu wa anta-l-mu’akhkhir, lā ilāha illā ant",
        translation: {
          en: "O Allah, forgive what I have done before and what I have left for later, what I have hidden and what I have made known, what I have overstepped, and what You know about me better than I do. You are the One who brings forward and the One who delays; there is no god but You.",
        },
        audio: "/audio/dua/233.mp3",
        reference: "Muslim: 771",
      },
      {
        sourceId: 234,
        title: "Dua e Masura #4 (Allahumma Inni Zalamtu Nafsi)",
        arabicText:
          "اَللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration:
          "Allāhumma innī ẓalamtu nafsī ẓulman kathīrā, wa lā yaghfiru-dh-dhunūba illā ant, fa-ghfir lī maghfiratan min ‘indik, wa-rḥamnī, innaka anta-l-ghafūru-r-raḥīm",
        translation: {
          en: "O Allah, I have greatly wronged myself, and none forgives sins but You, so grant me forgiveness from You and have mercy on me — You are truly the Forgiving, the Merciful.",
        },
        audio: "/audio/dua/234.mp3",
        reference: "Bukhari: 834, Muslim: 2705",
      },
      {
        sourceId: 235,
        title: "Dua Mashura #5 (Allahumma Bi Ilmika Al Ghaib)",
        arabicText:
          "اَللَّهُمَّ بِعِلْمِكَ الْغَيْبَ، وَقُدْرَتِكَ عَلَى الْخَلْقِ، أَحْيِنِي مَا عَلِمْتَ الْحَيَاةَ خَيْرًا لِي، وَتَوَفَّنِي إِذَا عَلِمْتَ الْوَفَاةَ خَيْرًا لِي",
        transliteration:
          "Allāhumma bi-‘ilmika-l-ghayb, wa qudratika ‘ala-l-khalq, aḥyinī mā ‘alimta-l-ḥayāta khayran lī, wa tawaffanī idhā ‘alimta-l-wafāta khayran lī",
        translation: {
          en: "O Allah, by Your knowledge of the unseen and Your power over creation, keep me alive as long as You know life is good for me, and let me die when You know death is better for me.",
        },
        audio: "/audio/dua/235.mp3",
        reference: "Sahih (Albani). Nasa'i: 1305",
      },
      {
        sourceId: 236,
        title: "Dua Masurah #6 (Allahumma Inni As Aluka Min Khairi)",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا اسْتَعَاذَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
        transliteration:
          "Allāhumma innī as’aluka min khayri mā sa’alaka minhu nabiyyuka Muḥammadun ṣallallāhu ‘alayhi wa sallam, wa a‘ūdhu bika min sharri ma-sta‘ādha minhu nabiyyuka Muḥammadun ṣallallāhu ‘alayhi wa sallam",
        translation: {
          en: "O Allah, I ask You for the good that Your Prophet Muhammad, peace and blessings upon him, asked You for, and I seek refuge in You from the evil that Your Prophet Muhammad sought refuge from.",
        },
        audio: "/audio/dua/236.mp3",
        reference: "Sahih (Albani). Ibn Majah: 3846",
      },
      {
        sourceId: 237,
        title: "Dua For Protection From Punishment Of Grave, Hell And Dajjal",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ النَّارِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ",
        transliteration:
          "Allāhumma innī a‘ūdhu bika min ‘adhābi-l-qabr, wa min ‘adhābi-n-nār, wa min fitnati-l-maḥyā wa-l-mamāt, wa min sharri fitnati-l-masīḥi-d-dajjāl",
        translation: {
          en: "O Allah, I seek refuge in You from the punishment of the grave, from the punishment of the Fire, from the trials of life and death, and from the evil of the trial of the False Messiah.",
        },
        audio: "/audio/dua/237.mp3",
        reference: "Bukhari: 1377, Muslim: 584",
      },
      {
        sourceId: 238,
        title: "Dua at the end of Salah (Allahumma Inni A Uzu Bika)",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْبُخْلِ، وَأَعُوذُ بِكَ مِنَ الْجُبْنِ، وَأَعُوذُ بِكَ مِنْ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا، وَعَذَابِ الْقَبْرِ",
        transliteration:
          "Allāhumma innī a‘ūdhu bika mina-l-bukhl, wa a‘ūdhu bika mina-l-jubn, wa a‘ūdhu bika min an uradda ilā ardhali-l-‘umr, wa a‘ūdhu bika min fitnati-d-dunyā, wa ‘adhābi-l-qabr",
        translation: {
          en: "O Allah, I seek refuge in You from stinginess, I seek refuge in You from cowardice, I seek refuge in You from being returned to a feeble old age, and I seek refuge in You from the trial of this world and the punishment of the grave.",
        },
        audio: "/audio/dua/238.mp3",
        reference: "Bukhari: 6390",
      },
      {
        sourceId: 239,
        title: "Dua Masoora #7 (Allahumma A Inni Ala Zikrika)",
        arabicText: "اَللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allāhumma a‘innī ‘alā dhikrika, wa shukrika, wa ḥusni ‘ibādatik",
        translation: {
          en: "O Allah, help me to remember You, to thank You, and to worship You in the best way.",
        },
        audio: "/audio/dua/239.mp3",
        reference: "Sahih (Albani). Abu Dawud: 1522",
      },
      {
        sourceId: 240,
        title: "Dua Masoorah #8 (Allahumma Inni A Uzu Bika Minal)",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَالْهَرَمِ وَالْمَأْثَمِ وَالْمَغْرَمِ وَمِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ النَّارِ وَعَذَابِ النَّارِ وَمِنْ شَرِّ فِتْنَةِ الْغِنَى وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْفَقْرِ",
        transliteration:
          "Allāhumma innī a‘ūdhu bika mina-l-kasali wa-l-haram, wa-l-ma’thami wa-l-maghram, wa min fitnati-l-qabri wa ‘adhābi-l-qabr, wa min fitnati-n-nāri wa ‘adhābi-n-nār, wa min sharri fitnati-l-ghinā, wa a‘ūdhu bika min fitnati-l-faqr",
        translation: {
          en: "O Allah, I seek refuge in You from laziness, old age, sin, and debt; from the trial and punishment of the grave; from the trial and punishment of the Fire; from the evil of the trial of wealth; and I seek refuge in You from the trial of poverty.",
        },
        audio: "/audio/dua/240.mp3",
        reference: "Sahih (Albani). Nasa'i: 5536",
      },
      {
        sourceId: 241,
        title: "Dua For Jannah (Allahumma Inni As Aluka Al Jannah)",
        arabicText: "اَللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَأَعُوذُ بِكَ مِنَ النَّارِ",
        transliteration: "Allāhumma innī as’aluka-l-jannata wa a‘ūdhu bika mina-n-nār",
        translation: { en: "O Allah, I ask You for Paradise, and I seek refuge in You from the Fire." },
        audio: "/audio/dua/241.mp3",
        reference: "Sahih (Albani). Abu Dawud: 792",
      },
      {
        sourceId: 242,
        title: "Dua Masura #9 (Allahumma Inni As Aluka Ya Allah Bi'Annaka)",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ يَا اللَّهُ بِأَنَّكَ الْوَاحِدُ الْأَحَدُ الصَّمَدُ، الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ، أَنْ تَغْفِرَ لِي ذُنُوبِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration:
          "Allāhumma innī as’aluka yā Allāhu-l-wāḥidu-l-aḥadu-ṣ-ṣamad, alladhī lam yalid wa lam yūlad, wa lam yakun lahu kufuwan aḥad, an taghfira lī dhunūbī, innaka anta-l-ghafūru-r-raḥīm",
        translation: {
          en: "O Allah, I ask You — O Allah, the One, the Unique, the Self-Sufficient, who has not given birth nor been born, and to whom none is equal — to forgive my sins, for You are truly the Forgiving, the Merciful.",
        },
        audio: "/audio/dua/242.mp3",
        reference: "Sahih (Albani). Abu Dawud: 985",
      },
      {
        sourceId: 243,
        title: "Dua Masura #10",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّ لَكَ الْحَمْدَ لَا إِلَهَ إِلَّا أَنْتَ، الْمَنَّانُ، بَدِيعُ السَّمَوَاتِ وَالْأَرْضِ، يَا ذَا الْجَلَالِ وَالْإِكْرَامِ، يَا حَيُّ يَا قَيُّومُ، إِنِّي أَسْأَلُكَ",
        transliteration:
          "Allāhumma innī as’aluka bi-anna laka-l-ḥamda lā ilāha illā ant, al-mannān, badī‘u-s-samāwāti wa-l-arḍ, yā dha-l-jalāli wa-l-ikrām, yā ḥayyu yā qayyūm, innī as’aluk",
        translation: {
          en: "O Allah, I ask You, since all praise is Yours — there is no god but You, the Bestower, Originator of the heavens and the earth, O Possessor of majesty and honor, O Ever-Living, O Sustainer — I ask You.",
        },
        audio: "/audio/dua/243.mp3",
        reference: "Sahih (Albani). Abu Dawud: 1495",
      },
      {
        sourceId: 244,
        title: "Dua e Masura #11 (Allahumma Inni As Aluka Bi Annaka Antallah Full Dua)",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ بِأَنَّكَ أَنْتَ اللَّهُ، لَا إِلَهَ إِلَّا أَنْتَ، الْأَحَدُ الصَّمَدُ، الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
        transliteration:
          "Allāhumma innī as’aluka bi-annaka anta-llāh, lā ilāha illā ant, al-aḥadu-ṣ-ṣamad, alladhī lam yalid wa lam yūlad, wa lam yakun lahu kufuwan aḥad",
        translation: {
          en: "O Allah, I ask You, since You are Allah — there is no god but You, the One, the Self-Sufficient, who has not given birth nor been born, and to whom none is equal.",
        },
        audio: "/audio/dua/244.mp3",
        reference: "Sahih (Albani). Abu Dawud: 1493",
      },
      {
        sourceId: 245,
        title: "Dua E Masurah #12",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ يَا اللَّهُ الْأَحَدُ الصَّمَدُ الَّذِي لَمْ يَلِدْ وَلَمْ يُولَدْ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ أَنْ تَغْفِرَ لِي ذُنُوبِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration:
          "Allāhumma innī as’aluka yā Allāhu-l-aḥadu-ṣ-ṣamadu-lladhī lam yalid wa lam yūlad wa lam yakun lahu kufuwan aḥad an taghfira lī dhunūbī innaka anta-l-ghafūru-r-raḥīm",
        translation: {
          en: "O Allah, I ask You — O Allah, the One, the Self-Sufficient, who has not given birth nor been born, and to whom none is equal — to forgive my sins, for You are truly the Forgiving, the Merciful.",
        },
        audio: "/audio/dua/245.mp3",
        reference: "Sahih (Albani). Abu Dawud: 985",
      },
      {
        sourceId: 875,
        title: "Dua e Mashura",
        arabicText:
          "اَللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ، وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration:
          "Allāhumma innī ẓalamtu nafsī ẓulman kathīrā, wa lā yaghfiru-dh-dhunūba illā ant, fa-ghfir lī maghfiratan min ‘indik, wa-rḥamnī, innaka anta-l-ghafūru-r-raḥīm",
        translation: {
          en: "O Allah, I have greatly wronged myself, and none forgives sins but You, so grant me forgiveness from You and have mercy on me — You are truly the Forgiving, the Merciful.",
        },
        audio: null,
        reference: "Bukhari: 834, Muslim: 2705",
      },
    ],
  },
  {
    subCategory: "Duas in salat",
    suggestedPhase: "during",
    entries: [
      {
        sourceId: 246,
        title: "Dua in Salah (Allahu Akbar Kabira Walhamdulillah Kaseera)",
        arabicText:
          "اَللَّهُ أَكْبَرُ كَبِيرًا، وَالْحَمْدُ لِلَّهِ كَثِيرًا، وَسُبْحَانَ اللَّهِ بُكْرَةً وَأَصِيلًا",
        transliteration: "Allāhu akbaru kabīrā, wa-l-ḥamdu lillāhi kathīrā, wa subḥāna-llāhi bukratan wa aṣīlā",
        translation: {
          en: "Allah is the greatest, greatly. All praise is for Allah, abundantly. Glory be to Allah, morning and evening.",
        },
        audio: "/audio/dua/246.mp3",
        reference: "Muslim: 601",
      },
      {
        sourceId: 870,
        title: "Dua for sneezing in Salah",
        arabicText: "اَلْحَمْدُ لِلَّهِ",
        transliteration: "Al-ḥamdu lillāh",
        translation: { en: "All praise is for Allah." },
        audio: null,
        reference: "Bukhari: 799 (general principle for sneezing; said silently/quietly during prayer)",
      },
    ],
  },
  {
    subCategory: "Duas after Fajr and Maghrib",
    suggestedPhase: "after",
    entries: [
      {
        sourceId: 247,
        title: "Dua After Fajr Prayer (Allahumma Inni As Aluka Ilman)",
        arabicText: "اَللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        transliteration: "Allāhumma innī as’aluka ‘ilman nāfi‘ā, wa rizqan ṭayyibā, wa ‘amalan mutaqabbalā",
        translation: {
          en: "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds.",
        },
        audio: "/audio/dua/247.mp3",
        reference: "Sahih (Albani). Ibn Majah: 925",
      },
      {
        sourceId: 248,
        title: "Dua After Fajr and Maghrib #1",
        arabicText:
          "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (عَشْرَ مَرَّاتٍ)",
        transliteration:
          "Lā ilāha illa-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamd, yuḥyī wa yumīt, wa huwa ‘alā kulli shay’in qadīr (×10)",
        translation: {
          en: "There is no god but Allah alone, with no partner. His is all sovereignty and all praise; He gives life and causes death, and He has power over all things. (said ten times)",
        },
        audio: "/audio/dua/248.mp3",
        reference: "Sahih (Albani). Tirmidhi: 3534",
      },
      {
        sourceId: 249,
        title: "Dua After Fajr and Maghrib #2 (Allahumma Ajirni Minan Naar)",
        arabicText: "اَللَّهُمَّ أَجِرْنِي مِنَ النَّارِ (سَبْعَ مَرَّاتٍ)",
        transliteration: "Allāhumma ajirnī mina-n-nār (×7)",
        translation: { en: "O Allah, protect me from the Fire. (said seven times)" },
        audio: "/audio/dua/249.mp3",
        reference: "Sahih (Albani). Abu Dawud: 5079",
      },
    ],
  },
  {
    subCategory: "Masnun Dhikr after obligatory prayers",
    suggestedPhase: "after",
    entries: [
      {
        sourceId: 250,
        title: "Dua After Salah (Astaghfirullah)",
        arabicText: "أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا)",
        transliteration: "Astaghfirullāh (×3)",
        translation: { en: "I seek Allah's forgiveness. (said three times)" },
        audio: "/audio/dua/250.mp3",
        reference: "Sahih Muslim: 591",
      },
      {
        sourceId: 251,
        title: "Dua After Salat (Allahumma Antas Salam Wa Minkas Salam Dua)",
        arabicText: "اَللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        transliteration: "Allāhumma anta-s-salāmu wa minka-s-salām, tabārakta yā dha-l-jalāli wa-l-ikrām",
        translation: {
          en: "O Allah, You are Peace, and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
        },
        audio: "/audio/dua/251.mp3",
        reference: "Muslim: 591",
      },
      {
        sourceId: 252,
        title: "Dua After Salam",
        arabicText:
          "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
        transliteration:
          "Lā ilāha illa-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamd, wa huwa ‘alā kulli shay’in qadīr, Allāhumma lā māni‘a limā a‘ṭayt, wa lā mu‘ṭiya limā mana‘t, wa lā yanfa‘u dha-l-jaddi minka-l-jadd",
        translation: {
          en: "There is no god but Allah alone, with no partner. His is all sovereignty and all praise, and He has power over all things. O Allah, none can withhold what You give, none can give what You withhold, and no one's status can benefit them against You.",
        },
        audio: "/audio/dua/252.mp3",
        reference: "Bukhari: 844, Muslim: 593",
      },
      {
        sourceId: 253,
        title: "Dua After Salam in Prayer",
        arabicText: "اَللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allāhumma a‘innī ‘alā dhikrika, wa shukrika, wa ḥusni ‘ibādatik",
        translation: {
          en: "O Allah, help me to remember You, to thank You, and to worship You in the best way.",
        },
        audio: "/audio/dua/253.mp3",
        reference: "Sahih (Albani). Abu Dawud: 1522",
      },
      {
        sourceId: 254,
        title: "Ayatul Kursi - Surah Al-Baqarah 2:255",
        arabicText:
          "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        transliteration:
          "Allāhu lā ilāha illā huwa-l-ḥayyu-l-qayyūm, lā ta’khudhuhu sinatun wa lā nawm, lahu mā fi-s-samāwāti wa mā fi-l-arḍ, man dha-lladhī yashfa‘u ‘indahu illā bi-idhnih, ya‘lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay’in min ‘ilmihi illā bimā shā’, wasi‘a kursiyyuhu-s-samāwāti wa-l-arḍ, wa lā ya’ūduhu ḥifẓuhumā, wa huwa-l-‘aliyyu-l-‘aẓīm",
        translation: {
          en: "Allah — there is no god but Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness nor sleep overtakes Him. To Him belongs all that is in the heavens and all that is on the earth. Who can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His throne extends over the heavens and the earth, and preserving them does not tire Him. He is the Most High, the Most Great.",
        },
        audio: null,
        reference: "Surah Al-Baqarah 2:255; Sahih (Albani). Nasa'i (Al-Kubra)",
      },
      {
        sourceId: 255,
        title: "3 Qul Surahs (Surah Ikhlas, Surah Falaq And Surah Nas)",
        arabicText:
          "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ\n\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ\n\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
        transliteration:
          "Qul huwa-llāhu aḥad, Allāhu-ṣ-ṣamad, lam yalid wa lam yūlad, wa lam yakun lahu kufuwan aḥad. // Qul a‘ūdhu bi-rabbi-l-falaq, min sharri mā khalaq, wa min sharri ghāsiqin idhā waqab, wa min sharri-n-naffāthāti fi-l-‘uqad, wa min sharri ḥāsidin idhā ḥasad. // Qul a‘ūdhu bi-rabbi-n-nās, maliki-n-nās, ilāhi-n-nās, min sharri-l-waswāsi-l-khannās, alladhī yuwaswisu fī ṣudūri-n-nās, mina-l-jinnati wa-n-nās",
        translation: {
          en: "[Surah Al-Ikhlas] Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent. [Surah Al-Falaq] Say: I seek refuge in the Lord of daybreak, from the evil of what He created, from the evil of darkness when it settles, from the evil of those who blow on knots, and from the evil of an envier when he envies. [Surah An-Nas] Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the breasts of mankind, from among the jinn and mankind.",
        },
        audio: "/audio/dua/255.mp3",
        reference: "Sahih (Albani). Abu Dawud: 1523; recited three times each after Fajr and Maghrib",
      },
    ],
  },
  {
    subCategory: "Duas after salaam",
    suggestedPhase: "after",
    entries: [
      {
        sourceId: 256,
        title: "Subhanallah, Alhamdulillah, Allahu Akbar 33 Times",
        arabicText: "سُبْحَانَ اللَّهِ (٣٣)، الْحَمْدُ لِلَّهِ (٣٣)، اللَّهُ أَكْبَرُ (٣٤)",
        transliteration: "Subḥāna-llāh (×33), al-ḥamdu lillāh (×33), Allāhu akbar (×34)",
        translation: {
          en: "Glory be to Allah (33 times), all praise is for Allah (33 times), Allah is the greatest (34 times) — completing one hundred.",
        },
        audio: "/audio/dua/256.mp3",
        reference: "Muslim: 596",
      },
      {
        sourceId: 257,
        title: "Powerful dhikr after salah",
        arabicText:
          "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ (ثَلَاثًا وَثَلَاثِينَ مَرَّةً)",
        transliteration: "Subḥāna-llāh wa-l-ḥamdu lillāhi wa lā ilāha illa-llāhu wa-llāhu akbar (×33)",
        translation: {
          en: "Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the greatest. (said thirty-three times)",
        },
        audio: "/audio/dua/257.mp3",
        reference: "Muslim 1/418, no. 597",
      },
      {
        sourceId: 258,
        title: "Dua at end of Salah",
        arabicText:
          "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ",
        transliteration:
          "Lā ilāha illa-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ‘alā kulli shay’in qadīr, lā ḥawla wa lā quwwata illā billāh, lā ilāha illa-llāh, wa lā na‘budu illā iyyāh, lahu-n-ni‘matu wa lahu-l-faḍlu wa lahu-th-thanā’u-l-ḥasan",
        translation: {
          en: "There is no god but Allah alone, with no partner. His is all sovereignty and all praise, and He has power over all things. There is no power nor strength except through Allah. There is no god but Allah, and we worship none but Him. To Him belongs grace, favor, and beautiful praise.",
        },
        audio: "/audio/dua/258.mp3",
        reference: "Muslim: 594",
      },
      {
        sourceId: 259,
        title: "Dua at the end of Salah",
        arabicText: "لَا إِلَهَ إِلَّا اللَّهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ",
        transliteration: "Lā ilāha illa-llāhu mukhliṣīna lahu-d-dīna wa law kariha-l-kāfirūn",
        translation: {
          en: "There is no god but Allah; we devote our worship sincerely to Him alone, even if those who disbelieve dislike it.",
        },
        audio: "/audio/dua/259.mp3",
        reference: "Muslim: 594",
      },
      {
        sourceId: 260,
        title: "Dua After Salah (Allahumma a inni ala zikrika wa shukrika)",
        arabicText: "اَللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
        transliteration: "Allāhumma a‘innī ‘alā dhikrika, wa shukrika, wa ḥusni ‘ibādatik",
        translation: {
          en: "O Allah, help me to remember You, to thank You, and to worship You in the best way.",
        },
        audio: "/audio/dua/260.mp3",
        reference: "Sahih (Albani). Abu Dawud: 1522",
      },
      {
        sourceId: 261,
        title: "Dua After Namaz",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
        transliteration: "Allāhumma innī as’aluka ‘ilman nāfi‘ā, wa rizqan ṭayyibā, wa ‘amalan mutaqabbalā",
        translation: {
          en: "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds.",
        },
        audio: "/audio/dua/261.mp3",
        reference: "Sahih (Albani). Ibn Majah: 925",
      },
      {
        sourceId: 262,
        title: "Dua at the end of Namaz",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ، عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ، وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ، عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
        transliteration:
          "Allāhumma innī as’aluka mina-l-khayri kullih, ‘ājilihi wa ājilih, mā ‘alimtu minhu wa mā lam a‘lam, wa a‘ūdhu bika mina-sh-sharri kullih, ‘ājilihi wa ājilih, mā ‘alimtu minhu wa mā lam a‘lam",
        translation: {
          en: "O Allah, I ask You for all good, immediate and delayed, what I know of it and what I do not know, and I seek refuge in You from all evil, immediate and delayed, what I know of it and what I do not know.",
        },
        audio: "/audio/dua/262.mp3",
        reference: "Sahih (Albani). Ibn Majah: 3846",
      },
      {
        sourceId: 263,
        title: "Dua After Prayer",
        arabicText:
          "اَللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        transliteration: "Allāhumma innī as’aluka-l-hudā wa-t-tuqā wa-l-‘afāfa wa-l-ghinā",
        translation: {
          en: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
        },
        audio: "/audio/dua/263.mp3",
        reference: "Muslim: 2721",
      },
      {
        sourceId: 264,
        title: "Dua After Salat (Allahummaghfirli Warhamni Wa Tub Alayya)",
        arabicText:
          "اَللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        transliteration: "Allāhumma-ghfir lī, wa-rḥamnī, wa tub ‘alayy, innaka anta-t-tawwābu-r-raḥīm",
        translation: {
          en: "O Allah, forgive me, have mercy on me, and accept my repentance; You are truly the Ever-Accepting of repentance, the Merciful.",
        },
        audio: "/audio/dua/264.mp3",
        reference: "Sahih (Albani). Ibn Majah: 3814",
      },
      {
        sourceId: 265,
        title: "Dua for After Namaz",
        arabicText: "رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ",
        transliteration: "Rabbi a‘innī wa lā tu‘in ‘alayy",
        translation: { en: "My Lord, help me, and do not let anyone be helped against me." },
        audio: "/audio/dua/265.mp3",
        reference: "Sahih (Albani). Mishkat: 2477",
      },
      {
        sourceId: 266,
        title: "Dua for After Salah",
        arabicText: "اَللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ، وَأَعُوذُ بِكَ مِنَ النَّارِ",
        transliteration: "Allāhumma innī as’aluka-l-jannata, wa a‘ūdhu bika mina-n-nār",
        translation: { en: "O Allah, I ask You for Paradise, and I seek refuge in You from the Fire." },
        audio: "/audio/dua/266.mp3",
        reference: "Sahih (Albani). Abu Dawud: 792",
      },
      {
        sourceId: 267,
        title: "Dhikr After Salah",
        arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
        transliteration: "Subḥāna-llāhi wa biḥamdih, subḥāna-llāhi-l-‘aẓīm",
        translation: {
          en: "Glory and praise be to Allah; glory be to Allah, the Magnificent.",
        },
        audio: "/audio/dua/267.mp3",
        reference: "Bukhari: 6406, Muslim: 2694",
      },
      {
        sourceId: 268,
        title: "Namaz After Dua",
        arabicText:
          "اَللَّهُمَّ أَصْلِحْ لِي دِينِيَ الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
        transliteration:
          "Allāhumma aṣliḥ lī dīniya-lladhī huwa ‘iṣmatu amrī, wa aṣliḥ lī dunyāya-llatī fīhā ma‘āshī, wa aṣliḥ lī ākhiratiya-llatī fīhā ma‘ādī",
        translation: {
          en: "O Allah, set right my religion which safeguards my affairs, set right my worldly life in which my livelihood lies, and set right my Hereafter to which I will return.",
        },
        audio: "/audio/dua/268.mp3",
        reference: "Muslim: 2720",
      },
    ],
  },
  {
    subCategory: "Dua after Fajr prayer",
    suggestedPhase: "after",
    entries: [
      {
        sourceId: 269,
        title: "Dua After Fajr Salah",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "Hasan (Albani). Tirmidhi: 586",
        isCitationOnly: true,
      },
      {
        sourceId: 270,
        title: "Dua After Fajr Namaz",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "Muslim: 670",
        isCitationOnly: true,
      },
    ],
  },
  {
    subCategory: "Other duas related to salat",
    suggestedPhase: null,
    entries: [
      {
        sourceId: 271,
        title: "Reply to specific Ayah in Salah",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "[1] Ahmad, Abu Dawud: 883, Sahih (Albani) [2] Bayhaqi, Abu Dawud: 884, Sahih (Albani)",
        isCitationOnly: true,
      },
      {
        sourceId: 272,
        title: "Reply to specific Ayat in Salat",
        arabicText: null,
        transliteration: null,
        translation: null,
        audio: null,
        reference: "Sahih (Albani). Abu Dawud: 884",
        isCitationOnly: true,
      },
    ],
  },
];
