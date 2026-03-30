import { LocalNotifications } from "../localNotifications";

export async function ensureNotificationPermission() {
  try {
    const perms = await LocalNotifications.getPermissionsAsync();
    if (perms.granted) return true;
    const req = await LocalNotifications.requestPermissionsAsync();
    return req.granted;
  } catch {
    return false;
  }
}
