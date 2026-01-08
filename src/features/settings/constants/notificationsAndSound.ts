import { SoundOptions } from "@/features-settings/types";

export const sounds: SoundOptions[] = [
  "Default",
  "80's phone",
  "Asteroid",
  "Atomic bell",
  "Basic tone",
  "Chime",
  "Icecubes",
];

export type NotificationOption = {
  label: "On" | "Off";
  value: boolean;
};

export const notifications: NotificationOption[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
];
