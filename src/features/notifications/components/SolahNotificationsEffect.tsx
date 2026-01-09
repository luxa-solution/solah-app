import { useEffect } from "react";

import { useSettingsStore } from "@/features-settings/store";

import { syncSolahNotifications } from "../utils";

export function SolahNotificationsEffect() {
  const enabled = useSettingsStore((s) => s.solahTimeNotification);
  const sound = useSettingsStore((s) => s.sound);
  const location = useSettingsStore((s) => s.location.location);
  const timezone = useSettingsStore((s) => s.timezone.timezone);
  const calculationMethod = useSettingsStore((s) => s.calculationMethod.method);
  const setEnabled = useSettingsStore((s) => s.setSolahTimeNotification);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const result = await syncSolahNotifications({
        enabled,
        sound,
        location,
        timezone,
        calculationMethod,
      });

      if (cancelled) return;

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
