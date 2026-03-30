import { Coordinates, PrayerTimes } from "adhan";

import { NotificationDeliveryMode } from "@/features-settings/constants";
import { SoundOptions } from "@/features-settings/types";
import { isNotificationDeliveryEnabled } from "@/features-settings/utils";
import { SolahName } from "@/features-solah/types";
import { deriveAdhanTime, deriveIqamahTime, getAdhanParams } from "@/features-solah/utils";

import { ScheduleInput } from "../../types";
import { LocalNotifications } from "../localNotifications";

import { ensureNotificationChannels } from "./channels";
import { mapSoundForIOS } from "./sound";
import { saveScheduledIds, SolahNotifId } from "./storage";

type ScheduleItem = {
  title: string;
  body: string;
  date: Date;
  deliveryMode: NotificationDeliveryMode;
};

export async function scheduleSolahNotifications({
  location,
  calculationMethod,
  sound,
  prayerSchedule,
  timezone,
}: ScheduleInput) {
  if (
    location?.latitude === null ||
    location?.latitude === undefined ||
    location?.longitude === null ||
    location?.longitude === undefined
  ) {
    return;
  }

  const now = Date.now();
  const scheduleItems: ScheduleItem[] = [];

  const start = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });

  for (const day of days) {
    let times: PrayerTimes;

    try {
      const coords = new Coordinates(location.latitude, location.longitude);
      const params = getAdhanParams(calculationMethod);
      times = new PrayerTimes(coords, day, params);
    } catch {
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

        if (isNotificationDeliveryEnabled(config.adhanNotificationMode)) {
          scheduleItems.push({
            title: "Solah time",
            body: `It's time for ${prayer.label}.`,
            date: adhanTime,
            deliveryMode: config.adhanNotificationMode,
          });
        }

        if (isNotificationDeliveryEnabled(config.iqamahNotificationMode)) {
          scheduleItems.push({
            title: "Iqamah time",
            body: `Iqamah for ${prayer.label} is starting now.`,
            date: deriveIqamahTime(adhanTime, config.iqamahDelayMinutes),
            deliveryMode: config.iqamahNotificationMode,
          });
        }
      } catch {
        // ignore invalid prayer config for this prayer/day only
      }
    }
  }

  const future = scheduleItems
    .filter((item) => item.date.getTime() > now + 30_000)
    .sort((left, right) => left.date.getTime() - right.date.getTime())
    .slice(0, 64);

  const channelIdsByMode = await ensureNotificationChannels(sound, future);
  const ids: SolahNotifId[] = [];

  for (const item of future) {
    try {
      const id = await LocalNotifications.scheduleNotificationAsync({
        content: {
          title: item.title,
          body: item.body,
          sound: mapSoundForIOS(item.deliveryMode, sound as SoundOptions),
        },
        trigger: {
          type: LocalNotifications.SchedulableTriggerInputTypes.DATE,
          date: item.date,
          channelId: channelIdsByMode[item.deliveryMode],
        },
      });
      ids.push(id);
    } catch {
      // ignore
    }
  }

  await saveScheduledIds(ids);
}
