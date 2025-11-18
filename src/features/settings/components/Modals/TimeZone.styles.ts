// src/features/settings/components/Modals/TimeZone.styles.ts
import { colors, font, spacing } from "@/shared/styles";

export const styles = {
  container: {
    backgroundColor: colors.background.default.primary,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default.tertiary,
  },
  headerText: {
    ...font.heading.small,
    color: colors.context.default.primary,
    textAlign: "center" as const,
  },
  option: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  selectedOption: {
    backgroundColor: colors.background.brand.primary,
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
