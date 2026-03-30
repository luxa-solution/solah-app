import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

import {
  background,
  border,
  borderRadius,
  borderWidth,
  context,
  fontweight,
  spacing,
} from "@/shared/styles";

export type Variant = "filled" | "outline" | "ghost";

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
}

export function AppButton({
  title,
  onPress,
  variant = "filled",
  disabled = false,
  loading = false,
  leftIcon,
  style,
  textStyle,
  fullWidth = true,
}: ButtonProps) {
  const backgroundColor = variant === "filled" ? background.brand.secondary : "transparent";
  const borderColor = variant === "outline" ? border.brand.secondary : "transparent";

  let textColor: string;
  if (variant === "filled") {
    textColor = context.brand.inverted;
  } else if (variant === "outline") {
    textColor = context.brand.primary;
  } else {
    textColor = context.brand.primary;
  }

  const containerStyles = [
    styles.button,
    fullWidth && { alignSelf: "stretch" as const },
    { backgroundColor, borderColor },
    disabled && { opacity: 0.6 },
    style,
  ].filter(Boolean);

  return (
    <Pressable
      testID="app-button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [containerStyles, pressed && !disabled && { opacity: 0.8 }]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
          <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: borderRadius.lg,
    borderWidth: borderWidth.xs,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    marginVertical: spacing.xxs,
  },
  text: {
    fontSize: 16,
    fontWeight: fontweight.semibold,
    letterSpacing: 0.3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: spacing.xs,
  },
});
