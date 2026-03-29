import * as Location from "expo-location";
import { useEffect, useState } from "react";

import { MEANINGFUL_DISTANCE_METERS } from "@/features-solah/constants/location";
import { LocationData } from "@/features-solah/types/index";
import {
  getDistanceMeters,
  getFreshPosition,
  resolveLocationData,
} from "@/features-solah/utils/currentLocation";

type LocationSource = "cached" | "fresh" | null;

type CurrentLocationState = {
  loading: boolean;
  location: LocationData | null;
  error: string | null;
  source: LocationSource;
  lastUpdated: number | null;
};

export function useCurrentLocation(): CurrentLocationState {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<LocationSource>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCurrentLocation() {
      let hasCachedLocation = false;

      try {
        setLoading(true);
        setError(null);

        let status = (await Location.getForegroundPermissionsAsync()).status;
        if (status !== "granted") {
          status = (await Location.requestForegroundPermissionsAsync()).status;
        }

        if (status !== "granted") {
          throw new Error("Location permission not granted");
        }

        const lastKnown = await Location.getLastKnownPositionAsync();
        if (lastKnown) {
          const cachedLocation = await resolveLocationData(lastKnown.coords);
          if (isMounted) {
            hasCachedLocation = true;
            setLocation(cachedLocation);
            setSource("cached");
            setLastUpdated(lastKnown.timestamp ?? Date.now());
            setLoading(false);
          }
        }

        const freshPosition = await getFreshPosition();
        if (!isMounted || !freshPosition) {
          if (!hasCachedLocation) {
            throw new Error("Location lookup timed out");
          }
          return;
        }

        if (
          hasCachedLocation &&
          lastKnown &&
          getDistanceMeters(lastKnown.coords, freshPosition.coords) <= MEANINGFUL_DISTANCE_METERS
        ) {
          if (isMounted) {
            setLoading(false);
          }
          return;
        }

        const freshLocation = await resolveLocationData(freshPosition.coords);
        if (!isMounted) return;

        setLocation(freshLocation);
        setSource("fresh");
        setLastUpdated(freshPosition.timestamp ?? Date.now());
        setError(null);
      } catch (err) {
        if (!isMounted) return;

        if (!hasCachedLocation) {
          setError(err instanceof Error ? err.message : "Unable to get current location");
          setLocation(null);
          setSource(null);
          setLastUpdated(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCurrentLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return { loading, location, error, source, lastUpdated };
}
