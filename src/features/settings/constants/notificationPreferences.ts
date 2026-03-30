import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SolahName } from "@/features-solah/types";

export const NOTIFICATION_DELIVERY_MODES = ["mute", "vibrate", "sound"] as const;

export type NotificationDeliveryMode = (typeof NOTIFICATION_DELIVERY_MODES)[number];

export const NOTIFICATION_DELIVERY_ICON: Record<
  NotificationDeliveryMode,
  keyof typeof MaterialCommunityIcons.glyphMap
> = {
  mute: "volume-off",
  vibrate: "vibrate",
  sound: "volume-high",
};

export const NOTIFICATION_DELIVERY_LABEL: Record<NotificationDeliveryMode, string> = {
  mute: "Mute",
  vibrate: "Vibrate",
  sound: "Sound",
};

export const DEFAULT_ADHAN_NOTIFICATION_MODE: NotificationDeliveryMode = "sound";
export const DEFAULT_IQAMAH_NOTIFICATION_MODE: NotificationDeliveryMode = "vibrate";

export const DEFAULT_NOTIFICATION_MODE_BY_KIND = {
  adhan: DEFAULT_ADHAN_NOTIFICATION_MODE,
  iqamah: DEFAULT_IQAMAH_NOTIFICATION_MODE,
} as const;

export const PRAYER_NOTIFICATION_ROW_HEADERS = ["Solah", "Adhan", "Iqamah"] as const;

export const PRAYER_NOTIFICATION_DEFAULTS: Record<
  SolahName,
  { adhan: NotificationDeliveryMode; iqamah: NotificationDeliveryMode }
> = {
  Subhi: { adhan: DEFAULT_ADHAN_NOTIFICATION_MODE, iqamah: DEFAULT_IQAMAH_NOTIFICATION_MODE },
  Dhuhr: { adhan: DEFAULT_ADHAN_NOTIFICATION_MODE, iqamah: DEFAULT_IQAMAH_NOTIFICATION_MODE },
  Asr: { adhan: DEFAULT_ADHAN_NOTIFICATION_MODE, iqamah: DEFAULT_IQAMAH_NOTIFICATION_MODE },
  Maghrib: { adhan: DEFAULT_ADHAN_NOTIFICATION_MODE, iqamah: DEFAULT_IQAMAH_NOTIFICATION_MODE },
  Isha: { adhan: DEFAULT_ADHAN_NOTIFICATION_MODE, iqamah: DEFAULT_IQAMAH_NOTIFICATION_MODE },
};
