import { Pressable, StyleSheet, Switch, Text, View } from "react-native";

import { colors, font, spacing } from "@/shared/styles";

type SettingsToggleRowProps = {
  label: string;
  value: string;
  enabled: boolean;
  onToggle: (next: boolean) => void;
};

export function SettingsToggleRow({ label, value, enabled, onToggle }: SettingsToggleRowProps) {
  return (
    <Pressable
      onPress={() => onToggle(!enabled)}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.left}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{
          false: colors.background.default.secondary,
          true: colors.background.brand.primary,
        }}
        thumbColor={colors.background.default.primary}
        ios_backgroundColor={colors.background.default.secondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
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
