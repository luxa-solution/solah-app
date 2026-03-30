import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { TimeFormat } from "./TimeFormat";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  timeFormats: [
    { name: "12-hour", value: "12hr" },
    { name: "24-hour", value: "24hr" },
  ],
}));

const initialSettingsState = useSettingsStore.getState();

describe("TimeFormat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("renders the list of available time formats", () => {
    const { getByText } = render(<TimeFormat />);

    expect(getByText("12-hour")).toBeTruthy();
    expect(getByText("24-hour")).toBeTruthy();
  });

  it("pressing an option sets the time format and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<TimeFormat onClose={onClose} />);

    fireEvent.press(getByText("24-hour"));

    expect(useSettingsStore.getState().timeFormat).toEqual({
      name: "24-hour",
      value: "24hr",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
