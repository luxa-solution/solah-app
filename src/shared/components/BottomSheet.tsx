import { ReactNode, useEffect, useState } from "react";
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
 * Supported snap points
 */
type SnapPoint = "25%" | "50%" | "75%";

/**
 * Snap points expressed as translateY values
 * Negative values pull the sheet upward
 */
const SNAP_POINT_MAP: Record<SnapPoint, number> = {
  "25%": -height * 0.25,
  "50%": -height * 0.5,
  "75%": -height * 0.75,
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoint?: SnapPoint; // 👈 NEW
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  snapPoint = "50%", // 👈 DEFAULT
}: BottomSheetProps) {
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
   * Fixed snap point
   */
  const SNAP_Y = SNAP_POINT_MAP[snapPoint];

  /**
   * Open / close controller
   */
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      translateY.value = withSpring(SNAP_Y);
    } else {
      translateY.value = withSpring(height, {}, (finished) => {
        if (finished) {
          scheduleOnRN(setMounted, false);
        }
      });
    }
  }, [isOpen, SNAP_Y]);

  /**
   * Drag gesture
   * - Pull down to close
   * - Pull up is clamped to snap point
   */
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const nextY = translateY.value + event.translationY;
      translateY.value = Math.min(height, Math.max(SNAP_Y, nextY));
    })
    .onEnd(() => {
      if (translateY.value > SNAP_Y + 80) {
        translateY.value = withSpring(height, {}, (finished) => {
          if (finished) {
            scheduleOnRN(onClose);
          }
        });
      } else {
        translateY.value = withSpring(SNAP_Y);
      }
    });

  /**
   * Sheet animation
   */
  const sheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [SNAP_Y, height],
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
    const opacity = interpolate(translateY.value, [height, SNAP_Y], [0, 0.4], Extrapolation.CLAMP);

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

          {/* Content */}
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
    overflow: "hidden",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginVertical: 12,
  },
  content: {
    paddingBottom: 40,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
});
