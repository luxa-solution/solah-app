import { View } from "react-native";

import { SettingsType } from "@/features-settings/types";
import { screenStyle } from "@/shared/styles";

import { ModalContents } from "./ModalContents";
import { TitleBar } from "./TitleBar";

interface SettingsModalProps {
  settings_type: SettingsType;
}

export function SettingsModal({ settings_type }: SettingsModalProps) {
  return (
    <View
      style={{
        ...screenStyle.container,
        backgroundColor: "white",
      }}
    >
      <TitleBar settings_type={settings_type} />
      <ModalContents settings_type={settings_type} />
    </View>
  );
}
