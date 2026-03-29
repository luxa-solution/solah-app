import { View, Text, StyleSheet } from "react-native";

import { SettingsType } from "@/features-settings/types";
import { getPrayerSheetTitle } from "@/features-settings/utils";
import { colors, font } from "@/shared/styles";

const titles: Record<string, string> = {
  calmethod: "Calculation Method",
  timezone: "Time Zone",
  location: "Location",
  arabicfontsize: "Arabic Font Size",
  arabicfontstyle: "Arabic Font Style",
  solahtimenotif: "Solah Time Notification",
  sound: "Sound",
  customizenotifications: "Customize Notifications",
  language: "Language",
  calendarformat: "Calendar Format",
  timeformat: "Time Format",
};

export function SheetTitle({ settings_type }: { settings_type: SettingsType }) {
  const prayerTitle = getPrayerSheetTitle(settings_type);

  return (
    <View>
      <Text style={styles.title}>{prayerTitle ?? titles[settings_type]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...font.heading.xsmall,
    color: colors.context.default.primary,
    textAlign: "left",
    fontWeight: "700",
  },
});
