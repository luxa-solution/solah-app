import * as BackgroundTask from "expo-background-task";
import * as TaskManager from "expo-task-manager";

import {
  BACKGROUND_TASK_MINIMUM_INTERVAL_SECONDS,
  NOTIFICATION_BACKGROUND_TASK_NAME,
  LAST_SYNCED_AT_STORAGE_KEY,
} from "../constants";

import { loadSyncInput, saveLastSyncedAt, syncSolahNotifications } from "./solahNotifications";

TaskManager.defineTask(NOTIFICATION_BACKGROUND_TASK_NAME, async () => {
  try {
    const input = await loadSyncInput();

    if (!input) {
      return BackgroundTask.BackgroundTaskResult.Success;
    }

    await syncSolahNotifications(input);
    await saveLastSyncedAt(Date.now());
    return BackgroundTask.BackgroundTaskResult.Success;
  } catch {
    return BackgroundTask.BackgroundTaskResult.Failed;
  }
});

export { LAST_SYNCED_AT_STORAGE_KEY };

export async function registerNotificationBackgroundTaskAsync() {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(NOTIFICATION_BACKGROUND_TASK_NAME);

  if (isRegistered) {
    return;
  }

  await BackgroundTask.registerTaskAsync(NOTIFICATION_BACKGROUND_TASK_NAME, {
    minimumInterval: BACKGROUND_TASK_MINIMUM_INTERVAL_SECONDS,
  });
}
