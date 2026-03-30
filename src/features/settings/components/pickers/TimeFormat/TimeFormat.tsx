import React from "react";
import { View, Text, Pressable } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { timeFormats } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";

import { SelectedIcon, styles } from "../shared";

type Props = {
  onClose?: () => void;
};

export function TimeFormat({ onClose }: Props) {
  const { timeFormat, setTimeFormat } = useSettingsStore();

  const handlePress = (item: (typeof timeFormats)[number]) => {
    setTimeFormat(item);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={timeFormats}
        keyExtractor={(item) => item.value}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = timeFormat.value === item.value;

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
