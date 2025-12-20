import { View, StyleSheet } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

import { colors } from "@/shared/styles";

import { SIZE } from "./constants";

type Props = {
  heading: SharedValue<number>;
};

const TICK_COUNT = 8;

export function CompassTicks({ heading }: Props) {
  const dialStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-heading.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.dial, dialStyle]}>
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const angle = i * (360 / TICK_COUNT);

        return (
          <View key={i} style={[styles.tickWrapper, { transform: [{ rotate: `${angle}deg` }] }]}>
            <View style={styles.tick} />
          </View>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dial: {
    position: "absolute",
    width: SIZE + 50,
    height: SIZE + 50,
  },

  tickWrapper: {
    position: "absolute",
    width: SIZE + 50,
    height: SIZE + 50,
    alignItems: "center",
  },

  tick: {
    position: "absolute",
    top: SIZE / 8,
    width: 8,
    height: 16,
    backgroundColor: colors.palette.secondary[300],
    borderRadius: 2,
    opacity: 0.9,
    zIndex: 20,
  },
});
