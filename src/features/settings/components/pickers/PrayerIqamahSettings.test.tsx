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
});
