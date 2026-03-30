import {
  CalculationMethod,
  Location,
  TimeZone,
  PrayerAdhanSettings,
  PrayerIqamahSettings,
  ArabicFontSize,
  ArabicFontStyle,
  Language,
  SolahTimeNotification,
  Sound,
  CalendarFormat,
  TimeFormat,
} from "@/features-settings/components/pickers";
import { SettingsType } from "@/features-settings/types";
import { getPrayerFromSettingsType, getPrayerSettingsKind } from "@/features-settings/utils";

import { NotificationCustomizationSheet } from "./NotificationCustomizationSheet";
import { PrayerSettingsMenu } from "./PrayerSettingsMenu";

type AllModalContentsProps = {
  settings_type: SettingsType;
  onClose?: () => void;
  onNavigate?: (type: SettingsType) => void;
};

export function SheetBody({ settings_type, onClose, onNavigate }: AllModalContentsProps) {
  const prayerSettingsKind = getPrayerSettingsKind(settings_type);
  if (prayerSettingsKind) {
    return <PrayerSettingsMenu kind={prayerSettingsKind} onNavigate={onNavigate} />;
  }

  const prayerSheet = getPrayerFromSettingsType(settings_type);
  if (prayerSheet) {
    return prayerSheet.kind === "adhan" ? (
      <PrayerAdhanSettings
        prayer={prayerSheet.prayer}
        onClose={onClose}
        onDone={() => onNavigate?.("adhansettings")}
      />
    ) : (
      <PrayerIqamahSettings
        prayer={prayerSheet.prayer}
        onClose={onClose}
        onDone={() => onNavigate?.("iqamahsettings")}
      />
    );
  }

  switch (settings_type) {
    case "calmethod":
      return <CalculationMethod onClose={onClose} />;
    case "timezone":
      return <TimeZone onClose={onClose} />;
    case "location":
      return <Location onClose={onClose} />;
    case "arabicfontsize":
      return <ArabicFontSize onClose={onClose} />;
    case "arabicfontstyle":
      return <ArabicFontStyle onClose={onClose} />;
    case "solahtimenotif":
      return <SolahTimeNotification />;
    case "sound":
      return <Sound onClose={onClose} />;
    case "customizenotifications":
      return <NotificationCustomizationSheet />;
    case "language":
      return <Language onClose={onClose} />;
    case "calendarformat":
      return <CalendarFormat onClose={onClose} />;
    case "timeformat":
      return <TimeFormat onClose={onClose} />;
    default:
      return null;
  }
}
