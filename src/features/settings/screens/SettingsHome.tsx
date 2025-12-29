import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Card, Item, SettingsModal } from "@/features-settings/components";
import { useSettingsStore } from "@/features-settings/store";
import { SettingsType } from "@/features-settings/types";
import { toText } from "@/features-settings/utils";
import { BottomSheet, TitleBar } from "@/shared/components";
import { colors, font, screenStyle, spacing } from "@/shared/styles";

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
    solahTimeNotification,
    sound,
    timeFormat,
    timezone,
    setSolahTimeNotification,
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

        {/* Notifications */}
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
          <Item
            label="Sound"
            value={toText("sound", sound)}
            onPress={() => setActiveSheet("sound")}
          />
        </Card>

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

const toggleStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  pressed: {
    backgroundColor: colors.background.default.secondary,
    borderRadius: 8,
  },
  left: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  label: {
    ...font.label.large,
    color: colors.context.default.primary,
  },
  value: {
    ...font.body.xsmall,
    color: colors.context.default.secondary,
    marginTop: 6,
  },
});
