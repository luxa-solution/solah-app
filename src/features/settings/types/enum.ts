import { timezones } from "../constants/timeZone";

export type SettingsType =
  | "calmethod"
  | "timezone"
  | "location"
  | "arabicfontsize"
  | "arabicfontstyle"
  | "solahtimenotif"
  | "sound"
  | "language"
  | "calendarformat"
  | "timeformat";

export type TimeZone = (typeof timezones)[number]["timezone"];
export type ArabicFontSizeOptions = number;
export type ArabicFontStyleOptions = string;
export type SoundOptions = string;
export type LanguageOptions = string;
