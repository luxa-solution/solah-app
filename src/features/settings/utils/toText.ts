import {
  SettingsType,
  ArabicFontSizeOptions,
  ArabicFontStyleOptions,
  SoundOptions,
  LanguageOptions,
  TimeZone,
} from "@/features-settings/types";
import {
  CalculationMethodTypes,
  CalendarFormat,
  LocationData,
  TimeFormat,
} from "@/features-solah/types";

export function toText(type: SettingsType, value: any): string {
  switch (type) {
    case "calmethod":
      return processCalculationMethod(value as CalculationMethodTypes);

    case "timezone":
      return processTimeZone(value as TimeZone);

    case "location":
      return processLocation(value as LocationData);

    case "arabicfontsize":
      return processArabicFontSize(value as ArabicFontSizeOptions);

    case "arabicfontstyle":
      return processArabicFontStyle(value as ArabicFontStyleOptions);

    case "solahtimenotif":
      return processSolahTimeNotification(value as boolean);

    case "sound":
      return processSound(value as SoundOptions);

    case "language":
      return processLanguage(value as LanguageOptions);

    case "calendarformat":
      return processCalendarFormat(value as CalendarFormat);

    case "timeformat":
      return processTimeFormat(value as TimeFormat);

    default:
      // This ensures we catch any unhandled setting types
      return "";
  }
}

// HELPER FUNCTIONS

function processCalculationMethod(value: CalculationMethodTypes) {
  return value;
}

function processTimeZone(value: string) {
  return value;
}

function processLocation(value: LocationData) {
  return `${value.city}, ${value.country}`;
}

function processArabicFontSize(value: ArabicFontSizeOptions) {
  return String(value);
}

function processArabicFontStyle(value: ArabicFontStyleOptions) {
  return value;
}

function processSolahTimeNotification(value: boolean) {
  return value ? "On" : "Off";
}

function processSound(value: SoundOptions) {
  return value;
}

function processLanguage(value: LanguageOptions) {
  return value;
}

function processCalendarFormat(value: CalendarFormat) {
  if (value === "hijri") return "Hijri mode";
  if (value === "miladi") return "Gregorian mode";
  return value;
}

function processTimeFormat(value: TimeFormat) {
  if (value === "12hr") return "12-hour";
  if (value === "24hr") return "24-hour";
  return "";
}
