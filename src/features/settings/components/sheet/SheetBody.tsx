import {
  CalculationMethod,
  Location,
  TimeZone,
  ArabicFontSize,
  ArabicFontStyle,
  Language,
  SolahTimeNotification,
  Sound,
  CalendarFormat,
  TimeFormat,
} from "@/features-settings/components/pickers";
import { SettingsType } from "@/features-settings/types";

type AllModalContentsProps = {
  settings_type: SettingsType;
  onClose?: () => void;
};

export function SheetBody({ settings_type, onClose }: AllModalContentsProps) {
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
