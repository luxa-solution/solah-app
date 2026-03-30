import { act, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import {
  mockSyncSolahNotifications,
  resetSolahNotificationsEffectState,
  restoreSolahNotificationsEffectMocks,
} from "./SolahNotificationsEffect.testUtils";
import { SolahNotificationsEffect } from "./SolahNotificationsEffect";

describe("SolahNotificationsEffect permission fallback", () => {
  beforeEach(() => {
    resetSolahNotificationsEffectState();
  });

  afterEach(() => {
    restoreSolahNotificationsEffectMocks();
  });

  it("calls setEnabled(false) when enabled=true but permission is denied", async () => {
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: false });
    await act(async () => {
      useSettingsStore.setState({ solahTimeNotification: true });
      await Promise.resolve();
    });

    render(<SolahNotificationsEffect />);

    await waitFor(() => {
      expect(useSettingsStore.getState().solahTimeNotification).toBe(false);
    });
  });

  it("does NOT revert enabled when already false and permission is denied", async () => {
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: false });
    await act(async () => {
      useSettingsStore.setState({ solahTimeNotification: false });
      await Promise.resolve();
    });

    render(<SolahNotificationsEffect />);

    await waitFor(() => {
      expect(useSettingsStore.getState().solahTimeNotification).toBe(false);
    });
  });

  it("leaves enabled=true unchanged when permission is OK", async () => {
    mockSyncSolahNotifications.mockResolvedValue({ permissionOk: true });
    await act(async () => {
      useSettingsStore.setState({ solahTimeNotification: true });
      await Promise.resolve();
    });

    render(<SolahNotificationsEffect />);

    await waitFor(() => {
      expect(useSettingsStore.getState().solahTimeNotification).toBe(true);
    });
  });
});
