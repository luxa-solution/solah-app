import { useEffect } from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";
import { createAutomaticLocationOption, resolveAutomaticTimeZone } from "@/features-settings/utils";
import { useCurrentLocation } from "@/features-solah/hooks";

export function useSyncDefaultLocation() {
  const { location, loading, error } = useCurrentLocation();
  const activeLocation = useSettingsStore((state) => state.location);
  const autoTimezoneEnabled = useSettingsStore((state) => state.autoTimezoneEnabled);
  const setLocation = useSettingsStore((state) => state.setLocation);
  const setTimeZone = useSettingsStore((state) => state.setTimeZone);
  const setDefaultLocation = useDefaultStore((state) => state.setDefaultLocation);
  const setDefaultTimeZone = useDefaultStore((state) => state.setDefaultTimeZone);

  useEffect(() => {
    if (loading || error || !location) {
      return;
    }

    const automaticTimeZone = resolveAutomaticTimeZone();
    const automaticLocation = createAutomaticLocationOption(location);

    setDefaultLocation(automaticLocation);
    setDefaultTimeZone(automaticTimeZone);

    if (!activeLocation.isDefault) {
      if (autoTimezoneEnabled) {
        setTimeZone(activeLocation.timezone);
      }
      return;
    }

    setLocation(automaticLocation);

    if (autoTimezoneEnabled) {
      setTimeZone(automaticTimeZone);
    }
  }, [
    activeLocation.isDefault,
    activeLocation.timezone,
    autoTimezoneEnabled,
    error,
    loading,
    location,
    setDefaultLocation,
    setDefaultTimeZone,
    setLocation,
    setTimeZone,
  ]);
}
