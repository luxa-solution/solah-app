import { View, Text, ViewStyle, StyleSheet } from "react-native";

import { borderRadius, colors, effect, font, fontweight, spacing } from "@/shared/styles";

export type CardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
};

export function Card({ title, children, style }: CardProps) {
  return (
    <>
      <Text style={cardStyles.title}>{title}</Text>
      <View style={[cardStyles.container, style]}>
        <View style={cardStyles.content}>{children}</View>
      </View>
    </>
  );
}

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
