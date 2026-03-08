import { CalculationMethod } from "adhan";

import { CalculationMethodTypes } from "@/features-solah/types";

// Adhan Helper
export const getAdhanParams = (m: CalculationMethodTypes) => {
  switch (m) {
    case "MuslimWorldLeague":
      return CalculationMethod.MuslimWorldLeague();
    case "Egyptian":
      return CalculationMethod.Egyptian();
    case "Karachi":
      return CalculationMethod.Karachi();
    case "UmmAlQura":
      return CalculationMethod.UmmAlQura();
    case "Dubai":
      return CalculationMethod.Dubai();
    case "Qatar":
      return CalculationMethod.Qatar();
    case "Kuwait":
      return CalculationMethod.Kuwait();
    case "MoonsightingCommittee":
      return CalculationMethod.MoonsightingCommittee();
    case "Singapore":
      return CalculationMethod.Singapore();
    case "Turkey":
      return CalculationMethod.Turkey();
    case "Tehran":
      return CalculationMethod.Tehran();
    case "NorthAmerica":
      return CalculationMethod.NorthAmerica();
    default:
      return CalculationMethod.MoonsightingCommittee();
  }
};
