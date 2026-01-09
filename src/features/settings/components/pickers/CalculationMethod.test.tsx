import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { CalculationMethod } from "./CalculationMethod";

const mockSetCalculationMethod = jest.fn();

jest.mock("@/features-settings/constants", () => ({
  calMethods: [
    { name: "Use Default", method: "default", isDefault: true },
    { name: "Muslim World League", method: "MWL" },
    { name: "Umm Al-Qura", method: "UQ" },
  ],
}));

jest.mock("@/features-settings/store", () => ({
  useSettingsStore: () => ({
    calculationMethod: { name: "Muslim World League", method: "MWL" },
    setCalculationMethod: mockSetCalculationMethod,
  }),
  useDefaultStore: () => ({
    defaultCalculationMethod: { name: "Umm Al-Qura", method: "UQ" },
  }),
}));

jest.mock("./shared", () => {
  const { TextInput, View } = require("react-native");

  return {
    SearchBar: ({ value, onChange }: any) => (
      <TextInput testID="searchbar" value={value} onChangeText={onChange} />
    ),
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

describe("CalculationMethod", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("filters methods by query (name or key)", () => {
    const { getByTestId, queryByText, getByText } = render(<CalculationMethod />);

    expect(getByText("Muslim World League")).toBeTruthy();

    fireEvent.changeText(getByTestId("searchbar"), "uq");

    expect(getByText("Umm Al-Qura")).toBeTruthy();
    expect(queryByText("Muslim World League")).toBeNull();
  });

  it("pressing default sets defaultCalculationMethod and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<CalculationMethod onClose={onClose} />);

    fireEvent.press(getByText("Use Default"));

    expect(mockSetCalculationMethod).toHaveBeenCalledWith({ name: "Umm Al-Qura", method: "UQ" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pressing a method sets it and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<CalculationMethod onClose={onClose} />);

    fireEvent.press(getByText("Umm Al-Qura"));

    expect(mockSetCalculationMethod).toHaveBeenCalledWith({ name: "Umm Al-Qura", method: "UQ" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
