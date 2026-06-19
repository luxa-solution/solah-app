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

    // 1. Only update default store if values actually changed
    // (Assuming your location objects have something like .latitude / .longitude or an ID)
    // Adjust these properties to match your `LocationOption` schema
    setDefaultLocation(automaticLocation);
    setDefaultTimeZone(automaticTimeZone);

    if (!activeLocation.isDefault) {
      if (autoTimezoneEnabled) {
        setTimeZone(activeLocation.timezone);
      }
      return;
    }

    // 2. CRITICAL GUARD: Only update active location if coordinates/values shifted.
    // If they are exactly the same, do NOT call setLocation to break the infinite loop.
    const isSameLocation =
      activeLocation.location?.latitude === automaticLocation.location?.latitude &&
      activeLocation.location?.longitude === automaticLocation.location?.longitude;

    if (!isSameLocation) {
      setLocation(automaticLocation);
    }

    if (autoTimezoneEnabled) {
      setTimeZone(automaticTimeZone);
    }
  }, [
    activeLocation.isDefault,
    activeLocation.timezone,
    // Add these so the guard check works reliably
    activeLocation.location?.latitude,
    activeLocation.location?.longitude,
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
