import { useMemo } from "react";

import { useCurrentLocation } from "./useCurrentLocation";

const KABAH_LAT = 21.4224779;
const KABAH_LON = 39.8251832;
const EARTH_RADIUS_KM = 6371;

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

/**
 * Calculates initial great-circle bearing from point A to point B
 */
function calculateBearing(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δλ = toRad(lon2 - lon1);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);

  const θ = Math.atan2(y, x);
  return (toDeg(θ) + 360) % 360;
}

/**
 * Calculates distance using the Haversine formula
 */
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

export function useQiblaParams() {
  const { location, loading } = useCurrentLocation();

  const params = useMemo(() => {
    if (!location) return null;

    const qiblaBearing = calculateBearing(
      location.latitude,
      location.longitude,
      KABAH_LAT,
      KABAH_LON
    );

    const distanceKm = calculateDistanceKm(
      location.latitude,
      location.longitude,
      KABAH_LAT,
      KABAH_LON
    );

    return {
      qiblaBearing,
      distanceKm: Math.round(distanceKm),
    };
  }, [location]);

  return {
    loading,
    location,
    ...params,
  };
}
