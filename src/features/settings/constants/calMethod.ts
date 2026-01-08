import { CalculationMethodTypes } from "@/features-solah/types";

export const calMethods: {
  name: string;
  method: CalculationMethodTypes;
  isDefault?: boolean;
}[] = [
  // Default (the data inside the default is not used)
  {
    name: "Default",
    method: "Other",
    isDefault: true,
  },
  {
    name: "Muslim World League",
    method: "MuslimWorldLeague",
  },
  {
    name: "Egyptian",
    method: "Egyptian",
  },
  {
    name: "Karachi",
    method: "Karachi",
  },
  {
    name: "Umm Al Qura",
    method: "UmmAlQura",
  },
  {
    name: "Dubai",
    method: "Dubai",
  },
  {
    name: "Qatar",
    method: "Qatar",
  },
  {
    name: "Kuwait",
    method: "Kuwait",
  },
  {
    name: "Moonsighting Committee",
    method: "MoonsightingCommittee",
  },
  {
    name: "Singapore",
    method: "Singapore",
  },
  {
    name: "Turkey",
    method: "Turkey",
  },
  {
    name: "Tehran",
    method: "Tehran",
  },
  {
    name: "North America",
    method: "NorthAmerica",
  },
];
