import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { Language } from "./Language";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Ionicons: (props: object) => React.createElement(Text, props, "Ionicon"),
  };
});

jest.mock("@/features-settings/constants", () => ({
  languages: [
    { name: "System Default", value: "default", isDefault: true },
    { name: "English", value: "en" },
    { name: "Arabic", value: "ar" },
  ],
}));

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("Language", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
    useSettingsStore.setState({
      language: { name: "English", value: "en" },
    });
    useDefaultStore.setState({
      defaultLanguage: { name: "English", value: "en" },
    });
  });

  it("filters languages by query", () => {
    const { getByPlaceholderText, queryByText, getByText } = render(<Language />);

    expect(getByText("Arabic")).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText("Search"), "arab");

    expect(getByText("Arabic")).toBeTruthy();
    expect(queryByText("English")).toBeNull();
  });

  it("pressing default uses defaultLanguage and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Language onClose={onClose} />);

    fireEvent.press(getByText("System Default"));

    expect(useSettingsStore.getState().language).toEqual({ name: "English", value: "en" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pressing a language sets it and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<Language onClose={onClose} />);

    fireEvent.press(getByText("Arabic"));

    expect(useSettingsStore.getState().language).toEqual({ name: "Arabic", value: "ar" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
