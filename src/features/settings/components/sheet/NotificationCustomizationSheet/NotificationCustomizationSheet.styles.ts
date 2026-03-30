import { StyleSheet } from "react-native";

import { colors, font, spacing } from "@/shared/styles";

export const notificationCustomizationSheetStyles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: spacing.xs,
  },
  headerText: {
    ...font.label.medium,
    color: colors.context.default.secondary,
  },
  nameHeader: {
    flex: 1.4,
  },
  modeHeader: {
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
    borderBottomWidth: 0,
  },
  prayerName: {
    ...font.label.large,
    color: colors.context.default.primary,
    flex: 1.4,
  },
  modeCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    borderRadius: 12,
    minHeight: 48,
  },
  modeCellPressed: {
    backgroundColor: colors.background.default.secondary,
  },
});
