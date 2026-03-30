import { useMemo, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { calMethods } from "@/features-settings/constants";
import { useSettingsStore, useDefaultStore } from "@/features-settings/store";

import { SearchBar, SelectedIcon, styles } from "../shared";

type Prop = {
  onClose?: () => void;
};

export function CalculationMethod({ onClose }: Prop) {
  const { calculationMethod, setCalculationMethod } = useSettingsStore();
  const { defaultCalculationMethod } = useDefaultStore();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return calMethods;

    // Search by display name and (optionally) method key
    return calMethods.filter((item) => {
      const name = item.name.toLowerCase();
      const method = String(item.method).toLowerCase();
      return name.includes(q) || method.includes(q);
    });
  }, [query]);

  const handlePress = (item: (typeof calMethods)[number]) => {
    if (item.isDefault) {
      setCalculationMethod(defaultCalculationMethod);
      onClose?.();
      return;
    }

    setCalculationMethod(item);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.method}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const selected = item.isDefault ? false : calculationMethod.method === item.method;

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
