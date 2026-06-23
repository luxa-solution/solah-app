import AsyncStorage from "@react-native-async-storage/async-storage";
import { CalculationMethod } from "adhan";

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
    MuslimWorldLeague: jest.fn(() => ({ fajrAngle: 18, ishaAngle: 17 })),
    Egyptian: jest.fn(() => ({ fajrAngle: 19.5, ishaAngle: 17.5 })),
    Karachi: jest.fn(() => ({ fajrAngle: 18, ishaAngle: 18 })),
    UmmAlQura: jest.fn(() => ({ fajrAngle: 18.5, ishaAngle: 0 })),
    Dubai: jest.fn(() => ({ fajrAngle: 18.2, ishaAngle: 18.2 })),
    Qatar: jest.fn(() => ({ fajrAngle: 18, ishaAngle: 0 })),
    Kuwait: jest.fn(() => ({ fajrAngle: 18, ishaAngle: 17.5 })),
    MoonsightingCommittee: jest.fn(() => ({ fajrAngle: 18, ishaAngle: 18 })),
    Singapore: jest.fn(() => ({ fajrAngle: 20, ishaAngle: 18 })),
    Turkey: jest.fn(() => ({ fajrAngle: 18, ishaAngle: 17 })),
    Tehran: jest.fn(() => ({ fajrAngle: 17.7, ishaAngle: 14 })),
    NorthAmerica: jest.fn(() => ({ fajrAngle: 15, ishaAngle: 15 })),
  },
}));

import { LocalNotifications } from "./localNotifications";
import { syncSolahNotifications } from "./solahNotifications";
import { baseInput, withEnabledNotificationModes } from "./solahNotifications.testData";

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;
const mockGetPermissions = LocalNotifications.getPermissionsAsync as jest.Mock;
const mockRequestPermissions = LocalNotifications.requestPermissionsAsync as jest.Mock;
const mockScheduleNotif = LocalNotifications.scheduleNotificationAsync as jest.Mock;
const mockSetChannel = LocalNotifications.setNotificationChannelAsync as jest.Mock;

