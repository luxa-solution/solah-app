import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { useSettingsStore } from "@/features-settings/store";

import {
  cleanupSettingsHomeIntegrationTimers,
  renderSettingsHome,
  resetSettingsHomeIntegrationState,
} from "./SettingsHome.integration.testUtils";

describe("SettingsHome integration timezone flow", () => {
  beforeEach(() => {
    resetSettingsHomeIntegrationState();
  });

  afterEach(() => {
    cleanupSettingsHomeIntegrationTimers();
  });

  it("shows the manual time zone item and persists override when auto time zone is turned off", async () => {
    const screen = renderSettingsHome();

    act(() => {
      fireEvent.press(screen.getByText("Automatically get time zone"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().autoTimezoneEnabled).toBe(false);
    });

    expect(screen.getByText("Manual time zone")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Manual time zone"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "Paris");
    act(() => {
      fireEvent.press(screen.getByText("(UTC+01:00) Central European Time (Paris)"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().timezone.timezone).toBe("Europe/Paris");
    });

    expect(screen.queryByText("Time zone")).toBeNull();
  });
});
