import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { PrayerIqamahSettings } from "./PrayerIqamahSettings";

const initialState = useSettingsStore.getState();

describe("PrayerIqamahSettings", () => {
  beforeEach(() => {
    useSettingsStore.setState(initialState, true);
  });

  it("renders the circular dial and minutes input", () => {
    const { getByTestId, getByPlaceholderText } = render(<PrayerIqamahSettings prayer="Maghrib" />);

    expect(getByTestId("iqamah-minute-dial")).toBeTruthy();
    expect(getByPlaceholderText("Minutes")).toBeTruthy();
  });

  it("rejects non-integer values outside the supported range", () => {
    const { getByPlaceholderText, getByText } = render(<PrayerIqamahSettings prayer="Maghrib" />);

    fireEvent.changeText(getByPlaceholderText("Minutes"), "61");
    fireEvent.press(getByText("Save"));

    expect(getByText("Iqamah delay must be between 5 and 60 minutes")).toBeTruthy();
  });

  it("saves valid delays and prefers onDone over onClose", () => {
    const onDone = jest.fn();
    const onClose = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <PrayerIqamahSettings prayer="Maghrib" onDone={onDone} onClose={onClose} />
    );

    fireEvent.changeText(getByPlaceholderText("Minutes"), "25");
    fireEvent.press(getByText("Save"));

    expect(useSettingsStore.getState().prayerSchedule.Maghrib.iqamahDelayMinutes).toBe(25);
    expect(onDone).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("falls back to onClose when onDone is not provided", () => {
    const onClose = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <PrayerIqamahSettings prayer="Maghrib" onClose={onClose} />
    );

    fireEvent.changeText(getByPlaceholderText("Minutes"), "20");
    fireEvent.press(getByText("Save"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("clears the error when the dial or input changes after an invalid save", () => {
    const { getByPlaceholderText, getByText, getByTestId, queryByText } = render(
      <PrayerIqamahSettings prayer="Maghrib" />
    );

    fireEvent.changeText(getByPlaceholderText("Minutes"), "");
    fireEvent.press(getByText("Save"));
    expect(getByText("Iqamah delay must be between 5 and 60 minutes")).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText("Minutes"), "15");
    expect(queryByText("Iqamah delay must be between 5 and 60 minutes")).toBeNull();

    fireEvent.changeText(getByPlaceholderText("Minutes"), "");
    fireEvent.press(getByText("Save"));
    expect(getByText("Iqamah delay must be between 5 and 60 minutes")).toBeTruthy();

    fireEvent(getByTestId("iqamah-minute-dial"), "responderMove", {
      nativeEvent: { locationX: 110, locationY: 8 },
    });
    expect(queryByText("Iqamah delay must be between 5 and 60 minutes")).toBeNull();
  });
});
