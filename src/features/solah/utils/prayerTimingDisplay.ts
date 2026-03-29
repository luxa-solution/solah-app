import { AllPrayerScheduleConfig, TimeZone } from "@/features-settings/types";

import { TimeFormat, SolahName } from "../types";

import { parseTimeToMinutes } from "./timeHelpers";

function formatMinutesForDisplay(totalMinutes: number, timeFormat: TimeFormat) {
  const normalized = ((totalMinutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const hour24 = Math.floor(normalized / 60);
  const minute = normalized % 60;

  if (timeFormat === "24hr") {
    return `${String(hour24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`;
}

export function getPrayerTimingDisplay(
  prayer: SolahName,
  rawAdhanTime: string,
  prayerSchedule: AllPrayerScheduleConfig,
  timeFormat: TimeFormat,
  _timezone: TimeZone
) {
  const config = prayerSchedule[prayer];
  const baseMinutes = parseTimeToMinutes(rawAdhanTime);

  const adhanMinutes =
    config.adhan.mode === "at_solah_time"
      ? baseMinutes
      : config.adhan.mode === "relative_after_solah"
        ? baseMinutes + (config.adhan.offsetMinutes ?? 0)
        : parseTimeToMinutes(config.adhan.fixedTime ?? "00:00");

  return {
    adhanDisplay: formatMinutesForDisplay(adhanMinutes, timeFormat),
    iqamahDisplay: formatMinutesForDisplay(adhanMinutes + config.iqamahDelayMinutes, timeFormat),
  };
}
