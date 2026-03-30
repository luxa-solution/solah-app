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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const CLOSE_ANIMATION_MS = 220;

type SnapPoint = "25%" | "50%" | "75%";

const SNAP_HEIGHT_MAP: Record<SnapPoint, number> = {
  "25%": SCREEN_HEIGHT * 0.25,
  "50%": SCREEN_HEIGHT * 0.5,
  "75%": SCREEN_HEIGHT * 0.75,
};

export const clampBottomSheetTranslateY = (
  currentY: number,
  translationY: number,
  sheetHeight: number,
  _screenHeight: number = SCREEN_HEIGHT
) => {
  return Math.min(sheetHeight, Math.max(0, currentY + translationY));
};

export const shouldCloseBottomSheet = (translateY: number, sheetHeight: number) => {
  return translateY > sheetHeight * 0.2;
};

export const shouldExpandBottomSheet = (translateY: number, collapsedPosition: number) => {
  return translateY < collapsedPosition * 0.5;
};

type SharedTranslateY = { value: number };

export const createBottomSheetPanStartHandler = (
  translateY: SharedTranslateY,
  startY: SharedTranslateY
) => {
  return () => {
    startY.value = translateY.value;
  };
};

export const updateBottomSheetPosition = (
  translateY: SharedTranslateY,
  startY: SharedTranslateY,
  translationY: number,
  sheetHeight: number,
  screenHeight: number = SCREEN_HEIGHT
) => {
  translateY.value = clampBottomSheetTranslateY(
    startY.value,
    translationY,
    sheetHeight,
    screenHeight
  );
  return translateY.value;
};

export const settleBottomSheetPosition = (
  translateY: SharedTranslateY,
  collapsedPosition: number,
  closedPosition: number,
  animateTo: (value: number) => number,
  onClose: () => void
) => {
  if (
    shouldCloseBottomSheet(translateY.value - collapsedPosition, closedPosition - collapsedPosition)
  ) {
    onClose();
    return "closed";
  }

  if (shouldExpandBottomSheet(translateY.value, collapsedPosition)) {
    translateY.value = animateTo(0);
    return "expanded";
  }

  translateY.value = animateTo(collapsedPosition);
  return "collapsed";
};

export const createBottomSheetPanUpdateHandler = (
  translateY: SharedTranslateY,
  startY: SharedTranslateY,
  sheetHeight: number,
  screenHeight: number = SCREEN_HEIGHT
) => {
  return (event: { translationY: number }) => {
    updateBottomSheetPosition(translateY, startY, event.translationY, sheetHeight, screenHeight);
  };
};

export const createBottomSheetPanEndHandler = (
  translateY: SharedTranslateY,
  collapsedPosition: number,
  closedPosition: number,
  animateTo: (value: number) => number,
  onClose: () => void
) => {
  return () => {
    settleBottomSheetPosition(translateY, collapsedPosition, closedPosition, animateTo, onClose);
  };
};

export const finishBottomSheetClose = (finished: boolean | undefined, onClose: () => void) => {
  if (finished) {
    onClose();
  }
};

export const animateBottomSheetWithSpring = (
  spring: (value: number, config: object) => number,
  value: number
) => {
  return spring(value, {});
};

export const createBottomSheetSpringAnimator = (
  spring: (value: number, config: object) => number
) => {
  return (value: number) => animateBottomSheetWithSpring(spring, value);
};

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  snapPoint?: SnapPoint;
}

export function BottomSheet({ isOpen, onClose, children, snapPoint = "50%" }: BottomSheetProps) {
  const minHeight = SNAP_HEIGHT_MAP[snapPoint];
  const maxHeight = SCREEN_HEIGHT * 0.9;
  const collapsedPosition = maxHeight - minHeight;
  const closedPosition = maxHeight;
  const translateY = useSharedValue(closedPosition);
  const panStartY = useSharedValue(0);
  const [mounted, setMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      translateY.value = withSpring(collapsedPosition, {});
      return;
    }

    translateY.value = withSpring(closedPosition, {});
    const timer = setTimeout(() => {
      setMounted(false);
    }, CLOSE_ANIMATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [collapsedPosition, closedPosition, isOpen, translateY]);

  const handlePanStart = createBottomSheetPanStartHandler(translateY, panStartY);
  const handlePanUpdate = createBottomSheetPanUpdateHandler(translateY, panStartY, closedPosition);
  const handlePanEnd = createBottomSheetPanEndHandler(
    translateY,
    collapsedPosition,
    closedPosition,
    createBottomSheetSpringAnimator(withSpring),
    onClose
  );

  const panGesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(handlePanStart)
    .onUpdate(handlePanUpdate)
    .onEnd(handlePanEnd);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    height: maxHeight,
    top: SCREEN_HEIGHT - maxHeight,
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [closedPosition, collapsedPosition, 0],
      [0, 0.2, 0.4],
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
