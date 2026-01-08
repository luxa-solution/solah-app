import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { useSettingsStore } from "@/features/settings/store/settingsStore";
import { timezones } from "@/features-settings/constants";

import { SelectedIcon } from "./SelectedIcon";
import { styles } from "./styles";

type Prop = {
  onClose?: () => void;
};

export function TimeZone({ onClose }: Prop) {
  const { timezone, setTimeZone } = useSettingsStore();

  const handleSelectTimezone = (selectedTimezone: string) => {
    setTimeZone(selectedTimezone as any);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={timezones}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
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
            {timezone === item.timezone && <SelectedIcon />}
          </Pressable>
        )}
      />
    </View>
  );
}
