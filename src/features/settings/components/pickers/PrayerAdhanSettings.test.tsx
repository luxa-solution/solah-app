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

  it("shows 24-hour fixed-time inputs when the app is using 24-hour format", () => {
    useSettingsStore.setState({
      timeFormat: { name: "24-hour", value: "24hr" },
    });

    const { getByLabelText, getByPlaceholderText } = render(
      <PrayerAdhanSettings prayer="Dhuhr" />
    );

    fireEvent.press(getByLabelText("Fixed time"));

    expect(getByPlaceholderText("HH")).toBeTruthy();
    expect(getByPlaceholderText("MM")).toBeTruthy();
  });

  it("saves valid adhan settings and returns through onDone", () => {
    const onDone = jest.fn();
    const onClose = jest.fn();
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <PrayerAdhanSettings prayer="Dhuhr" onDone={onDone} onClose={onClose} />
    );

    fireEvent.press(getByLabelText("Relative after solah"));
    fireEvent.changeText(getByPlaceholderText("Hours"), "0");
    fireEvent.changeText(getByPlaceholderText("Minutes"), "10");
    fireEvent.press(getByText("Save"));

    expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhan).toEqual({
      mode: "relative_after_solah",
      offsetMinutes: 10,
    });
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("falls back to onClose when onDone is not provided", () => {
    const onClose = jest.fn();
    const { getByText } = render(<PrayerAdhanSettings prayer="Dhuhr" onClose={onClose} />);

    fireEvent.press(getByText("Save"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows a validation error for invalid fixed times", () => {
    useSettingsStore.setState({
      timeFormat: { name: "24-hour", value: "24hr" },
    });

    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <PrayerAdhanSettings prayer="Dhuhr" />
    );

    fireEvent.press(getByLabelText("Fixed time"));
    fireEvent.changeText(getByPlaceholderText("HH"), "99");
    fireEvent.changeText(getByPlaceholderText("MM"), "99");
    fireEvent.press(getByText("Save"));

    expect(getByText("Fixed adhan time is invalid")).toBeTruthy();
  });
});
