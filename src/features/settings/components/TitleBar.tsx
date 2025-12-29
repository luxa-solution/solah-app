import { SettingsType } from "@/features-settings/types";
import { TitleBar as AppTitleBar } from "@/shared/components";

const titles: Record<SettingsType, string> = {
  calmethod: "Calculation Method",
  timezone: "Time Zone",
  location: "Location",
  arabicfontsize: "Arabic Font Size",
  arabicfontstyle: "Arabic Font Style",
  solahtimenotif: "Solah Time Notification",
  sound: "Sound",
  language: "Language",
  calendarformat: "Calendar Format",
  timeformat: "Time Format",
};

export function TitleBar({ settings_type }: { settings_type: SettingsType }) {
  return <AppTitleBar title={titles[settings_type]} />;
}
