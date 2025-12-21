import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { SharedValue } from "react-native-reanimated";

const DEFAULT_THRESHOLD = 5; // degrees
const DEFAULT_DWELL_TIME = 1000; // ms

type Options = {
  enabled?: boolean;
  threshold?: number;
  dwellTimeMs?: number;
};

export function useQiblaHaptics(needleAngle: SharedValue<number>, options?: Options) {
  const isAlignedRef = useRef(false);
  const enterTimeRef = useRef<number | null>(null);

  const enabled = options?.enabled ?? true;
  const threshold = options?.threshold ?? DEFAULT_THRESHOLD;
  const dwellTimeMs = options?.dwellTimeMs ?? DEFAULT_DWELL_TIME;

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const angle = needleAngle.value;
      const withinZone = Math.abs(angle) <= threshold;
      const now = Date.now();

      // Enter alignment zone
      if (withinZone) {
        if (enterTimeRef.current === null) {
          enterTimeRef.current = now;
        }

        const dwellTime = now - enterTimeRef.current;

        // Fire haptic ONLY if stayed long enough
        if (dwellTime >= dwellTimeMs && !isAlignedRef.current) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          isAlignedRef.current = true;
        }
      } else {
        // Left alignment zone → reset
        enterTimeRef.current = null;
        isAlignedRef.current = false;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [needleAngle, enabled, threshold, dwellTimeMs]);
}
