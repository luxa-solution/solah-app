import { Coordinates, PrayerTimes } from "adhan";

import type { CalculationMethodOptions } from "@/features-settings/constants";
import { PrayerAdhanConfig, TimeZone } from "@/features-settings/types";
import { SolahName, TimeFormat } from "@/features-solah/types";
import { deriveAdhanTime, getAdhanParams, validateAdhanConfig } from "@/features-solah/utils";

type FixedTimeInput = {
  timeFormat: TimeFormat;
  hour: string;
  minute: string;
  period?: "AM" | "PM";
};

type CoordinatesLike = {
  latitude: number;
  longitude: number;
};

export function buildFixedTimeValue({ timeFormat, hour, minute, period }: FixedTimeInput) {
  const parsedHour = Number(hour);
  const parsedMinute = Number(minute);

  if (!Number.isInteger(parsedHour) || !Number.isInteger(parsedMinute)) {
    return "";
  }

  if (timeFormat === "24hr") {
    if (parsedHour < 0 || parsedHour > 23 || parsedMinute < 0 || parsedMinute > 59) {
      return "";
    }

    return `${String(parsedHour).padStart(2, "0")}:${String(parsedMinute).padStart(2, "0")}`;
  }

  if (parsedHour < 1 || parsedHour > 12 || parsedMinute < 0 || parsedMinute > 59 || !period) {
    return "";
  }

  const hour24 =
    period === "AM"
      ? parsedHour === 12
        ? 0
        : parsedHour
      : parsedHour === 12
        ? 12
        : parsedHour + 12;

  return `${String(hour24).padStart(2, "0")}:${String(parsedMinute).padStart(2, "0")}`;
}

export function splitFixedTimeValue(value: string | undefined, timeFormat: TimeFormat) {
  if (!value) {
    return {
      hour: "",
      minute: "",
      period: "AM" as const,
    };
  }

  const [rawHour = "00", rawMinute = "00"] = value.split(":");
  const hour24 = Number(rawHour);
  const minute = String(Number(rawMinute)).padStart(2, "0");

  if (timeFormat === "24hr") {
    return {
      hour: String(hour24).padStart(2, "0"),
      minute,
      period: "AM" as const,
    };
  }

  return {
    hour: String(hour24 % 12 || 12),
    minute,
    period: hour24 >= 12 ? ("PM" as const) : ("AM" as const),
  };
}

export function getRelativeTimeParts(totalMinutes: number) {
  const safe = Math.max(0, totalMinutes);
  return {
    hours: String(Math.floor(safe / 60)),
    minutes: String(safe % 60).padStart(2, "0"),
  };
}

export function buildRelativeOffsetMinutes(hours: string, minutes: string) {
  const parsedHours = Number(hours || "0");
  const parsedMinutes = Number(minutes || "0");

  if (!Number.isInteger(parsedHours) || parsedHours < 0) {
    return null;
  }

  if (!Number.isInteger(parsedMinutes) || parsedMinutes < 0 || parsedMinutes > 59) {
    return null;
  }

  return parsedHours * 60 + parsedMinutes;
}

export function getPrayerWindow(
  prayer: SolahName,
  location: CoordinatesLike | null,
  calculationMethod: CalculationMethodOptions["method"],
  iqamahDelayMinutes: number,
  baseDate: Date = new Date()
) {
  if (!location) {
    return null;
  }

  const coords = new Coordinates(location.latitude, location.longitude);
  const params = getAdhanParams(calculationMethod);
  const today = new PrayerTimes(coords, baseDate, params);
  const tomorrowDate = new Date(baseDate);
  tomorrowDate.setDate(baseDate.getDate() + 1);
  const tomorrow = new PrayerTimes(coords, tomorrowDate, params);

  const solahTime =
    prayer === "Subhi"
      ? today.fajr
      : prayer === "Dhuhr"
        ? today.dhuhr
        : prayer === "Asr"
          ? today.asr
          : prayer === "Maghrib"
            ? today.maghrib
            : today.isha;

  const nextPrayer =
    prayer === "Subhi"
      ? today.sunrise
      : prayer === "Dhuhr"
        ? today.asr
        : prayer === "Asr"
          ? today.maghrib
          : prayer === "Maghrib"
            ? today.isha
            : tomorrow.fajr;

  const latestAllowedTime = new Date(nextPrayer.getTime() - iqamahDelayMinutes * 60_000);

  return {
    solahTime,
    latestAllowedTime,
    maxOffsetMinutes: Math.max(
      0,
      Math.floor((latestAllowedTime.getTime() - solahTime.getTime()) / 60_000)
    ),
  };
}

export function validateAdhanConfigWithinPrayerWindow(
  config: PrayerAdhanConfig,
  solahTime: Date,
  latestAllowedTime: Date,
  timezone: TimeZone
): { valid: boolean; reason?: string } {
  const base = validateAdhanConfig(config, solahTime, timezone);
  if (!base.valid) {
    return base;
  }

  try {
    const adhanTime = deriveAdhanTime(solahTime, config, timezone);
    if (adhanTime.getTime() > latestAllowedTime.getTime()) {
      return { valid: false, reason: "Adhan time must stay before the next prayer window" };
    }
  } catch (error) {
    return {
      valid: false,
      reason: error instanceof Error ? error.message : "Invalid adhan setting",
    };
  }

  return { valid: true };
}
