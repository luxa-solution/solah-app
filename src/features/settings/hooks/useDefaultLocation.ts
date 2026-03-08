import { useEffect } from "react";

import { useDefaultStore } from "@/features-settings/store";
import { useCurrentLocation } from "@/features-solah/hooks";

export function useSyncDefaultLocation() {
  const { location, loading, error } = useCurrentLocation();
  const { setDefaultLocation } = useDefaultStore();

  useEffect(() => {
    if (loading) return;
    if (error) return;
    if (!location) return;

    // Always sync latest GPS location
    setDefaultLocation({
      name: "Default (Current Location)",
      location,
      timezone: {
        name: "Default (System Timezone)",
        timezone: "Asia/Riyadh",
        isDefault: true,
      },
      isDefault: true,
    });
  }, [loading, error, location, setDefaultLocation]);
}
