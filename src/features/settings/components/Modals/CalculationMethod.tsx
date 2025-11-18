// src/features/settings/components/Modals/CalculationMethod.tsx
import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";

import { useSettingsStore } from "@/features/settings/store/settingsStore";

import { styles } from "./CalculationMethod.styles";

export function CalculationMethod() {
  const { calculationMethod, setCalculationMethod } = useSettingsStore();

  const methods = [
    "Ummul Oura University, Makkah",
    "Kuwait",
    "The Gulf Region",
    "Morocco",
    "Nigeria",
  ];

  const handleSelectMethod = (method: string) => {
    setCalculationMethod(method as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Calculation method</Text>
      </View>

      <FlatList
        data={methods}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectMethod(item)}
            style={[styles.option, calculationMethod === item && styles.selectedOption]}
          >
            <Text
              style={[styles.optionText, calculationMethod === item && styles.selectedOptionText]}
            >
              {item}
            </Text>
            {calculationMethod === item && (
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
