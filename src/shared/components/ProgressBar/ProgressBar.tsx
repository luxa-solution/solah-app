import { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

import { background, border } from "@/shared/styles";

export interface ProgressBarProps {
  percent: number;
}

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: clampedPercent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [animation, clampedPercent]);

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
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
