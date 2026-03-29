import type { PrayerSettingSlug } from "../constants";
import { timezones } from "../constants/timeZone";

type PrayerSettingsMenuType = "adhansettings" | "iqamahsettings";
type PrayerAdhanSettingsType = `adhan_${PrayerSettingSlug}`;
type PrayerIqamahSettingsType = `iqamah_${PrayerSettingSlug}`;

export type SettingsType =
  | "calmethod"
  | "timezone"
  | "location"
  | "arabicfontsize"
  | "arabicfontstyle"
  | "solahtimenotif"
  | "sound"
  | "customizenotifications"
  | "language"
  | "calendarformat"
  | "timeformat"
  | PrayerSettingsMenuType
  | PrayerAdhanSettingsType
  | PrayerIqamahSettingsType;

export type TimeZone = (typeof timezones)[number]["timezone"];
export type ArabicFontSizeOptions = number;
export type ArabicFontStyleOptions = string;
export type SoundOptions = string;
export type LanguageOptions = string;
