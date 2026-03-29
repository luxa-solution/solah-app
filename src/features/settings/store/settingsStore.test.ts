import { defaultPrayerScheduleConfig } from "@/features-solah/utils/prayerScheduleUtils";

import { useSettingsStore } from "./settingsStore";

const initialState = useSettingsStore.getState();

describe("useSettingsStore", () => {
  beforeEach(() => {
    useSettingsStore.setState(initialState, true);
  });

  it("starts with the expected defaults", () => {
    const state = useSettingsStore.getState();

    expect(state.calculationMethod.method).toBe("MoonsightingCommittee");
    expect(state.timezone.isDefault).toBe(true);
    expect(state.location.isDefault).toBe(true);
    expect(state.location.location).toBeNull();
    expect(state.autoTimezoneEnabled).toBe(true);
    expect(state.calendarFormat.value).toBe("hijri");
    expect(state.timeFormat.value).toBe("12hr");
    expect(state.arabicFontSize.value).toBe(20);
    expect(state.arabicFontStyle.value).toBe("Default");
    expect(state.solahTimeNotification).toBe(false);
    expect(state.sound).toBe("Default");
    expect(state.language.value).toBe("Default");
    expect(state.prayerSchedule).toEqual(defaultPrayerScheduleConfig());
    expect(state.prayerSchedule.Subhi.adhanNotificationEnabled).toBe(true);
    expect(state.prayerSchedule.Subhi.iqamahNotificationEnabled).toBe(true);
    expect(state.prayerSchedule.Maghrib.adhanNotificationEnabled).toBe(true);
    expect(state.prayerSchedule.Maghrib.iqamahNotificationEnabled).toBe(true);
  });

  it("updates each setting through its action", () => {
    const nextCalculationMethod = {
      name: "Karachi",
      method: "Karachi" as const,
      isDefault: false,
    };
    const nextTimezone = {
      name: "UTC",
      timezone: "UTC",
      isDefault: false,
    };
    const nextLocation = {
      name: "Madinah",
      location: {
        longitude: 39.6111,
        latitude: 24.5247,
        city: "Madinah",
        region: "Madinah Province",
        country: "Saudi Arabia",
      },
      timezone: nextTimezone,
      isDefault: false,
    };
    const nextCalendarFormat = { name: "Gregorian", value: "miladi" as const };
    const nextTimeFormat = { name: "24-hour", value: "24hr" as const };
    const nextArabicFontSize = { name: "24", value: 24 };
    const nextArabicFontStyle = { name: "Uthmanic", value: "UthmanicHafs" };
    const nextLanguage = { name: "English", value: "English", isDefault: false };
    const nextPrayerSchedule = {
      ...defaultPrayerScheduleConfig(),
      Dhuhr: {
        adhan: { mode: "relative_after_solah" as const, offsetMinutes: 10 },
        iqamahDelayMinutes: 20,
        adhanNotificationEnabled: true,
        iqamahNotificationEnabled: false,
      },
    };

    const state = useSettingsStore.getState();
    state.setCalculationMethod(nextCalculationMethod);
    state.setTimeZone(nextTimezone);
    state.setLocation(nextLocation);
    state.setCalendarFormat(nextCalendarFormat);
    state.setTimeFormat(nextTimeFormat);
    state.setArabicFontSize(nextArabicFontSize);
    state.setArabicFontStyle(nextArabicFontStyle);
    state.setSolahTimeNotification(true);
    state.setSound("Birds");
    state.setLanguage(nextLanguage);
    state.setPrayerSchedule("Dhuhr", nextPrayerSchedule.Dhuhr);
    state.setAutoTimezoneEnabled(false);

    const nextState = useSettingsStore.getState();

    expect(nextState.calculationMethod).toEqual(nextCalculationMethod);
    expect(nextState.timezone).toEqual(nextTimezone);
    expect(nextState.location).toEqual(nextLocation);
    expect(nextState.calendarFormat).toEqual(nextCalendarFormat);
    expect(nextState.timeFormat).toEqual(nextTimeFormat);
    expect(nextState.arabicFontSize).toEqual(nextArabicFontSize);
    expect(nextState.arabicFontStyle).toEqual(nextArabicFontStyle);
    expect(nextState.solahTimeNotification).toBe(true);
    expect(nextState.sound).toBe("Birds");
    expect(nextState.language).toEqual(nextLanguage);
    expect(nextState.prayerSchedule).toEqual(nextPrayerSchedule);
    expect(nextState.autoTimezoneEnabled).toBe(false);
  });
});
