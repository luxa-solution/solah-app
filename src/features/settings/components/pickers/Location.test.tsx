import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { Location } from "./Location";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  locations: [
    {
      name: "Default",
      isDefault: true,
      location: { city: "Default City", region: "Default Region", country: "Default Country" },
    },
    {
      name: "Riyadh",
      location: { city: "Riyadh", region: "Riyadh Region", country: "Saudi Arabia" },
      timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
    },
    {
      name: "London",
      location: { city: "London", region: "England", country: "United Kingdom" },
      timezone: { name: "London", timezone: "Europe/London" },
    },
  ],
}));

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("Location", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
    useSettingsStore.setState({
      location: {
        name: "Riyadh",
        location: { city: "Riyadh", region: "Riyadh Region", country: "Saudi Arabia" },
      },
      timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
    });
    useDefaultStore.setState({
      defaultLocation: {
        name: "London",
        location: { city: "London", region: "England", country: "United Kingdom" },
        timezone: { name: "London", timezone: "Europe/London" },
      },
    });
  });

  it("filters locations by query", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<Location />);

    expect(getByText("Riyadh")).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText("Search"), "london");

    expect(getByText("London")).toBeTruthy();
    expect(queryByText("Riyadh")).toBeNull();
  });

  it("pressing default uses the default location and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Location onClose={onClose} />);

    fireEvent.press(getByText("Default"));

    expect(useSettingsStore.getState().location).toEqual({
      name: "London",
      location: { city: "London", region: "England", country: "United Kingdom" },
      timezone: { name: "London", timezone: "Europe/London" },
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pressing a location sets both location and timezone and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Location onClose={onClose} />);

    fireEvent.press(getByText("London"));

    expect(useSettingsStore.getState().location).toEqual({
      name: "London",
      location: { city: "London", region: "England", country: "United Kingdom" },
      timezone: { name: "London", timezone: "Europe/London" },
    });
    expect(useSettingsStore.getState().timezone).toEqual({
      name: "London",
      timezone: "Europe/London",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
