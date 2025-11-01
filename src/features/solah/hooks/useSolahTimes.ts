// useSolahTimes.ts
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { useState, useEffect } from "react";

import { useCurrentLocation } from "@/features-solah/hooks/useCurrentLocation";
import { useSolahStore } from "@/features-solah/store/solahStore";
import { SolahTime, TimeFormat, CalculationMethodName } from "@/features-solah/types";
import { formatTime } from "@/features-solah/utils";

// Compute and provide prayer times. Uses adhan when coords are available,
export function useSolahTimes(
  date?: Date,
  timeFormat: TimeFormat = "24hr",
  methodName: CalculationMethodName = CalculationMethodName.MoonsightingCommittee
) {
  const locationResult = useCurrentLocation() as any;
  const coords = locationResult?.coords ?? null;
  const locLoading = locationResult?.loading ?? false;

  const { lastKnownTimes, setLastKnownTimes } = useSolahStore();

  // Start with persisted last-known times (final fallback). If store is
  // empty, use an empty array and let callers render accordingly.
  const [times, setTimes] = useState<SolahTime[]>(lastKnownTimes ?? []);
  const [loading, setLoading] = useState<boolean>(true);

  // Make the date stable for effect dependencies. If caller doesn't provide
  // a date, compute it once per render but use its ISO date string as the
  // dependency so the effect only runs when the day changes.
  const effectiveDate = date ?? new Date();

  const effectiveDateKey = effectiveDate.toISOString().slice(0, 10);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);

      // If we have coordinates, compute using adhan
      if (coords) {
        try {
          const { latitude, longitude } = coords;
          const coordsObj = new Coordinates(latitude, longitude);
          const getAdhanParams = (m: CalculationMethodName) => {
            switch (m) {
              case CalculationMethodName.MuslimWorldLeague:
                return CalculationMethod.MuslimWorldLeague();
              case CalculationMethodName.Egyptian:
                return CalculationMethod.Egyptian();
              case CalculationMethodName.Karachi:
                return CalculationMethod.Karachi();
              case CalculationMethodName.UmmAlQura:
                return CalculationMethod.UmmAlQura();
              case CalculationMethodName.Dubai:
                return CalculationMethod.Dubai();
              case CalculationMethodName.Qatar:
                return CalculationMethod.Qatar();
              case CalculationMethodName.Kuwait:
                return CalculationMethod.Kuwait();
              case CalculationMethodName.MoonsightingCommittee:
                return CalculationMethod.MoonsightingCommittee();
              case CalculationMethodName.Singapore:
                return CalculationMethod.Singapore();
              case CalculationMethodName.Turkey:
                return CalculationMethod.Turkey();
              case CalculationMethodName.Tehran:
                return CalculationMethod.Tehran();
              case CalculationMethodName.NorthAmerica:
                return CalculationMethod.NorthAmerica();
              default:
                return CalculationMethod.MoonsightingCommittee();
            }
          };
          const params = getAdhanParams(methodName);
          // Reconstruct a Date from the stable date key so we don't depend on
          // the Date object identity in the effect dependency array.
          const effDate = new Date(effectiveDateKey);
          const prayerTimes = new PrayerTimes(coordsObj, effDate, params);

          const computed: SolahTime[] = [
            {
              title: "Subhi",
              time: formatTime(prayerTimes.fajr, timeFormat),
              dateIso: prayerTimes.fajr.toISOString(),
            },
            {
              title: "Dhuhr",
              time: formatTime(prayerTimes.dhuhr, timeFormat),
              dateIso: prayerTimes.dhuhr.toISOString(),
            },
            {
              title: "Asr",
              time: formatTime(prayerTimes.asr, timeFormat),
              dateIso: prayerTimes.asr.toISOString(),
            },
            {
              title: "Maghrib",
              time: formatTime(prayerTimes.maghrib, timeFormat),
              dateIso: prayerTimes.maghrib.toISOString(),
            },
            {
              title: "Isha",
              time: formatTime(prayerTimes.isha, timeFormat),
              dateIso: prayerTimes.isha.toISOString(),
            },
          ];

          if (!mounted) return;
          setTimes(computed);
          // persist last-known times for offline/fallback use
          try {
            setLastKnownTimes(computed, effectiveDateKey);
          } catch {
            // ignore persistence errors
          }
          setLoading(false);
          return;
        } catch {
          // fall through to fallback behavior
        }
      }

      // final fallback: use persisted last-known times or hardcoded constant
      setTimes(lastKnownTimes ?? []);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [coords, effectiveDateKey, timeFormat, lastKnownTimes, setLastKnownTimes, methodName]);

  return { times, loading, locLoading };
}

// Helper utilities exported for other hooks (current/next)
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

export const parseTimeToMinutes = (time: string): number => {
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

export const getCurrentMinutes = (): number => {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
};

export const getCurrentAndNextSolah = (times: SolahTime[]) => {
  if (!times || times.length === 0) {
    const fallback: SolahTime = { title: "Subhi", time: "00:00", dateIso: null };
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
