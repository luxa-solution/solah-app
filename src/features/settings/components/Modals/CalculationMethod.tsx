import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { calMethods } from "@/features-settings/constants";

import { SelectedIcon } from "./SelectedIcon";
import { styles } from "./styles";

type Prop = {
  onClose?: () => void;
};

export function CalculationMethod({ onClose }: Prop) {
  const { calculationMethod, setCalculationMethod } = useSettingsStore();

  const handleSelectMethod = (method: string) => {
    setCalculationMethod(method as any);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={calMethods}
        keyExtractor={(item) => item.method}
        showsVerticalScrollIndicator={false}
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
            {calculationMethod === item.method && <SelectedIcon />}
          </Pressable>
        )}
      />
    </View>
  );
}
