import { StyleSheet } from "react-native";

import { colors } from "@/shared/styles/colors";
import { font } from "@/shared/styles/font";
import { spacing } from "@/shared/styles/layout";

export const toggleStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
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
