import { useMemo } from "react";

import { useSolahTimes, useMinuteTick, getCurrentAndNextSolah } from "./useSolahTimes";

export function useCurrentSolah() {
  const { times } = useSolahTimes();
  useMinuteTick();

  const current = useMemo(() => getCurrentAndNextSolah(times).current, [times]);

  return { currentSolah: current.title, currentSolahTime: current.time, currentSolahObj: current };
}
