import { SoundOptions } from "@/features-settings/types";

export const SOUND_OPTIONS: SoundOptions[] = [
  "Default",
  "80's phone",
  "Asteroid",
  "Atomic bell",
  "Basic tone",
  "Chime",
  "Icecubes",
];

export type SolahTimeNotificationOption = {
  label: "On" | "Off";
  value: boolean;
};

export const SOLAH_TIME_NOTIFICATION_OPTIONS: SolahTimeNotificationOption[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
];
