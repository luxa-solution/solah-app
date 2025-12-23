// features/solah/hooks/useDateAndTime.ts
import { useEffect, useMemo, useState } from "react";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { CalendarFormat, TimeFormat } from "@/features-solah/types";
import { formatDate, formatTime } from "@/features-solah/utils";

export interface DateAndTime {
  date: string;
  time: string;
}

interface UseDateAndTimeOptions {
  timeFormat?: TimeFormat;
  calendar?: CalendarFormat;
  locale?: string;
}

export const useDateAndTime = ({
  calendar = "hijri",
  locale = "en-US",
}: UseDateAndTimeOptions = {}): DateAndTime => {
  const [current, setCurrent] = useState<Date>(new Date());
  const { timeFormat, timezone } = useSettingsStore();

  // ---- Update aligned to minute boundary ----
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const tick = () => setCurrent(new Date());

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
  }, []);

  const time = useMemo(
    () => formatTime(current, timezone, timeFormat), // APPLY TIMEZONE
    [current, timeFormat, timezone]
  );

  const date = useMemo(() => formatDate(current, calendar, locale), [current, calendar, locale]);

  return { date, time };
};
