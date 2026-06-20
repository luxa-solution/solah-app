import { AdhkarGroup } from "@/features-adhkar/types";

import { adhkarImages } from "./adhkar-images";

export const adhkarAfter: AdhkarGroup = {
  type: "after",
  items: [
    {
      id: "a1_tasleem",
      type: "after",
      title: "After finishing the prayer (Tasleem)",
      cardTitle: "Post-Tasleem",
      illustration: adhkarImages.afterSolah,
      tags: ["after_tasleem", "dhikr", "primary"],
      entries: [
        {
          arabicText: "أَسْتَغْفِرُ اللَّهَ (ثَلَاثًا)",
          transliteration: "Astaghfirullāh (×3)",
          translation: { en: "I seek Allah's forgiveness. (said three times)" },
          audio: "/audio/adhkar/250.mp3",
          reference: { source: "Muslim: 591", grade: "sahih" },
          sourceId: 250,
        },
        {
          arabicText:
            "اَللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
          transliteration:
            "Allāhumma anta-s-salāmu wa minka-s-salām, tabārakta yā dha-l-jalāli wa-l-ikrām",
          translation: {
            en: "O Allah, You are Peace, and from You comes peace. Blessed are You, O Possessor of majesty and honor.",
          },
          audio: "/audio/adhkar/251.mp3",
          reference: { source: "Muslim: 591", grade: "sahih" },
          sourceId: 251,
        },
      ],
    },
    {
      id: "a2_tawheed",
      type: "after",
      title: "Declarations of Monotheism (Tawheed)",
      cardTitle: "Monotheism Dhikr",
      illustration: adhkarImages.afterSolah,
      tags: ["dhikr", "primary"],
      entries: [
        {
          arabicText:
            "لَا إِلَهَ إِلَّا اللَّهَ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، اَللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
          transliteration:
            "Lā ilāha illa-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamd, wa huwa ‘alā kulli shay’in qadīr, Allāhumma lā māni‘a limā a‘ṭayt, wa lā mu‘ṭiya limā mana‘t, wa lā yanfa‘u dha-l-jaddi minka-l-jadd",
          translation: {
            en: "There is no god but Allah alone, with no partner. His is all sovereignty and all praise, and He has power over all things. O Allah, none can withhold what You give, none can give what You withhold, and no one's status can benefit them against You.",
          },
          audio: "/audio/adhkar/252.mp3",
          reference: { source: "Bukhari: 844, Muslim: 593", grade: "sahih" },
          sourceId: 252,
        },
        {
          arabicText:
            "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ",
          transliteration:
            "Lā ilāha illa-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamdu wa huwa ‘alā kulli shay’in qadīr, lā ḥawla wa lā quwwata illā billāh, lā ilāha illa-llāh, wa lā na‘budu illā iyyāh, lahu-n-ni‘matu wa lahu-l-faḍlu wa lahu-th-thanā’u-l-ḥasan",
          translation: {
            en: "There is no god but Allah alone, with no partner. His is all sovereignty and all praise, and He has power over all things. There is no power nor strength except through Allah. There is no god but Allah, and we worship none but Him. To Him belongs grace, favor, and beautiful praise.",
          },
          audio: "/audio/adhkar/258.mp3",
          reference: { source: "Muslim: 594", grade: "sahih" },
          sourceId: 258,
          isAlternate: true,
        },
        {
          arabicText:
            "لَا إِلَهَ إِلَّا اللَّهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ",
          transliteration: "Lā ilāha illa-llāhu mukhliṣīna lahu-d-dīna wa law kariha-l-kāfirūn",
          translation: {
            en: "There is no god but Allah; we devote our worship sincerely to Him alone, even if those who disbelieve dislike it.",
          },
          audio: "/audio/adhkar/259.mp3",
          reference: { source: "Muslim: 594", grade: "sahih" },
          sourceId: 259,
          isAlternate: true,
        },
      ],
    },
    {
      id: "a3_kursi",
      type: "after",
      title: "Ayatul Kursi (Protection Verse)",
      cardTitle: "Ayatul Kursi",
      illustration: adhkarImages.afterSolah,
      tags: ["dhikr", "protection", "primary"],
      entries: [
        {
          arabicText:
            "اللَّهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          transliteration:
            "Allāhu lā ilāha illā huwa-l-ḥayyu-l-qayyūm, lā ta’khudhuhu sinatun wa lā nawm, lahu mā fi-s-samāwāti wa mā fi-l-arḍ, man dha-lladhī yashfa‘u ‘indahu illā bi-idhnih, ya‘lamu mā bayna aydīhim wa mā khalfahum, wa lā yuḥīṭūna bi-shay’in min ‘ilmihi illā bimā shā’, wasi‘a kursiyyuhu-s-samāwāti wa-l-arḍ, wa lā ya’ūduhu ḥifẓuhumā, wa huwa-l-‘aliyyu-l-‘aẓīm",
          translation: {
            en: "Allah — there is no god but Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness nor sleep overtakes Him. To Him belongs all that is in the heavens and all that is on the earth. Who can intercede with Him except by His permission? He knows what is before them and what is behind them, and they encompass nothing of His knowledge except what He wills. His throne extends over the heavens and the earth, and preserving them does not tire Him. He is the Most High, the Most Great.",
          },
          audio: null,
          reference: { source: "Surah Al-Baqarah 2:255, Nasa'i", grade: "sahih" },
          sourceId: 254,
        },
      ],
    },
    {
      id: "a4_quls",
      type: "after",
      title: "The Three Protection Surahs (Quls)",
      cardTitle: "The Three Quls",
      illustration: adhkarImages.afterSolah,
      tags: ["dhikr", "protection", "primary"],
      entries: [
        {
          arabicText:
            "قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ\n\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ\n\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ",
          transliteration:
            "Qul huwa-llāhu aḥad, Allāhu-ṣ-ṣamad, lam yalid wa lam yūlad, wa lam yakun lahu kufuwan aḥad. // Qul a‘ūdhu bi-rabbi-l-falaq, min sharri mā khalaq, wa min sharri ghāsiqin idhā waqab, wa min sharri-n-naffāthāti fi-l-‘uqad, wa min sharri ḥāsidin idhā ḥasad. // Qul a‘ūdhu bi-rabbi-n-nās, maliki-n-nās, ilāhi-n-nās, min sharri-l-waswāsi-l-khannās, alladhī yuwaswisu fī ṣudūri-n-nās, mina-l-jinnati wa-n-nās",
          translation: {
            en: "[Surah Al-Ikhlas] Say: He is Allah, the One. Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent. [Surah Al-Falaq] Say: I seek refuge in the Lord of daybreak, from the evil of what He created, from the evil of darkness when it settles, from the evil of those who blow on knots, and from the evil of an envier when he envies. [Surah An-Nas] Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer, who whispers into the breasts of mankind, from among the jinn and mankind.",
          },
          audio: "/audio/adhkar/255.mp3",
          reference: {
            source: "Abu Dawud: 1523; recited three times each after Fajr and Maghrib",
            grade: "sahih",
          },
          sourceId: 255,
        },
      ],
    },
    {
      id: "a5_tasbeeh",
      type: "after",
      title: "Post-Salah Tasbeeh counting formulas",
      cardTitle: "Post-Salah Tasbeeh",
      illustration: adhkarImages.afterSolah,
      tags: ["tasbeeh", "primary"],
      entries: [
        {
          arabicText: "سُبْحَانَ اللَّهِ (٣٣)، الْحَمْدُ لِلَّهِ (٣٣)، اللَّهُ أَكْبَرُ (٣٤)",
          transliteration: "Subḥāna-llāh (×33), al-ḥamdu lillāh (×33), Allāhu akbar (×34)",
          translation: {
            en: "Glory be to Allah (33 times), all praise is for Allah (33 times), Allah is the greatest (34 times) — completing one hundred.",
          },
          audio: "/audio/adhkar/256.mp3",
          reference: { source: "Muslim: 596", grade: "sahih" },
          sourceId: 256,
        },
        {
          arabicText:
            "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ (ثَلَاثًا وَثَلَاثِينَ مَرَّةً)",
          transliteration:
            "Subḥāna-llāh wa-l-ḥamdu lillāhi wa lā ilāha illa-llāhu wa-llāhu akbar (×33)",
          translation: {
            en: "Glory be to Allah, all praise is for Allah, there is no god but Allah, and Allah is the greatest. (said thirty-three times)",
          },
          audio: "/audio/adhkar/257.mp3",
          reference: { source: "Muslim: 597", grade: "sahih" },
          sourceId: 257,
          isAlternate: true,
        },
        {
          arabicText: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
          transliteration: "Subḥāna-llāhi wa biḥamdih, subḥāna-llāhi-l-‘aẓīm",
          translation: {
            en: "Glory and praise be to Allah; glory be to Allah, the Magnificent.",
          },
          audio: "/audio/adhkar/267.mp3",
          reference: { source: "Bukhari: 6406, Muslim: 2694", grade: "sahih" },
          sourceId: 267,
          isAlternate: true,
        },
      ],
    },
    {
      id: "a6_fajr_maghrib",
      type: "after",
      title: "Duas after Fajr and Maghrib Prayers",
      cardTitle: "Fajr & Maghrib Duas",
      illustration: adhkarImages.afterSolah,
      tags: ["fajr", "maghrib", "dhikr"],
      entries: [
        {
          arabicText:
            "اَللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا",
          transliteration:
            "Allāhumma innī as’aluka ‘ilman nāfi‘ā, wa rizqan ṭayyibā, wa ‘amalan mutaqabbalā",
          translation: {
            en: "O Allah, I ask You for beneficial knowledge, good provision, and acceptable deeds. (Recited after Fajr)",
          },
          audio: "/audio/adhkar/247.mp3",
          reference: { source: "Ibn Majah: 925", grade: "sahih" },
          sourceId: 247,
        },
        {
          arabicText:
            "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ (عَشْرَ مَرَّاتٍ)",
          transliteration:
            "Lā ilāha illa-llāhu waḥdahu lā sharīka lah, lahu-l-mulku wa lahu-l-ḥamd, yuḥyī wa yumīt, wa huwa ‘alā kulli shay’in qadīr (×10)",
          translation: {
            en: "There is no god but Allah alone, with no partner. His is all sovereignty and all praise; He gives life and causes death, and He has power over all things. (said ten times)",
          },
          audio: "/audio/adhkar/248.mp3",
          reference: { source: "Tirmidhi: 3534", grade: "sahih" },
          sourceId: 248,
          isAlternate: true,
        },
        {
          arabicText: "اَللَّهُمَّ أَجِرْنِي مِنَ النَّارِ (سَبْعَ مَرَّاتٍ)",
          transliteration: "Allāhumma ajirnī mina-n-nār (×7)",
          translation: { en: "O Allah, protect me from the Fire. (said seven times)" },
          audio: "/audio/adhkar/249.mp3",
          reference: { source: "Abu Dawud: 5079", grade: "sahih" },
          sourceId: 249,
          isAlternate: true,
        },
      ],
    },
    {
      id: "a7_optional_duas",
      type: "after",
      title: "Optional/Prophetic post-prayer supplications",
      cardTitle: "Optional Duas",
      illustration: adhkarImages.afterSolah,
      tags: ["supplication", "optional"],
      entries: [
        {
          arabicText: "اَللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ",
          transliteration: "Allāhumma a‘innī ‘alā dhikrika, wa shukrika, wa ḥusni ‘ibādatik",
          translation: {
            en: "O Allah, help me to remember You, to thank You, and to worship You in the best way.",
          },
          audio: "/audio/adhkar/253.mp3",
          reference: { source: "Abu Dawud: 1522", grade: "sahih" },
          sourceId: 253,
        },
        {
          arabicText:
            "اَللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ، عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ، وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ، عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ",
          transliteration:
            "Allāhumma innī as’aluka mina-l-khayri kullih, ‘ājilihi wa ājilih, mā ‘alimtu minhu wa mā lam a‘lam, wa a‘ūdhu bika mina-sh-sharri kullih, ‘ājilihi wa ājilih, mā ‘alimtu minhu wa mā lam a‘lam",
          translation: {
            en: "O Allah, I ask You for all good, immediate and delayed, what I know of it and what I do not know, and I seek refuge in You from all evil, immediate and delayed, what I know of it and what I do not know.",
          },
          audio: "/audio/adhkar/262.mp3",
          reference: { source: "Ibn Majah: 3846", grade: "sahih" },
          sourceId: 262,
          isAlternate: true,
        },
        {
          arabicText: "اَللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
          transliteration: "Allāhumma innī as’aluka-l-hudā wa-t-tuqā wa-l-‘afāfa wa-l-ghinā",
          translation: {
            en: "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency.",
          },
          audio: "/audio/adhkar/263.mp3",
          reference: { source: "Muslim: 2721", grade: "sahih" },
          sourceId: 263,
          isAlternate: true,
        },
        {
          arabicText:
            "اَللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
          transliteration:
            "Allāhumma-ghfir lī, wa-rḥamnī, wa tub ‘alayy, innaka anta-t-tawwābu-r-raḥīm",
          translation: {
            en: "O Allah, forgive me, have mercy on me, and accept my repentance; You are truly the Ever-Accepting of repentance, the Merciful.",
          },
          audio: "/audio/adhkar/264.mp3",
          reference: { source: "Ibn Majah: 3814", grade: "sahih" },
          sourceId: 264,
          isAlternate: true,
        },
        {
          arabicText: "رَبِّ أَعِنِّي وَلَا تُعِنْ عَلَيَّ",
          transliteration: "Rabbi a‘innī wa lā tu‘in ‘alayy",
          translation: { en: "My Lord, help me, and do not let anyone be helped against me." },
          audio: "/audio/adhkar/265.mp3",
          reference: { source: "Mishkat: 2477", grade: "sahih" },
          sourceId: 265,
          isAlternate: true,
        },
        {
          arabicText:
            "اَللَّهُمَّ أَصْلِحْ لِي دِينِيَ الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
          transliteration:
            "Allāhumma aṣliḥ lī dīniya-lladhī huwa ‘iṣmatu amrī, wa aṣliḥ lī dunyāya-llatī fīhā ma‘āshī, wa aṣliḥ lī ākhiratiya-llatī fīhā ma‘ādī",
          translation: {
            en: "O Allah, set right my religion which safeguards my affairs, set right my worldly life in which my livelihood lies, and set right my Hereafter to which I will return.",
          },
          audio: "/audio/adhkar/268.mp3",
          reference: { source: "Muslim: 2720", grade: "sahih" },
          sourceId: 268,
          isAlternate: true,
        },
      ],
    },
    {
      id: "a8_leaving_mosque",
      type: "after",
      title: "Upon leaving the Mosque",
      cardTitle: "Leaving Mosque",
      illustration: adhkarImages.afterSolah,
      tags: ["mosque_after", "leaving", "primary"],
      entries: [
        {
          arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
          transliteration: "Allāhumma innī as’aluka min faḍlik",
          translation: { en: "O Allah, I ask You for Your bounty." },
          audio: "/audio/adhkar/176.mp3",
          reference: { source: "Muslim: 713", grade: "sahih" },
          sourceId: 176,
        },
      ],
    },
  ],
};

export const totalAdhkarAfter = adhkarAfter.items.length;
