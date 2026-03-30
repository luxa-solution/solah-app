import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { useSettingsStore } from "@/features-settings/store";

import {
  cleanupSettingsHomeIntegrationTimers,
  renderSettingsHome,
  resetSettingsHomeIntegrationState,
} from "./SettingsHome.integration.testUtils";

describe("SettingsHome integration iqamah flow", () => {
  beforeEach(() => {
    resetSettingsHomeIntegrationState();
  });

  afterEach(() => {
    cleanupSettingsHomeIntegrationTimers();
  });

  it("updates iqamah delay within range and rejects values above 60", async () => {
    const screen = renderSettingsHome();

    act(() => {
      fireEvent.press(screen.getByText("Iqamah settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Maghrib iqamah"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Minutes"), "60");

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().prayerSchedule.Maghrib.iqamahDelayMinutes).toBe(60);
    });

    expect(screen.getByText("Subhi iqamah")).toBeTruthy();
    expect(screen.getByText("Isha iqamah")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Iqamah settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Maghrib iqamah"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Minutes"), "65");

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("Iqamah delay must be between 5 and 60 minutes")).toBeTruthy();
    expect(useSettingsStore.getState().prayerSchedule.Maghrib.iqamahDelayMinutes).toBe(60);
  });
});
