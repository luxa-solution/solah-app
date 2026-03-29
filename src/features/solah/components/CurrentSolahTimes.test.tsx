import { render } from "@testing-library/react-native";
import React from "react";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-solah/hooks", () => ({
  useSolahTimes: () => ({
    times: [
      { title: "Fajr", time: "05:00" },
      { title: "Dhuhr", time: "12:30" },
    ],
  }),
  useCurrentSolah: () => ({
    currentSolah: "Dhuhr",
  }),
}));

jest.mock("@/features-solah/utils", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return {
    formatDate: () => "1 Ramadan 1447",
    SolahIcons: {
      Fajr: (props: object) => React.createElement(Text, props, "FajrIcon"),
      Dhuhr: (props: object) => React.createElement(Text, props, "DhuhrIcon"),
    },
  };
});

import { useSettingsStore } from "@/features-settings/store";

import { CurrentSolahTimes } from "./CurrentSolahTimes";

const initialSettingsState = useSettingsStore.getState();

describe("CurrentSolahTimes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useSettingsStore.setState({
      location: {
        name: "Riyadh",
        location: {
          city: "Riyadh",
          region: "Riyadh Region",
          country: "Saudi Arabia",
        },
      },
      calendarFormat: { name: "Hijri", value: "hijri" },
    });
  });

  it("renders the formatted date, location, and prayer rows", () => {
    const screen = render(<CurrentSolahTimes selectedDate={new Date("2026-03-29T10:00:00.000Z")} />);

    expect(screen.getByText(/1 Ramadan 1447/)).toBeTruthy();
    expect(screen.getByText("Saudi Arabia")).toBeTruthy();
    expect(screen.getByText("Fajr")).toBeTruthy();
    expect(screen.getByText("Dhuhr")).toBeTruthy();
    expect(screen.getByText("05:00")).toBeTruthy();
    expect(screen.getByText("12:30")).toBeTruthy();
    expect(screen.getByText("FajrIcon")).toBeTruthy();
    expect(screen.getByText("DhuhrIcon")).toBeTruthy();
  });
});
