import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";
import { useState, useEffect, useMemo } from "react";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { useCurrentLocation } from "@/features-solah/hooks/useCurrentLocation";
import { useSolahStore } from "@/features-solah/store";
import { SolahTime, CalculationMethodTypes } from "@/features-solah/types"; // REMOVED TimeFormat
import { formatTime, getTimezoneOffsetFromLabel } from "@/features-solah/utils"; // REMOVED getTimezoneOffsetForCity

// Compute and provide prayer times. Uses adhan when coords are available,
export function useSolahTimes(date?: Date) {
  const {
    calculationMethod,
    timeFormat,
    location: settingsLocation,
    timezone,
  } = useSettingsStore();

  const { location: gpsLocation, loading: locLoading } = useCurrentLocation();
  const { lastKnownTimes, setLastKnownTimes } = useSolahStore();

  const effectiveDate = useMemo(() => date ?? new Date(), [date]);

  const location = useMemo(() => {
    return settingsLocation && settingsLocation.latitude !== 0 ? settingsLocation : gpsLocation;
  }, [settingsLocation, gpsLocation]);

  const adhanTimes = useMemo(() => {
    if (!location?.latitude || !location?.longitude) {
      return null;
    }
    try {
      const coords = new Coordinates(location.latitude, location.longitude);
      const params = getAdhanParams(calculationMethod);
      return new PrayerTimes(coords, effectiveDate, params);
    } catch {
      return null;
    }
  }, [location, effectiveDate, calculationMethod]);

  const formattedTimes = useMemo(() => {
    if (!adhanTimes) return null;

    // Get selected timezone offset (REMOVED cityTimezoneOffset as it's not needed)
    const selectedTimezoneOffset = getTimezoneOffsetFromLabel(timezone);

    // Use selected timezone offset directly
    const totalOffset = selectedTimezoneOffset;

    return [
      {
        title: "Subhi",
        time: formatTime(adhanTimes.fajr, timeFormat, totalOffset),
      },
      {
        title: "Dhuhr",
        time: formatTime(adhanTimes.dhuhr, timeFormat, totalOffset),
      },
      {
        title: "Asr",
        time: formatTime(adhanTimes.asr, timeFormat, totalOffset),
      },
      {
        title: "Maghrib",
        time: formatTime(adhanTimes.maghrib, timeFormat, totalOffset),
      },
      {
        title: "Isha",
        time: formatTime(adhanTimes.isha, timeFormat, totalOffset),
      },
    ] as SolahTime[];
  }, [adhanTimes, timeFormat, timezone]); // REMOVED location?.city from dependencies

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

  const currentSolah = useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (!times || times.length === 0) {
      return "Subhi";
    }

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

    const mins = times.map((t) => parseTimeToMinutes(t.time));
    const futureIdx = mins.findIndex((v) => currentMinutes < v);

    if (futureIdx === -1) {
      return times[mins.length - 1].title;
    }
    if (futureIdx === 0) {
      return times[mins.length - 1].title;
    }
    return times[futureIdx - 1].title;
  }, [times]);

  return { currentSolah };
}

export function useNextSolah() {
  const { times } = useSolahTimes();
  useMinuteTick();

  const nextSolah = useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (!times || times.length === 0) {
      return { title: "Subhi", time: "00:00" } as SolahTime;
    }

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

    const mins = times.map((t) => parseTimeToMinutes(t.time));
    const futureIdx = mins.findIndex((v) => currentMinutes < v);

    if (futureIdx === -1) {
      return times[0];
    }
    return times[futureIdx];
  }, [times]);

  return { nextSolah };
}

// Helper hook
export const useMinuteTick = () => {
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
