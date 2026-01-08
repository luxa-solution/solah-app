import { View, Text, StyleSheet } from "react-native";

import { SettingsType } from "@/features-settings/types";
import { colors, font } from "@/shared/styles";

const titles: Record<SettingsType, string> = {
  calmethod: "Calculation Method",
  timezone: "Time Zone",
  location: "Location",
  arabicfontsize: "Arabic Font Size",
  arabicfontstyle: "Arabic Font Style",
  solahtimenotif: "Solah Time Notification",
  sound: "Sound",
  language: "Language",
  calendarformat: "Calendar Format",
  timeformat: "Time Format",
};

export function ModalTitleBar({ settings_type }: { settings_type: SettingsType }) {
  return (
    <View>
      <Text style={styles.title}>{titles[settings_type]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...font.label.medium,
    color: colors.context.default.primary,
    textAlign: "left",
    fontWeight: "600",
  },
});
