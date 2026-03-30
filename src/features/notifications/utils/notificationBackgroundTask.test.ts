import AsyncStorage from "@react-native-async-storage/async-storage";

const mockRegisterTaskAsync = jest.fn();
const mockDefineTask = jest.fn();
const mockIsTaskRegisteredAsync = jest.fn();
const mockSyncSolahNotifications = jest.fn();

describe("notificationBackgroundTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDefineTask.mockReset();
    mockIsTaskRegisteredAsync.mockReset();
    mockRegisterTaskAsync.mockResolvedValue(undefined);
    mockIsTaskRegisteredAsync.mockResolvedValue(false);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
  });

  function loadModule() {
    let loaded!: typeof import("./notificationBackgroundTask");

    jest.isolateModules(() => {
      jest.doMock("expo-task-manager", () => ({
        defineTask: (...args: any[]) => mockDefineTask(...args),
        isTaskRegisteredAsync: (...args: any[]) => mockIsTaskRegisteredAsync(...args),
      }));
      jest.doMock("expo-background-task", () => ({
        registerTaskAsync: (...args: any[]) => mockRegisterTaskAsync(...args),
        BackgroundTaskResult: {
          Success: "success",
          Failed: "failed",
        },
      }));
      jest.doMock("./solahNotifications", () => {
        const actual = jest.requireActual("./solahNotifications");
        return {
          ...actual,
          syncSolahNotifications: (...args: any[]) => mockSyncSolahNotifications(...args),
        };
      });
      loaded = require("./notificationBackgroundTask");
    });

    return {
      module: loaded!,
    };
  }

  it("registers the periodic background task", async () => {
    const { module } = loadModule();

    await module.registerNotificationBackgroundTaskAsync();

    expect(mockRegisterTaskAsync).toHaveBeenCalledWith("solah-notification-renewal-task", {
      minimumInterval: 60 * 60 * 24 * 3,
    });
  });

  it("does not re-register when the task is already registered", async () => {
    mockIsTaskRegisteredAsync.mockResolvedValue(true);
    const { module } = loadModule();

    await module.registerNotificationBackgroundTaskAsync();

    expect(mockRegisterTaskAsync).not.toHaveBeenCalled();
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

    loadModule();
    (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key: string) => {
      if (key === "solah-notification-sync-input-v1") {
        return JSON.stringify(storedInput);
      }
      return null;
    });
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    const taskExecutor = mockDefineTask.mock.calls[0][1];

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

    loadModule();
    (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key: string) => {
      if (key === "solah-notification-sync-input-v1") {
        return storedRaw;
      }
      return null;
    });
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    const taskExecutor = mockDefineTask.mock.calls[0][1];

    await taskExecutor();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("solah-notification-sync-input-v1");
  });

  it("returns success when no stored input exists", async () => {
    loadModule();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    const taskExecutor = mockDefineTask.mock.calls[0][1];

    await expect(taskExecutor()).resolves.toBe("success");
    expect(mockSyncSolahNotifications).not.toHaveBeenCalled();
  });

  it("returns failed when the background task throws", async () => {
    loadModule();
    (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key: string) => {
      if (key === "solah-notification-sync-input-v1") {
        return JSON.stringify({ enabled: true });
      }
      return null;
    });
    mockSyncSolahNotifications.mockRejectedValue(new Error("sync failed"));
    const taskExecutor = mockDefineTask.mock.calls[0][1];

    await expect(taskExecutor()).resolves.toBe("failed");
  });
});
