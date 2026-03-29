import { AllPrayerScheduleConfig, PrayerAdhanConfig } from "@/features-settings/types";

type ZonedParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

const prayerTimeFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getPrayerTimeFormatter(timezone: string) {
  if (!prayerTimeFormatterCache.has(timezone)) {
    prayerTimeFormatterCache.set(
      timezone,
      new Intl.DateTimeFormat("en-CA", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
    );
  }

  return prayerTimeFormatterCache.get(timezone)!;
}

function getZonedParts(date: Date, timezone: string): ZonedParts {
  const parts = getPrayerTimeFormatter(timezone).formatToParts(date);
  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value);

  return {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: read("hour"),
    minute: read("minute"),
  };
}

function buildZonedDate(parts: ZonedParts, timezone: string) {
  let utcMillis = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, 0, 0);
  const desiredMillis = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    0,
    0
  );

  for (let i = 0; i < 4; i += 1) {
    const actual = getZonedParts(new Date(utcMillis), timezone);
    const actualMillis = Date.UTC(
      actual.year,
      actual.month - 1,
      actual.day,
      actual.hour,
      actual.minute,
      0,
      0
    );
    const diff = desiredMillis - actualMillis;

    if (diff === 0) {
      return new Date(utcMillis);
    }

    utcMillis += diff;
  }

  return new Date(utcMillis);
}

function parseFixedTime(fixedTime?: string) {
  if (!fixedTime) {
    return null;
  }

  const match = /^(\d{2}):(\d{2})$/.exec(fixedTime);
  if (!match) {
    return null;
  }

  const hour = Number(match[1]);
  const minute = Number(match[2]);

  if (hour > 23 || minute > 59) {
    return null;
  }

  return { hour, minute };
}

export function defaultPrayerScheduleConfig(): AllPrayerScheduleConfig {
  return {
    Subhi: {
      adhan: { mode: "at_solah_time" },
      iqamahDelayMinutes: 20,
      adhanNotificationEnabled: true,
      iqamahNotificationEnabled: true,
    },
    Dhuhr: {
      adhan: { mode: "at_solah_time" },
      iqamahDelayMinutes: 15,
      adhanNotificationEnabled: true,
      iqamahNotificationEnabled: true,
    },
    Asr: {
      adhan: { mode: "at_solah_time" },
      iqamahDelayMinutes: 15,
      adhanNotificationEnabled: true,
      iqamahNotificationEnabled: true,
    },
    Maghrib: {
      adhan: { mode: "at_solah_time" },
      iqamahDelayMinutes: 10,
      adhanNotificationEnabled: true,
      iqamahNotificationEnabled: true,
    },
    Isha: {
      adhan: { mode: "at_solah_time" },
      iqamahDelayMinutes: 15,
      adhanNotificationEnabled: true,
      iqamahNotificationEnabled: true,
    },
  };
}

export function deriveAdhanTime(
  solahTime: Date,
  config: PrayerAdhanConfig,
  timezone: string
): Date {
  switch (config.mode) {
    case "at_solah_time":
      return new Date(solahTime.getTime());
    case "relative_after_solah":
      if (typeof config.offsetMinutes !== "number") {
        throw new Error("Relative adhan offset is required");
      }

      if (config.offsetMinutes < 0) {
        throw new Error("Relative adhan offset must be zero or greater");
      }

      return new Date(solahTime.getTime() + config.offsetMinutes * 60_000);
    case "fixed_time": {
      const parsed = parseFixedTime(config.fixedTime);

      if (!parsed) {
        throw new Error("Fixed adhan time is invalid");
      }

      const localDate = getZonedParts(solahTime, timezone);
      const fixedDate = buildZonedDate(
        {
          year: localDate.year,
          month: localDate.month,
          day: localDate.day,
          hour: parsed.hour,
          minute: parsed.minute,
        },
        timezone
      );

      if (fixedDate.getTime() <= solahTime.getTime()) {
        throw new Error("Fixed adhan time must be after solah time");
      }

      return fixedDate;
    }
    default:
      return new Date(solahTime.getTime());
  }
}

export function deriveIqamahTime(adhanTime: Date, delayMinutes: number): Date {
  const validation = validateIqamahDelay(delayMinutes);
  if (!validation.valid) {
    throw new Error("Iqamah delay must be between 5 and 60 minutes");
  }

  return new Date(adhanTime.getTime() + delayMinutes * 60_000);
}

export function validateIqamahDelay(minutes: number): { valid: boolean; reason?: string } {
  if (minutes < 5 || minutes > 60) {
    return { valid: false, reason: "Iqamah delay must be between 5 and 60 minutes" };
  }

  return { valid: true };
}

export function validateAdhanConfig(
  config: PrayerAdhanConfig,
  solahTime: Date,
  timezone: string
): { valid: boolean; reason?: string } {
  // This function validates PrayerAdhanConfig only.
  // Iqamah delay validation is handled separately by validateIqamahDelay().
  if (config.mode === "relative_after_solah" && typeof config.offsetMinutes !== "number") {
    return { valid: false, reason: "Relative adhan offset is required" };
  }

  if (config.mode === "relative_after_solah" && (config.offsetMinutes ?? 0) < 0) {
    return { valid: false, reason: "Relative adhan offset must be zero or greater" };
  }

  if (config.mode === "fixed_time") {
    const parsed = parseFixedTime(config.fixedTime);

    if (!parsed) {
      return { valid: false, reason: "Fixed adhan time is invalid" };
    }

    try {
      deriveAdhanTime(solahTime, config, timezone);
    } catch (error) {
      return {
        valid: false,
        reason: error instanceof Error ? error.message : "Fixed adhan time is invalid",
      };
    }
  }

  return { valid: true };
}
