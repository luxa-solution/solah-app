import { LocationData } from "@/features-solah/types";

import { TimeZoneOption } from "../timeZone";

export type LocationOption = {
  name: string;
  location: LocationData | null;
  timezone: TimeZoneOption;
  isDefault?: boolean;
};
