import { useEffect } from "react";
import type { AppStateStatus } from "react-native";

import { useSettingsStore } from "@/features-settings/store";

import { FOREGROUND_RESYNC_MAX_AGE_MS } from "../constants";
import { loadLastSyncedAt, syncSolahNotifications } from "../utils";

const AppState = require("react-native/Libraries/AppState/AppState");

export function useNotificationForegroundRenewal() {
  const enabled = useSettingsStore((s) => s.solahTimeNotification);
  const sound = useSettingsStore((s) => s.sound);
  const location = useSettingsStore((s) => s.location.location);
  const timezone = useSettingsStore((s) => s.timezone.timezone);
  const calculationMethod = useSettingsStore((s) => s.calculationMethod.method);
  const prayerSchedule = useSettingsStore((s) => s.prayerSchedule);
  const setEnabled = useSettingsStore((s) => s.setSolahTimeNotification);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async (state: AppStateStatus) => {
      if (state !== "active" || !enabled) {
        return;
      }

      const lastSyncedAt = await loadLastSyncedAt();
      if (lastSyncedAt && Date.now() - lastSyncedAt <= FOREGROUND_RESYNC_MAX_AGE_MS) {
        return;
      }

      const result = await syncSolahNotifications({
        enabled,
        sound,
        location,
        timezone,
        calculationMethod,
        prayerSchedule,
      });

      if (enabled && !result.permissionOk) {
        setEnabled(false);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [enabled, sound, location, timezone, calculationMethod, prayerSchedule, setEnabled]);
}
