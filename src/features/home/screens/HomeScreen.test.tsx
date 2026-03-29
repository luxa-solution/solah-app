import { render } from "@testing-library/react-native";
import React from "react";

import type { ScreenContainerProps } from "@/shared/components/screen-container";

import { HomeScreen } from "./HomeScreen";

jest.mock("@/shared/components/screen-container", () => {
  const { View } = require("react-native");

  const ScreenContainer = ({ children }: ScreenContainerProps) => (
    <View testID="screen-container">{children}</View>
  );

  return {
    __esModule: true,
    default: ScreenContainer,
    edgesHorizontal: ["left", "right"],
  };
});

jest.mock("@/features-home/components", () => {
  const { Text } = require("react-native");

  return {
    TitleBar: () => <Text>HOME_TITLE</Text>,
    PrayerTimesCard: () => <Text>HOME_PRAYER_TIMES</Text>,
    AdhkarCard: () => <Text>HOME_ADHKAR</Text>,
    PrayerGuideCard: () => <Text>HOME_GUIDE</Text>,
  };
});

jest.mock("@/features-solah/components", () => {
  const { Text } = require("react-native");

  return {
    PrayerTimingCard: () => <Text>HOME_PRAYER_TIMING</Text>,
  };
});

describe("HomeScreen", () => {
  it("renders the expected screen composition", () => {
    const screen = render(<HomeScreen />);

    expect(screen.getByTestId("screen-container")).toBeTruthy();
    expect(screen.getByText("HOME_TITLE")).toBeTruthy();
    expect(screen.getByText("HOME_PRAYER_TIMES")).toBeTruthy();
    expect(screen.getByText("HOME_PRAYER_TIMING")).toBeTruthy();
    expect(screen.getByText("HOME_ADHKAR")).toBeTruthy();
    expect(screen.getByText("HOME_GUIDE")).toBeTruthy();
  });
});
