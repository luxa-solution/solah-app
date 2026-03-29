import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import type { SettingsSheetProps } from "@/features-settings/components/sheet/SettingsSheet";
import type { CardProps } from "@/features-settings/components/ui/Card";
import type { ItemProps } from "@/features-settings/components/ui/Item";
import type { BottomSheetProps } from "@/shared/components/BottomSheet";
import type { TitleBarProps } from "@/shared/components/TitleBar";

import { SettingsHome } from "./SettingsHome";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 12, top: 0, left: 0, right: 0 }),
}));

jest.mock("@/features-settings/store", () => ({
  useSettingsStore: () => ({
    arabicFontSize: { name: "20", value: 20 },
    arabicFontStyle: { name: "Default", value: "Default" },
    calculationMethod: { name: "Default", method: "MoonsightingCommittee" },
    calendarFormat: { name: "Hijri", value: "hijri" },
    language: { name: "English", value: "English" },
    location: { name: "Riyadh", location: { city: "Riyadh" } },
    timeFormat: { name: "12-hour", value: "12hr" },
    timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
    sound: "Default",
  }),
}));

jest.mock("@/features-settings/utils", () => ({
  toText: (type: string, value: { name?: string } | string) =>
    `${type}:${typeof value === "object" && value?.name !== null && value?.name !== undefined ? value.name : value}`,
}));

jest.mock("@/features-settings/components", () => {
  const { View, Text, Pressable } = require("react-native");

  return {
    Card: ({ title, children }: CardProps) => (
      <View>
        <Text>{`CARD:${title}`}</Text>
        {children}
      </View>
    ),
    Item: ({ label, value, onPress }: ItemProps) => (
      <Pressable onPress={onPress} accessibilityLabel={`item-${label}`}>
        <Text>{`${label}:${value}`}</Text>
      </Pressable>
    ),
    SettingsSheet: ({ settings_type }: SettingsSheetProps) => (
      <Text>{`SETTINGS_SHEET:${settings_type}`}</Text>
    ),
  };
});

jest.mock("@/features-settings/components/ui/NotificationToggle", () => {
  const { Text } = require("react-native");

  return {
    NotificationToggle: () => <Text>NOTIFICATION_TOGGLE</Text>,
  };
});

jest.mock("@/shared/components", () => {
  const { View, Text, Pressable } = require("react-native");

  return {
    TitleBar: ({ title }: TitleBarProps) => <Text>{title}</Text>,
    BottomSheet: ({ isOpen, onClose, children }: BottomSheetProps) => (
      <View>
        <Text>{`BOTTOM_SHEET:${isOpen ? "open" : "closed"}`}</Text>
        {isOpen ? (
          <Pressable onPress={onClose} accessibilityLabel="close-sheet">
            <Text>Close</Text>
          </Pressable>
        ) : null}
        {isOpen ? children : null}
      </View>
    ),
  };
});

describe("SettingsHome", () => {
  it("renders the settings groups and values", () => {
    const screen = render(<SettingsHome />);

    expect(screen.getByText("Settings")).toBeTruthy();
    expect(screen.getByText("CARD:Solah times")).toBeTruthy();
    expect(screen.getByText("CARD:Fonts")).toBeTruthy();
    expect(screen.getByText("CARD:Notifications")).toBeTruthy();
    expect(screen.getByText("CARD:General")).toBeTruthy();
    expect(screen.getByText("NOTIFICATION_TOGGLE")).toBeTruthy();
    expect(screen.getByText("BOTTOM_SHEET:closed")).toBeTruthy();
  });

  it("opens and closes the active settings sheet", () => {
    const screen = render(<SettingsHome />);

    fireEvent.press(screen.getByLabelText("item-Calculation method"));
    expect(screen.getByText("BOTTOM_SHEET:open")).toBeTruthy();
    expect(screen.getByText("SETTINGS_SHEET:calmethod")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("close-sheet"));
    expect(screen.getByText("BOTTOM_SHEET:closed")).toBeTruthy();
  });
});
