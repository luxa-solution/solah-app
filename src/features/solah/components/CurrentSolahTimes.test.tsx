import { render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

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
  const { Text } = require("react-native");
  return {
    formatDate: () => "1 Ramadan 1447",
    SolahIcons: {
      Fajr: (props: object) => <Text {...props}>FajrIcon</Text>,
      Dhuhr: (props: object) => <Text {...props}>DhuhrIcon</Text>,
    },
  };
});

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
          latitude: 24.7136,
          longitude: 46.6753,
        },
        timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
      },
      calendarFormat: { name: "Hijri", value: "hijri" },
    });
  });

  it("renders the formatted date, location, and prayer rows", () => {
    const screen = render(
      <CurrentSolahTimes selectedDate={new Date("2026-03-29T10:00:00.000Z")} />
    );

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
