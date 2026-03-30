import { Pressable, Switch, View, Text, StyleSheet } from "react-native";

import { useSettingsStore } from "@/features-settings/store";
import { colors, font, spacing } from "@/shared/styles";

export function NotificationToggle() {
  const { solahTimeNotification, setSolahTimeNotification } = useSettingsStore();

  return (
    <Pressable
      onPress={() => setSolahTimeNotification(!solahTimeNotification)}
      style={({ pressed }) => [toggleStyles.row, pressed && toggleStyles.pressed]}
    >
      <View style={toggleStyles.left}>
        <Text style={toggleStyles.label}>Prayer time notification</Text>
        <Text style={toggleStyles.value}>{solahTimeNotification ? "On" : "Off"}</Text>
      </View>
      <Switch
        value={solahTimeNotification}
        onValueChange={setSolahTimeNotification}
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

export const toggleStyles = StyleSheet.create({
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
