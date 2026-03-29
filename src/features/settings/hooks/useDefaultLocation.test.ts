import { renderHook, waitFor } from "@testing-library/react-native";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";
import { resolveAutomaticTimeZone } from "@/features-settings/utils/automaticTimeZone";

import { useSyncDefaultLocation } from "./useDefaultLocation";

const mockUseCurrentLocation = jest.fn();

jest.mock("@/features-solah/hooks", () => ({
  useCurrentLocation: () => mockUseCurrentLocation(),
}));

jest.mock("@/features-settings/utils/automaticTimeZone", () => ({
  resolveAutomaticTimeZone: jest.fn(),
}));

const mockResolveAutomaticTimeZone = jest.mocked(resolveAutomaticTimeZone);

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

const gpsLocation = {
  latitude: 6.5244,
  longitude: 3.3792,
  city: "Lagos",
  region: "Lagos",
  country: "Nigeria",
};

const autoTimezone = {
  name: "(UTC+01:00) West Central Africa (Lagos)",
  timezone: "Africa/Lagos",
  isDefault: true,
};

describe("useSyncDefaultLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
    mockResolveAutomaticTimeZone.mockReturnValue(autoTimezone);
  });

  it("does nothing while loading", () => {
    mockUseCurrentLocation.mockReturnValue({
      loading: true,
      error: null,
      location: gpsLocation,
      source: null,
      lastUpdated: null,
    });

    renderHook(() => useSyncDefaultLocation());

    expect(useDefaultStore.getState().defaultLocation.location).toBe(
      initialDefaultState.defaultLocation.location
    );
    expect(useSettingsStore.getState().location.location).toBe(
      initialSettingsState.location.location
    );
  });

  it("updates both stores when the active location is automatic and auto timezone is enabled", async () => {
    useSettingsStore.setState({
      location: {
        name: "Default (Current Location)",
        location: null as any,
        timezone: autoTimezone,
        isDefault: true,
      },
      autoTimezoneEnabled: true,
    });

    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      error: null,
      location: gpsLocation,
      source: "fresh",
      lastUpdated: 123,
    });

    renderHook(() => useSyncDefaultLocation());

    await waitFor(() => {
      expect(useDefaultStore.getState().defaultLocation.location).toEqual(gpsLocation);
    });

    expect(useDefaultStore.getState().defaultTimezone).toEqual(autoTimezone);
    expect(useSettingsStore.getState().location.location).toEqual(gpsLocation);
    expect(useSettingsStore.getState().timezone).toEqual(autoTimezone);
  });

  it("does not overwrite the active settings location when the user selected a manual location", async () => {
    const manualTimezone = {
      name: "(UTC+09:00) Osaka, Sapporo, Tokyo",
      timezone: "Asia/Tokyo",
      isDefault: false,
    };
    const manualLocation = {
      name: "Tokyo, Japan",
      location: {
        latitude: 35.6762,
        longitude: 139.6503,
        city: "Tokyo",
        region: "Tokyo",
        country: "Japan",
      },
      timezone: manualTimezone,
      isDefault: false,
    };

    useSettingsStore.setState({
      location: manualLocation,
      timezone: manualTimezone,
      autoTimezoneEnabled: true,
    });

    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      error: null,
      location: gpsLocation,
      source: "fresh",
      lastUpdated: 123,
    });

    renderHook(() => useSyncDefaultLocation());

    await waitFor(() => {
      expect(useDefaultStore.getState().defaultLocation.location).toEqual(gpsLocation);
    });

    expect(useSettingsStore.getState().location).toEqual(manualLocation);
    expect(useSettingsStore.getState().timezone).toEqual(manualTimezone);
  });

  it("applies the manual location timezone when auto timezone is enabled", async () => {
    const manualLocationTimezone = {
      name: "(UTC+09:00) Osaka, Sapporo, Tokyo",
      timezone: "Asia/Tokyo",
      isDefault: false,
    };
    const staleTimezone = {
      name: "(UTC+00:00) Greenwich Mean Time",
      timezone: "Africa/Abidjan",
      isDefault: false,
    };
    const manualLocation = {
      name: "Tokyo, Japan",
      location: {
        latitude: 35.6762,
        longitude: 139.6503,
        city: "Tokyo",
        region: "Tokyo",
        country: "Japan",
      },
      timezone: manualLocationTimezone,
      isDefault: false,
    };

    useSettingsStore.setState({
      location: manualLocation,
      timezone: staleTimezone,
      autoTimezoneEnabled: true,
    });

    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      error: null,
      location: gpsLocation,
      source: "fresh",
      lastUpdated: 123,
    });

    renderHook(() => useSyncDefaultLocation());

    await waitFor(() => {
      expect(useSettingsStore.getState().timezone).toEqual(manualLocationTimezone);
    });

    expect(useSettingsStore.getState().location).toEqual(manualLocation);
  });

  it("updates the active location but preserves a manual timezone override when auto timezone is off", async () => {
    const manualTimezone = {
      name: "(UTC+00:00) Greenwich Mean Time",
      timezone: "Africa/Abidjan",
      isDefault: false,
    };

    useSettingsStore.setState({
      location: {
        name: "Default (Current Location)",
        location: null as any,
        timezone: autoTimezone,
        isDefault: true,
      },
      timezone: manualTimezone,
      autoTimezoneEnabled: false,
    });

    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      error: null,
      location: gpsLocation,
      source: "fresh",
      lastUpdated: 123,
    });

    renderHook(() => useSyncDefaultLocation());

    await waitFor(() => {
      expect(useSettingsStore.getState().location.location).toEqual(gpsLocation);
    });

    expect(useSettingsStore.getState().timezone).toEqual(manualTimezone);
    expect(useDefaultStore.getState().defaultTimezone).toEqual(autoTimezone);
  });

  it("does not hardcode Riyadh when resolving the automatic timezone", async () => {
    mockResolveAutomaticTimeZone.mockReturnValue({
      name: "(UTC+00:00) Greenwich Mean Time",
      timezone: "Africa/Abidjan",
      isDefault: true,
    });
    useSettingsStore.setState({
      location: {
        name: "Default (Current Location)",
        location: null as any,
        timezone: autoTimezone,
        isDefault: true,
      },
      autoTimezoneEnabled: true,
    });

    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      error: null,
      location: gpsLocation,
      source: "fresh",
      lastUpdated: 123,
    });

    renderHook(() => useSyncDefaultLocation());

    await waitFor(() => {
      expect(useSettingsStore.getState().timezone.timezone).toBe("Africa/Abidjan");
    });

    expect(useSettingsStore.getState().timezone.timezone).not.toBe("Asia/Riyadh");
    expect(useDefaultStore.getState().defaultTimezone.timezone).toBe("Africa/Abidjan");
  });
});
