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
      return <CalculationMethod />;
    case "timezone":
      return <TimeZone />;
    case "location":
      return <Location />;
    case "arabicfontsize":
      return <ArabicFontSize />;
    case "arabicfontstyle":
      return <ArabicFontStyle />;
    case "solahtimenotif":
      return <SolahTimeNotification />;
    case "sound":
      return <Sound onClose={onClose} />;
    case "language":
      return <Language />;
    default:
      return null;
  }
}
