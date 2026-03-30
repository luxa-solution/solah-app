import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("./localNotifications", () => ({
  LocalNotifications: {
    cancelScheduledNotificationAsync: jest.fn(),
  },
}));

import { LocalNotifications } from "./localNotifications";
import {
  cancelScheduledSolahNotifications,
  loadLastSyncedAt,
  loadSyncInput,
} from "./solahNotifications";

const mockGetItem = AsyncStorage.getItem as jest.Mock;
const mockSetItem = AsyncStorage.setItem as jest.Mock;
const mockCancelNotif = LocalNotifications.cancelScheduledNotificationAsync as jest.Mock;

describe("solahNotifications storage helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetItem.mockResolvedValue(null);
    mockSetItem.mockResolvedValue(undefined);
    mockCancelNotif.mockResolvedValue(undefined);
  });

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

  it("returns null when the last synced timestamp storage is empty", async () => {
    mockGetItem.mockResolvedValue(null);
    await expect(loadLastSyncedAt()).resolves.toBeNull();
  });

  it("returns null when the last synced timestamp is non-numeric", async () => {
    mockGetItem.mockResolvedValue("not-a-number");
    await expect(loadLastSyncedAt()).resolves.toBeNull();
  });

  it("returns null when reading the last synced timestamp throws", async () => {
    mockGetItem.mockRejectedValue(new Error("storage failed"));
    await expect(loadLastSyncedAt()).resolves.toBeNull();
  });

  it("returns null when sync input storage is empty", async () => {
    mockGetItem.mockResolvedValue(null);
    await expect(loadSyncInput()).resolves.toBeNull();
  });

  it("returns null when stored sync input is invalid json", async () => {
    mockGetItem.mockResolvedValue("{bad-json");
    await expect(loadSyncInput()).resolves.toBeNull();
  });
});
