import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { locations, LocationOption } from "@/features-settings/constants";
import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { SelectedIcon } from "./SelectedIcon";
import { styles } from "./styles";

interface LocationProps {
  onClose?: () => void;
}

export function Location({ onClose }: LocationProps) {
  const { location, setLocation, setTimeZone } = useSettingsStore();
  const { defaultLocation } = useDefaultStore();

  const handlePress = (item: LocationOption) => {
    if (item.isDefault) {
      if (!defaultLocation) return;

      // Use GPS-derived location
      setLocation(defaultLocation);

      // We need to implement a way to find and set default timezone.
      onClose?.();
      return;
    }

    setLocation({
      latitude: item.location.latitude,
      longitude: item.location.longitude,
      city: item.location.city,
      region: item.location.region,
      country: item.location.country,
    });

    setTimeZone(item.timezone);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = item.isDefault
            ? false
            : location.city === item.location.city && location.country === item.location.country;

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
