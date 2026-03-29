import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { ArabicFontSize } from "./ArabicFontSize";

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Ionicons: (props: object) => React.createElement(Text, props, "Ionicon"),
  };
});

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  arabicFontSizes: [
    { name: "Small", value: 1 },
    { name: "Large", value: 2 },
  ],
}));

const initialSettingsState = useSettingsStore.getState();

describe("ArabicFontSize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("pressing an option sets the font size and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<ArabicFontSize onClose={onClose} />);

    fireEvent.press(getByText("Large"));

    expect(useSettingsStore.getState().arabicFontSize).toEqual({ name: "Large", value: 2 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders the list of available font sizes", () => {
    const { getByText } = render(<ArabicFontSize />);

    expect(getByText("Small")).toBeTruthy();
    expect(getByText("Large")).toBeTruthy();
  });
});
