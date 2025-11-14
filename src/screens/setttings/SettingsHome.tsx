import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card, Item } from "@/features/settings/components";
import { useSettingsStore } from "@/features-settings/store";
import { toText } from "@/features-settings/utils";
import { TitleBar } from "@/shared/components";
import { screenStyle } from "@/shared/styles";

export function SettingsHome() {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();

  const {
    arabicFontSize,
    arabicFontStyle,
    calculationMethod,
    calendarFormat,
    language,
    solahTimeNotification,
    sound,
    timeFormat,
    timezone,
  } = useSettingsStore();

  return (
    <ScrollView
      style={{
        ...screenStyle.container,
        paddingBottom: bottom,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TitleBar title="Settings" showBack={false} />

      {/* Prayer times group */}
      <Card title="Solah times">
        <Item
          label="Calculation method"
          value={toText("calmethod", calculationMethod)}
          onPress={() => router.push("/settings-modals/calmethod")}
        />
        <Item
          label="Time zone"
          value={toText("timezone", timezone)}
          onPress={() => router.push("/settings-modals/timezone")}
        />
        <Item
          label="Location"
          value={toText("location", location)}
          onPress={() => router.push("/settings-modals/location")}
        />
      </Card>

      {/* Notifications */}
      <Card title="Fonts">
        <Item
          label="Arabic font size"
          value={toText("arabicfontsize", arabicFontSize)}
          onPress={() => router.push("/settings-modals/arabicfontsize")}
        />
        <Item
          label="Arabic font style"
          value={toText("arabicfontstyle", arabicFontStyle)}
          onPress={() => router.push("/settings-modals/arabicfontstyle")}
        />
      </Card>

      {/* Notifications */}
      <Card title="Notifications">
        <Item
          label="Solah time notification"
          value={toText("solahtimenotif", solahTimeNotification)}
          onPress={() => router.push("/settings-modals/solahtimenotif")}
        />
        <Item
          label="Sound"
          value={toText("sound", sound)}
          onPress={() => router.push("/settings-modals/sound")}
        />
      </Card>

      {/* General */}
      <Card title="General">
        <Item
          label="Language"
          value={toText("language", language)}
          onPress={() => router.push("/settings-modals/language")}
        />
        <Item
          label="Calendar Format"
          value={toText("calendarformat", calendarFormat)}
          onPress={() => router.push("/settings-modals/calendarformat")}
        />
        <Item
          label="Time Format"
          value={toText("timeformat", timeFormat)}
          onPress={() => router.push("/settings-modals/timeformat")}
        />
      </Card>
    </ScrollView>
  );
}
