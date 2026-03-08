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

/**
 * AppButton — A reusable, theme-aware button component.
 *
 * This component supports multiple visual styles (variants), loading and disabled states,
 * optional left-side icons, and full-width or inline rendering. It is built with React Native's
 * `Pressable` for smooth press feedback.
 *
 * ## Variants
 * - **filled** — Solid background using the primary color.
 * - **outline** — Transparent background with a primary-colored border.
 * - **ghost** — Minimal button with no border or background, typically used for subtle actions.
 *
 * ## Example
 * ```tsx
 * <AppButton
 *   title="Continue"
 *   variant="filled"
 *   onPress={handleSubmit}
 *   loading={submitting}
 *   leftIcon={<Icon name="arrow-right" />}
 * />
 * ```
 *
 * @component
 * @param {string} title - The text to display inside the button.
 * @param {() => void} [onPress] - Callback function triggered when the button is pressed.
 * @param {"filled" | "outline" | "ghost"} [variant="filled"] - Defines the button's visual style.
 * @param {boolean} [disabled=false] - Disables the button and lowers opacity.
 * @param {boolean} [loading=false] - Shows a loading spinner instead of the text when true.
 * @param {React.ReactNode} [leftIcon] - Optional icon displayed to the left of the text.
 * @param {StyleProp<ViewStyle>} [style] - Additional container styles.
 * @param {StyleProp<TextStyle>} [textStyle] - Additional text styles.
 * @param {boolean} [fullWidth=true] - Whether the button should stretch to the container's width.
 *
 * @returns {JSX.Element} A styled button component with built-in loading and variant handling.
 */

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
