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
    { city: "Ilorin", country: "Nigeria" },
    { city: "Islamabad", country: "Pakistan" },
    { city: "Rabat", country: "Morocco" },
    { city: "New York", country: "United State" },
    { city: "Riyadh", country: "Saudi Arabia" },
    { city: "Sana'a", country: "Yemen" },
    { city: "Buenos Aires", country: "Argentina" },
  ];

  const handleSelectLocation = (selectedLocation: { city: string; country: string }) => {
    setLocation({
      longitude: 0,
      latitude: 0,
      city: selectedLocation.city,
      region: "",
      country: selectedLocation.country,
    });
    onClose?.();
  };

  return (
    <View style={styles.container}>
      {/* REMOVED THE HEADER SECTION */}
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
