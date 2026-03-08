import { StyleSheet, Dimensions } from "react-native";

import { colors } from "./colors";

// SPACING
export const spacing = {
  xxxs: 2,
  "3xs": 2,
  xxs: 4,
  "2xs": 4,
  xs: 8,
  sm: 12,
  s: 12,
  md: 16,
  m: 16,
  lg: 20,
  l: 20,
  xl: 24,
  xxl: 32,
  "2xl": 32,
  xxxl: 40,
  "3xl": 40,
  "4xl": 48,
  "5xl": 56,
  "6xl": 64,
  "7xl": 72,
  "8xl": 80,
  "9xl": 96,
  "10xl": 112,
} as const;

// BORDERS

export const borderRadius = {
  none: 0,
  1: 2,
  2: 4,
  3: 6,
  4: 8,
  5: 10,
  6: 12,
  7: 16,
  8: 20,
  9: 24,
  10: 28,
  11: 32,
  12: 36,
  full: 999,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
} as const;

export const borderWidth = {
  xs: StyleSheet.hairlineWidth,
  sm: 1,
  md: 2,
  lg: 4,
  xl: 8,
} as const;

export const effect = StyleSheet.create({
  E0: {
    boxShadow: "0px -2px 30px 4px rgba(51, 51, 51, 0.2)",
  },
  E1: {
    boxShadow: "4px 4px 8px 4px rgba(88, 92, 95, 0.04)",
  },
  E2: {
    boxShadow: "0px 4px 30px 4px rgba(88, 92, 95, 0.1)",
  },
  E3: {
    boxShadow: "4px 8px 30px 8px rgba(88, 92, 95, 0.2)",
  },
});

// SCREEN STYLES

const baseStyle = {
  bgColor: colors.background.default.primary,
  padding: spacing.lg,
};

export const screenDimension: {
  width: number;
  height: number;
} = Dimensions.get("window");

export const screenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyle.bgColor,
    paddingHorizontal: baseStyle.padding,
  },
});

export const keyboardViewStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyle.bgColor,
    paddingHorizontal: baseStyle.padding,
    justifyContent: "center",
  },
});

export const emptyScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyle.bgColor,
    paddingHorizontal: baseStyle.padding,
    justifyContent: "center",
    alignItems: "center",
  },
});
