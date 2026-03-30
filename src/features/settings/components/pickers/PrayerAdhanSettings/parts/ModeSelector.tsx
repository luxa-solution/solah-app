import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

import { PRAYER_ADHAN_MODE_OPTIONS } from "@/features-settings/constants";
import { AdhanMode } from "@/features-settings/types";
import { colors } from "@/shared/styles";

import { prayerAdhanSettingsStyles as styles } from "../PrayerAdhanSettings.styles";

type ModeSelectorProps = {
  mode: AdhanMode;
  onSelect: (mode: AdhanMode) => void;
};

export function ModeSelector({ mode, onSelect }: ModeSelectorProps) {
  return (
    <View style={styles.modeRow}>
      {PRAYER_ADHAN_MODE_OPTIONS.map((option) => {
        const selected = option.value === mode;
        return (
          <Pressable
            accessibilityLabel={option.label}
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={[styles.modeOption, selected && styles.selectedOption]}
          >
            <MaterialCommunityIcons
              color={selected ? colors.context.default.inverted : colors.context.brand.primary}
              name={option.icon}
              size={24}
            />
            <Text style={[styles.optionText, selected && styles.selectedOptionText]}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
