import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { ArabicFontStyle } from "./ArabicFontStyle";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  arabicFontStyles: [
    { name: "Default", value: "Default" },
    { name: "Uthmani", value: "Uthmani" },
  ],
}));

const initialSettingsState = useSettingsStore.getState();

describe("ArabicFontStyle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("renders the list of available font styles", () => {
    const { getByText } = render(<ArabicFontStyle />);

    expect(getByText("Default")).toBeTruthy();
    expect(getByText("Uthmani")).toBeTruthy();
  });

  it("pressing an option sets the font style and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<ArabicFontStyle onClose={onClose} />);

    fireEvent.press(getByText("Uthmani"));

    expect(useSettingsStore.getState().arabicFontStyle).toEqual({
      name: "Uthmani",
      value: "Uthmani",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
