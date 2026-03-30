jest.mock(
  "expo-notifications/build/cancelScheduledNotificationAsync",
  () => ({
    cancelScheduledNotificationAsync: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  "expo-notifications/build/NotificationChannelManager.types",
  () => ({
    AndroidImportance: { MAX: 5 },
  }),
  { virtual: true }
);

jest.mock(
  "expo-notifications/build/NotificationPermissions",
  () => ({
    getPermissionsAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  "expo-notifications/build/Notifications.types",
  () => ({
    SchedulableTriggerInputTypes: { DATE: "date" },
  }),
  { virtual: true }
);

jest.mock(
  "expo-notifications/build/scheduleNotificationAsync",
  () => ({
    scheduleNotificationAsync: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  "expo-notifications/build/setNotificationChannelAsync",
  () => ({
    setNotificationChannelAsync: jest.fn(),
  }),
  { virtual: true }
);

import { cancelScheduledNotificationAsync } from "expo-notifications/build/cancelScheduledNotificationAsync";
import { AndroidImportance } from "expo-notifications/build/NotificationChannelManager.types";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
} from "expo-notifications/build/NotificationPermissions";
import { SchedulableTriggerInputTypes } from "expo-notifications/build/Notifications.types";
import { scheduleNotificationAsync } from "expo-notifications/build/scheduleNotificationAsync";
import { setNotificationChannelAsync } from "expo-notifications/build/setNotificationChannelAsync";

import { LocalNotifications } from "./localNotifications";

describe("LocalNotifications", () => {
  it("exposes the expo notification wrappers and constants", () => {
    expect(LocalNotifications.cancelScheduledNotificationAsync).toBe(
      cancelScheduledNotificationAsync
    );
    expect(LocalNotifications.getPermissionsAsync).toBe(getPermissionsAsync);
    expect(LocalNotifications.requestPermissionsAsync).toBe(requestPermissionsAsync);
    expect(LocalNotifications.scheduleNotificationAsync).toBe(scheduleNotificationAsync);
    expect(LocalNotifications.setNotificationChannelAsync).toBe(setNotificationChannelAsync);
    expect(LocalNotifications.AndroidImportance).toBe(AndroidImportance);
    expect(LocalNotifications.SchedulableTriggerInputTypes).toBe(SchedulableTriggerInputTypes);
  });
});
