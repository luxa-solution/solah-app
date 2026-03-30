import { PRAYER_SETTINGS } from "@/features-settings/constants";
import { useSettingsStore } from "@/features-settings/store";

import { SettingsToggleRow } from "../SettingsToggleRow";

export function PrayerNotificationToggleRows() {
  const prayerSchedule = useSettingsStore((state) => state.prayerSchedule);
  const setPrayerSchedule = useSettingsStore((state) => state.setPrayerSchedule);

  return (
    <>
      {PRAYER_SETTINGS.map(({ prayer, label }) => (
        <SettingsToggleRow
          key={`${prayer}-adhan`}
          label={`${label} adhan notification`}
          value={prayerSchedule[prayer].adhanNotificationMode !== "mute" ? "On" : "Off"}
          enabled={prayerSchedule[prayer].adhanNotificationMode !== "mute"}
          onToggle={(next) =>
            setPrayerSchedule(prayer, {
              ...prayerSchedule[prayer],
              adhanNotificationMode: next ? "sound" : "mute",
            })
          }
        />
      ))}
      {PRAYER_SETTINGS.map(({ prayer, label }) => (
        <SettingsToggleRow
          key={`${prayer}-iqamah`}
          label={`${label} iqamah notification`}
          value={prayerSchedule[prayer].iqamahNotificationMode !== "mute" ? "On" : "Off"}
          enabled={prayerSchedule[prayer].iqamahNotificationMode !== "mute"}
          onToggle={(next) =>
            setPrayerSchedule(prayer, {
              ...prayerSchedule[prayer],
              iqamahNotificationMode: next ? "vibrate" : "mute",
            })
          }
        />
      ))}
    </>
  );
}
