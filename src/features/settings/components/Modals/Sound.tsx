import React from "react";
import { View, Text, Pressable, FlatList, Image } from "react-native";

import { SOUND_OPTIONS } from "@/features-settings/constants/notificationsAndSound";
import { useSettingsStore } from "@/features-settings/store";
import { colors, font, spacing } from "@/shared/styles";

export function Sound({ onClose }: { onClose?: () => void }) {
  const { sound, setSound } = useSettingsStore();

  const handleSelect = (next: string) => {
    setSound(next);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={SOUND_OPTIONS}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const selected = sound === item;
          return (
            <Pressable
              onPress={() => handleSelect(item)}
              style={[styles.option, selected && styles.selectedOption]}
            >
              <Text style={[styles.optionText, selected && styles.selectedOptionText]}>{item}</Text>
              {selected && (
                <Image
                  source={require("@/assets/adhkar-icons/verified-check.png")}
                  style={styles.checkIcon}
                />
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.default.primary,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
  },
  listContent: {
    paddingTop: spacing.xxs,
    paddingBottom: spacing.xl,
  },
  option: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.sm,
  },
  selectedOption: {
    backgroundColor: colors.background.brand.primary,
    borderRadius: spacing.sm,
  },
  optionText: {
    ...font.body.medium,
    color: colors.context.default.primary,
    flex: 1,
  },
  selectedOptionText: {
    color: colors.background.brand.inverted,
  },
  checkIcon: {
    width: 20,
    height: 20,
    marginLeft: spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border.default.tertiary,
    marginHorizontal: spacing.lg,
  },
};
