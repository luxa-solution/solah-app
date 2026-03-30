import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { arabicFontSizes } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";

import { SelectedIcon, styles } from "../shared";

type Props = {
  onClose?: () => void;
};

export function ArabicFontSize({ onClose }: Props) {
  const { arabicFontSize, setArabicFontSize } = useSettingsStore();

  const handlePress = (item: (typeof arabicFontSizes)[number]) => {
    setArabicFontSize(item);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={arabicFontSizes}
        keyExtractor={(item) => String(item.value)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = arabicFontSize.value === item.value;

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
