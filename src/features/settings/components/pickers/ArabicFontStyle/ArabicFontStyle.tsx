import { View, Text, Pressable, FlatList } from "react-native";

import { arabicFontStyles } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";

import { SelectedIcon, styles } from "../shared";

type Props = {
  onClose?: () => void;
};

export function ArabicFontStyle({ onClose }: Props) {
  const { arabicFontStyle, setArabicFontStyle } = useSettingsStore();

  const handlePress = (item: (typeof arabicFontStyles)[number]) => {
    setArabicFontStyle(item);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={arabicFontStyles}
        keyExtractor={(item) => item.value}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = arabicFontStyle.value === item.value;
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
