import { renderHook, act } from "@testing-library/react-native";

import { useCurrentLocation } from "./useCurrentLocation";

const mockGetForegroundPermissionsAsync = jest.fn();
const mockRequestForegroundPermissionsAsync = jest.fn();
const mockGetCurrentPositionAsync = jest.fn();
const mockReverseGeocodeAsync = jest.fn();

jest.mock("expo-location", () => ({
  getForegroundPermissionsAsync: () => mockGetForegroundPermissionsAsync(),
  requestForegroundPermissionsAsync: () => mockRequestForegroundPermissionsAsync(),
  getCurrentPositionAsync: (...args: any[]) => mockGetCurrentPositionAsync(...args),
  reverseGeocodeAsync: (...args: any[]) => mockReverseGeocodeAsync(...args),
}));

const mockCoords = { latitude: 24.7136, longitude: 46.6753 };
const mockPlace = { city: "Riyadh", region: "Riyadh Region", country: "Saudi Arabia" };

describe("useCurrentLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("starts with null location and null error on initial state", () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockResolvedValue({ coords: mockCoords });
    mockReverseGeocodeAsync.mockResolvedValue([mockPlace]);

    const { result } = renderHook(() => useCurrentLocation());

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets location after successful fetch with existing permission", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockResolvedValue({ coords: mockCoords });
    mockReverseGeocodeAsync.mockResolvedValue([mockPlace]);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toEqual({
      latitude: 24.7136,
      longitude: 46.6753,
      city: "Riyadh",
      region: "Riyadh Region",
      country: "Saudi Arabia",
    });
    expect(result.current.error).toBeNull();
  });

  it("requests permission when not already granted and succeeds", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "undetermined" });
    mockRequestForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockResolvedValue({ coords: mockCoords });
    mockReverseGeocodeAsync.mockResolvedValue([mockPlace]);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {});

    expect(mockRequestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(result.current.location).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets error when existing permission is denied and request is also denied", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "denied" });
    mockRequestForegroundPermissionsAsync.mockResolvedValue({ status: "denied" });

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {});

    expect(result.current.error).toBe("Location permission not granted");
    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("does not request permission when already granted", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockResolvedValue({ coords: mockCoords });
    mockReverseGeocodeAsync.mockResolvedValue([mockPlace]);

    renderHook(() => useCurrentLocation());

    await act(async () => {});

    expect(mockRequestForegroundPermissionsAsync).not.toHaveBeenCalled();
  });

  it("sets error when reverseGeocode returns no place", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockResolvedValue({ coords: mockCoords });
    mockReverseGeocodeAsync.mockResolvedValue([]);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {});

    expect(result.current.error).toBe("Unable to resolve location name");
    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("sets error when getCurrentPositionAsync throws", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockRejectedValue(new Error("GPS unavailable"));

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {});

    expect(result.current.error).toBe("GPS unavailable");
    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("handles null/undefined city and region gracefully", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockResolvedValue({ coords: mockCoords });
    mockReverseGeocodeAsync.mockResolvedValue([
      { city: null, region: null, country: "Saudi Arabia" },
    ]);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {});

    expect(result.current.location?.city).toBe("");
    expect(result.current.location?.region).toBe("");
    expect(result.current.location?.country).toBe("Saudi Arabia");
  });

  it("does not update state after unmount", async () => {
    let resolvePosition: (v: any) => void;
    const positionPromise = new Promise((res) => {
      resolvePosition = res;
    });

    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetCurrentPositionAsync.mockReturnValue(positionPromise);

    const { result, unmount } = renderHook(() => useCurrentLocation());

    unmount();

    await act(async () => {
      resolvePosition!({ coords: mockCoords });
    });

    expect(result.current.location).toBeNull();
  });
});
