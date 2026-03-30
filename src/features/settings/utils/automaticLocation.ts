import { AUTOMATIC_LOCATION_NAME, type LocationOption } from "@/features-settings/constants";
import { type LocationData } from "@/features-solah/types";

import { resolveAutomaticTimeZone } from "./automaticTimeZone";

export function createAutomaticLocationOption(location: LocationData | null): LocationOption {
  return {
    name: AUTOMATIC_LOCATION_NAME,
    location,
    timezone: resolveAutomaticTimeZone(),
    isDefault: true,
  };
}
