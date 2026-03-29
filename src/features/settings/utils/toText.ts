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
import { SettingsType, SoundOptions, PrayerAdhanConfig } from "@/features-settings/types";

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
      if (type.startsWith("adhan_")) {
        return processAdhanConfig(value as PrayerAdhanConfig);
      }
      if (type.startsWith("iqamah_")) {
        return processIqamahDelay(value as number);
      }
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
  if (option.isDefault && !option.location) {
    return "Detecting location...";
  }
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

export function processAdhanConfig(config: PrayerAdhanConfig) {
  switch (config.mode) {
    case "at_solah_time":
      return "At solah time";
    case "relative_after_solah":
      return `${config.offsetMinutes ?? 0} min after solah`;
    case "fixed_time":
      return `Fixed at ${formatFixedTime(config.fixedTime ?? "00:00")}`;
    default:
      return "";
  }
}

export function processIqamahDelay(minutes: number) {
  return `${minutes} min`;
}

function formatFixedTime(value: string) {
  const [rawHour = "0", rawMinute = "00"] = value.split(":");
  const hour = Number(rawHour);
  const minute = Number(rawMinute);
  const suffix = hour >= 12 ? "PM" : "AM";
  const normalizedHour = hour % 12 || 12;
  const normalizedMinute = String(minute).padStart(2, "0");
  return `${normalizedHour}:${normalizedMinute} ${suffix}`;
}
