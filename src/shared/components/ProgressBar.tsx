import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { background, border } from "@/shared/styles";

interface ProgressBarProps {
  percent: number;
}

/**
 * ProgressBar — A lightweight animated progress indicator.
 *
 * Visually represents a percentage value (0–100%) as a horizontal bar that fills smoothly
 * using React Native’s Animated API. The animation runs whenever the `percent` value changes.
 *
 * ## Behavior
 * - Clamps input values between 0 and 100.
 * - Animates width transitions with a 500ms ease.
 *
 * ## Example
 * ```tsx
 * <ProgressBar percent={65} />
 * ```
 *
 * @component
 * @param {number} percent - The progress value to display, as a percentage between 0 and 100.
 *
 * @returns {JSX.Element} An animated progress bar that fills proportionally to the `percent` value.
 */

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: clampedPercent,
      duration: 500,
      useNativeDriver: false, // can't animate width with native driver
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampedPercent]);

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={[styles.container]}>
      <Animated.View
        style={[
          styles.filled,
          {
            width: widthInterpolated,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    borderColor: border.default.tertiary,
    overflow: "hidden",
    backgroundColor: background.default.secondary,
  },
  filled: {
    height: "100%",
    backgroundColor: background.brand.primary,
    borderRadius: 3,
  },
});
