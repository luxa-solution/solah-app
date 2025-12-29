import AsyncStorage from "@react-native-async-storage/async-storage";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import * as Notifications from "expo-notifications";

import { SoundOptions, TimeZone } from "@/features-settings/types";
import { CalculationMethodTypes, LocationData } from "@/features-solah/types";

const STORAGE_KEY = "solah-notification-ids-v1";
const SOLAH_NOTIFICATION_CHANNEL_PREFIX = "solah-times";

type SolahNotifId = string;

type ScheduleInput = {
  enabled: boolean;
  sound: SoundOptions;
  location: LocationData;
  timezone: TimeZone;
  calculationMethod: CalculationMethodTypes;
};

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
  { location, calculationMethod, sound }: ScheduleInput,
  channelId: string
) {
  if (!location?.latitude || !location?.longitude) return;

  const now = Date.now();
  const scheduleItems: { label: string; date: Date }[] = [];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  for (const d of [today, tomorrow]) {
    try {
      const coords = new Coordinates(location.latitude, location.longitude);
      const params = getAdhanParams(calculationMethod);
      const times = new PrayerTimes(coords, d, params);
      scheduleItems.push(
        { label: "Subhi", date: times.fajr },
        { label: "Dhuhr", date: times.dhuhr },
        { label: "Asr", date: times.asr },
        { label: "Maghrib", date: times.maghrib },
        { label: "Isha", date: times.isha }
      );
    } catch {
      // ignore
    }
  }

  const future = scheduleItems
    .filter((x) => x.date.getTime() > now + 30_000) // avoid immediate past/near-now triggers
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 10); // cap: today + tomorrow

  const ids: SolahNotifId[] = [];
  for (const item of future) {
    const title = "Solah time";
    const body = `It's time for ${item.label}.`;

    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
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
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
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
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

const getAdhanParams = (m: CalculationMethodTypes) => {
  switch (m) {
    case "MuslimWorldLeague":
      return CalculationMethod.MuslimWorldLeague();
    case "Egyptian":
      return CalculationMethod.Egyptian();
    case "Karachi":
      return CalculationMethod.Karachi();
    case "UmmAlQura":
      return CalculationMethod.UmmAlQura();
    case "Dubai":
      return CalculationMethod.Dubai();
    case "Qatar":
      return CalculationMethod.Qatar();
    case "Kuwait":
      return CalculationMethod.Kuwait();
    case "MoonsightingCommittee":
      return CalculationMethod.MoonsightingCommittee();
    case "Singapore":
      return CalculationMethod.Singapore();
    case "Turkey":
      return CalculationMethod.Turkey();
    case "Tehran":
      return CalculationMethod.Tehran();
    case "NorthAmerica":
      return CalculationMethod.NorthAmerica();
    default:
      return CalculationMethod.MoonsightingCommittee();
  }
};
