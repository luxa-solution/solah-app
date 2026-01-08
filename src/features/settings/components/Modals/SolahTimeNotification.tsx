import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";

import { SOLAH_TIME_NOTIFICATION_OPTIONS } from "@/features/settings/constants";
import { useSettingsStore } from "@/features-settings/store";

import { SelectedIcon } from "./SelectedIcon";
import { styles } from "./styles";

export function SolahTimeNotification() {
  const { solahTimeNotification, setSolahTimeNotification } = useSettingsStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={SOLAH_TIME_NOTIFICATION_OPTIONS}
        keyExtractor={(item) => item.label}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const selected = solahTimeNotification === item.value;
          return (
            <Pressable
              onPress={() => setSolahTimeNotification(item.value)}
              style={[styles.option, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
                {item.label}
              </Text>
              {selected && <SelectedIcon />}
            </Pressable>
          );
        }}
      />
    </View>
  );
}
