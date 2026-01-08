import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { useSettingsStore, useDefaultStore } from "@/features/settings/store";
import { timezones } from "@/features-settings/constants";

import { SelectedIcon } from "./SelectedIcon";
import { styles } from "./styles";

type Prop = {
  onClose?: () => void;
};

export function TimeZone({ onClose }: Prop) {
  const { timezone, setTimeZone } = useSettingsStore();
  const { defaultTimezone } = useDefaultStore();

  const handlePress = (item: (typeof timezones)[number]) => {
    if (item.isDefault) {
      // Use device/app default
      setTimeZone(defaultTimezone);
      onClose?.();
      return;
    }

    setTimeZone(item.timezone);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={timezones}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = item.isDefault ? false : timezone === item.timezone;

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
