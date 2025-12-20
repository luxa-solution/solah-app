import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import Svg, { Polygon, Circle } from "react-native-svg";

import { colors } from "@/shared/styles";

import { SIZE } from "./constants";

type Props = {
  angle: SharedValue<number>;
};

// The total size of the SVG container
const NEEDLE_SIZE = SIZE * 0.8;
const CENTER = NEEDLE_SIZE / 2;

// Controls how "fat" or "slim" the needle is
const HALF_WIDTH = 12;
const PIN_RADIUS = (3 * HALF_WIDTH) / 4;

const AnimatedView = Animated.createAnimatedComponent(View);

export function CompassNeedle({ angle }: Props) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
  }));

  return (
    <AnimatedView style={[styles.container, animatedStyle]}>
      <Svg width={NEEDLE_SIZE} height={NEEDLE_SIZE} viewBox={`0 0 ${NEEDLE_SIZE} ${NEEDLE_SIZE}`}>
        {/* Center Hub/Pin */}
        <Circle cx={CENTER} cy={CENTER} r={4 * PIN_RADIUS} fill={colors.palette.primary[1000]} />

        {/* Light Blade (North) - Top Triangle */}
        <Polygon
          points={`
            ${CENTER}, 0 
            ${CENTER + HALF_WIDTH}, ${CENTER} 
            ${CENTER}, ${CENTER + 6} 
            ${CENTER - HALF_WIDTH}, ${CENTER}
          `}
          fill={colors.palette.secondary[300]}
        />

        {/* Dark Blade (South) - Bottom Triangle (Perfect Mirror) */}
        <Polygon
          points={`
            ${CENTER}, ${NEEDLE_SIZE} 
            ${CENTER + HALF_WIDTH}, ${CENTER} 
            ${CENTER}, ${CENTER - 6} 
            ${CENTER - HALF_WIDTH}, ${CENTER}
          `}
          fill={colors.palette.primary[600]}
        />

        {/* Center Hub/Pin */}
        <Circle cx={CENTER} cy={CENTER} r={PIN_RADIUS} fill={colors.palette.primary[1000]} />
      </Svg>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: NEEDLE_SIZE,
    height: NEEDLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
});
