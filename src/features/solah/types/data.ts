import { SolahName } from "./enum";

type Media = {
  audio?: string; // e.g., "/audio/solah/subhi/ruku.mp3"
  image?: string; // e.g., "/assets/solah/subhi/step-2-ruku.png"
};

type Translation = {
  en?: string;
};

// SOLAH DATA

export type SolahEntry = {
  arabicText: string;
  transliteration: string;
  translation: Translation;
  media?: Media;
};

// Each item = one step of the prayer
export type SolahItem = {
  id: string;
  solah: SolahName; // which prayer this step belongs to
  title: string; // step name (e.g., "Qiyām", "Rukūʿ")
  instruction?: Translation;
  entries: SolahEntry[]; // dhikr/dua recited in that step
};

export type SolahGroup = {
  solah: SolahName;
  description: Translation;
  illustration: any;
  rakaat: number;
  items: SolahItem[]; // ordered steps; order is by appearance in the array
};

// ADHAN DATA

export type GuideEntry = {
  arabicText?: string;
  transliteration?: string;
  translation?: Translation;
  media?: Media;
};

export type GuideItem = {
  id: string;
  solah: string;
  title: string;
  instruction: Translation;
  entries: GuideEntry[];
};

export type GuideGroup = {
  solah: string;
  description: Translation;
  illustration?: any;
  rakaat?: number;
  items: GuideItem[];
};
