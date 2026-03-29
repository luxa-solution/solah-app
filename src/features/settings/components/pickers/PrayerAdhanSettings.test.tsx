import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { PrayerAdhanSettings } from "./PrayerAdhanSettings";

const initialState = useSettingsStore.getState();

describe("PrayerAdhanSettings", () => {
  beforeEach(() => {
    useSettingsStore.setState(initialState, true);
  });

  it("renders icon-first mode options", () => {
    const { getByLabelText } = render(<PrayerAdhanSettings prayer="Dhuhr" />);

    expect(getByLabelText("At solah time")).toBeTruthy();
    expect(getByLabelText("Relative after solah")).toBeTruthy();
    expect(getByLabelText("Fixed time")).toBeTruthy();
  });

  it("shows duration inputs for relative mode", () => {
    const { getByLabelText, getByPlaceholderText } = render(<PrayerAdhanSettings prayer="Dhuhr" />);

    fireEvent.press(getByLabelText("Relative after solah"));

    expect(getByPlaceholderText("Hours")).toBeTruthy();
    expect(getByPlaceholderText("Minutes")).toBeTruthy();
  });

  it("shows 12-hour fixed-time inputs when the app is using 12-hour format", () => {
    useSettingsStore.setState({
      timeFormat: { name: "12-hour", value: "12hr" },
    });

    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <PrayerAdhanSettings prayer="Dhuhr" />
    );

    fireEvent.press(getByLabelText("Fixed time"));

    expect(getByPlaceholderText("Hour")).toBeTruthy();
    expect(getByPlaceholderText("Minute")).toBeTruthy();
    expect(getByText("AM")).toBeTruthy();
    expect(getByText("PM")).toBeTruthy();
  });
});
