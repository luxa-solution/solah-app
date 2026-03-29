import { render } from "@testing-library/react-native";
import React from "react";

import type { CurrentSolahTimesProps } from "@/features-solah/components/CurrentSolahTimes";
import type { TitleBarProps } from "@/shared/components/TitleBar";

import { SolahTimeScreen } from "./SolahTimeScreen";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 24, top: 0, left: 0, right: 0 }),
}));

jest.mock("@/shared/styles", () => ({
  colors: {
    background: {
      default: {
        primary: "#fff",
      },
    },
  },
  screenStyle: {
    container: {},
  },
}));

jest.mock("@/shared/components", () => {
  const { Text } = require("react-native");

  return {
    TitleBar: ({ title }: TitleBarProps) => <Text>{title}</Text>,
  };
});

jest.mock("@/shared/utils/responsive-dimensions", () => ({
  ds: (value: number) => value,
}));

jest.mock("@/features-solah/components", () => {
  const { Text } = require("react-native");

  return {
    PrayerTimesCard: () => <Text>SOLAH_PRAYER_TIMES</Text>,
    CurrentSolahTimes: ({ selectedDate }: CurrentSolahTimesProps) => (
      <Text>{`CURRENT_SOLAH:${selectedDate instanceof Date}`}</Text>
    ),
    SolahCalendar: () => <Text>SOLAH_CALENDAR</Text>,
  };
});

jest.mock("@/features-solah/components/FindQiblaButton", () => {
  const { Text } = require("react-native");

  return {
    FindQiblaButton: () => <Text>FIND_QIBLA</Text>,
  };
});

describe("SolahTimeScreen", () => {
  it("renders the screen composition", () => {
    const screen = render(<SolahTimeScreen />);

    expect(screen.getByText("Solah time")).toBeTruthy();
    expect(screen.getByText("SOLAH_PRAYER_TIMES")).toBeTruthy();
    expect(screen.getByText("FIND_QIBLA")).toBeTruthy();
    expect(screen.getByText("SOLAH_CALENDAR")).toBeTruthy();
    expect(screen.getByText("CURRENT_SOLAH:true")).toBeTruthy();
  });
});
