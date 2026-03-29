import * as Location from "expo-location";

import {
  FRESH_LOCATION_OPTIONS,
  LOCATION_REFRESH_TIMEOUT_MS,
} from "@/features-solah/constants/location";
import { type LocationData } from "@/features-solah/types";

export async function getFreshPosition() {
  return Promise.race([
    Location.getCurrentPositionAsync(FRESH_LOCATION_OPTIONS),
    new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), LOCATION_REFRESH_TIMEOUT_MS);
    }),
  ]);
}

export async function resolveLocationData(
  coords: Pick<Location.LocationObjectCoords, "latitude" | "longitude">
): Promise<LocationData> {
  const [place] = await Location.reverseGeocodeAsync(coords);

  if (!place) {
    throw new Error("Unable to resolve location name");
  }

  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
    city: place.city ?? "",
    region: place.region ?? "",
    country: place.country ?? "",
  };
}

export function getDistanceMeters(
  a: Pick<Location.LocationObjectCoords, "latitude" | "longitude">,
  b: Pick<Location.LocationObjectCoords, "latitude" | "longitude">
) {
  const earthRadiusMeters = 6371000;
  const lat1 = degreesToRadians(a.latitude);
  const lat2 = degreesToRadians(b.latitude);
  const deltaLat = degreesToRadians(b.latitude - a.latitude);
  const deltaLon = degreesToRadians(b.longitude - a.longitude);

  const haversine =
    Math.sin(deltaLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) ** 2;

  return 2 * earthRadiusMeters * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function degreesToRadians(value: number) {
  return (value * Math.PI) / 180;
}
