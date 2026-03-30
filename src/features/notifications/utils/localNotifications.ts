import { cancelScheduledNotificationAsync } from "expo-notifications/build/cancelScheduledNotificationAsync";
import { AndroidImportance } from "expo-notifications/build/NotificationChannelManager.types";
import {
  getPermissionsAsync,
  requestPermissionsAsync,
} from "expo-notifications/build/NotificationPermissions";
import { SchedulableTriggerInputTypes } from "expo-notifications/build/Notifications.types";
import { scheduleNotificationAsync } from "expo-notifications/build/scheduleNotificationAsync";
import { setNotificationChannelAsync } from "expo-notifications/build/setNotificationChannelAsync";

export const LocalNotifications = {
  getPermissionsAsync,
  requestPermissionsAsync,
  cancelScheduledNotificationAsync,
  scheduleNotificationAsync,
  setNotificationChannelAsync,
  AndroidImportance,
  SchedulableTriggerInputTypes,
} as const;
