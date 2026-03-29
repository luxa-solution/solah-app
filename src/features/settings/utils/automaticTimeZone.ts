import {
  AUTOMATIC_TIMEZONE_FALLBACK,
  timezones,
  type TimeZoneOption,
} from "@/features-settings/constants";

export function resolveAutomaticTimeZone(): TimeZoneOption {
  const systemTimeZone = getSystemTimeZone();
  const availableTimeZones = Array.isArray(timezones) ? timezones : [];
  const matched = availableTimeZones.find((option) => option.timezone === systemTimeZone);

  return {
    name: matched?.name ?? `System (${systemTimeZone})`,
    timezone: systemTimeZone,
    isDefault: true,
  };
}

function getSystemTimeZone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || AUTOMATIC_TIMEZONE_FALLBACK;
  } catch {
    return AUTOMATIC_TIMEZONE_FALLBACK;
  }
}
