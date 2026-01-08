import { PrayerTimes, Coordinates } from "adhan";
import { useEffect, useMemo } from "react";

import { useSettingsStore } from "@/features-settings/store";
import { TimeZone } from "@/features-settings/types";
import { useSolahStore } from "@/features-solah/store";
import { SolahTime } from "@/features-solah/types";
import {
  formatTime,
  getAdhanParams,
  getCurrentMinutes,
  parseTimeToMinutes,
} from "@/features-solah/utils";

import { useMinuteTick } from "./useDateAndTime";

export function useSolahTimes(date?: Date) {
  const { calculationMethod: methodName, timeFormat, location, timezone } = useSettingsStore();

  const { lastKnownTimes, setLastKnownTimes } = useSolahStore();

  const effectiveDate = useMemo(() => date ?? new Date(), [date]);

  const adhanTimes = useMemo(() => {
    if (!location?.latitude || !location?.longitude) {
      return null;
    }
    try {
      const coords = new Coordinates(location.latitude, location.longitude);
      const params = getAdhanParams(methodName);
      return new PrayerTimes(coords, effectiveDate, params);
    } catch {
      return null;
    }
  }, [location, effectiveDate, methodName]);

  const formattedTimes = useMemo(() => {
    if (!adhanTimes) return null;

    return [
      {
        title: "Subhi",
        time: formatTime(adhanTimes.fajr, timezone, timeFormat),
      },
      {
        title: "Dhuhr",
        time: formatTime(adhanTimes.dhuhr, timezone, timeFormat),
      },
      {
        title: "Asr",
        time: formatTime(adhanTimes.asr, timezone, timeFormat),
      },
      {
        title: "Maghrib",
        time: formatTime(adhanTimes.maghrib, timezone, timeFormat),
      },
      {
        title: "Isha",
        time: formatTime(adhanTimes.isha, timezone, timeFormat),
      },
    ] as SolahTime[];
  }, [adhanTimes, timeFormat, timezone]);

  useEffect(() => {
    if (formattedTimes) {
      try {
        setLastKnownTimes(formattedTimes, effectiveDate);
      } catch {
        // ignore persistence errors
      }
    }
  }, [formattedTimes, effectiveDate, setLastKnownTimes]);

  const times = formattedTimes ?? lastKnownTimes;
  const loading = !times;

  return { times, loading };
}

export function useCurrentSolah() {
  const { times } = useSolahTimes();
  const { timezone } = useSettingsStore();
  useMinuteTick();

  const currentSolah = useMemo(
    () => getCurrentAndNextSolah(times, timezone).current.title,
    [times, timezone]
  );

  return { currentSolah };
}

export function useNextSolah() {
  const { times } = useSolahTimes();
  const { timezone } = useSettingsStore();

  useMinuteTick();

  const nextSolah = useMemo<SolahTime>(
    () => getCurrentAndNextSolah(times, timezone).next,
    [times, timezone]
  );

  return { nextSolah };
}

const getCurrentAndNextSolah = (times: SolahTime[], timezone: TimeZone) => {
  if (!times || times.length === 0) {
    const fallback: SolahTime = {
      title: "Subhi",
      time: "00:00",
    };
    return { current: fallback, next: fallback };
  }

  const now = getCurrentMinutes(timezone);
  const mins = times.map((t) => parseTimeToMinutes(t.time));
  const futureIdx = mins.findIndex((v) => now < v);

  if (futureIdx === -1) {
    return { current: times[mins.length - 1], next: times[0] };
  }
  if (futureIdx === 0) {
    return { current: times[mins.length - 1], next: times[0] };
  }
  return { current: times[futureIdx - 1], next: times[futureIdx] };
};
