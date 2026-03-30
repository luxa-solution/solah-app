import { SoundOptions } from "@/features-settings/types";

export const sounds: SoundOptions[] = ["Short Adhan", "Full Adhan", "Beep"];

export type NotificationOption = {
  label: "On" | "Off";
  value: boolean;
};

export const notifications: NotificationOption[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
];
