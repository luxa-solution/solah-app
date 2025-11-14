// useCurrentLocation.ts
import * as Location from "expo-location";
import { useState, useEffect } from "react";

import { LocationData } from "@/features-solah/types/index";

export function useCurrentLocation() {
  // Temporary static value (to be replaced later)
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    (async () => {
      // Ask for permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLoading(false);
        return;
      }

      // Get user coordinates
      const loc = await Location.getCurrentPositionAsync({});
      const [place] = await Location.reverseGeocodeAsync(loc.coords);
      if (!place.city || !place.region || !place.country) {
        setLocation(null);
      }

      // Set formatted location
      setLocation({
        longitude: loc.coords.longitude,
        latitude: loc.coords.latitude,
        city: place.city,
        region: place.region,
        country: place.country,
      });

      // Stop loading
      setLoading(false);
    })();
  }, []);

  return { loading, location };
}
