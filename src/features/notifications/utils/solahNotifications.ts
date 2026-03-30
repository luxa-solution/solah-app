import { ScheduleInput } from "../types";

import { LocalNotifications } from "./localNotifications";
import {
  ensureNotificationPermission,
  getSolahNotificationChannelId,
  loadLastSyncedAt,
  loadScheduledIds,
  loadSyncInput,
  saveLastSyncedAt,
  saveSyncInput,
  scheduleSolahNotifications,
  saveScheduledIds,
} from "./solahNotifications/index";

export async function syncSolahNotifications(
  input: ScheduleInput
): Promise<{ permissionOk: boolean }> {
  if (!input.enabled) {
    await cancelScheduledSolahNotifications();
    return { permissionOk: true };
  }

  if (
    input.location?.latitude === null ||
    input.location?.latitude === undefined ||
    input.location?.longitude === null ||
    input.location?.longitude === undefined
  ) {
    await cancelScheduledSolahNotifications();
    return { permissionOk: true };
  }

  const permissionOk = await ensureNotificationPermission();
  if (!permissionOk) {
    return { permissionOk: false };
  }

  await cancelScheduledSolahNotifications();
  await scheduleSolahNotifications(input);
  await saveSyncInput(input);
  await saveLastSyncedAt(Date.now());
  return { permissionOk: true };
}

export async function cancelScheduledSolahNotifications() {
  const ids = await loadScheduledIds();
  await Promise.all(
    ids.map(async (id) => {
      try {
        await LocalNotifications.cancelScheduledNotificationAsync(id);
      } catch {
        // ignore
      }
    })
  );
  await saveScheduledIds([]);
}

export { getSolahNotificationChannelId, loadLastSyncedAt, loadSyncInput, saveLastSyncedAt };
