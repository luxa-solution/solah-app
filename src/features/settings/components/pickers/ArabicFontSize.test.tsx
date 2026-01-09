import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { ArabicFontSize } from "./ArabicFontSize";

const mockSetArabicFontSize = jest.fn();

jest.mock("@/features-settings/constants", () => ({
  arabicFontSizes: [
    { name: "Small", value: 1 },
    { name: "Large", value: 2 },
  ],
}));

jest.mock("@/features-settings/store", () => ({
  useSettingsStore: () => ({
    arabicFontSize: { name: "Small", value: 1 },
    setArabicFontSize: mockSetArabicFontSize,
  }),
}));

jest.mock("./shared", () => {
  const { View } = require("react-native");
  return {
    SelectedIcon: () => <View testID="selected-icon" />,
    styles: {
      container: {},
      option: {},
      selectedOption: {},
      optionText: {},
      selectedOptionText: {},
    },
  };
});

describe("ArabicFontSize", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("pressing an option sets the font size and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<ArabicFontSize onClose={onClose} />);

    fireEvent.press(getByText("Large"));

    expect(mockSetArabicFontSize).toHaveBeenCalledWith({ name: "Large", value: 2 });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
