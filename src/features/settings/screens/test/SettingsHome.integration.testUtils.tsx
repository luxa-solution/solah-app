import { act, render } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";

import { SettingsHome } from "../SettingsHome";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 12, top: 0, left: 0, right: 0 }),
}));

export const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

export function resetSettingsHomeIntegrationState() {
  jest.clearAllMocks();
  jest.useFakeTimers();
  useSettingsStore.setState(initialSettingsState, true);
  useDefaultStore.setState(initialDefaultState, true);
}

export function cleanupSettingsHomeIntegrationTimers() {
  act(() => {
    jest.runOnlyPendingTimers();
  });
  jest.useRealTimers();
}

export function renderSettingsHome() {
  return render(<SettingsHome />);
}
