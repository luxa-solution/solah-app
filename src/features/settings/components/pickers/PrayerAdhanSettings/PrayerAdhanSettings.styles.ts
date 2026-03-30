import { StyleSheet } from "react-native";

import { colors, font, spacing } from "@/shared/styles";

export const prayerAdhanSettingsStyles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  modeRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  modeOption: {
    flex: 1,
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.default.tertiary,
    borderRadius: 16,
  },
  selectedOption: {
    backgroundColor: colors.background.brand.primary,
    borderColor: colors.background.brand.primary,
  },
  optionText: {
    ...font.body.small,
    color: colors.context.default.primary,
    textAlign: "center",
  },
  selectedOptionText: {
    color: colors.context.default.inverted,
  },
  editorBlock: {
    gap: spacing.xs,
  },
  helperText: {
    ...font.label.large,
    color: colors.context.default.primary,
  },
  helperCaption: {
    ...font.body.xsmall,
    color: colors.context.default.secondary,
  },
  timeRow: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "center",
  },
  timeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border.default.tertiary,
    borderRadius: 10,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  periodRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  periodButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border.default.tertiary,
  },
  error: {
    ...font.body.xsmall,
    color: "red",
  },
  saveButton: {
    marginTop: spacing.sm,
    borderRadius: 10,
    backgroundColor: colors.background.brand.primary,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  saveText: {
    ...font.label.large,
    color: colors.context.default.inverted,
  },
});
