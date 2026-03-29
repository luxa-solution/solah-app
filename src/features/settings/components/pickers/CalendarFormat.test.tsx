import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { CalendarFormat } from "./CalendarFormat";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  calendarFormats: [
    { name: "Hijri", value: "hijri" },
    { name: "Gregorian", value: "gregorian" },
  ],
}));

const initialSettingsState = useSettingsStore.getState();

describe("CalendarFormat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("renders the list of available calendar formats", () => {
    const { getByText } = render(<CalendarFormat />);

    expect(getByText("Hijri")).toBeTruthy();
    expect(getByText("Gregorian")).toBeTruthy();
  });

  it("pressing an option sets the calendar format and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<CalendarFormat onClose={onClose} />);

    fireEvent.press(getByText("Gregorian"));

    expect(useSettingsStore.getState().calendarFormat).toEqual({
      name: "Gregorian",
      value: "gregorian",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
