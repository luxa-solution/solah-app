import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { TimeZone } from "./TimeZone";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  timezones: [
    { name: "Default", timezone: "Default", isDefault: true },
    { name: "Riyadh", timezone: "Asia/Riyadh" },
    { name: "UTC", timezone: "UTC" },
  ],
}));

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("TimeZone", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
    useSettingsStore.setState({
      timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
    });
    useDefaultStore.setState({
      defaultTimezone: { name: "UTC", timezone: "UTC" },
    });
  });

  it("filters time zones by query", () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TimeZone />);

    expect(getByText("Riyadh")).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText("Search"), "utc");

    expect(getByText("UTC")).toBeTruthy();
    expect(queryByText("Riyadh")).toBeNull();
  });

  it("pressing default uses the default timezone and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<TimeZone onClose={onClose} />);

    fireEvent.press(getByText("Default"));

    expect(useSettingsStore.getState().timezone).toEqual({
      name: "UTC",
      timezone: "UTC",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pressing a timezone sets it and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<TimeZone onClose={onClose} />);

    fireEvent.press(getByText("UTC"));

    expect(useSettingsStore.getState().timezone).toEqual({
      name: "UTC",
      timezone: "UTC",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
