import {
  DEFAULT_NOTIFICATION_MODE_BY_KIND,
  NOTIFICATION_DELIVERY_MODES,
  NotificationDeliveryMode,
} from "@/features-settings/constants";
import { AllPrayerScheduleConfig, PrayerScheduleConfig } from "@/features-settings/types";

export function cycleNotificationDeliveryMode(
  currentMode: NotificationDeliveryMode
): NotificationDeliveryMode {
  const currentIndex = NOTIFICATION_DELIVERY_MODES.indexOf(currentMode);
  return NOTIFICATION_DELIVERY_MODES[(currentIndex + 1) % NOTIFICATION_DELIVERY_MODES.length];
}

export function isNotificationDeliveryEnabled(mode: NotificationDeliveryMode): boolean {
  return mode !== "mute";
}

export function applyNotificationDefaultsForEnabledState(
  prayerSchedule: AllPrayerScheduleConfig
): AllPrayerScheduleConfig {
  return Object.fromEntries(
    Object.entries(prayerSchedule).map(([prayer, config]) => [
      prayer,
      {
        ...config,
        adhanNotificationMode:
          config.adhanNotificationMode === "mute"
            ? DEFAULT_NOTIFICATION_MODE_BY_KIND.adhan
            : config.adhanNotificationMode,
        iqamahNotificationMode:
          config.iqamahNotificationMode === "mute"
            ? DEFAULT_NOTIFICATION_MODE_BY_KIND.iqamah
            : config.iqamahNotificationMode,
      },
    ])
  ) as AllPrayerScheduleConfig;
}

export function updatePrayerNotificationMode(
  config: PrayerScheduleConfig,
  kind: "adhan" | "iqamah",
  mode: NotificationDeliveryMode
): PrayerScheduleConfig {
  return kind === "adhan"
    ? { ...config, adhanNotificationMode: mode }
    : { ...config, iqamahNotificationMode: mode };
}
