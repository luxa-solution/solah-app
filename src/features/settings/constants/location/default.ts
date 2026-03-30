import { LocationOption } from "./types";

export const DEFAULT_LOCATION_OPTION: LocationOption = {
  name: "Default (Current Location)",
  location: {
    city: "Ilorin",
    region: "Kwara",
    country: "Nigeria",
    latitude: 8.4966,
    longitude: 4.5421,
  },
  timezone: {
    name: "Default (System Timezone)",
    timezone: "Asia/Riyadh",
    isDefault: true,
  },
  isDefault: true,
};
