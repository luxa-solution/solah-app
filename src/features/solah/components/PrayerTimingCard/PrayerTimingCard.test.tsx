import { render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { PrayerTimingCard } from "./PrayerTimingCard";

jest.mock("@/features-solah/hooks", () => ({
  useNextSolah: jest.fn(),
}));

const { useNextSolah } = jest.requireMock("@/features-solah/hooks") as {
  useNextSolah: jest.Mock;
};

const initialState = useSettingsStore.getState();

describe("PrayerTimingCard", () => {
  beforeEach(() => {
    useSettingsStore.setState(initialState, true);
    useNextSolah.mockReturnValue({
      nextSolah: {
        title: "Dhuhr",
        time: "12:00 PM",
      },
    });
  });

  it("renders adhan and iqamah times from the prayer settings", () => {
    useSettingsStore.setState({
      prayerSchedule: {
        ...initialState.prayerSchedule,
        Dhuhr: {
          ...initialState.prayerSchedule.Dhuhr,
          adhan: { mode: "relative_after_solah", offsetMinutes: 10 },
          iqamahDelayMinutes: 20,
        },
      },
      timeFormat: { name: "12-hour", value: "12hr" },
    });

    const { getByText } = render(<PrayerTimingCard />);

    expect(getByText("12:10 PM")).toBeTruthy();
    expect(getByText("12:30 PM")).toBeTruthy();
  });

  it("renders fixed adhan time using the current time format", () => {
    useSettingsStore.setState({
      prayerSchedule: {
        ...initialState.prayerSchedule,
        Dhuhr: {
          ...initialState.prayerSchedule.Dhuhr,
          adhan: { mode: "fixed_time", fixedTime: "13:45" },
          iqamahDelayMinutes: 15,
        },
      },
      timeFormat: { name: "12-hour", value: "12hr" },
    });

    const { getByText } = render(<PrayerTimingCard />);

    expect(getByText("01:45 PM")).toBeTruthy();
    expect(getByText("02:00 PM")).toBeTruthy();
  });
});
