import { act, fireEvent, waitFor } from "@testing-library/react-native";

import { useSettingsStore } from "@/features-settings/store";

import {
  cleanupSettingsHomeIntegrationTimers,
  renderSettingsHome,
  resetSettingsHomeIntegrationState,
} from "./SettingsHome.integration.testUtils";

describe("SettingsHome integration adhan flow", () => {
  beforeEach(() => {
    resetSettingsHomeIntegrationState();
  });

  afterEach(() => {
    cleanupSettingsHomeIntegrationTimers();
  });

  it("updates a prayer adhan mode through the real sheet flow", async () => {
    const screen = renderSettingsHome();

    act(() => {
      fireEvent.press(screen.getByText("Adhan settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Dhuhr adhan"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("At solah time")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByLabelText("Relative after solah"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Hours"), "0");
    fireEvent.changeText(screen.getByPlaceholderText("Minutes"), "10");

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhan).toEqual({
        mode: "relative_after_solah",
        offsetMinutes: 10,
      });
    });

    expect(screen.getByText("Subhi adhan")).toBeTruthy();
    expect(screen.getByText("Isha adhan")).toBeTruthy();
  });

  it("rejects a fixed adhan time that is before the prayer time", async () => {
    useSettingsStore.setState({
      autoTimezoneEnabled: false,
      timezone: {
        name: "Riyadh",
        timezone: "Asia/Riyadh",
      },
      location: {
        name: "Riyadh",
        location: {
          latitude: 24.7136,
          longitude: 46.6753,
          city: "Riyadh",
          region: "Riyadh",
          country: "Saudi Arabia",
        },
        timezone: { name: "Riyadh", timezone: "Asia/Riyadh" },
        isDefault: false,
      },
    });

    const screen = renderSettingsHome();

    act(() => {
      fireEvent.press(screen.getByText("Adhan settings"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByText("Dhuhr adhan"));
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent.press(screen.getByLabelText("Fixed time"));
      jest.runOnlyPendingTimers();
    });

    fireEvent.changeText(screen.getByPlaceholderText("Hour"), "12");
    fireEvent.changeText(screen.getByPlaceholderText("Minute"), "01");
    fireEvent.press(screen.getByText("AM"));

    act(() => {
      fireEvent.press(screen.getByText("Save"));
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByText("Fixed adhan time must be after solah time")).toBeTruthy();
    expect(useSettingsStore.getState().prayerSchedule.Dhuhr.adhan.mode).toBe("at_solah_time");
  });
});
