import { syncSolahNotifications } from "./solahNotifications";
import { baseInput } from "./solahNotifications.testData";

describe("syncSolahNotifications module integration", () => {
  afterEach(() => {
    jest.resetModules();
  });

  it("does not import the expo-notifications package root for local scheduling", async () => {
    const deriveAdhanTime = jest.fn((date: Date) => date);
    const deriveIqamahTime = jest.fn((date: Date) => date);

    jest.resetModules();
    jest.doMock("expo-notifications", () => {
      throw new Error("expo-notifications root import should not be used");
    });
    jest.doMock("./localNotifications", () => ({
      LocalNotifications: {
        getPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
        requestPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
        cancelScheduledNotificationAsync: jest.fn().mockResolvedValue(undefined),
        scheduleNotificationAsync: jest.fn().mockResolvedValue("notif-id-1"),
        setNotificationChannelAsync: jest.fn().mockResolvedValue(undefined),
        AndroidImportance: { MAX: 5 },
        SchedulableTriggerInputTypes: { DATE: "date" },
      },
    }));
    jest.doMock("@react-native-async-storage/async-storage", () => ({
      __esModule: true,
      default: {
        getItem: jest.fn().mockResolvedValue(null),
        setItem: jest.fn().mockResolvedValue(undefined),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
    }));
    jest.doMock("adhan", () => ({
      Coordinates: jest.fn().mockImplementation(() => ({})),
      PrayerTimes: jest.fn().mockImplementation((_: unknown, date: Date) => ({
        fajr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 5, 0, 0, 0),
        dhuhr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0),
        asr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0, 0, 0),
        maghrib: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0),
        isha: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 0, 0, 0),
      })),
    }));
    jest.doMock("@/features-solah/utils", () => ({
      getAdhanParams: jest.fn(() => ({ mocked: true })),
      deriveAdhanTime,
      deriveIqamahTime,
    }));

    let isolatedSyncSolahNotifications!: typeof syncSolahNotifications;

    jest.isolateModules(() => {
      ({
        syncSolahNotifications: isolatedSyncSolahNotifications,
      } = require("./solahNotifications"));
    });

    await expect(isolatedSyncSolahNotifications(baseInput)).resolves.toEqual({
      permissionOk: true,
    });
  });

  it("passes the active timezone through to deriveAdhanTime", async () => {
    const deriveAdhanTimeSpy = jest.fn((date: Date) => date);
    const deriveIqamahTimeSpy = jest.fn((date: Date) => date);
    const mockIsolatedGetPermissions = jest.fn().mockResolvedValue({ granted: true });
    const mockIsolatedRequestPermissions = jest.fn().mockResolvedValue({ granted: true });
    const mockIsolatedCancel = jest.fn().mockResolvedValue(undefined);
    const mockIsolatedSchedule = jest.fn().mockResolvedValue("notif-id-1");
    const mockIsolatedSetChannel = jest.fn().mockResolvedValue(undefined);

    jest.resetModules();
    jest.doMock("@react-native-async-storage/async-storage", () => ({
      __esModule: true,
      default: {
        getItem: jest.fn().mockResolvedValue(null),
        setItem: jest.fn().mockResolvedValue(undefined),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
    }));
    jest.doMock("./localNotifications", () => ({
      LocalNotifications: {
        getPermissionsAsync: mockIsolatedGetPermissions,
        requestPermissionsAsync: mockIsolatedRequestPermissions,
        cancelScheduledNotificationAsync: mockIsolatedCancel,
        scheduleNotificationAsync: mockIsolatedSchedule,
        setNotificationChannelAsync: mockIsolatedSetChannel,
        AndroidImportance: { MAX: 5 },
        SchedulableTriggerInputTypes: { DATE: "date" },
      },
    }));
    jest.doMock("adhan", () => ({
      Coordinates: jest.fn().mockImplementation(() => ({})),
      PrayerTimes: jest.fn().mockImplementation((_: unknown, date: Date) => ({
        fajr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 5, 0, 0, 0),
        dhuhr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0),
        asr: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0, 0, 0),
        maghrib: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0),
        isha: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 0, 0, 0),
      })),
    }));
    jest.doMock("@/features-solah/utils", () => ({
      getAdhanParams: jest.fn(() => ({ mocked: true })),
      deriveAdhanTime: deriveAdhanTimeSpy,
      deriveIqamahTime: deriveIqamahTimeSpy,
    }));

    let isolatedSyncSolahNotifications!: typeof syncSolahNotifications;

    jest.isolateModules(() => {
      ({
        syncSolahNotifications: isolatedSyncSolahNotifications,
      } = require("./solahNotifications"));
    });

    await isolatedSyncSolahNotifications({
      ...baseInput,
      timezone: "Africa/Abidjan" as any,
    });

    expect(deriveAdhanTimeSpy).toHaveBeenCalledWith(
      expect.any(Date),
      expect.any(Object),
      "Africa/Abidjan"
    );
    expect(deriveIqamahTimeSpy).toHaveBeenCalled();
  });

  it("uses the shared getAdhanParams helper", async () => {
    const sharedGetAdhanParams = jest.fn(() => ({ mocked: true }));
    const deriveAdhanTime = jest.fn((date: Date) => date);
    const deriveIqamahTime = jest.fn((date: Date) => date);

    jest.doMock("@/features-solah/utils", () => ({
      getAdhanParams: sharedGetAdhanParams,
      deriveAdhanTime,
      deriveIqamahTime,
    }));

    jest.doMock("@react-native-async-storage/async-storage", () => ({
      __esModule: true,
      default: {
        getItem: jest.fn().mockResolvedValue(null),
        setItem: jest.fn().mockResolvedValue(undefined),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
    }));

    jest.doMock("./localNotifications", () => ({
      LocalNotifications: {
        getPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
        requestPermissionsAsync: jest.fn().mockResolvedValue({ granted: true }),
        cancelScheduledNotificationAsync: jest.fn().mockResolvedValue(undefined),
        scheduleNotificationAsync: jest.fn().mockResolvedValue("notif-id-1"),
        setNotificationChannelAsync: jest.fn().mockResolvedValue(undefined),
        AndroidImportance: { MAX: 5 },
        SchedulableTriggerInputTypes: { DATE: "date" },
      },
    }));

    jest.doMock("adhan", () => ({
      Coordinates: jest.fn().mockImplementation(() => ({})),
      PrayerTimes: jest.fn().mockImplementation(() => ({
        fajr: new Date(Date.now() + 1 * 3600_000),
        dhuhr: new Date(Date.now() + 2 * 3600_000),
        asr: new Date(Date.now() + 3 * 3600_000),
        maghrib: new Date(Date.now() + 4 * 3600_000),
        isha: new Date(Date.now() + 5 * 3600_000),
      })),
      CalculationMethod: {
        MoonsightingCommittee: jest.fn(() => ({ mocked: "fallback" })),
      },
    }));

    let isolatedSyncSolahNotifications!: typeof syncSolahNotifications;

    jest.isolateModules(() => {
      ({
        syncSolahNotifications: isolatedSyncSolahNotifications,
      } = require("./solahNotifications"));
    });

    await isolatedSyncSolahNotifications(baseInput);

    expect(sharedGetAdhanParams).toHaveBeenCalledWith(baseInput.calculationMethod);
  });
});
