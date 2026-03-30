jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("./localNotifications", () => ({
  LocalNotifications: {
    getPermissionsAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
    cancelScheduledNotificationAsync: jest.fn(),
    scheduleNotificationAsync: jest.fn(),
    setNotificationChannelAsync: jest.fn(),
    AndroidImportance: { MAX: 5 },
    SchedulableTriggerInputTypes: { DATE: "date" },
  },
}));

jest.mock("adhan", () => ({
  Coordinates: jest.fn().mockImplementation(() => ({})),
  PrayerTimes: jest.fn().mockImplementation((_: unknown, date: Date) => ({
    fajr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 5, 0, 0, 0),
    dhuhr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0),
    asr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0, 0, 0),
    maghrib: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0),
    isha: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 0, 0, 0),
  })),
  CalculationMethod: {
    MoonsightingCommittee: jest.fn(() => ({ fajrAngle: 18, ishaAngle: 18 })),
  },
}));

import { defaultPrayerScheduleConfig } from "@/features-solah/utils/prayerScheduleUtils";

import { LocalNotifications } from "./localNotifications";
import { syncSolahNotifications } from "./solahNotifications";
import { baseInput, withEnabledNotificationModes } from "./solahNotifications.testData";

const mockScheduleNotif = LocalNotifications.scheduleNotificationAsync as jest.Mock;

describe("syncSolahNotifications scheduling behavior", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 2, 29, 0, 0, 0, 0));
    jest.clearAllMocks();
    (LocalNotifications.getPermissionsAsync as jest.Mock).mockResolvedValue({ granted: true });
    (LocalNotifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({ granted: true });
    (LocalNotifications.setNotificationChannelAsync as jest.Mock).mockResolvedValue(undefined);
    mockScheduleNotif.mockResolvedValue("notif-id-1");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("schedules notifications using the derived adhan time rather than the raw prayer time", async () => {
    await syncSolahNotifications({
      ...baseInput,
      timezone: "Africa/Abidjan" as any,
      prayerSchedule: {
        ...defaultPrayerScheduleConfig(),
        Dhuhr: {
          adhan: { mode: "relative_after_solah", offsetMinutes: 15 },
          iqamahDelayMinutes: 15,
          adhanNotificationMode: "sound",
          iqamahNotificationMode: "mute",
        },
      },
    });

    const dhuhrAdhanCall = mockScheduleNotif.mock.calls.find(
      ([payload]) => payload.content.body === "It's time for Dhuhr."
    );

    expect(dhuhrAdhanCall?.[0].trigger.date.getTime()).toBe(
      new Date(2026, 2, 29, 12, 15, 0, 0).getTime()
    );
  });

  it("does not schedule adhan notifications for prayers with adhan notifications disabled", async () => {
    await syncSolahNotifications({
      ...baseInput,
      prayerSchedule: {
        ...defaultPrayerScheduleConfig(),
        Asr: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 15,
          adhanNotificationMode: "mute",
          iqamahNotificationMode: "mute",
        },
      },
    });

    expect(
      mockScheduleNotif.mock.calls.some(
        ([payload]) => payload.content.body === "It's time for Asr."
      )
    ).toBe(false);
  });

  it("schedules iqamah notifications when enabled", async () => {
    await syncSolahNotifications({
      ...baseInput,
      prayerSchedule: {
        ...defaultPrayerScheduleConfig(),
        Maghrib: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 10,
          adhanNotificationMode: "mute",
          iqamahNotificationMode: "vibrate",
        },
      },
    });

    expect(
      mockScheduleNotif.mock.calls.some(
        ([payload]) => payload.content.body === "Iqamah for Maghrib is starting now."
      )
    ).toBe(true);
  });

  it("uses silent content for vibrate-only notifications", async () => {
    await syncSolahNotifications({
      ...baseInput,
      prayerSchedule: {
        ...defaultPrayerScheduleConfig(),
        Dhuhr: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 20,
          adhanNotificationMode: "vibrate",
          iqamahNotificationMode: "mute",
        },
      },
    });

    const dhuhrAdhanCall = mockScheduleNotif.mock.calls.find(
      ([payload]) => payload.content.body === "It's time for Dhuhr."
    );

    expect(dhuhrAdhanCall?.[0].content.sound).toBeUndefined();
  });

  it("skips a prayer/day when adhan derivation throws and continues scheduling others", async () => {
    const schedule = withEnabledNotificationModes();

    await syncSolahNotifications({
      ...baseInput,
      prayerSchedule: {
        ...schedule,
        Dhuhr: {
          ...schedule.Dhuhr,
          adhan: { mode: "fixed_time", fixedTime: "99:99" },
        },
      },
    });

    expect(mockScheduleNotif).toHaveBeenCalled();
    expect(
      mockScheduleNotif.mock.calls.some(
        ([payload]) => payload.content.body === "It's time for Dhuhr."
      )
    ).toBe(false);
  });

  it("skips a day when prayer time construction throws and continues other days", async () => {
    const PrayerTimesMock = require("adhan").PrayerTimes as jest.Mock;
    let callCount = 0;
    PrayerTimesMock.mockImplementation((_: unknown, date: Date) => {
      callCount += 1;
      if (callCount === 1) {
        throw new Error("bad day");
      }
      return {
        fajr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 5, 0, 0, 0),
        dhuhr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0),
        asr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0, 0, 0),
        maghrib: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0),
        isha: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 0, 0, 0),
      };
    });

    await syncSolahNotifications(baseInput);

    expect(mockScheduleNotif).toHaveBeenCalled();
  });
});
