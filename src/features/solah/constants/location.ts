import * as Location from "expo-location";

export const FRESH_LOCATION_OPTIONS = {
  accuracy: Location.Accuracy.Balanced,
  timeInterval: 10000,
};

export const LOCATION_REFRESH_TIMEOUT_MS = 15000;
export const MEANINGFUL_DISTANCE_METERS = 100;
