import { colors, font, spacing } from "@/shared/styles";

export const styles = {
  container: {
    backgroundColor: colors.background.default.primary,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    paddingBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  option: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.sm, // Add base borderRadius to all options
  },
  selectedOption: {
    backgroundColor: colors.background.brand.primary, // Warm brown color
    borderRadius: spacing.sm, // Add borderRadius for selected state
  },
  optionText: {
    ...font.body.medium,
    color: colors.context.default.primary,
    flex: 1,
  },
  selectedOptionText: {
    color: colors.background.brand.inverted,
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginLeft: spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.default.tertiary,
    marginHorizontal: spacing.lg,
  },
};
