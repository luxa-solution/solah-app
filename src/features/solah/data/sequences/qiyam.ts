import type { SolahName } from "@/features-solah/types";

import { commonAudios, specificAudios, stepImages } from "../media";

import { SequenceItemInput } from "./opening";

export function qiyamCore(solah: SolahName): SequenceItemInput[] {
  return [
    {
      title: "Seeking Refuge (Taʿawwudh)",
      instruction: { en: "Seek refuge from Shaytan before recitation." },
      entries: [
        {
          arabicText: "أَعُوذُ بِاللّٰهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
          transliteration: "Aʿūdhu billāhi minash-shayṭānir-rajīm",
          translation: { en: "I seek refuge in Allah from the accursed devil." },
          media: { image: stepImages.qiyam, audio: commonAudios.taawwudh },
        },
      ],
    },
    {
      title: "Recitation: Surat al-Fatihah",
      instruction: { en: "Recite al-Fatihah calmly." },
      entries: [
        {
          arabicText: "بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ …",
          transliteration: "Bismillāhir-Raḥmānir-Raḥīm …",
          translation: { en: "Surat al-Fatihah." },
          media: { image: stepImages.qiyam, audio: specificAudios[solah].qiyamFatiha },
        },
      ],
    },
    {
      title: "Amin",
      instruction: { en: "Say Amin after al-Fatihah." },
      entries: [
        {
          arabicText: "آمِينَ",
          transliteration: "Āmīn",
          translation: { en: "O Allah, accept." },
          media: { image: stepImages.qiyam, audio: commonAudios.amin },
        },
      ],
    },
    {
      title: "Recitation: Short Surah",
      instruction: { en: "Recite a short surah or verses after al-Fatihah." },
      entries: [
        {
          arabicText: "",
          transliteration: "",
          translation: { en: "Recite a convenient portion from the Qur’an." },
          media: { image: stepImages.qiyam },
        },
      ],
    },
  ];
}
