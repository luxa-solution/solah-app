import { NotificationDeliveryMode } from "@/features-settings/constants";
import { SoundOptions } from "@/features-settings/types";

export function mapSoundForAndroidChannel(
  mode: NotificationDeliveryMode,
  sound: SoundOptions
): string | null | undefined {
  if (mode !== "sound") return null;
  if (!sound || sound === "Beep") return undefined;
  if (sound === "Short Adhan") return "takbir_only.mp3";
  if (sound === "Full Adhan") return "full_adhan.mp3";
  return undefined;
}

export function mapSoundForIOS(
  mode: NotificationDeliveryMode,
  sound: SoundOptions
): string | undefined {
  if (mode !== "sound") return undefined;
  if (!sound || sound === "Beep") return "default";
  if (sound === "Short Adhan") return "takbir_only.mp3";
  if (sound === "Full Adhan") return "full_adhan.mp3";
  return "default";
}
