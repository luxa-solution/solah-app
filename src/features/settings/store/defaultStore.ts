import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

import type {
  CalculationMethodOptions,
  TimeZoneOption,
  LocationOption,
  LanguageOption,
} from "@/features-settings/constants";
import { createAutomaticLocationOption, resolveAutomaticTimeZone } from "@/features-settings/utils";

type DefaultDataState = {
  defaultCalculationMethod: CalculationMethodOptions;
  defaultTimezone: TimeZoneOption;
  defaultLocation: LocationOption;
  defaultLanguage: LanguageOption;

  setDefaultCalculationMethod: (calculationMethod: CalculationMethodOptions) => void;
  setDefaultTimeZone: (timezone: TimeZoneOption) => void;
  setDefaultLocation: (location: LocationOption) => void;
  setDefaultLanguage: (language: LanguageOption) => void;
};

export const useDefaultStore = create<DefaultDataState>()(
  subscribeWithSelector(
    persist(
      (set) => {
        const automaticTimeZone = resolveAutomaticTimeZone();

        return {
          // Seed/fallback store for the last successful automatic GPS resolution.
          // Active app behavior reads from useSettingsStore; this store exists so the
          // app can restore automatic defaults after settings reset or rehydration.
          defaultCalculationMethod: {
            name: "Default",
            method: "MoonsightingCommittee",
            isDefault: true,
          },
          defaultTimezone: automaticTimeZone,
          defaultLocation: createAutomaticLocationOption(null),
          defaultLanguage: {
            name: "Default",
            value: "Default",
            isDefault: true,
          },
          setDefaultCalculationMethod: (defaultCalculationMethod) => {
            set({ defaultCalculationMethod });
          },
          setDefaultTimeZone: (defaultTimezone) => {
            set({ defaultTimezone });
          },
          setDefaultLocation: (defaultLocation) => {
            set({ defaultLocation });
          },
          setDefaultLanguage: (defaultLanguage) => {
            set({ defaultLanguage });
          },
        };
      },
      {
        name: "defaults-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
