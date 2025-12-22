// features/solah/hooks/useDateAndTime.ts
import { useEffect, useMemo, useState } from "react";

import { useSettingsStore } from "@/features/settings/store/settingsStore"; // ADD THIS
import { CalendarFormat, TimeFormat } from "@/features-solah/types";
import { formatDate, formatTime, getTimezoneOffsetForCity } from "@/features-solah/utils";

export interface DateAndTime {
  date: string;
  time: string;
}

interface UseDateAndTimeOptions {
  timeFormat?: TimeFormat;
  calendar?: CalendarFormat;
  locale?: string;
}

/**
 * useDateAndTime
 *
 * - Default: timeFormat = '24hr', calendar = 'hijri', locale = 'en-US'
 * - Time shows hours and minutes only (no seconds).
 * - Supports 12hr/24hr formats.
 * - Supports Hijri and Miladi (Gregorian) date formatting; Hijri default.
 * - Efficient: updates aligned to the next minute, then every minute.
 */
export const useDateAndTime = ({
  timeFormat = "24hr",
  calendar = "hijri",
  locale = "en-US",
}: UseDateAndTimeOptions = {}): DateAndTime => {
  const [current, setCurrent] = useState<Date>(new Date());
  const { location, timeFormat: settingsTimeFormat } = useSettingsStore(); // GET SETTINGS

  // Use settings timeFormat if not overridden
  const effectiveTimeFormat = timeFormat || settingsTimeFormat;

  // ---- Update aligned to minute boundary ----
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tick = () => setCurrent(new Date());

    // initial sync immediately
    setCurrent(new Date());

    const nowDt = new Date();
    const msUntilNextMinute = (60 - nowDt.getSeconds()) * 1000 - nowDt.getMilliseconds();

    timeoutId = setTimeout(() => {
      tick();
      intervalId = setInterval(tick, 60 * 1000);
    }, msUntilNextMinute);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [effectiveTimeFormat, calendar, locale]);

  // Get timezone offset for current location
  const timezoneOffset = getTimezoneOffsetForCity(location?.city || "Ilorin");

  const time = useMemo(
    () => formatTime(current, effectiveTimeFormat, timezoneOffset), // ADD TIMEZONE
    [current, effectiveTimeFormat, timezoneOffset]
  );

  const date = useMemo(() => formatDate(current, calendar, locale), [current, calendar, locale]);

  return { date, time };
};
