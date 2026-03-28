import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import {
  syncSolahNotifications,
  cancelScheduledSolahNotifications,
  getSolahNotificationChannelId,
} from "./solahNotifications";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("expo-notifications", () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  cancelScheduledNotificationAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  AndroidImportance: { MAX: 5 },
  SchedulableTriggerInputTypes: { DATE: "date" },
}));

jest.mock("adhan", () => {
  const fakeFutureTimes = {
    fajr: new Date(Date.now() + 1 * 3600_000),
    dhuhr: new Date(Date.now() + 2 * 3600_000),
    asr: new Date(Date.now() + 3 * 3600_000),
    maghrib: new Date(Date.now() + 4 * 3600_000),
    isha: new Date(Date.now() + 5 * 3600_000),
  };
  return {
    Coordinates: jest.fn().mockImplementation(() => ({})),
    PrayerTimes: jest.fn().mockImplementation(() => fakeFutureTimes),
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
  };
});

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;
const mockGetPermissions = Notifications.getPermissionsAsync as jest.Mock;
const mockRequestPermissions = Notifications.requestPermissionsAsync as jest.Mock;
const mockCancelNotif = Notifications.cancelScheduledNotificationAsync as jest.Mock;
const mockScheduleNotif = Notifications.scheduleNotificationAsync as jest.Mock;
const mockSetChannel = Notifications.setNotificationChannelAsync as jest.Mock;

const baseInput = {
  enabled: true,
  sound: "Default",
  location: {
    latitude: 21.4225,
    longitude: 39.8262,
    city: "Makkah",
    region: "Makkah Province",
    country: "Saudi Arabia",
  },
  timezone: "Asia/Riyadh" as any,
  calculationMethod: "MoonsightingCommittee" as const,
};

beforeEach(() => {
  jest.clearAllMocks();
  mockGetItem.mockResolvedValue(null);
  mockSetItem.mockResolvedValue(undefined);
  mockGetPermissions.mockResolvedValue({ granted: true });
  mockRequestPermissions.mockResolvedValue({ granted: true });
  mockCancelNotif.mockResolvedValue(undefined);
  mockScheduleNotif.mockResolvedValue("notif-id-1");
  mockSetChannel.mockResolvedValue(undefined);
});

describe("getSolahNotificationChannelId", () => {
  it("returns default channel for null sound", () => {
    expect(getSolahNotificationChannelId(null as any)).toBe("solah-times-default");
  });

  it("returns default channel for 'Default' sound", () => {
    expect(getSolahNotificationChannelId("Default")).toBe("solah-times-default");
  });

  it("returns default channel for undefined sound", () => {
    expect(getSolahNotificationChannelId(undefined as any)).toBe("solah-times-default");
  });

  it("slugifies a custom sound name", () => {
    expect(getSolahNotificationChannelId("Adhan Makkah")).toBe("solah-times-adhan_makkah");
  });

  it("strips apostrophes from sound name", () => {
    expect(getSolahNotificationChannelId("Adhan Al-Madinah")).toBe("solah-times-adhan_al_madinah");
  });

  it("strips curly apostrophes from sound name", () => {
    expect(getSolahNotificationChannelId("Fajr\u2019s Call")).toBe("solah-times-fajrs_call");
  });

  it("trims leading/trailing underscores from slug", () => {
    expect(getSolahNotificationChannelId("  ")).toBe("solah-times-custom");
  });

  it("falls back to 'custom' when slug is empty after sanitisation", () => {
    expect(getSolahNotificationChannelId("---")).toBe("solah-times-custom");
  });
});

