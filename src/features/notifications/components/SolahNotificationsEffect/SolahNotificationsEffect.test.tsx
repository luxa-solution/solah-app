import { act, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { SolahNotificationsEffect } from "./SolahNotificationsEffect";
import {
  mockAppStateAddEventListener,
  mockRegisterNotificationBackgroundTaskAsync,
  mockSyncSolahNotifications,
  resetSolahNotificationsEffectState,
  restoreSolahNotificationsEffectMocks,
} from "./SolahNotificationsEffect.testUtils";

describe("SolahNotificationsEffect mount flow", () => {
  beforeEach(() => {
    resetSolahNotificationsEffectState();
  });

  afterEach(() => {
    restoreSolahNotificationsEffectMocks();
  });

  it("subscribes to app foreground changes through the public AppState API", () => {
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });

    render(<SolahNotificationsEffect />);

    expect(mockAppStateAddEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });

  it("registers the notification background task on mount", async () => {
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });

    render(<SolahNotificationsEffect />);

    await waitFor(() => {
      expect(mockRegisterNotificationBackgroundTaskAsync).toHaveBeenCalledTimes(1);
    });
  });

  it("returns null (renders nothing)", () => {
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    const { toJSON } = render(<SolahNotificationsEffect />);
    expect(toJSON()).toBeNull();
  });

  it("calls syncSolahNotifications on mount with store values", async () => {
    let resolveFn!: () => void;
    mockSyncSolahNotifications.mockImplementation(
      () =>
        new Promise<{ permissionOk: boolean }>((res) => {
          resolveFn = () => res({ permissionOk: true });
        })
    );

    render(<SolahNotificationsEffect />);

    expect(mockSyncSolahNotifications).toHaveBeenCalledTimes(1);
    const callArg = mockSyncSolahNotifications.mock.calls[0][0];
    expect(callArg).toMatchObject({
      enabled: useSettingsStore.getState().solahTimeNotification,
      sound: useSettingsStore.getState().sound,
      prayerSchedule: useSettingsStore.getState().prayerSchedule,
    });

    await act(async () => {
      resolveFn();
      await Promise.resolve();
    });
  });

  it("re-calls syncSolahNotifications when solahTimeNotification changes", async () => {
    let resolveFn!: (v: { permissionOk: boolean }) => void;
    mockSyncSolahNotifications.mockImplementation(
      () =>
        new Promise<{ permissionOk: boolean }>((res) => {
          resolveFn = res;
        })
    );

    render(<SolahNotificationsEffect />);
    const callCountAfterMount = mockSyncSolahNotifications.mock.calls.length;

    await act(async () => {
      resolveFn({ permissionOk: true });
      await Promise.resolve();
    });

    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });

    await act(async () => {
      useSettingsStore.setState({ solahTimeNotification: true });
      await Promise.resolve();
    });

    expect(mockSyncSolahNotifications.mock.calls.length).toBeGreaterThan(callCountAfterMount);
  });

  it("re-calls syncSolahNotifications when prayerSchedule changes", async () => {
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });

    render(<SolahNotificationsEffect />);
    const callCountAfterMount = mockSyncSolahNotifications.mock.calls.length;

    await act(async () => {
      useSettingsStore.getState().setPrayerSchedule("Dhuhr", {
        adhan: { mode: "relative_after_solah", offsetMinutes: 10 },
        iqamahDelayMinutes: 20,
        adhanNotificationMode: "sound",
        iqamahNotificationMode: "mute",
      });
      await Promise.resolve();
    });

    expect(mockSyncSolahNotifications.mock.calls.length).toBeGreaterThan(callCountAfterMount);
    expect(mockSyncSolahNotifications.mock.calls.at(-1)?.[0].prayerSchedule.Dhuhr).toEqual({
      adhan: { mode: "relative_after_solah", offsetMinutes: 10 },
      iqamahDelayMinutes: 20,
      adhanNotificationMode: "sound",
      iqamahNotificationMode: "mute",
    });
  });

  it("does not update state after unmount when the sync finishes later", async () => {
    let resolveFn!: (value: { permissionOk: boolean }) => void;
    mockSyncSolahNotifications.mockImplementation(
      () =>
        new Promise<{ permissionOk: boolean }>((resolve) => {
          resolveFn = resolve;
        })
    );

    await act(async () => {
      useSettingsStore.setState({ solahTimeNotification: true });
      await Promise.resolve();
    });

    const { unmount } = render(<SolahNotificationsEffect />);
    unmount();

    await act(async () => {
      resolveFn({ permissionOk: false });
      await Promise.resolve();
    });

    expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
  });
});
