import { Magnetometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

import { magnetometerToHeading, calculateQiblaOffset, smoothAngle } from "@/features-solah/utils";

const SMOOTHING_RATE = 0.35;

export function useQiblaHeading(qiblaBearing: number) {
  const heading = useSharedValue(0);
  const needleAngle = useSharedValue(0);
  const [hasMagnetometer, setHasMagnetometer] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let sub: { remove: () => void } | null = null;
    let smoothedHeading = 0;

    (async () => {
      try {
        if (!(await Magnetometer.isAvailableAsync())) {
          setHasMagnetometer(false);
          setError("Compass not available on this device");
          return;
        }

        // Request permissions for iOS
        const { status } = await Magnetometer.requestPermissionsAsync();
        if (status !== "granted") {
          setHasMagnetometer(false);
          setError("Compass permission denied");
          return;
        }

        Magnetometer.setUpdateInterval(100);

        sub = Magnetometer.addListener(({ x, y }) => {
          const rawHeading = magnetometerToHeading(x, y);

          smoothedHeading = smoothAngle(smoothedHeading, rawHeading, SMOOTHING_RATE);

          const offset = calculateQiblaOffset(qiblaBearing, smoothedHeading);

          heading.value = withTiming(smoothedHeading, { duration: 120 });
          needleAngle.value = withTiming(offset, { duration: 120 });
        });
      } catch {
        setError("Failed to start compass");
        setHasMagnetometer(false);
      }
    })();

    return () => sub?.remove();
  }, [qiblaBearing, heading, needleAngle]);

  return { heading, needleAngle, hasMagnetometer, error };
}
