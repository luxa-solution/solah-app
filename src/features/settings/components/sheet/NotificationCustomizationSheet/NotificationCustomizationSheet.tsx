import React from "react";
import { Text, View } from "react-native";

import { PRAYER_NOTIFICATION_ROW_HEADERS, PRAYER_SETTINGS } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";
import {
  cycleNotificationDeliveryMode,
  updatePrayerNotificationMode,
} from "@/features-settings/utils";

import { notificationCustomizationSheetStyles as styles } from "./NotificationCustomizationSheet.styles";
import { NotificationModeCell } from "./parts/NotificationModeCell";

export function NotificationCustomizationSheet() {
  const prayerSchedule = useSettingsStore((state) => state.prayerSchedule);
  const setPrayerSchedule = useSettingsStore((state) => state.setPrayerSchedule);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {PRAYER_NOTIFICATION_ROW_HEADERS.map((header) => (
          <Text
            key={header}
            style={[styles.headerText, header === "Solah" ? styles.nameHeader : styles.modeHeader]}
          >
            {header}
          </Text>
        ))}
      </View>

      {PRAYER_SETTINGS.map(({ prayer, slug, label }) => {
        const config = prayerSchedule[prayer];
        return (
          <View key={prayer} style={styles.row} testID={`notification-row-${slug}`}>
            <Text style={styles.prayerName}>{label}</Text>
            <NotificationModeCell
              mode={config.adhanNotificationMode}
              onPress={() =>
                setPrayerSchedule(
                  prayer,
                  updatePrayerNotificationMode(
                    config,
                    "adhan",
                    cycleNotificationDeliveryMode(config.adhanNotificationMode)
                  )
                )
              }
              testID={`notification-mode-${slug}-adhan`}
            />
            <NotificationModeCell
              mode={config.iqamahNotificationMode}
              onPress={() =>
                setPrayerSchedule(
                  prayer,
                  updatePrayerNotificationMode(
                    config,
                    "iqamah",
                    cycleNotificationDeliveryMode(config.iqamahNotificationMode)
                  )
                )
              }
              testID={`notification-mode-${slug}-iqamah`}
            />
          </View>
        );
      })}
    </View>
  );
}
