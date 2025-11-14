import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

import {
  ArabicFontSizeOptions,
  ArabicFontStyleOptions,
  SoundOptions,
  LanguageOptions,
  TimeZone,
} from "@/features-settings/types";
import {
  CalculationMethodTypes,
  CalendarFormat,
  LocationData,
  TimeFormat,
} from "@/features-solah/types";

type OnboardingState = {
  calculationMethod: CalculationMethodTypes;
  timezone: TimeZone;
  location: LocationData;
  arabicFontSize: ArabicFontSizeOptions;
  arabicFontStyle: ArabicFontStyleOptions;
  solahTimeNotification: boolean;
  sound: SoundOptions;
  language: LanguageOptions;
  calendarFormat: CalendarFormat;
  timeFormat: TimeFormat;
  setCalculationMethod: (calculationMethod: CalculationMethodTypes) => void;
  setTimeZone: (timezone: TimeZone) => void;
  setLocation: (location: LocationData) => void;
  setArabicFontSize: (arabicFontSize: ArabicFontSizeOptions) => void;
  setArabicFontStyle: (arabicFontStyle: ArabicFontStyleOptions) => void;
  setSolahTimeNotification: (solahTimeNotification: boolean) => void;
  setSound: (sound: SoundOptions) => void;
  setLanguage: (language: LanguageOptions) => void;
  setCalendarFormat: (calendarFormat: CalendarFormat) => void;
  setTimeFormat: (timeFormat: TimeFormat) => void;
};

export const useSettingsStore = create<OnboardingState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        // App state
        calculationMethod: "MoonsightingCommittee",
        timezone: "GMT+1",
        location: {
          longitude: 0,
          latitude: 0,
          city: "Ilorin",
          region: "Kwara",
          country: "Nigeria",
        },
        calendarFormat: "hijri",
        timeFormat: "12hr",
        arabicFontSize: 20,
        arabicFontStyle: "Default",
        solahTimeNotification: false,
        sound: "Default",
        language: "Default",

        // Set onboarding status
        setCalculationMethod: (calculationMethod) => {
          set({ calculationMethod: calculationMethod });
        },

        setTimeZone: (timezone) => {
          set({ timezone: timezone });
        },

        setLocation: (location) => {
          set({ location: location });
        },

        setCalendarFormat: (calendarFormat) => {
          set({ calendarFormat: calendarFormat });
        },

        setTimeFormat: (timeFormat) => {
          set({ timeFormat: timeFormat });
        },

        setArabicFontSize: (arabicFontSize) => {
          set({ arabicFontSize: arabicFontSize });
        },

        setArabicFontStyle: (arabicFontStyle) => {
          set({ arabicFontStyle: arabicFontStyle });
        },

        setSolahTimeNotification: (solahTimeNotification) => {
          set({ solahTimeNotification: solahTimeNotification });
        },

        setSound: (sound) => {
          set({ sound: sound });
        },

        setLanguage: (language) => {
          set({ language: language });
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
