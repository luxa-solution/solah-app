import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { SettingsHome } from "./SettingsHome";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 12, top: 0, left: 0, right: 0 }),
}));

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("SettingsHome integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("updates the language through the real sheet flow", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Language"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByTestId("bottomsheet-backdrop")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "English");
    act(() => {
      fireEvent.press(screen.getByText("English"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().language.value).toBe("English");
    });

    expect(screen.queryByPlaceholderText("Search")).toBeNull();
    expect(screen.getByText("English")).toBeTruthy();
  });

  it("updates the calculation method through the real sheet flow", async () => {
    const screen = render(<SettingsHome />);

    act(() => {
      fireEvent.press(screen.getByText("Calculation method"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByPlaceholderText("Search")).toBeTruthy();

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "Karachi");
    act(() => {
      fireEvent.press(screen.getByText("Karachi"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().calculationMethod.method).toBe("Karachi");
    });

    expect(screen.queryByPlaceholderText("Search")).toBeNull();
    expect(screen.getByText("Karachi")).toBeTruthy();
  });
});
