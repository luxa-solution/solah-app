import { View } from "react-native";

import { SettingsType } from "@/features-settings/types";
import { screenStyle } from "@/shared/styles";

import { ModalContents } from "./ModalContents";
import { ModalTitleBar } from "./ModalTitleBar";

interface SettingsModalProps {
  settings_type: SettingsType;
  onClose?: () => void;
}

export function SettingsModal({ settings_type, onClose }: SettingsModalProps) {
  return (
    <View
      style={{
        ...screenStyle.container,
        backgroundColor: "white",
      }}
    >
      <ModalTitleBar settings_type={settings_type} />
      <ModalContents settings_type={settings_type} onClose={onClose} />
    </View>
  );
}
