import { ReactNode, useEffect, useMemo, useState } from "react";
import { Dimensions, StyleSheet, View, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Extrapolation,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const { height } = Dimensions.get("window");

/**
 * Snap points expressed as translateY values
 * Negative values pull the sheet upward
 */
const SNAP_POINTS = {
  S75: -height * 0.75, // 75% visible
  S50: -height * 0.5, // 50% visible
  S25: -height * 0.25, // 25% visible
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  /**
   * translateY controls the sheet vertical position
   * Starts fully off-screen
   */
  const translateY = useSharedValue(height);

  /**
   * Prevent unmounting while animations / gestures are active
   */
  const [mounted, setMounted] = useState(isOpen);

  /**
   * Ordered snap points (top → bottom)
   */
  const snapPoints = useMemo(() => [SNAP_POINTS.S75, SNAP_POINTS.S50, SNAP_POINTS.S25], []);

  /**
   * Open / close controller
   */
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Default open at 50%
      translateY.value = withSpring(SNAP_POINTS.S50);
    } else {
      translateY.value = withSpring(height, {}, (finished) => {
        if (finished) {
          scheduleOnRN(setMounted, false);
        }
      });
    }
  }, [isOpen]);

  /**
   * Find nearest snap point
   */
  const getClosestSnapPoint = (value: number) => {
    "worklet";
    return snapPoints.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  /**
   * Drag gesture
   */
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = Math.max(SNAP_POINTS.S75, SNAP_POINTS.S50 + event.translationY);
    })
    .onEnd(() => {
      translateY.value = withSpring(getClosestSnapPoint(translateY.value));
    });

  /**
   * Sheet animation
   */
  const sheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [SNAP_POINTS.S75, height],
      [12, 32],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY: translateY.value }],
      borderRadius,
    };
  });

  /**
   * Backdrop fade animation
   */
  const backdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [height, SNAP_POINTS.S25],
      [0, 0.4],
      Extrapolation.CLAMP
    );

    return { opacity };
  });

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      {/* Sheet */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.sheet, sheetStyle]}>
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </GestureDetector>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    top: height, // start off-screen
    height: height,
    width: "100%",
    backgroundColor: "white",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginVertical: 12,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
});
