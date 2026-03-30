import { PRAYER_SETTINGS } from "@/features-settings/constants";
import { SettingsType } from "@/features-settings/types";
import { SolahName } from "@/features-solah/types";

export function getPrayerSettingsKind(settingsType: SettingsType): "adhan" | "iqamah" | null {
  if (settingsType === "adhansettings") {
    return "adhan";
  }

  if (settingsType === "iqamahsettings") {
    return "iqamah";
  }

  return null;
}

export function getPrayerFromSettingsType(
  settingsType: SettingsType
): { prayer: SolahName; kind: "adhan" | "iqamah" } | null {
  for (const entry of PRAYER_SETTINGS) {
    if (settingsType === `adhan_${entry.slug}`) {
      return { prayer: entry.prayer, kind: "adhan" };
    }
    if (settingsType === `iqamah_${entry.slug}`) {
      return { prayer: entry.prayer, kind: "iqamah" };
    }
  }

  return null;
}

export function getPrayerSheetTitle(settingsType: SettingsType) {
  const prayerSettingsKind = getPrayerSettingsKind(settingsType);
  if (prayerSettingsKind) {
    return `${prayerSettingsKind === "adhan" ? "Adhan" : "Iqamah"} Settings`;
  }

  const parsed = getPrayerFromSettingsType(settingsType);
  if (!parsed) return null;

  return `${parsed.prayer} ${parsed.kind === "adhan" ? "Adhan" : "Iqamah"}`;
}
