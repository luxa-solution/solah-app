import { commonAudios, stepImages } from "../media";

import { SequenceItemInput } from "./opening";

export const sujoodBlock: SequenceItemInput[] = [
  {
    title: "Going for Sujud",
    instruction: { en: "Say the takbir and go to prostration." },
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
    title: "1st Sujud (Prostration)",
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
    title: "Sitting (Between Sujud)",
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
    title: "2nd Sujud (Prostration)",
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
