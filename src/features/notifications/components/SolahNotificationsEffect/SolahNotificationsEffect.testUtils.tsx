import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppState } from "react-native";

import { useSettingsStore } from "@/features-settings/store";

export const mockAppStateAddEventListener = jest.fn();
export const mockSyncSolahNotifications = jest.fn();
export const mockLoadLastSyncedAt = jest.fn();
export const mockRegisterNotificationBackgroundTaskAsync = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = jest.requireActual("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("../../utils", () => ({
  syncSolahNotifications: (...args: any[]) => mockSyncSolahNotifications(...args),
  loadLastSyncedAt: (...args: any[]) => mockLoadLastSyncedAt(...args),
  registerNotificationBackgroundTaskAsync: (...args: any[]) =>
    mockRegisterNotificationBackgroundTaskAsync(...args),
}));

const defaultStoreState = useSettingsStore.getState();

export function resetSolahNotificationsEffectState() {
  useSettingsStore.setState(defaultStoreState, true);
  jest.clearAllMocks();
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  mockAppStateAddEventListener.mockReturnValue({ remove: jest.fn() });
  jest
    .spyOn(AppState, "addEventListener")
    .mockImplementation((...args: any[]) => mockAppStateAddEventListener(...args));
  mockLoadLastSyncedAt.mockResolvedValue(null);
  mockRegisterNotificationBackgroundTaskAsync.mockResolvedValue(undefined);
}

export function restoreSolahNotificationsEffectMocks() {
  jest.restoreAllMocks();
}
