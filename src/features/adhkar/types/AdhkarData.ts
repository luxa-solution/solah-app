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
