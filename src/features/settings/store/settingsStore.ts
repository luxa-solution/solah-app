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
import {
  applyNotificationDefaultsForEnabledState,
  createAutomaticLocationOption,
  resolveAutomaticTimeZone,
} from "@/features-settings/utils";
import { SolahName } from "@/features-solah/types";
import { defaultPrayerScheduleConfig } from "@/features-solah/utils";

type SettingsDataState = {
  calculationMethod: CalculationMethodOptions;
  timezone: TimeZoneOption;
  location: LocationOption;
  arabicFontSize: ArabicFontSizeOption;
  arabicFontStyle: ArabicFontStyleOption;
  autoTimezoneEnabled: boolean;
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
  setAutoTimezoneEnabled: (autoTimezoneEnabled: boolean) => void;
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
      (set) => {
        const automaticTimeZone = resolveAutomaticTimeZone();

        return {
          calculationMethod: {
            name: "Default",
            method: "MoonsightingCommittee",
            isDefault: true,
          },
          timezone: automaticTimeZone,
          location: createAutomaticLocationOption(null),
          calendarFormat: { name: "Hijri", value: "hijri" },
          timeFormat: { name: "12-hour", value: "12hr" },
          arabicFontSize: { name: "20", value: 20 },
          arabicFontStyle: { name: "Default", value: "Default" },
          autoTimezoneEnabled: true,
          solahTimeNotification: false,
          sound: "Short Adhan",
          prayerSchedule: defaultPrayerScheduleConfig(),
          language: {
            name: "Default",
            value: "Default",
            isDefault: true,
          },
          setCalculationMethod: (calculationMethod) => {
            set({ calculationMethod });
          },
          setTimeZone: (timezone) => {
            set({ timezone });
          },
          setLocation: (location) => {
            set({ location });
          },
          setCalendarFormat: (calendarFormat) => {
            set({ calendarFormat });
          },
          setTimeFormat: (timeFormat) => {
            set({ timeFormat });
          },
          setArabicFontSize: (arabicFontSize) => {
            set({ arabicFontSize });
          },
          setArabicFontStyle: (arabicFontStyle) => {
            set({ arabicFontStyle });
          },
          setAutoTimezoneEnabled: (autoTimezoneEnabled) => {
            set({ autoTimezoneEnabled });
          },
          setSolahTimeNotification: (solahTimeNotification) => {
            set((state) => ({
              solahTimeNotification,
              prayerSchedule: solahTimeNotification
                ? applyNotificationDefaultsForEnabledState(state.prayerSchedule)
                : state.prayerSchedule,
            }));
          },
          setSound: (sound) => {
            set({ sound });
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
            set({ language });
          },
        };
      },
      {
        name: "settings-storage",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);
