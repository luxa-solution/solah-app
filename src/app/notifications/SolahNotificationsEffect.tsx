import { useEffect } from "react";

import { useSettingsStore } from "@/features-settings/store";

import { syncSolahNotifications } from "./solahNotifications";

export function SolahNotificationsEffect() {
  const enabled = useSettingsStore((s) => s.solahTimeNotification);
  const sound = useSettingsStore((s) => s.sound);
  const location = useSettingsStore((s) => s.location);
  const timezone = useSettingsStore((s) => s.timezone);
  const calculationMethod = useSettingsStore((s) => s.calculationMethod);
  const setEnabled = useSettingsStore((s) => s.setSolahTimeNotification);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (cancelled) return;
      const result = await syncSolahNotifications({
        enabled,
        sound,
        location,
        timezone,
        calculationMethod,
      });

      // If user turned it on but permissions are denied, revert switch to Off.
      if (enabled && !result.permissionOk) {
        setEnabled(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, sound, location, timezone, calculationMethod, setEnabled]);

  return null;
}
