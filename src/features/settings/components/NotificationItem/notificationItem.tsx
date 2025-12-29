import { Pressable, Switch, View, Text } from "react-native";

import { useSettingsStore } from "@/features-settings/store";
import { SettingsType } from "@/features-settings/types";
import { toText } from "@/features-settings/utils";
import { colors } from "@/shared/styles/colors";

import { Card } from "../Card";
import { Item } from "../Item";

import { toggleStyles } from "./notificationItem.styles";

export const NotificationItem = ({
  setActiveSheet,
}: {
  setActiveSheet: (sheet: SettingsType) => void;
}) => {
  const { solahTimeNotification, sound, setSolahTimeNotification } = useSettingsStore();

  return (
    <Card title="Notifications">
      <Pressable
        onPress={() => setSolahTimeNotification(!solahTimeNotification)}
        style={({ pressed }) => [toggleStyles.row, pressed && toggleStyles.pressed]}
      >
        <View style={toggleStyles.left}>
          <Text style={toggleStyles.label}>Prayer time notification</Text>
          <Text style={toggleStyles.value}>{solahTimeNotification ? "On" : "Off"}</Text>
        </View>
        <Switch
          value={solahTimeNotification}
          onValueChange={setSolahTimeNotification}
          trackColor={{
            false: colors.background.default.secondary,
            true: colors.background.brand.primary,
          }}
          thumbColor={colors.background.default.primary}
          ios_backgroundColor={colors.background.default.secondary}
        />
      </Pressable>
      <Item label="Sound" value={toText("sound", sound)} onPress={() => setActiveSheet("sound")} />
    </Card>
  );
};
