import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { useSettingsStore } from "@/features-settings/store";

import {
  cleanupSettingsHomeIntegrationTimers,
  renderSettingsHome,
  resetSettingsHomeIntegrationState,
} from "./SettingsHome.integration.testUtils";

describe("SettingsHome integration notifications flow", () => {
  beforeEach(() => {
    resetSettingsHomeIntegrationState();
  });

  afterEach(() => {
    cleanupSettingsHomeIntegrationTimers();
  });

  it("opens the customize notifications sheet only after prayer time notifications are enabled", async () => {
    const screen = renderSettingsHome();

    act(() => {
      fireEvent.press(screen.getByText("Prayer time notification"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
    });

    expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhanNotificationMode).toBe("sound");
    expect(useSettingsStore.getState().prayerSchedule.Dhuhr.iqamahNotificationMode).toBe(
      "vibrate"
    );

    act(() => {
      fireEvent.press(screen.getByText("Customize notifications"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("Customize Notifications")).toBeTruthy();
    expect(screen.getByText("Solah")).toBeTruthy();
    expect(screen.getByText("Adhan")).toBeTruthy();
    expect(screen.getByText("Iqamah")).toBeTruthy();
  });

  it("cycles per-prayer notification delivery modes inside the customize notifications sheet", async () => {
    const screen = renderSettingsHome();

    act(() => {
      fireEvent.press(screen.getByText("Prayer time notification"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
    });

    act(() => {
      fireEvent.press(screen.getByText("Customize notifications"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByTestId("notification-mode-dhuhr-adhan"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByTestId("notification-mode-maghrib-iqamah"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhanNotificationMode).toBe("mute");
      expect(useSettingsStore.getState().prayerSchedule.Maghrib.iqamahNotificationMode).toBe(
        "sound"
      );
    });
  });
});
