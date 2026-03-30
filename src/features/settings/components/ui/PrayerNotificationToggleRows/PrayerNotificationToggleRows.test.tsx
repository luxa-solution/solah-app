import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { PrayerNotificationToggleRows } from "./PrayerNotificationToggleRows";

const initialState = useSettingsStore.getState();

describe("PrayerNotificationToggleRows", () => {
  beforeEach(() => {
    useSettingsStore.setState(initialState, true);
  });

  it("renders prayer adhan and iqamah toggles", () => {
    const { getByText } = render(<PrayerNotificationToggleRows />);

    expect(getByText("Subhi adhan notification")).toBeTruthy();
    expect(getByText("Isha iqamah notification")).toBeTruthy();
  });

  it("toggles adhan notifications between sound and mute", () => {
    const { getAllByRole } = render(<PrayerNotificationToggleRows />);

    fireEvent(getAllByRole("switch")[0], "valueChange", false);
    expect(useSettingsStore.getState().prayerSchedule.Subhi.adhanNotificationMode).toBe("mute");

    fireEvent(getAllByRole("switch")[0], "valueChange", true);
    expect(useSettingsStore.getState().prayerSchedule.Subhi.adhanNotificationMode).toBe("sound");
  });

  it("toggles iqamah notifications between vibrate and mute", () => {
    const { getAllByRole } = render(<PrayerNotificationToggleRows />);

    fireEvent(getAllByRole("switch")[5], "valueChange", false);
    expect(useSettingsStore.getState().prayerSchedule.Subhi.iqamahNotificationMode).toBe("mute");

    fireEvent(getAllByRole("switch")[5], "valueChange", true);
    expect(useSettingsStore.getState().prayerSchedule.Subhi.iqamahNotificationMode).toBe("vibrate");
  });
});
