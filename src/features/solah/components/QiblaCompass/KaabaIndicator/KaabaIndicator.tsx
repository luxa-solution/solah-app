import { Image, StyleSheet } from "react-native";
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

import { OUTER_RADIUS } from "../constants";

type Props = {
  angle: SharedValue<number>;
};

export function KaabaIndicator({ angle }: Props) {
  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }, { translateY: -OUTER_RADIUS }],
  }));

  return (
    <Animated.View style={[styles.kaabaWrapper, style]}>
      <Image source={require("@/assets/solah/kaaba-direction.png")} style={styles.kaaba} />
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  kaabaWrapper: {
    position: "absolute",
    alignItems: "center",
  },

  kaaba: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
});
