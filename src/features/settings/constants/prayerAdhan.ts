import { MaterialCommunityIcons } from "@expo/vector-icons";

import { PrayerAdhanConfig } from "@/features-settings/types";

export type PrayerAdhanModeIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export const PRAYER_ADHAN_MODE_OPTIONS: {
  label: string;
  icon: PrayerAdhanModeIconName;
  value: PrayerAdhanConfig["mode"];
}[] = [
  { label: "At solah time", icon: "clock-check-outline", value: "at_solah_time" },
  { label: "Relative after solah", icon: "timeline-clock-outline", value: "relative_after_solah" },
  { label: "Fixed time", icon: "clock-outline", value: "fixed_time" },
];
