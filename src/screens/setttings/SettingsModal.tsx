import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AllModalContents, TitleBar } from "@/features-settings/components";
import { SettingsType } from "@/features-settings/types";
import { screenStyle } from "@/shared/styles";

interface SettingsModalProps {
  settings_type: SettingsType;
}

export function SettingsModal({ settings_type }: SettingsModalProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        ...screenStyle.container,
        backgroundColor: "white",
        paddingBottom: bottom,
      }}
    >
      <TitleBar settings_type={settings_type} />
      <AllModalContents settings_type={settings_type} />
    </View>
  );
}
