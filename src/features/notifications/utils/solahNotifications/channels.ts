import { NotificationDeliveryMode } from "@/features-settings/constants";
import { SoundOptions } from "@/features-settings/types";

import { SOLAH_NOTIFICATION_CHANNEL_PREFIX } from "../../constants";
import { LocalNotifications } from "../localNotifications";

import { mapSoundForAndroidChannel } from "./sound";

export function getSolahNotificationChannelId(sound: SoundOptions): string {
  if (!sound || sound === "Short Adhan") return `${SOLAH_NOTIFICATION_CHANNEL_PREFIX}-default`;
  const slug = sound
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${SOLAH_NOTIFICATION_CHANNEL_PREFIX}-${slug || "custom"}`;
}

function getNotificationChannelIdForMode(
  mode: NotificationDeliveryMode,
  sound: SoundOptions
): string {
  if (mode === "sound") {
    return getSolahNotificationChannelId(sound);
  }

  return `${SOLAH_NOTIFICATION_CHANNEL_PREFIX}-${mode}`;
}

export async function ensureNotificationChannels(
  sound: SoundOptions,
  scheduleItems: { deliveryMode: NotificationDeliveryMode }[]
) {
  const modes = Array.from(new Set(scheduleItems.map((item) => item.deliveryMode)));
  const channelIdsByMode = Object.fromEntries(
    modes.map((mode) => [mode, getNotificationChannelIdForMode(mode, sound)])
  ) as Record<NotificationDeliveryMode, string>;

  await Promise.all(
    modes.map((mode) => ensureSolahNotificationChannel(channelIdsByMode[mode], sound, mode))
  );

  return channelIdsByMode;
}

async function ensureSolahNotificationChannel(
  channelId: string,
  sound: SoundOptions,
  mode: NotificationDeliveryMode
) {
  try {
    await LocalNotifications.setNotificationChannelAsync(channelId, {
      name: "Solah Times",
      importance: LocalNotifications.AndroidImportance.MAX,
      vibrationPattern: mode === "mute" ? undefined : [0, 250, 250, 250],
      enableVibrate: mode !== "mute",
      enableLights: true,
      sound: mapSoundForAndroidChannel(mode, sound),
    });
  } catch {
    // ignore
  }
}
