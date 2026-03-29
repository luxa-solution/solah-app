import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { Sound } from "./Sound";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  sounds: ["Default", "Bell", "Birds"],
}));

const initialSettingsState = useSettingsStore.getState();

describe("Sound", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("renders the list of available sounds", () => {
    const { getByText } = render(<Sound />);

    expect(getByText("Default")).toBeTruthy();
    expect(getByText("Bell")).toBeTruthy();
    expect(getByText("Birds")).toBeTruthy();
  });

  it("pressing an option sets the sound and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Sound onClose={onClose} />);

    fireEvent.press(getByText("Birds"));

    expect(useSettingsStore.getState().sound).toBe("Birds");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
