import { SolahName } from "@/features-solah/types";

export type AdhanMode = "at_solah_time" | "relative_after_solah" | "fixed_time";

export interface PrayerAdhanConfig {
  mode: AdhanMode;
  offsetMinutes?: number;
  fixedTime?: string;
}

export interface PrayerScheduleConfig {
  adhan: PrayerAdhanConfig;
  iqamahDelayMinutes: number;
  adhanNotificationEnabled: boolean;
  iqamahNotificationEnabled: boolean;
}

export type AllPrayerScheduleConfig = Record<SolahName, PrayerScheduleConfig>;
