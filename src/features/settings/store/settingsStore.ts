import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist, subscribeWithSelector } from "zustand/middleware";

import type {
  CalculationMethodOptions,
  TimeZoneOption,
  LocationOption,
  ArabicFontSizeOption,
  ArabicFontStyleOption,
  LanguageOption,
  CalendarFormatOption,
  TimeFormatOption,
} from "@/features-settings/constants";
import {
  AllPrayerScheduleConfig,
  PrayerScheduleConfig,
  SoundOptions,
} from "@/features-settings/types";
import { SolahName } from "@/features-solah/types";
import { defaultPrayerScheduleConfig } from "@/features-solah/utils";

type SettingsDataState = {
  calculationMethod: CalculationMethodOptions;
  timezone: TimeZoneOption;
  location: LocationOption;
  arabicFontSize: ArabicFontSizeOption;
  arabicFontStyle: ArabicFontStyleOption;
  solahTimeNotification: boolean;
  sound: SoundOptions;
  prayerSchedule: AllPrayerScheduleConfig;
  language: LanguageOption;
  calendarFormat: CalendarFormatOption;
  timeFormat: TimeFormatOption;
  setCalculationMethod: (calculationMethod: CalculationMethodOptions) => void;
  setTimeZone: (timezone: TimeZoneOption) => void;
  setLocation: (location: LocationOption) => void;
  setArabicFontSize: (arabicFontSize: ArabicFontSizeOption) => void;
  setArabicFontStyle: (arabicFontStyle: ArabicFontStyleOption) => void;
  setSolahTimeNotification: (solahTimeNotification: boolean) => void;
  setSound: (sound: SoundOptions) => void;
  setPrayerSchedule: (prayer: SolahName, config: PrayerScheduleConfig) => void;
  setLanguage: (language: LanguageOption) => void;
  setCalendarFormat: (calendarFormat: CalendarFormatOption) => void;
  setTimeFormat: (timeFormat: TimeFormatOption) => void;
};

export const useSettingsStore = create<SettingsDataState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        // App state
        calculationMethod: {
          name: "Default",
          method: "MoonsightingCommittee",
          isDefault: true,
        },
        timezone: {
          name: "Default (System Timezone)",
          timezone: "Asia/Riyadh",
          isDefault: true,
        },
        location: {
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
        calendarFormat: { name: "Hijri", value: "hijri" },
        timeFormat: { name: "12-hour", value: "12hr" },
        arabicFontSize: { name: "20", value: 20 },
        arabicFontStyle: { name: "Default", value: "Default" },
        solahTimeNotification: false,
        sound: "Default",
        prayerSchedule: defaultPrayerScheduleConfig(),
        language: {
          name: "Default",
          value: "Default",
          isDefault: true,
        },

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

        setPrayerSchedule: (prayer, config) => {
          set((state) => ({
            prayerSchedule: {
              ...state.prayerSchedule,
              [prayer]: config,
            },
          }));
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
