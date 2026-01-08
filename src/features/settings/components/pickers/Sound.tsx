import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { sounds } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";

import { SelectedIcon, styles } from "./shared";

type Prop = {
  onClose?: () => void;
};

export function Sound({ onClose }: Prop) {
  const { sound, setSound } = useSettingsStore();

  const handleSelect = (next: string) => {
    setSound(next);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sounds}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = sound === item;
          return (
            <Pressable
              onPress={() => handleSelect(item)}
              style={[styles.option, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selected && styles.selectedOptionText]}>{item}</Text>
              {selected && <SelectedIcon />}
            </Pressable>
          );
        }}
      />
    </View>
  );
}
