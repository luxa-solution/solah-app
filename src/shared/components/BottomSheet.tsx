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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type SnapPoint = "25%" | "50%" | "75%";

const SNAP_HEIGHT_MAP: Record<SnapPoint, number> = {
  "25%": SCREEN_HEIGHT * 0.25,
  "50%": SCREEN_HEIGHT * 0.5,
  "75%": SCREEN_HEIGHT * 0.75,
};

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoint?: SnapPoint;
}

export function BottomSheet({ isOpen, onClose, children, snapPoint = "50%" }: BottomSheetProps) {
  const sheetHeight = SNAP_HEIGHT_MAP[snapPoint];
  const translateY = useSharedValue(sheetHeight);
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      translateY.value = withSpring(0, {});
    } else {
      translateY.value = withSpring(sheetHeight, {}, (finished) => {
        if (finished) {
          scheduleOnRN(setMounted, false);
        }
      });
    }
  }, [isOpen, sheetHeight, translateY]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const nextY = translateY.value + event.translationY;
      translateY.value = Math.min(SCREEN_HEIGHT, Math.max(sheetHeight, nextY));
    })
    .onEnd(() => {
      if (translateY.value > sheetHeight * 0.2) {
        translateY.value = withSpring(sheetHeight, {}, (finished) => {
          if (finished) {
            scheduleOnRN(onClose);
          }
        });
      } else {
        translateY.value = withSpring(0, {});
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    height: sheetHeight,
    top: SCREEN_HEIGHT - sheetHeight, // Position at bottom of screen
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [sheetHeight, 0], // Input: Closed -> Open
      [0, 0.4], // Output: Transparent -> Dark
      Extrapolation.CLAMP
    ),
  }));

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable
          testID="bottomsheet-backdrop"
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />
      </Animated.View>

      {/* Sheet */}
      <Animated.View style={[styles.sheet, sheetStyle]}>
        <GestureDetector gesture={panGesture}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>
        </GestureDetector>
        {/* Content */}
        <View style={styles.contentContainer}>{children}</View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    overflow: "hidden",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  handleContainer: {
    width: "100%",
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ccc",
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
});