describe("cancelScheduledSolahNotifications", () => {
  it("cancels all stored notification IDs", async () => {
    mockGetItem.mockResolvedValue(JSON.stringify(["id-1", "id-2"]));

    await cancelScheduledSolahNotifications();

    expect(mockCancelNotif).toHaveBeenCalledTimes(2);
    expect(mockCancelNotif).toHaveBeenCalledWith("id-1");
    expect(mockCancelNotif).toHaveBeenCalledWith("id-2");
  });

  it("saves empty array to storage after cancellation", async () => {
    mockGetItem.mockResolvedValue(JSON.stringify(["id-1"]));

    await cancelScheduledSolahNotifications();

    expect(mockSetItem).toHaveBeenCalledWith("solah-notification-ids-v1", JSON.stringify([]));
  });

  it("does nothing when no stored IDs", async () => {
    mockGetItem.mockResolvedValue(null);

    await cancelScheduledSolahNotifications();

    expect(mockCancelNotif).not.toHaveBeenCalled();
    expect(mockSetItem).toHaveBeenCalledWith("solah-notification-ids-v1", JSON.stringify([]));
  });

  it("silently ignores cancel errors", async () => {
    mockGetItem.mockResolvedValue(JSON.stringify(["bad-id"]));
    mockCancelNotif.mockRejectedValue(new Error("cancel failed"));

    await expect(cancelScheduledSolahNotifications()).resolves.not.toThrow();
  });

  it("handles malformed JSON in storage gracefully", async () => {
    mockGetItem.mockResolvedValue("not-valid-json");

    await expect(cancelScheduledSolahNotifications()).resolves.not.toThrow();
    expect(mockCancelNotif).not.toHaveBeenCalled();
  });

  it("handles non-array JSON in storage gracefully", async () => {
    mockGetItem.mockResolvedValue(JSON.stringify({ foo: "bar" }));

    await cancelScheduledSolahNotifications();

    expect(mockCancelNotif).not.toHaveBeenCalled();
  });

  it("filters non-string entries from stored IDs", async () => {
    mockGetItem.mockResolvedValue(JSON.stringify(["valid-id", 42, null]));

    await cancelScheduledSolahNotifications();

    expect(mockCancelNotif).toHaveBeenCalledTimes(1);
    expect(mockCancelNotif).toHaveBeenCalledWith("valid-id");
  });

  it("handles AsyncStorage.getItem throwing", async () => {
    mockGetItem.mockRejectedValue(new Error("storage error"));

    await expect(cancelScheduledSolahNotifications()).resolves.not.toThrow();
  });
});

describe("syncSolahNotifications", () => {
  it("cancels and returns permissionOk: true when disabled", async () => {
    const result = await syncSolahNotifications({ ...baseInput, enabled: false });
    expect(result).toEqual({ permissionOk: true });
    expect(mockSetItem).toHaveBeenCalledWith("solah-notification-ids-v1", JSON.stringify([]));
    expect(mockScheduleNotif).not.toHaveBeenCalled();
  });

  it("cancels and returns permissionOk: true when location is missing", async () => {
    const result = await syncSolahNotifications({
      ...baseInput,
      location: {
        latitude: 0,
        longitude: 0,
        city: null,
        region: null,
        country: null,
      } as any,
    });
    expect(result).toEqual({ permissionOk: true });
    expect(mockScheduleNotif).not.toHaveBeenCalled();
  });

  it("cancels and returns permissionOk: true when latitude is null", async () => {
    const result = await syncSolahNotifications({
      ...baseInput,
      location: {
        latitude: null as any,
        longitude: 39.8,
        city: null,
        region: null,
        country: null,
      } as any,
    });
    expect(result).toEqual({ permissionOk: true });
    expect(mockScheduleNotif).not.toHaveBeenCalled();
  });

  it("returns permissionOk: false when permission not granted and cannot request", async () => {
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

  it("creates notification channel before scheduling", async () => {
    await syncSolahNotifications(baseInput);
    expect(mockSetChannel).toHaveBeenCalledWith(
      expect.stringContaining("solah-times"),
      expect.objectContaining({ name: "Solah Times" })
    );
  });

  it("saves scheduled notification IDs to storage", async () => {
    mockScheduleNotif.mockResolvedValue("sched-id");

    await syncSolahNotifications(baseInput);

    expect(mockSetItem).toHaveBeenLastCalledWith(
      "solah-notification-ids-v1",
      expect.stringContaining("sched-id")
    );
  });

  it("caps scheduled notifications at 10", async () => {
    mockScheduleNotif.mockResolvedValue("id");

    await syncSolahNotifications(baseInput);

    expect(mockScheduleNotif.mock.calls.length).toBeLessThanOrEqual(10);
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

  it("uses correct channel ID for non-default sound", async () => {
    await syncSolahNotifications({ ...baseInput, sound: "Adhan Makkah" });
    expect(mockSetChannel).toHaveBeenCalledWith("solah-times-adhan_makkah", expect.any(Object));
  });
});
