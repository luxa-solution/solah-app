import { useMemo, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { useSettingsStore, useDefaultStore } from "@/features/settings/store";
import { timezones } from "@/features-settings/constants";

import { SearchBar, SelectedIcon, styles } from "./shared";

type Prop = {
  onClose?: () => void;
};

export function TimeZone({ onClose }: Prop) {
  const { timezone, setTimeZone } = useSettingsStore();
  const { defaultTimezone } = useDefaultStore();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return timezones;

    return timezones.filter((item) => {
      const name = item.name.toLowerCase();
      const tz = item.timezone.toLowerCase();
      return name.includes(q) || tz.includes(q);
    });
  }, [query]);

  const handlePress = (item: (typeof timezones)[number]) => {
    if (item.isDefault) {
      // Use device/app default
      setTimeZone(defaultTimezone);
      onClose?.();
      return;
    }

    setTimeZone(item);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const selected = item.isDefault ? false : timezone.timezone === item.timezone;

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
