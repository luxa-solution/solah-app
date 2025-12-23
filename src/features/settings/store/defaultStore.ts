import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

import { LanguageOptions, TimeZone } from "@/features-settings/types";
import { CalculationMethodTypes, LocationData } from "@/features-solah/types";

type DefaultDataState = {
  defaultCalculationMethod: CalculationMethodTypes;
  defaultTimezone: TimeZone;
  defaultLocation: LocationData;
  defaultLanguage: LanguageOptions;
  setDefaultCalculationMethod: (calculationMethod: CalculationMethodTypes) => void;
  setDefaultTimeZone: (timezone: TimeZone) => void;
  setDefaultLocation: (location: LocationData) => void;
  setDefaultLanguage: (language: LanguageOptions) => void;
};

export const useDefaultStore = create<DefaultDataState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        // App state
        defaultCalculationMethod: "MoonsightingCommittee",
        defaultTimezone: "Asia/Riyadh",
        defaultLocation: {
          longitude: 0,
          latitude: 0,
          city: "Ilorin",
          region: "Kwara",
          country: "Nigeria",
        },
        defaultLanguage: "Default",

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
        name: "settings-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
