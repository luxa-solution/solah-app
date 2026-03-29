jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const mockRegisterTaskAsync = jest.fn();

jest.mock(
  "expo-task-manager",
  () => ({
    defineTask: jest.fn(),
    isTaskRegisteredAsync: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  "expo-background-task",
  () => ({
    registerTaskAsync: (...args: any[]) => mockRegisterTaskAsync(...args),
    BackgroundTaskResult: {
      Success: "success",
      Failed: "failed",
    },
  }),
  { virtual: true }
);

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

const mockSyncSolahNotifications = jest.fn();

jest.mock("./solahNotifications", () => {
  const actual = jest.requireActual("./solahNotifications");
  return {
    ...actual,
    syncSolahNotifications: (...args: any[]) => mockSyncSolahNotifications(...args),
  };
});

import AsyncStorage from "@react-native-async-storage/async-storage";

describe("notificationBackgroundTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    mockRegisterTaskAsync.mockResolvedValue(undefined);
  });

  function loadModule() {
    let loaded: typeof import("./notificationBackgroundTask");

    jest.isolateModules(() => {
      loaded = require("./notificationBackgroundTask");
    });

    const taskManager = require("expo-task-manager") as typeof import("expo-task-manager");

    return {
      module: loaded!,
      taskManager,
    };
  }

  it("registers the periodic background task", async () => {
    const { module, taskManager } = loadModule();
    (taskManager.isTaskRegisteredAsync as jest.Mock).mockResolvedValue(false);

    await module.registerNotificationBackgroundTaskAsync();

    expect(mockRegisterTaskAsync).toHaveBeenCalledWith("solah-notification-renewal-task", {
      minimumInterval: 60 * 60 * 24 * 3,
    });
  });

  it("calls syncSolahNotifications and updates lastSyncedAt when the background task runs", async () => {
    const storedInput = {
      enabled: true,
      sound: "Default",
      location: {
        latitude: 21.4225,
        longitude: 39.8262,
        city: "Makkah",
        region: "Makkah Province",
        country: "Saudi Arabia",
      },
      timezone: "Asia/Riyadh",
      calculationMethod: "MoonsightingCommittee",
      prayerSchedule: {
        Subhi: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 20,
          adhanNotificationMode: "sound",
          iqamahNotificationMode: "vibrate",
        },
        Dhuhr: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 15,
          adhanNotificationMode: "sound",
          iqamahNotificationMode: "vibrate",
        },
        Asr: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 15,
          adhanNotificationMode: "sound",
          iqamahNotificationMode: "vibrate",
        },
        Maghrib: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 10,
          adhanNotificationMode: "sound",
          iqamahNotificationMode: "vibrate",
        },
        Isha: {
          adhan: { mode: "at_solah_time" },
          iqamahDelayMinutes: 15,
          adhanNotificationMode: "sound",
          iqamahNotificationMode: "vibrate",
        },
      },
    };

    (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key: string) => {
      if (key === "solah-notification-sync-input-v1") {
        return JSON.stringify(storedInput);
      }
      return null;
    });
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });

    const { taskManager } = loadModule();
    const taskExecutor = (taskManager.defineTask as jest.Mock).mock.calls[0][1];

    const result = await taskExecutor();

    expect(mockSyncSolahNotifications).toHaveBeenCalledWith(storedInput);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "solah-notification-last-synced-at-v1",
      expect.any(String)
    );
    expect(result).toBe("success");
  });

  it("reads schedule inputs from AsyncStorage before syncing", async () => {
    const storedRaw = JSON.stringify({
      enabled: true,
      sound: "Default",
      location: {
        latitude: 21.4225,
        longitude: 39.8262,
        city: "Makkah",
        region: "Makkah Province",
        country: "Saudi Arabia",
      },
      timezone: "Asia/Riyadh",
      calculationMethod: "MoonsightingCommittee",
      prayerSchedule: {},
    });

    (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key: string) => {
      if (key === "solah-notification-sync-input-v1") {
        return storedRaw;
      }
      return null;
    });
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });

    const { taskManager } = loadModule();
    const taskExecutor = (taskManager.defineTask as jest.Mock).mock.calls[0][1];

    await taskExecutor();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("solah-notification-sync-input-v1");
  });
});
