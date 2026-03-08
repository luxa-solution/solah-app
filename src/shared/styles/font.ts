import { StyleSheet } from "react-native";

import { fontSize } from "@/shared/utils/responsive-dimensions";

export const fontsize = {
  xs: fontSize(12),
  sm: fontSize(14),
  md: fontSize(16),
  lg: fontSize(18),
  xl: fontSize(20),
  xxl: fontSize(24),
  xxxl: fontSize(30),
} as const;

export const fontweight = {
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "500",
  semibold: "600",
  bold: "700",
  extrabold: "900",
} as const;

const display_base = {
  fontFamily: "Figtree_700Bold",
  // lineHeight: 1.2,
  letterSpacing: 0,
};

const display = StyleSheet.create({
  large: {
    ...display_base,
    fontSize: fontSize(42),
  },
  medium: {
    ...display_base,
    fontSize: fontSize(36),
  },
  small: {
    ...display_base,
    fontSize: fontSize(32),
  },
});

const heading_base = {
  fontFamily: "Figtree_700Bold",
  // lineHeight: 1.2,
  letterSpacing: 0,
};

const heading = StyleSheet.create({
  large: {
    ...heading_base,
    fontSize: fontSize(28),
  },
  medium: {
    ...heading_base,
    fontSize: fontSize(26),
  },
  small: {
    ...heading_base,
    fontSize: fontSize(24),
  },
  xsmall: {
    fontFamily: "Figtree_500Medium",
    fontSize: fontSize(20),
  },
});

const body_base = {
  fontFamily: "Figtree_400Regular",
  // lineHeight: 1.2,
  letterSpacing: 0,
};

const body = StyleSheet.create({
  large: {
    ...body_base,
    fontSize: fontSize(18),
  },
  medium: {
    ...body_base,
    fontSize: fontSize(16),
  },
  small: {
    ...body_base,
    fontSize: fontSize(14),
  },
  xsmall: {
    ...body_base,
    fontSize: fontSize(12),
  },
});

const label_base = {
  fontFamily: "Figtree_500Medium",
  // lineHeight: 1.2,
  letterSpacing: 0,
};

const label = StyleSheet.create({
  large: {
    ...label_base,
    fontSize: fontSize(16),
  },
  medium: {
    ...label_base,
    fontSize: fontSize(14),
  },
  small: {
    ...label_base,
    fontSize: fontSize(12),
  },
  xsmall: {
    ...label_base,
    fontSize: fontSize(10),
  },
});

export const font = {
  display,
  heading,
  body,
  label,
};
