import { Item } from "@/features-settings/components/ui";
import { PRAYER_SETTINGS } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";
import { SettingsType } from "@/features-settings/types";
import { toText } from "@/features-settings/utils";

type PrayerSettingsMenuProps = {
  kind: "adhan" | "iqamah";
  onNavigate?: (type: SettingsType) => void;
};

export function PrayerSettingsMenu({ kind, onNavigate }: PrayerSettingsMenuProps) {
  const prayerSchedule = useSettingsStore((state) => state.prayerSchedule);

  return (
    <>
      {PRAYER_SETTINGS.map(({ prayer, label, slug }) => (
        <Item
          key={`${kind}-${prayer}`}
          label={`${label} ${kind}`}
          value={
            kind === "adhan"
              ? toText(`adhan_${slug}`, prayerSchedule[prayer].adhan)
              : toText(`iqamah_${slug}`, prayerSchedule[prayer].iqamahDelayMinutes)
          }
          onPress={() => onNavigate?.(`${kind}_${slug}`)}
        />
      ))}
    </>
  );
}
