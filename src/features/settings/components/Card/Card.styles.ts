import { StyleSheet } from "react-native";

import { colors } from "@/shared/styles/colors";
import { font, fontweight } from "@/shared/styles/font";
import { spacing, borderRadius, effect } from "@/shared/styles/layout";

export const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.default.primary,
    borderRadius: borderRadius[4],
    borderWidth: 1,
    borderColor: colors.border.default.tertiary,
    padding: spacing.md,
    marginVertical: spacing.sm,
    ...effect.E1,
  },
  title: {
    color: colors.context.brand.secondary,
    ...font.heading.xsmall,
    fontWeight: fontweight.semibold,
  },
  description: {
    fontSize: font.body.small.fontSize,
    fontFamily: font.body.small.fontFamily,
    color: colors.context.default.secondary,
    marginBottom: spacing.sm,
  },
  content: {
    // children flow here
  },
});
