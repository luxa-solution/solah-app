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
