import React, { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card, Item, SettingsModal } from "@/features-settings/components";
import { useSettingsStore } from "@/features-settings/store";
import { SettingsType } from "@/features-settings/types";
import { toText } from "@/features-settings/utils";
import { BottomSheet, TitleBar } from "@/shared/components";
import { screenStyle } from "@/shared/styles";

import { NotificationItem } from "../components/NotificationItem";

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
  } = useSettingsStore();

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
            onPress={() => setActiveSheet("calmethod")}
          />
          <Item
            label="Time zone"
            value={toText("timezone", timezone)}
            onPress={() => setActiveSheet("timezone")}
          />
          <Item
            label="Location"
            value={toText("location", location)}
            onPress={() => setActiveSheet("location")}
          />
        </Card>

        {/* Fonts */}
        <Card title="Fonts">
          <Item
            label="Arabic font size"
            value={toText("arabicfontsize", arabicFontSize)}
            onPress={() => setActiveSheet("arabicfontsize")}
          />
          <Item
            label="Arabic font style"
            value={toText("arabicfontstyle", arabicFontStyle)}
            onPress={() => setActiveSheet("arabicfontstyle")}
          />
        </Card>

        {/* Notifications */}
        <NotificationItem setActiveSheet={setActiveSheet} />

        {/* General */}
        <Card title="General">
          <Item
            label="Language"
            value={toText("language", language)}
            onPress={() => setActiveSheet("language")}
          />
          <Item
            label="Calendar Format"
            value={toText("calendarformat", calendarFormat)}
            onPress={() => setActiveSheet("calendarformat")}
          />
          <Item
            label="Time Format"
            value={toText("timeformat", timeFormat)}
            onPress={() => setActiveSheet("timeformat")}
          />
        </Card>
      </ScrollView>
      <BottomSheet isOpen={activeSheet !== null} onClose={() => setActiveSheet(null)}>
        {activeSheet && (
          <SettingsModal settings_type={activeSheet} onClose={() => setActiveSheet(null)} />
        )}
      </BottomSheet>
    </>
  );
}
