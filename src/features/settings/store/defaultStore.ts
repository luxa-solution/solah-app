import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

import type {
  CalculationMethodOptions,
  TimeZoneOption,
  LocationOption,
  LanguageOption,
} from "@/features-settings/constants";

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
      (set) => ({
        // App state
        defaultCalculationMethod: {
          name: "Default",
          method: "MoonsightingCommittee",
          isDefault: true,
        },

        defaultTimezone: {
          name: "Default (System Timezone)",
          timezone: "Asia/Riyadh",
          isDefault: true,
        },

        defaultLocation: {
          name: "Default (Current Location)",
          location: {
            longitude: 0,
            latitude: 0,
            city: "Riyadh",
            region: "Riyadh",
            country: "Saudi Arabia",
          },
          timezone: {
            name: "Default (System Timezone)",
            timezone: "Asia/Riyadh",
            isDefault: true,
          },
          isDefault: true,
        },

        defaultLanguage: {
          name: "Default",
          value: "Default",
          isDefault: true,
        },

        // Set onboarding status
        setDefaultCalculationMethod: (calculationMethod) => {
          set({ defaultCalculationMethod: calculationMethod });
        },

        setDefaultTimeZone: (timezone) => {
          set({ defaultTimezone: timezone });
        },

        setDefaultLocation: (location) => {
          set({ defaultLocation: location });
        },

        setDefaultLanguage: (language) => {
          set({ defaultLanguage: language });
        },

        // Add more above as needed
      }),
      {
        name: "defaults-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
