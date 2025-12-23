import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { calMethods } from "@/features-settings/constants";
import { colors, font, spacing } from "@/shared/styles";

export function CalculationMethod() {
  const { calculationMethod, setCalculationMethod } = useSettingsStore();

  const handleSelectMethod = (method: string) => {
    setCalculationMethod(method as any);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={calMethods}
        keyExtractor={(item) => item.method}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectMethod(item.method)}
            style={[styles.option, calculationMethod === item.method && styles.selectedOption]}
          >
            <Text
              style={[
                styles.optionText,
                calculationMethod === item.method && styles.selectedOptionText,
              ]}
            >
              {item.name}
            </Text>
            {calculationMethod === item.method && (
              <Image
                source={require("@/assets/adhkar-icons/verified-check.png")}
                style={styles.checkIcon}
              />
            )}
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

export const styles = {
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
    borderRadius: spacing.sm, // Add base borderRadius to all options
  },
  selectedOption: {
    backgroundColor: colors.background.brand.primary, // Warm brown color
    borderRadius: spacing.sm, // Add borderRadius for selected state
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
