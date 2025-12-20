import { Text, StyleSheet } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

import { colors, font } from "@/shared/styles";

import { SIZE } from "./constants";

type Props = {
  heading: SharedValue<number>;
};

export function CompassCardinals({ heading }: Props) {
  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-heading.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.cardinals, style]}>
      <Text style={[styles.cardinal, styles.north]}>N</Text>
      <Text style={[styles.cardinal, styles.south]}>S</Text>
      <Text style={[styles.cardinal, styles.east]}>E</Text>
      <Text style={[styles.cardinal, styles.west]}>W</Text>
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  cardinals: {
    position: "absolute",
    width: SIZE + 50,
    height: SIZE + 50,
  },

  cardinal: {
    ...font.label.medium,
    position: "absolute",
    color: colors.context.default.primary,
    fontWeight: 900,
  },

  north: {
    top: 0,
    alignSelf: "center",
  },

  south: {
    bottom: 0,
    alignSelf: "center",
  },

  east: {
    right: 0,
    top: "50%",
    marginTop: -8,
  },

  west: {
    left: 0,
    top: "50%",
    marginTop: -8,
  },
});
