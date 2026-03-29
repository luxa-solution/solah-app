import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { SolahTimeNotification } from "./SolahTimeNotification";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  notifications: [
    { label: "Off", value: false },
    { label: "On", value: true },
  ],
}));

const initialSettingsState = useSettingsStore.getState();

describe("SolahTimeNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("renders the available notification options", () => {
    const { getByText } = render(<SolahTimeNotification />);

    expect(getByText("Off")).toBeTruthy();
    expect(getByText("On")).toBeTruthy();
  });

  it("pressing an option updates the notification setting", () => {
    const { getByText } = render(<SolahTimeNotification />);

    fireEvent.press(getByText("On"));
    expect(useSettingsStore.getState().solahTimeNotification).toBe(true);

    fireEvent.press(getByText("Off"));
    expect(useSettingsStore.getState().solahTimeNotification).toBe(false);
  });
});
