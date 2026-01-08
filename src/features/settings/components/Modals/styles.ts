import { borderRadius, colors, font, spacing } from "@/shared/styles";

export const styles = {
  container: {
    flex: 1,
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
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius[4],
  },
  selectedOption: {
    backgroundColor: colors.background.brand.primary,
    borderRadius: spacing.sm,
  },
  optionText: {
    ...font.label.medium,
    color: colors.context.default.primary,
  },
  selectedOptionText: {
    color: colors.context.default.inverted,
  },
};
