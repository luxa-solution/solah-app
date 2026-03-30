import { SolahName } from "@/features-solah/types";

export type PrayerSettingSlug = "subhi" | "dhuhr" | "asr" | "maghrib" | "isha";
export type PrayerSettingsOverviewType = "adhansettings" | "iqamahsettings";

export const PRAYER_SETTINGS: readonly {
  prayer: SolahName;
  slug: PrayerSettingSlug;
  label: SolahName;
}[] = [
  { prayer: "Subhi", slug: "subhi", label: "Subhi" },
  { prayer: "Dhuhr", slug: "dhuhr", label: "Dhuhr" },
  { prayer: "Asr", slug: "asr", label: "Asr" },
  { prayer: "Maghrib", slug: "maghrib", label: "Maghrib" },
  { prayer: "Isha", slug: "isha", label: "Isha" },
] as const;

export const PRAYER_SETTINGS_OVERVIEW_ITEMS: readonly {
  type: PrayerSettingsOverviewType;
  cardTitle: "Adhan" | "Iqamah";
  label: string;
  value: string;
}[] = [
  {
    type: "adhansettings",
    cardTitle: "Adhan",
    label: "Adhan settings",
    value: "Configure each prayer",
  },
  {
    type: "iqamahsettings",
    cardTitle: "Iqamah",
    label: "Iqamah settings",
    value: "Set each prayer delay",
  },
] as const;

export const IQAMAH_DELAY_OPTIONS = Array.from({ length: 12 }, (_, index) => (index + 1) * 5);
export const ADHAN_OFFSET_OPTIONS = [5, 10, 15, 20, 25, 30] as const;
