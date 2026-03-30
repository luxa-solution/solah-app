import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { useSettingsStore } from "@/features-settings/store";

import {
  cleanupSettingsHomeIntegrationTimers,
  renderSettingsHome,
  resetSettingsHomeIntegrationState,
} from "./SettingsHome.integration.testUtils";

describe("SettingsHome integration general flow", () => {
  beforeEach(() => {
    resetSettingsHomeIntegrationState();
  });

  afterEach(() => {
    cleanupSettingsHomeIntegrationTimers();
  });

  it("updates the language through the real sheet flow", async () => {
    const screen = renderSettingsHome();

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
    const screen = renderSettingsHome();

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
