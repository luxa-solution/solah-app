import * as Location from "expo-location";
export type LocationData = Pick<Location.LocationGeocodedAddress, "city" | "region" | "country"> &
  Pick<Location.LocationObjectCoords, "longitude" | "latitude">;
