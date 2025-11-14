import { StyleSheet } from "react-native";

import { colors } from "@/shared/styles/colors";
import { font } from "@/shared/styles/font";
import { spacing } from "@/shared/styles/layout";

export const itemStyles = StyleSheet.create({
  container: {
    alignItems: "baseline",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    justifyContent: "space-between",
  },
  pressed: {
    backgroundColor: colors.background.default.secondary,
    borderRadius: 8,
  },
  left: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  label: {
    ...font.label.large,
    color: colors.context.default.primary,
  },
  value: {
    ...font.body.xsmall,
    color: colors.context.default.secondary,
    marginTop: 6,
  },
});
