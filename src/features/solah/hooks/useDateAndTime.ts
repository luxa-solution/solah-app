// features/solah/hooks/useDateAndTime.ts
import { useEffect, useMemo, useState } from "react";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { formatDate, formatTime } from "@/features-solah/utils";

export interface DateAndTime {
  date: string;
  time: string;
}

interface UseDateAndTimeOptions {
  locale?: string;
}

export const useDateAndTime = ({ locale = "en-US" }: UseDateAndTimeOptions = {}): DateAndTime => {
  const [current, setCurrent] = useState<Date>(new Date());
  const timezone = useSettingsStore((s) => s.timezone.timezone);
  const timeFormat = useSettingsStore((s) => s.timeFormat.value);
  const calendar = useSettingsStore((s) => s.calendarFormat.value);

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
      clearTimeout(timeoutId as ReturnType<typeof setTimeout>);
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

export const useMinuteTick = () => {
  // Small local hook to force re-render on minute boundaries
  const [, setTick] = useState(0);
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const bump = () => setTick((x) => x + 1);
    const delay = 60000 - (Date.now() % 60000);
    const t = setTimeout(() => {
      bump();
      intervalId = setInterval(bump, 60000);
    }, delay);
    return () => {
      clearTimeout(t as unknown as number);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);
};
