export type LanguageOption = {
  name: string;
  value: string;
  isDefault?: boolean;
};

export const languages: LanguageOption[] = [
  { name: "Default (System Language)", value: "Default", isDefault: true },
  { name: "English", value: "English" },
  { name: "Hausa", value: "Hausa" },
  { name: "Yoruba", value: "Yoruba" },
  { name: "Igbo", value: "Igbo" },
];
