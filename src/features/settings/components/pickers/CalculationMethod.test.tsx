import { render, fireEvent } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { CalculationMethod } from "./CalculationMethod";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-settings/constants", () => ({
  calMethods: [
    { name: "Use Default", method: "default", isDefault: true },
    { name: "Muslim World League", method: "MWL" },
    { name: "Umm Al-Qura", method: "UQ" },
  ],
}));

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("CalculationMethod", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
    useSettingsStore.setState({
      calculationMethod: { name: "Muslim World League", method: "MuslimWorldLeague" },
    });
    useDefaultStore.setState({
      defaultCalculationMethod: { name: "Umm Al-Qura", method: "UmmAlQura" },
    });
  });

  it("filters methods by query (name or key)", () => {
    const { getByPlaceholderText, queryByText, getByText } = render(<CalculationMethod />);

    expect(getByText("Muslim World League")).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText("Search"), "uq");

    expect(getByText("Umm Al-Qura")).toBeTruthy();
    expect(queryByText("Muslim World League")).toBeNull();
  });

  it("pressing default sets defaultCalculationMethod and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<CalculationMethod onClose={onClose} />);

    fireEvent.press(getByText("Use Default"));

    expect(useSettingsStore.getState().calculationMethod).toEqual({
      name: "Umm Al-Qura",
      method: "UmmAlQura",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("pressing a method sets it and closes", () => {
    const onClose = jest.fn();
    const { getByText } = render(<CalculationMethod onClose={onClose} />);

    fireEvent.press(getByText("Umm Al-Qura"));

    expect(useSettingsStore.getState().calculationMethod).toEqual({
      name: "Umm Al-Qura",
      method: "UmmAlQura",
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
