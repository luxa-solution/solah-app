import { ImageSourcePropType } from "react-native";

import { AdhkarTag } from "@/features-adhkar/data";

type Translation = {
  en: string;
};

type AdhkarReference = {
  source: string;
  grade?: "sahih" | "hasan" | "daif";
};

export type AdhkarEntry = {
  arabicText: string;
  transliteration: string;
  translation: Translation;
  reference?: AdhkarReference;
  audio?: string | null; // local path or remote URL, e.g. require("@/assets/audio/adhkar/175.mp3")
  sourceId?: number; // masnun-dua dua_id, lets you re-sync/update from upstream later
  isCitationOnly?: boolean; // true if this entry is only a citation (no actual dua text)
  isAlternate?: boolean; // true if this entry is an alternate version of the dua (not the primary version)
};

export type AdhkarType = "before" | "during" | "after";

export type AdhkarItem = {
  id: string;
  type: AdhkarType;
  title: string;
  entries: AdhkarEntry[];

  // For home screen autoselection
  cardTitle?: string; // Optional shortened title (for home screen card)
  illustration: ImageSourcePropType;
  tags?: AdhkarTag[];
};

export type AdhkarGroup = {
  type: AdhkarType;
  items: AdhkarItem[];
};
