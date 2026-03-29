import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coordinates, PrayerTimes } from "adhan";
// Android remote-push/token APIs are unavailable in Expo Go.
// This module only schedules local notifications and does not use any push-token helpers.
import * as Notifications from "expo-notifications";

import { SoundOptions } from "@/features-settings/types";
import { SolahName } from "@/features-solah/types";
import { deriveAdhanTime, deriveIqamahTime, getAdhanParams } from "@/features-solah/utils";

import {
  LAST_SYNCED_AT_STORAGE_KEY,
  SOLAH_NOTIFICATION_CHANNEL_PREFIX,
  SOLAH_NOTIFICATION_IDS_STORAGE_KEY,
  SYNC_INPUT_STORAGE_KEY,
} from "../constants";
import { ScheduleInput } from "../types";

type SolahNotifId = string;

export async function syncSolahNotifications(
  input: ScheduleInput
): Promise<{ permissionOk: boolean }> {
  const { enabled } = input;

  if (!enabled) {
    await cancelScheduledSolahNotifications();
    return { permissionOk: true };
  }

  // If location isn't configured yet, do not prompt for permissions.
  if (!input.location?.latitude || !input.location?.longitude) {
    await cancelScheduledSolahNotifications();
    return { permissionOk: true };
  }

  const permissionOk = await ensureNotificationPermission();
  if (!permissionOk) {
    return { permissionOk: false };
  }

  const channelId = getSolahNotificationChannelId(input.sound);
  await ensureSolahNotificationChannel(channelId, input.sound);

  // Always reschedule to reflect latest method/location/sound changes
  await cancelScheduledSolahNotifications();
  await scheduleSolahNotifications(input, channelId);
  await saveSyncInput(input);
  await saveLastSyncedAt(Date.now());
  return { permissionOk: true };
}

export async function cancelScheduledSolahNotifications() {
  const ids = await loadScheduledIds();
  await Promise.all(
    ids.map(async (id) => {
      try {
        await Notifications.cancelScheduledNotificationAsync(id);
      } catch {
        // ignore
      }
    })
  );
  await saveScheduledIds([]);
}

async function scheduleSolahNotifications(
  { location, calculationMethod, sound, prayerSchedule, timezone }: ScheduleInput,
  channelId: string
) {
  if (!location?.latitude || !location?.longitude) return;

  const now = Date.now();
  const scheduleItems: { title: string; body: string; date: Date }[] = [];

  const start = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });

  for (const d of days) {
    let times: PrayerTimes;

    try {
      const coords = new Coordinates(location.latitude, location.longitude);
      const params = getAdhanParams(calculationMethod);
      times = new PrayerTimes(coords, d, params);
    } catch {
      // ignore
      continue;
    }

    const prayerTimes: { label: SolahName; date: Date }[] = [
      { label: "Subhi", date: times.fajr },
      { label: "Dhuhr", date: times.dhuhr },
      { label: "Asr", date: times.asr },
      { label: "Maghrib", date: times.maghrib },
      { label: "Isha", date: times.isha },
    ];

    for (const prayer of prayerTimes) {
      try {
        const config = prayerSchedule[prayer.label];
        const adhanTime = deriveAdhanTime(prayer.date, config.adhan, timezone);

        if (config.adhanNotificationEnabled) {
          scheduleItems.push({
            title: "Solah time",
            body: `It's time for ${prayer.label}.`,
            date: adhanTime,
          });
        }

        if (config.iqamahNotificationEnabled) {
          scheduleItems.push({
            title: "Iqamah time",
            body: `Iqamah for ${prayer.label} is starting now.`,
            date: deriveIqamahTime(adhanTime, config.iqamahDelayMinutes),
          });
        }
      } catch {
        // ignore invalid prayer config for this prayer/day only
      }
    }
  }

  const future = scheduleItems
    .filter((x) => x.date.getTime() > now + 30_000) // avoid immediate past/near-now triggers
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 64);

  const ids: SolahNotifId[] = [];
  for (const item of future) {
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: item.title,
          body: item.body,
          sound: mapSoundForIOS(sound),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: item.date,
          channelId,
        },
      });
      ids.push(id);
    } catch {
      // ignore
    }
  }

  await saveScheduledIds(ids);
}

async function ensureNotificationPermission() {
  try {
    const perms = await Notifications.getPermissionsAsync();
    if (perms.granted) return true;
    const req = await Notifications.requestPermissionsAsync();
    return req.granted;
  } catch {
    return false;
  }
}

export function getSolahNotificationChannelId(sound: SoundOptions): string {
  if (!sound || sound === "Default") return `${SOLAH_NOTIFICATION_CHANNEL_PREFIX}-default`;
  const slug = sound
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${SOLAH_NOTIFICATION_CHANNEL_PREFIX}-${slug || "custom"}`;
}

async function ensureSolahNotificationChannel(channelId: string, sound: SoundOptions) {
  // Android-only; safe to call elsewhere
  try {
    await Notifications.setNotificationChannelAsync(channelId, {
      name: "Solah Times",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      enableVibrate: true,
      enableLights: true,
      sound: mapSoundForAndroidChannel(sound),
    });
  } catch {
    // ignore
  }
}

function mapSoundForAndroidChannel(sound: SoundOptions): string | null | undefined {
  // Android channels: sound is a raw resource name (no extension) or null to disable.
  // App doesn't ship custom audio yet, so keep platform default for now.
  if (!sound || sound === "Default") return undefined;
  return undefined;
}

function mapSoundForIOS(sound: SoundOptions): string | undefined {
  // expo-notifications uses iOS UNNotificationSound; "default" is the standard value.
  if (!sound || sound === "Default") return "default";
  return "default";
}

async function loadScheduledIds(): Promise<SolahNotifId[]> {
  try {
    const raw = await AsyncStorage.getItem(SOLAH_NOTIFICATION_IDS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string");
  } catch {
    return [];
  }
}

async function saveScheduledIds(ids: SolahNotifId[]) {
  try {
    await AsyncStorage.setItem(SOLAH_NOTIFICATION_IDS_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export async function loadLastSyncedAt(): Promise<number | null> {
  try {
    const raw = await AsyncStorage.getItem(LAST_SYNCED_AT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveLastSyncedAt(timestamp: number) {
  try {
    await AsyncStorage.setItem(LAST_SYNCED_AT_STORAGE_KEY, String(timestamp));
  } catch {
    // ignore
  }
}

export async function loadSyncInput(): Promise<ScheduleInput | null> {
  try {
    const raw = await AsyncStorage.getItem(SYNC_INPUT_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ScheduleInput;
  } catch {
    return null;
  }
}

async function saveSyncInput(input: ScheduleInput) {
  try {
    await AsyncStorage.setItem(SYNC_INPUT_STORAGE_KEY, JSON.stringify(input));
  } catch {
    // ignore
  }
}
