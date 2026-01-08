import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

import { colors, font, spacing } from "@/shared/styles";

export type ItemProps = {
  label: string;
  value: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function Item({ label, value, onPress, disabled = false }: ItemProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [itemStyles.container, pressed && itemStyles.pressed]}
    >
      <Text style={itemStyles.label}>{label}</Text>
      <Text style={itemStyles.value}>{value}</Text>
    </Pressable>
  );
}

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