describe("syncSolahNotifications core flow", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 2, 29, 0, 0, 0, 0));
    jest.clearAllMocks();
    mockGetItem.mockResolvedValue(null);
    mockSetItem.mockResolvedValue(undefined);
    mockGetPermissions.mockResolvedValue({ granted: true });
    mockRequestPermissions.mockResolvedValue({ granted: true });
    mockScheduleNotif.mockResolvedValue("notif-id-1");
    mockSetChannel.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns permissionOk: true and skips scheduling when notifications are disabled", async () => {
    const result = await syncSolahNotifications({ ...baseInput, enabled: false });
    expect(result).toEqual({ permissionOk: true });
    expect(mockScheduleNotif).not.toHaveBeenCalled();
  });

  it("returns permissionOk: true and skips scheduling when location is unresolved", async () => {
    const result = await syncSolahNotifications({
      ...baseInput,
      location: {
        latitude: null as any,
        longitude: null as any,
        city: null,
        region: null,
        country: null,
      } as any,
    });
    expect(result).toEqual({ permissionOk: true });
    expect(mockScheduleNotif).not.toHaveBeenCalled();
  });

  it("returns permissionOk: false when permission cannot be obtained", async () => {
    mockGetPermissions.mockResolvedValue({ granted: false });
    mockRequestPermissions.mockResolvedValue({ granted: false });

    const result = await syncSolahNotifications(baseInput);
    expect(result).toEqual({ permissionOk: false });
    expect(mockScheduleNotif).not.toHaveBeenCalled();
  });

  it("requests permission when not yet granted and proceeds if granted", async () => {
    mockGetPermissions.mockResolvedValue({ granted: false });
    mockRequestPermissions.mockResolvedValue({ granted: true });

    const result = await syncSolahNotifications(baseInput);
    expect(result).toEqual({ permissionOk: true });
    expect(mockRequestPermissions).toHaveBeenCalled();
  });

  it("schedules notifications when all conditions are met", async () => {
    const result = await syncSolahNotifications(baseInput);
    expect(result).toEqual({ permissionOk: true });
    expect(mockScheduleNotif).toHaveBeenCalled();
  });

  it("creates a notification channel before scheduling", async () => {
    await syncSolahNotifications(baseInput);
    expect(mockSetChannel).toHaveBeenCalledWith(
      expect.stringContaining("solah-times"),
      expect.objectContaining({ name: "Solah Times" })
    );
  });

  it("saves scheduled notification IDs to storage", async () => {
    mockScheduleNotif.mockResolvedValue("sched-id");

    await syncSolahNotifications(baseInput);

    expect(mockSetItem).toHaveBeenCalledWith(
      "solah-notification-ids-v1",
      expect.stringContaining("sched-id")
    );
  });

  it("saves sync metadata after a successful schedule refresh", async () => {
    await syncSolahNotifications(baseInput);

    expect(mockSetItem).toHaveBeenCalledWith(
      "solah-notification-sync-input-v1",
      expect.any(String)
    );
    expect(mockSetItem).toHaveBeenCalledWith(
      "solah-notification-last-synced-at-v1",
      expect.any(String)
    );
  });

  it("caps scheduled notifications at 64", async () => {
    mockScheduleNotif.mockResolvedValue("id");

    await syncSolahNotifications(baseInput);

    expect(mockScheduleNotif.mock.calls.length).toBeLessThanOrEqual(64);
  });

  it("handles permission check throwing an error", async () => {
    mockGetPermissions.mockRejectedValue(new Error("permissions error"));

    const result = await syncSolahNotifications(baseInput);
    expect(result).toEqual({ permissionOk: false });
  });

  it("handles scheduleNotificationAsync throwing silently", async () => {
    mockScheduleNotif.mockRejectedValue(new Error("schedule error"));

    await expect(syncSolahNotifications(baseInput)).resolves.not.toThrow();
  });

  it("handles setNotificationChannelAsync throwing silently", async () => {
    mockSetChannel.mockRejectedValue(new Error("channel error"));

    await expect(syncSolahNotifications(baseInput)).resolves.toEqual({ permissionOk: true });
  });

  it("uses the correct channel ID for a non-default sound", async () => {
    await syncSolahNotifications({ ...baseInput, sound: "Adhan Makkah" });
    expect(mockSetChannel).toHaveBeenCalledWith("solah-times-adhan_makkah", expect.any(Object));
  });

  it("uses the bundled short adhan sound for sound-mode channels and payloads", async () => {
    await syncSolahNotifications({ ...baseInput, sound: "Short Adhan" as any });

    expect(mockSetChannel).toHaveBeenCalledWith(
      "solah-times-default",
      expect.objectContaining({ sound: "takbir_only.mp3" })
    );
    expect(mockScheduleNotif).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.objectContaining({ sound: "takbir_only.mp3" }),
      })
    );
  });

  it("uses the bundled full adhan sound for sound-mode channels and payloads", async () => {
    await syncSolahNotifications({ ...baseInput, sound: "Full Adhan" as any });

    expect(mockSetChannel).toHaveBeenCalledWith(
      "solah-times-full_adhan",
      expect.objectContaining({ sound: "full_adhan.mp3" })
    );
    expect(mockScheduleNotif).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.objectContaining({ sound: "full_adhan.mp3" }),
      })
    );
  });

  it("uses muted android channels for mute delivery mode", async () => {
    const schedule = withEnabledNotificationModes();

    await syncSolahNotifications({
      ...baseInput,
      prayerSchedule: {
        ...schedule,
        Dhuhr: {
          ...schedule.Dhuhr,
          adhanNotificationMode: "mute",
          iqamahNotificationMode: "mute",
        },
      },
    });

    expect(mockSetChannel).toHaveBeenCalledWith(
      "solah-times-vibrate",
      expect.objectContaining({ enableVibrate: true, sound: null })
    );
  });

  it.each([
    ["MuslimWorldLeague", "MuslimWorldLeague"],
    ["Egyptian", "Egyptian"],
    ["Karachi", "Karachi"],
    ["UmmAlQura", "UmmAlQura"],
    ["Dubai", "Dubai"],
    ["Qatar", "Qatar"],
    ["Kuwait", "Kuwait"],
    ["MoonsightingCommittee", "MoonsightingCommittee"],
    ["Singapore", "Singapore"],
    ["Turkey", "Turkey"],
    ["Tehran", "Tehran"],
    ["NorthAmerica", "NorthAmerica"],
  ] as const)("uses the %s adhan calculation method", async (method, factoryName) => {
    await syncSolahNotifications({ ...baseInput, calculationMethod: method });

    expect((CalculationMethod as any)[factoryName]).toHaveBeenCalled();
  });

  it("falls back to MoonsightingCommittee for unknown calculation methods", async () => {
    await syncSolahNotifications({
      ...baseInput,
      calculationMethod: "UnknownMethod" as any,
    });

    expect(CalculationMethod.MoonsightingCommittee).toHaveBeenCalled();
  });
});
