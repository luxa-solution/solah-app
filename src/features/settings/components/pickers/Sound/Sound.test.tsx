import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { Sound } from "./Sound";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  sounds: ["Short Adhan", "Full Adhan", "Beep"],
}));

const initialSettingsState = useSettingsStore.getState();

describe("Sound", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("renders the list of available sounds", () => {
    const { getByText } = render(<Sound />);

    expect(getByText("Short Adhan")).toBeTruthy();
    expect(getByText("Full Adhan")).toBeTruthy();
    expect(getByText("Beep")).toBeTruthy();
  });

  it("pressing an option sets the sound and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Sound onClose={onClose} />);

    fireEvent.press(getByText("Beep"));

    expect(useSettingsStore.getState().sound).toBe("Beep");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
