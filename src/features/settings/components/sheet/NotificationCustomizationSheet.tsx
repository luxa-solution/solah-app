import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  NOTIFICATION_DELIVERY_ICON,
  NOTIFICATION_DELIVERY_LABEL,
  PRAYER_NOTIFICATION_ROW_HEADERS,
  PRAYER_SETTINGS,
} from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";
import {
  cycleNotificationDeliveryMode,
  updatePrayerNotificationMode,
} from "@/features-settings/utils";
import { colors, font, spacing } from "@/shared/styles";

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
              testID={`notification-mode-${slug}-adhan`}
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
            />
            <NotificationModeCell
              mode={config.iqamahNotificationMode}
              testID={`notification-mode-${slug}-iqamah`}
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
            />
          </View>
        );
      })}
    </View>
  );
}

type NotificationModeCellProps = {
  mode: "mute" | "vibrate" | "sound";
  onPress: () => void;
  testID: string;
};

function NotificationModeCell({ mode, onPress, testID }: NotificationModeCellProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={NOTIFICATION_DELIVERY_LABEL[mode]}
      onPress={onPress}
      style={({ pressed }) => [styles.modeCell, pressed && styles.modeCellPressed]}
      testID={testID}
    >
      <MaterialCommunityIcons
        color={colors.context.brand.primary}
        name={NOTIFICATION_DELIVERY_ICON[mode]}
        size={22}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: spacing.xs,
  },
  headerText: {
    ...font.label.medium,
    color: colors.context.default.secondary,
  },
  nameHeader: {
    flex: 1.4,
  },
  modeHeader: {
    flex: 1,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
    borderBottomWidth: 0,
  },
  prayerName: {
    ...font.label.large,
    color: colors.context.default.primary,
    flex: 1.4,
  },
  modeCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    borderRadius: 12,
    minHeight: 48,
  },
  modeCellPressed: {
    backgroundColor: colors.background.default.secondary,
  },
});
