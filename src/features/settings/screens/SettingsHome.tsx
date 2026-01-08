import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card, Item, SettingsSheet } from "@/features-settings/components";
import { useSettingsStore } from "@/features-settings/store";
import { SettingsType } from "@/features-settings/types";
import { toText } from "@/features-settings/utils";
import { BottomSheet, TitleBar } from "@/shared/components";
import { screenStyle } from "@/shared/styles";

import { NotificationToggle } from "../components/ui/NotificationToggle";

export function SettingsHome() {
  const { bottom } = useSafeAreaInsets();

  const [activeSheet, setActiveSheet] = useState<SettingsType | null>(null);

  const {
    arabicFontSize,
    arabicFontStyle,
    calculationMethod,
    calendarFormat,
    language,
    location,
    timeFormat,
    timezone,
    sound,
  } = useSettingsStore();

  const open = (type: SettingsType) => () => setActiveSheet(type);

  return (
    <>
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
            onPress={open("calmethod")}
          />
          <Item label="Time zone" value={toText("timezone", timezone)} onPress={open("timezone")} />
          <Item label="Location" value={toText("location", location)} onPress={open("location")} />
        </Card>

        {/* Fonts */}
        <Card title="Fonts">
          <Item
            label="Arabic font size"
            value={toText("arabicfontsize", arabicFontSize)}
            onPress={open("arabicfontsize")}
          />
          <Item
            label="Arabic font style"
            value={toText("arabicfontstyle", arabicFontStyle)}
            onPress={open("arabicfontstyle")}
          />
        </Card>

        {/* Notifications */}
        <Card title="Notifications">
          <NotificationToggle />
          <Item label="Sound" value={toText("sound", sound)} onPress={open("sound")} />
        </Card>

        {/* General */}
        <Card title="General">
          <Item label="Language" value={toText("language", language)} onPress={open("language")} />
          <Item
            label="Calendar Format"
            value={toText("calendarformat", calendarFormat)}
            onPress={open("calendarformat")}
          />
          <Item
            label="Time Format"
            value={toText("timeformat", timeFormat)}
            onPress={open("timeformat")}
          />
        </Card>
      </ScrollView>
      <BottomSheet isOpen={activeSheet !== null} onClose={() => setActiveSheet(null)}>
        {activeSheet && (
          <SettingsSheet settings_type={activeSheet} onClose={() => setActiveSheet(null)} />
        )}
      </BottomSheet>
    </>
  );
}
