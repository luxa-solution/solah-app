import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, font, spacing } from "@/shared/styles";

interface SettingsTitleBarProps {
  title: string;
}

export const SettingsTitleBar = ({ title }: SettingsTitleBarProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.default.primary,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...font.heading.xsmall,
    fontWeight: "semibold",
    color: colors.context.default.primary,
    textAlign: "center",
  },
});
