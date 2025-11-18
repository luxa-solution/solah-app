// src/features/settings/components/Modals/TimeZone.tsx
import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";

import { useSettingsStore } from "@/features/settings/store/settingsStore";

import { styles } from "./TimeZone.styles";

export function TimeZone() {
  const { timezone, setTimeZone } = useSettingsStore();

  const timezones = [
    "GMT+1 Central African Time",
    "UTC-12:00 International Date Line West",
    "UTC-12:00 The Gulf Region",
    "UTC-12:00 Hawaii",
    "GMT+1 South Africa",
  ];

  const handleSelectTimezone = (selectedTimezone: string) => {
    setTimeZone(selectedTimezone as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Zone</Text>
      </View>

      <FlatList
        data={timezones}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectTimezone(item)}
            style={[styles.option, timezone === item && styles.selectedOption]}
          >
            <Text style={[styles.optionText, timezone === item && styles.selectedOptionText]}>
              {item}
            </Text>
            {timezone === item && (
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
