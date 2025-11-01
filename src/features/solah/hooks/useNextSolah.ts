import { useMemo } from "react";

import {
  useSolahTimes,
  useMinuteTick,
  getCurrentAndNextSolah,
  getCurrentMinutes,
  parseTimeToMinutes,
} from "./useSolahTimes";

export function useNextSolah() {
  const { times } = useSolahTimes();
  useMinuteTick();

  const next = useMemo(() => getCurrentAndNextSolah(times).next, [times]);

  const minutesUntilNext = useMemo(() => {
    const now = getCurrentMinutes();
    const nextMin = parseTimeToMinutes(next.time);
    const delta = nextMin - now;
    return delta >= 0 ? delta : delta + 24 * 60;
  }, [next]);

  return { nextSolah: next, nextSolahName: next.title, nextSolahTime: next.time, minutesUntilNext };
}
