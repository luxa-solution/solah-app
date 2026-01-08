import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { useSettingsStore, useDefaultStore } from "@/features/settings/store";
import { calMethods } from "@/features-settings/constants";

import { SelectedIcon } from "./SelectedIcon";
import { styles } from "./styles";

type Prop = {
  onClose?: () => void;
};

export function CalculationMethod({ onClose }: Prop) {
  const { calculationMethod, setCalculationMethod } = useSettingsStore();
  const { defaultCalculationMethod } = useDefaultStore();

  const handlePress = (item: (typeof calMethods)[number]) => {
    if (item.isDefault) {
      setCalculationMethod(defaultCalculationMethod);
      onClose?.();
      return;
    }

    setCalculationMethod(item.method);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={calMethods}
        keyExtractor={(item) => item.method}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = item.isDefault ? false : calculationMethod === item.method;

          return (
            <Pressable
              onPress={() => handlePress(item)}
              style={[styles.option, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
                {item.name}
              </Text>
              {selected && <SelectedIcon />}
            </Pressable>
          );
        }}
      />
    </View>
  );
}
