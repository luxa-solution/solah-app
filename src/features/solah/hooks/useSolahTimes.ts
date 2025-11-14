// useSolahTimes.ts
import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";
import { useState, useEffect, useMemo } from "react";

import { useCurrentLocation } from "@/features-solah/hooks/useCurrentLocation";
import { useSolahStore } from "@/features-solah/store";
import { SolahTime, TimeFormat, CalculationMethodTypes } from "@/features-solah/types";
import { formatTime } from "@/features-solah/utils";

// Compute and provide prayer times. Uses adhan when coords are available,
export function useSolahTimes(
  date?: Date,
  timeFormat: TimeFormat = "24hr",
  methodName: CalculationMethodTypes = "MoonsightingCommittee"
) {
  const { location, loading: locLoading } = useCurrentLocation();
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
        time: formatTime(adhanTimes.fajr, timeFormat),
      },
      {
        title: "Dhuhr",
        time: formatTime(adhanTimes.dhuhr, timeFormat),
      },
      {
        title: "Asr",
        time: formatTime(adhanTimes.asr, timeFormat),
      },
      {
        title: "Maghrib",
        time: formatTime(adhanTimes.maghrib, timeFormat),
      },
      {
        title: "Isha",
        time: formatTime(adhanTimes.isha, timeFormat),
      },
    ] as SolahTime[];
  }, [adhanTimes, timeFormat]);

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
  const loading = locLoading || !times;

  return { times, loading, locLoading };
}

export function useCurrentSolah() {
  const { times } = useSolahTimes();
  useMinuteTick();

  const currentSolah = useMemo(() => getCurrentAndNextSolah(times).current.title, [times]);

  return { currentSolah };
}

export function useNextSolah() {
  const { times } = useSolahTimes();
  useMinuteTick();

  const nextSolah = useMemo<SolahTime>(() => getCurrentAndNextSolah(times).next, [times]);

  return { nextSolah };
}

// Helper hook

export const useMinuteTick = () => {
  // Small local hook to force re-render on minute boundaries
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((x) => x + 1);
    const delay = 60000 - (Date.now() % 60000);
    const t = setTimeout(() => {
      bump();
      const i = setInterval(bump, 60000);
      return () => clearInterval(i);
    }, delay);
    return () => clearTimeout(t as unknown as number);
  }, []);
};

// Helper Functions

const parseTimeToMinutes = (time: string): number => {
  const t = time.trim().toUpperCase();
  const match = /^(\d{1,2}):(\d{2})(?:\s*(AM|PM))?$/.exec(t);
  if (!match) return 0;

  const [, hStr, mStr, period] = match;
  let h = Number(hStr);
  const m = Number(mStr);

  if (period) {
    if (period === "AM" && h === 12) h = 0;
    if (period === "PM" && h < 12) h += 12;
  }
  return h * 60 + m;
};

const getCurrentMinutes = (): number => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

const getCurrentAndNextSolah = (times: SolahTime[]) => {
  if (!times || times.length === 0) {
    const fallback: SolahTime = {
      title: "Subhi",
      time: "00:00",
    };
    return { current: fallback, next: fallback };
  }

  const now = getCurrentMinutes();
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

// Adhan Helper
const getAdhanParams = (m: CalculationMethodTypes) => {
  switch (m) {
    case "MuslimWorldLeague":
      return CalculationMethod.MuslimWorldLeague();
    case "Egyptian":
      return CalculationMethod.Egyptian();
    case "Karachi":
      return CalculationMethod.Karachi();
    case "UmmAlQura":
      return CalculationMethod.UmmAlQura();
    case "Dubai":
      return CalculationMethod.Dubai();
    case "Qatar":
      return CalculationMethod.Qatar();
    case "Kuwait":
      return CalculationMethod.Kuwait();
    case "MoonsightingCommittee":
      return CalculationMethod.MoonsightingCommittee();
    case "Singapore":
      return CalculationMethod.Singapore();
    case "Turkey":
      return CalculationMethod.Turkey();
    case "Tehran":
      return CalculationMethod.Tehran();
    case "NorthAmerica":
      return CalculationMethod.NorthAmerica();
    default:
      return CalculationMethod.MoonsightingCommittee();
  }
};
