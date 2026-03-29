import { act, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { SolahNotificationsEffect } from "./SolahNotificationsEffect";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const mockSyncSolahNotifications = jest.fn();

jest.mock("../utils", () => ({
  syncSolahNotifications: (...args: any[]) => mockSyncSolahNotifications(...args),
}));

const defaultStoreState = useSettingsStore.getState();

beforeEach(() => {
  useSettingsStore.setState(defaultStoreState, true);
  jest.clearAllMocks();
});

describe("SolahNotificationsEffect", () => {
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
      enabled: defaultStoreState.solahTimeNotification,
      sound: defaultStoreState.sound,
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
