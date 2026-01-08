import React, { useMemo, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { languages } from "@/features-settings/constants";
import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { SearchBar, SelectedIcon, styles } from "./shared";

type Props = {
  onClose?: () => void;
};

export function Language({ onClose }: Props) {
  const { language, setLanguage } = useSettingsStore();
  const { defaultLanguage } = useDefaultStore();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return languages;

    return languages.filter((x) => x.name.toLowerCase().includes(q));
  }, [query]);

  const handlePress = (item: (typeof languages)[number]) => {
    if (item.isDefault) {
      setLanguage(defaultLanguage);
      onClose?.();
      return;
    }

    setLanguage(item);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.value}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const selected = item.isDefault ? false : language.value === item.value;

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
