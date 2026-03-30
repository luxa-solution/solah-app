import { useMemo, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { locations, LocationOption } from "@/features-settings/constants";
import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { SearchBar, SelectedIcon, styles } from "../shared";

interface LocationProps {
  onClose?: () => void;
}

export function Location({ onClose }: LocationProps) {
  const { location, setLocation, setTimeZone } = useSettingsStore();
  const { defaultLocation } = useDefaultStore();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return locations;

    return locations.filter((item) => {
      const name = item.name.toLowerCase();
      const city = item.location?.city?.toLowerCase();
      const country = item.location?.country?.toLowerCase();
      const region = (item.location?.region ?? "").toLowerCase();
      return name.includes(q) || city?.includes(q) || country?.includes(q) || region?.includes(q);
    });
  }, [query]);

  const handlePress = (item: LocationOption) => {
    if (item.isDefault) {
      if (!defaultLocation) return;

      // Use GPS-derived location
      setLocation(defaultLocation);

      // We need to implement a way to find and set default timezone.
      onClose?.();
      return;
    }

    setLocation(item);

    setTimeZone(item.timezone);
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
          const selected = item.isDefault ? false : location.name === item.name;

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
