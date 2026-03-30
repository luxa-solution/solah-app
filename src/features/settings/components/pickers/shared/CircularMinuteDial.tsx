import React, { useMemo } from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { dialMinutesToAngle, xyToDialMinutes } from "@/features-settings/utils";
import { colors, font, spacing } from "@/shared/styles";

type CircularMinuteDialProps = {
  value: number;
  onChange: (value: number) => void;
};

const SIZE = 220;
const STROKE_WIDTH = 14;
const CENTER = SIZE / 2;
const RADIUS = CENTER - STROKE_WIDTH - 6;
const CIRCUMFERENCE = Math.PI * 2 * RADIUS;

export function CircularMinuteDial({ value, onChange }: CircularMinuteDialProps) {
  const knob = useMemo(() => {
    const angle = dialMinutesToAngle(value);
    return {
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle),
    };
  }, [value]);

  const handleDial = (event: GestureResponderEvent) => {
    onChange(
      xyToDialMinutes(event.nativeEvent.locationX, event.nativeEvent.locationY, CENTER, CENTER)
    );
  };

  return (
    <View
      onMoveShouldSetResponder={() => true}
      onResponderGrant={handleDial}
      onResponderMove={handleDial}
      onStartShouldSetResponder={() => true}
      style={styles.container}
      testID="iqamah-minute-dial"
    >
      <Svg height={SIZE} width={SIZE}>
        <Circle
          cx={CENTER}
          cy={CENTER}
          fill="none"
          r={RADIUS}
          stroke={colors.border.default.secondary}
          strokeWidth={STROKE_WIDTH}
        />
        <Circle
          cx={CENTER}
          cy={CENTER}
          fill="none"
          r={RADIUS}
          stroke={colors.background.brand.primary}
          strokeDasharray={`${(value / 60) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
          strokeLinecap="round"
          strokeWidth={STROKE_WIDTH}
          transform={`rotate(-90 ${CENTER} ${CENTER})`}
        />
        <Circle cx={knob.x} cy={knob.y} fill={colors.background.brand.primary} r={10} />
      </Svg>
      <View pointerEvents="none" style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>minutes</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: spacing.sm,
  },
  valueContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    ...font.heading.large,
    color: colors.context.default.primary,
  },
  label: {
    ...font.body.small,
    color: colors.context.default.secondary,
  },
});
