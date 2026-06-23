import React from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useOnboardingStore } from "@/features-onboarding/store/onboardingStore";
import {
  Card,
  CustomizeNotificationsButton,
  Item,
  SettingsSheet,
  SettingsToggleRow,
} from "@/features-settings/components";
import { useSettingsSheetState } from "@/features-settings/hooks";
import { useSettingsStore } from "@/features-settings/store";
import { toText } from "@/features-settings/utils";
import { BottomSheet, TitleBar } from "@/shared/components";
import { screenStyle } from "@/shared/styles";

import { NotificationToggle } from "../components/ui/NotificationToggle";

export function SettingsHome() {
  const { bottom } = useSafeAreaInsets();
  const { activeSheet, closeSheet, isOpen, navigateToSheet, openSheet } = useSettingsSheetState();

  const hasOnboarded = useOnboardingStore((s) => s.hasOnboarded);
  const resetOnboarding = useOnboardingStore((s) => s.resetOnboarding);
  const setHasOnboarded = useOnboardingStore((s) => s.setHasOnboarded);

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
    solahTimeNotification,
    autoTimezoneEnabled,
    setAutoTimezoneEnabled,
  } = useSettingsStore();

  const open = (type: Parameters<typeof openSheet>[0]) => () => openSheet(type);

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
          <SettingsToggleRow
            label="Automatically get time zone"
            value={autoTimezoneEnabled ? "On" : "Off"}
            enabled={autoTimezoneEnabled}
            onToggle={setAutoTimezoneEnabled}
          />
          {autoTimezoneEnabled ? (
            <Item label="Time zone" value={toText("timezone", timezone)} disabled />
          ) : (
            <Item
              label="Manual time zone"
              value={toText("timezone", timezone)}
              onPress={open("timezone")}
            />
          )}
          <Item label="Location" value={toText("location", location)} onPress={open("location")} />
        </Card>

        <Card title="Notifications">
          <Item
            label="Adhan settings"
            value="Configure each prayer"
            onPress={open("adhansettings")}
          />
          <Item
            label="Iqamah settings"
            value="Set each prayer delay"
            onPress={open("iqamahsettings")}
          />
          <NotificationToggle />
          <Item label="Sound" value={toText("sound", sound)} onPress={open("sound")} />
          {solahTimeNotification ? (
            <CustomizeNotificationsButton onPress={open("customizenotifications")} />
          ) : null}
        </Card>

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

        <Card title="Appearance">
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

          {/* 🛠️ DEVELOPER ONLY SECTION */}
          {__DEV__ && (
            <Card title="Developer Settings (Dev Mode Only)">
              <SettingsToggleRow
                label="Onboarding Completed"
                value={hasOnboarded ? "Yes" : "No"}
                enabled={hasOnboarded}
                onToggle={(value) => {
                  if (value) {
                    setHasOnboarded(true);
                  } else {
                    resetOnboarding();
                  }
                }}
              />
            </Card>
          )}
        </Card>
      </ScrollView>
      <BottomSheet isOpen={isOpen} onClose={closeSheet}>
        {activeSheet && (
          <SettingsSheet
            settings_type={activeSheet}
            onClose={closeSheet}
            onNavigate={navigateToSheet}
          />
        )}
      </BottomSheet>
    </>
  );
}
