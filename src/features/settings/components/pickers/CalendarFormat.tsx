import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { calendarFormats } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";

import { SelectedIcon, styles } from "./shared";

type Props = {
  onClose?: () => void;
};

export function CalendarFormat({ onClose }: Props) {
  const { calendarFormat, setCalendarFormat } = useSettingsStore();

  const handlePress = (item: (typeof calendarFormats)[number]) => {
    setCalendarFormat(item);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={calendarFormats}
        keyExtractor={(item) => item.value}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = calendarFormat.value === item.value;
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
