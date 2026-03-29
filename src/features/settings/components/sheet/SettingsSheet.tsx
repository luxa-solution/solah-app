import { View } from "react-native";

import { SettingsType } from "@/features-settings/types";
import { screenStyle } from "@/shared/styles";

import { SheetBody } from "./SheetBody";
import { SheetTitle } from "./SheetTitle";

export interface SettingsSheetProps {
  settings_type: SettingsType;
  onClose?: () => void;
}

export function SettingsSheet({ settings_type, onClose }: SettingsSheetProps) {
  return (
    <View
      style={{
        ...screenStyle.container,
        backgroundColor: "white",
      }}
    >
      <SheetTitle settings_type={settings_type} />
      <SheetBody settings_type={settings_type} onClose={onClose} />
    </View>
  );
}
