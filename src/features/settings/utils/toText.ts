import type {
  CalculationMethodOptions,
  TimeZoneOption,
  LocationOption,
  ArabicFontSizeOption,
  ArabicFontStyleOption,
  LanguageOption,
  CalendarFormatOption,
  TimeFormatOption,
} from "@/features-settings/constants";
import { SettingsType, SoundOptions } from "@/features-settings/types";

export function toText(type: SettingsType, value: any): string {
  switch (type) {
    case "calmethod":
      return processCalculationMethod(value as CalculationMethodOptions);

    case "timezone":
      return processTimeZone(value as TimeZoneOption);

    case "location":
      return processLocation(value as LocationOption);

    case "arabicfontsize":
      return processArabicFontSize(value as ArabicFontSizeOption);

    case "arabicfontstyle":
      return processArabicFontStyle(value as ArabicFontStyleOption);

    case "solahtimenotif":
      return processSolahTimeNotification(value as boolean);

    case "sound":
      return processSound(value as SoundOptions);

    case "language":
      return processLanguage(value as LanguageOption);

    case "calendarformat":
      return processCalendarFormat(value as CalendarFormatOption);

    case "timeformat":
      return processTimeFormat(value as TimeFormatOption);

    default:
      return "";
  }
}

// HELPER FUNCTIONS

function processCalculationMethod(option: CalculationMethodOptions) {
  return option.name;
}

function processTimeZone(option: TimeZoneOption) {
  return option.name;
}

function processLocation(option: LocationOption) {
  return option.name;
}

function processArabicFontSize(option: ArabicFontSizeOption) {
  return option.name;
}

function processArabicFontStyle(option: ArabicFontStyleOption) {
  return option.name;
}

function processSolahTimeNotification(value: boolean) {
  return value ? "On" : "Off";
}

function processSound(value: SoundOptions) {
  return value;
}

function processLanguage(option: LanguageOption) {
  return option.name;
}

function processCalendarFormat(option: CalendarFormatOption) {
  return option.name;
}

function processTimeFormat(option: TimeFormatOption) {
  return option.name;
}
