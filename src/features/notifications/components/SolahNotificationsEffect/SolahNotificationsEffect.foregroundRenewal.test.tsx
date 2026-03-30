import { act, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import {
  mockAppStateAddEventListener,
  mockLoadLastSyncedAt,
  mockSyncSolahNotifications,
  resetSolahNotificationsEffectState,
  restoreSolahNotificationsEffectMocks,
} from "./SolahNotificationsEffect.testUtils";

function loadComponent() {
  return require("./SolahNotificationsEffect") as typeof import("./SolahNotificationsEffect");
}

describe("SolahNotificationsEffect foreground renewal", () => {
  beforeEach(() => {
    resetSolahNotificationsEffectState();
  });

  afterEach(() => {
    restoreSolahNotificationsEffectMocks();
  });

  it("re-syncs on app foreground when the last sync is older than 24 hours", async () => {
    const staleSyncTime = Date.now() - 25 * 60 * 60 * 1000;
    mockLoadLastSyncedAt.mockResolvedValue(staleSyncTime);
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    useSettingsStore.setState({ solahTimeNotification: true });
    const { SolahNotificationsEffect } = loadComponent();

    render(<SolahNotificationsEffect />);

    const listener = mockAppStateAddEventListener.mock.calls.find(
      ([eventName]) => eventName === "change"
    )?.[1];

    const callCountAfterMount = mockSyncSolahNotifications.mock.calls.length;

    await act(async () => {
      await listener?.("active");
    });

    expect(mockSyncSolahNotifications.mock.calls.length).toBeGreaterThan(callCountAfterMount);
  });

  it("does not re-sync on app foreground when the last sync was within 24 hours", async () => {
    const freshSyncTime = Date.now() - 60 * 60 * 1000;
    mockLoadLastSyncedAt.mockResolvedValue(freshSyncTime);
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    useSettingsStore.setState({ solahTimeNotification: true });
    const { SolahNotificationsEffect } = loadComponent();

    render(<SolahNotificationsEffect />);

    const listener = mockAppStateAddEventListener.mock.calls.find(
      ([eventName]) => eventName === "change"
    )?.[1];

    const callCountAfterMount = mockSyncSolahNotifications.mock.calls.length;

    await act(async () => {
      await listener?.("active");
    });

    expect(mockSyncSolahNotifications.mock.calls.length).toBe(callCountAfterMount);
  });

  it("does not re-sync on non-active app state changes", async () => {
    mockLoadLastSyncedAt.mockResolvedValue(null);
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    useSettingsStore.setState({ solahTimeNotification: true });
    const { SolahNotificationsEffect } = loadComponent();

    render(<SolahNotificationsEffect />);

    const listener = mockAppStateAddEventListener.mock.calls.find(
      ([eventName]) => eventName === "change"
    )?.[1];

    const callCountAfterMount = mockSyncSolahNotifications.mock.calls.length;

    await act(async () => {
      await listener?.("background");
    });

    expect(mockSyncSolahNotifications.mock.calls.length).toBe(callCountAfterMount);
  });

  it("does not re-sync on foreground when notifications are disabled", async () => {
    mockLoadLastSyncedAt.mockResolvedValue(null);
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    useSettingsStore.setState({ solahTimeNotification: false });
    const { SolahNotificationsEffect } = loadComponent();

    render(<SolahNotificationsEffect />);

    const listener = mockAppStateAddEventListener.mock.calls.find(
      ([eventName]) => eventName === "change"
    )?.[1];

    const callCountAfterMount = mockSyncSolahNotifications.mock.calls.length;

    await act(async () => {
      await listener?.("active");
    });

    expect(mockSyncSolahNotifications.mock.calls.length).toBe(callCountAfterMount);
  });

  it("disables notifications when a foreground renewal sync returns permission denied", async () => {
    mockLoadLastSyncedAt.mockResolvedValue(null);
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    useSettingsStore.setState({ solahTimeNotification: true });
    const { SolahNotificationsEffect } = loadComponent();

    render(<SolahNotificationsEffect />);

    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: false });
    const listener = mockAppStateAddEventListener.mock.calls.find(
      ([eventName]) => eventName === "change"
    )?.[1];

    await act(async () => {
      await listener?.("active");
    });

    expect(useSettingsStore.getState().solahTimeNotification).toBe(false);
  });
});
