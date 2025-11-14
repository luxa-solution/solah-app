import { useLocalSearchParams } from "expo-router";

import { SettingsType } from "@/features-settings/types";
import { SettingsModal } from "@/screens/setttings";

function Screen() {
  const { settings_type } = useLocalSearchParams();
  const name = Array.isArray(settings_type) ? settings_type[0] : settings_type;

  return <SettingsModal settings_type={name as SettingsType} />;
}

export default Screen;
