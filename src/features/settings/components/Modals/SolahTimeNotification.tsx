import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";

import { SOLAH_TIME_NOTIFICATION_OPTIONS } from "@/features/settings/constants";
import { useSettingsStore } from "@/features-settings/store";
import { colors, font, spacing } from "@/shared/styles";

export function SolahTimeNotification() {
  const { solahTimeNotification, setSolahTimeNotification } = useSettingsStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={SOLAH_TIME_NOTIFICATION_OPTIONS}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => {
          const selected = solahTimeNotification === item.value;
          return (
            <Pressable
              onPress={() => setSolahTimeNotification(item.value)}
              style={[styles.option, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
                {item.label}
              </Text>
              {selected && (
                <Image
                  source={require("@/assets/adhkar-icons/verified-check.png")}
                  style={styles.checkIcon}
                />
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = {
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
    borderRadius: spacing.sm,
  },
  selectedOption: {
    backgroundColor: colors.background.brand.primary,
    borderRadius: spacing.sm,
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
