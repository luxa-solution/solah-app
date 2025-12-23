import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { timezones } from "@/features-settings/constants";

import { styles } from "./TimeZone.styles";

export function TimeZone() {
  const { timezone, setTimeZone } = useSettingsStore();

  const handleSelectTimezone = (selectedTimezone: string) => {
    setTimeZone(selectedTimezone as any);
  };

  return (
    <View style={styles.container}>
      {/* REMOVED THE HEADER SECTION */}
      <FlatList
        data={timezones}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectTimezone(item.timezone)}
            style={[styles.option, timezone === item.timezone && styles.selectedOption]}
          >
            <Text
              style={[styles.optionText, timezone === item.timezone && styles.selectedOptionText]}
            >
              {item.name}
            </Text>
            {timezone === item.timezone && (
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
