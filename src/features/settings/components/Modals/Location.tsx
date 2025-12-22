import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";

import { useSettingsStore } from "@/features/settings/store/settingsStore";

import { styles } from "./Location.styles";

interface LocationProps {
  onClose?: () => void;
}

export function Location({ onClose }: LocationProps) {
  const { location, setLocation } = useSettingsStore();

  const locations = [
    { city: "Ilorin", country: "Nigeria", latitude: 8.4966, longitude: 4.5421 },
    { city: "Islamabad", country: "Pakistan", latitude: 33.6844, longitude: 73.0479 },
    { city: "Rabat", country: "Morocco", latitude: 33.9716, longitude: -6.8498 },
    { city: "New York", country: "United States", latitude: 40.7128, longitude: -74.006 },
    { city: "Riyadh", country: "Saudi Arabia", latitude: 24.7136, longitude: 46.6753 },
    { city: "Sana'a", country: "Yemen", latitude: 15.3694, longitude: 44.191 },
    { city: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816 },
  ];

  const handleSelectLocation = (selectedLocation: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  }) => {
    setLocation({
      longitude: selectedLocation.longitude,
      latitude: selectedLocation.latitude,
      city: selectedLocation.city,
      region: "",
      country: selectedLocation.country,
    });
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(item) => `${item.city}-${item.country}`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleSelectLocation(item)}
            style={[styles.option, location.city === item.city && styles.selectedOption]}
          >
            <Text
              style={[styles.optionText, location.city === item.city && styles.selectedOptionText]}
            >
              {item.city}, {item.country}
            </Text>
            {location.city === item.city && (
              <Image
                source={require("@/assets/adhkar-icons/verified-check.png")}
                style={styles.checkIcon}
              />
            )}
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
