import { AFRICA_LOCATIONS } from "./africa";
import { ASIA_LOCATIONS } from "./asia";
import { DEFAULT_LOCATION_OPTION } from "./default";
import { EUROPE_LOCATIONS } from "./europe";
import { GULF_LOCATIONS } from "./gulf";

export { type LocationOption } from "./types";

export const locations = [
  DEFAULT_LOCATION_OPTION,
  ...AFRICA_LOCATIONS,
  ...GULF_LOCATIONS,
  ...ASIA_LOCATIONS,
  ...EUROPE_LOCATIONS,
];
