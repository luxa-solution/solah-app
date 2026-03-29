import { AllPrayerScheduleConfig, SoundOptions, TimeZone } from "@/features-settings/types";
import { CalculationMethodTypes, LocationData } from "@/features-solah/types";

export type ScheduleInput = {
  enabled: boolean;
  sound: SoundOptions;
  location: LocationData;
  timezone: TimeZone;
  calculationMethod: CalculationMethodTypes;
  prayerSchedule: AllPrayerScheduleConfig;
};
