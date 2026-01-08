import { SettingsType } from "@/features-settings/types";

import {
  CalculationMethod,
  Location,
  TimeZone,
  ArabicFontSize,
  ArabicFontStyle,
  Language,
  SolahTimeNotification,
  Sound,
} from "./Modals";

type AllModalContentsProps = {
  settings_type: SettingsType;
  onClose?: () => void;
};

export function ModalContents({ settings_type, onClose }: AllModalContentsProps) {
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
    default:
      return null;
  }
}
