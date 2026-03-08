// useCurrentLocation.ts
import * as Location from "expo-location";
import { useState, useEffect } from "react";

import { LocationData } from "@/features-solah/types/index";

export function useCurrentLocation() {
  // Temporary static value (to be replaced later)
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCurrentLocation() {
      try {
        setLoading(true);

        // Check existing foreground permission
        const existing = await Location.getForegroundPermissionsAsync();

        let status = existing.status;

        // Request permission only if needed
        if (status !== "granted") {
          const request = await Location.requestForegroundPermissionsAsync();
          status = request.status;
        }

        // Abort if permission still not granted
        if (status !== "granted") {
          throw new Error("Location permission not granted");
        }

        // Get user coordinates
        const loc = await Location.getCurrentPositionAsync({});
        const [place] = await Location.reverseGeocodeAsync(loc.coords);

        if (!isMounted) return;

        if (!place) {
          throw new Error("Unable to resolve location name");
        }

        // Set formatted location
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          city: place.city ?? "",
          region: place.region ?? "",
          country: place.country ?? "",
        });
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to get current location");
        setLocation(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchCurrentLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return { loading, location, error };
}
