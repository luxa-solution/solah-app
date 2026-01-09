import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { Language } from "./Language";

const mockSetLanguage = jest.fn();

jest.mock("@/features-settings/constants", () => ({
  languages: [
    { name: "System Default", value: "default", isDefault: true },
    { name: "English", value: "en" },
    { name: "Arabic", value: "ar" },
  ],
}));

jest.mock("@/features-settings/store", () => ({
  useSettingsStore: () => ({
    language: { name: "English", value: "en" },
    setLanguage: mockSetLanguage,
  }),
  useDefaultStore: () => ({
    defaultLanguage: { name: "English", value: "en" },
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

describe("Language", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("filters languages by query", () => {
    const { getByTestId, queryByText, getByText } = render(<Language />);

    expect(getByText("Arabic")).toBeTruthy();

    fireEvent.changeText(getByTestId("searchbar"), "arab");

    expect(getByText("Arabic")).toBeTruthy();
    expect(queryByText("English")).toBeNull();
  });

  it("pressing default uses defaultLanguage and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Language onClose={onClose} />);

    fireEvent.press(getByText("System Default"));

    expect(mockSetLanguage).toHaveBeenCalledWith({ name: "English", value: "en" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pressing a language sets it and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Language onClose={onClose} />);

    fireEvent.press(getByText("Arabic"));

    expect(mockSetLanguage).toHaveBeenCalledWith({ name: "Arabic", value: "ar" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
