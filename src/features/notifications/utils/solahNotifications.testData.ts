import { defaultPrayerScheduleConfig } from "@/features-solah/utils/prayerScheduleUtils";

export function withEnabledNotificationModes() {
  const schedule = defaultPrayerScheduleConfig();

  return Object.fromEntries(
    Object.entries(schedule).map(([prayer, config]) => [
      prayer,
      {
        ...config,
        adhanNotificationMode: "sound",
        iqamahNotificationMode: "vibrate",
      },
    ])
  ) as typeof schedule;
}

export const baseInput = {
  enabled: true,
  sound: "Default",
  location: {
    latitude: 21.4225,
    longitude: 39.8262,
    city: "Makkah",
    region: "Makkah Province",
    country: "Saudi Arabia",
  },
  timezone: "Asia/Riyadh" as any,
  calculationMethod: "MoonsightingCommittee" as const,
  prayerSchedule: withEnabledNotificationModes(),
};
