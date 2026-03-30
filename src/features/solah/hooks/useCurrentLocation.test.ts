import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useCurrentLocation } from "./useCurrentLocation";

const mockGetForegroundPermissionsAsync = jest.fn();
const mockRequestForegroundPermissionsAsync = jest.fn();
const mockGetLastKnownPositionAsync = jest.fn();
const mockGetCurrentPositionAsync = jest.fn();
const mockReverseGeocodeAsync = jest.fn();

jest.mock("expo-location", () => ({
  getForegroundPermissionsAsync: () => mockGetForegroundPermissionsAsync(),
  requestForegroundPermissionsAsync: () => mockRequestForegroundPermissionsAsync(),
  getLastKnownPositionAsync: (...args: any[]) => mockGetLastKnownPositionAsync(...args),
  getCurrentPositionAsync: (...args: any[]) => mockGetCurrentPositionAsync(...args),
  reverseGeocodeAsync: (...args: any[]) => mockReverseGeocodeAsync(...args),
  Accuracy: {
    Balanced: "balanced",
  },
}));

const cachedCoords = { latitude: 24.7136, longitude: 46.6753 };
const freshCoords = { latitude: 6.5244, longitude: 3.3792 };
const cachedPlace = { city: "Riyadh", region: "Riyadh Region", country: "Saudi Arabia" };
const freshPlace = { city: "Lagos", region: "Lagos", country: "Nigeria" };

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

describe("useCurrentLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("starts unresolved with null location metadata instead of fake coordinates", () => {
    mockGetForegroundPermissionsAsync.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useCurrentLocation());

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.source).toBeNull();
    expect(result.current.lastUpdated).toBeNull();
  });

  it("emits a cached location first, then replaces it with a fresh GPS result", async () => {
    const currentPosition = deferred<{ coords: typeof freshCoords; timestamp: number }>();

    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetLastKnownPositionAsync.mockResolvedValue({
      coords: cachedCoords,
      timestamp: 111,
    });
    mockGetCurrentPositionAsync.mockReturnValue(currentPosition.promise);
    mockReverseGeocodeAsync
      .mockResolvedValueOnce([cachedPlace])
      .mockResolvedValueOnce([freshPlace]);

    const { result } = renderHook(() => useCurrentLocation());

    await waitFor(() => {
      expect(result.current.source).toBe("cached");
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.lastUpdated).toBe(111);
    expect(result.current.location).toEqual({
      latitude: 24.7136,
      longitude: 46.6753,
      city: "Riyadh",
      region: "Riyadh Region",
      country: "Saudi Arabia",
    });

    await act(async () => {
      currentPosition.resolve({
        coords: freshCoords,
        timestamp: 222,
      });
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.source).toBe("fresh");
    });

    expect(mockGetCurrentPositionAsync).toHaveBeenCalledWith({
      accuracy: "balanced",
      timeInterval: 10000,
    });
    expect(result.current.lastUpdated).toBe(222);
    expect(result.current.location).toEqual({
      latitude: 6.5244,
      longitude: 3.3792,
      city: "Lagos",
      region: "Lagos",
      country: "Nigeria",
    });
  });

  it("keeps the cached location when the fresh GPS result is not meaningfully different", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetLastKnownPositionAsync.mockResolvedValue({
      coords: cachedCoords,
      timestamp: 111,
    });
    mockGetCurrentPositionAsync.mockResolvedValue({
      coords: {
        latitude: 24.7139,
        longitude: 46.6755,
      },
      timestamp: 222,
    });
    mockReverseGeocodeAsync.mockResolvedValue([cachedPlace]);

    const { result } = renderHook(() => useCurrentLocation());

    await waitFor(() => {
      expect(result.current.source).toBe("cached");
    });

    expect(mockReverseGeocodeAsync).toHaveBeenCalledTimes(1);
    expect(result.current.location?.city).toBe("Riyadh");
    expect(result.current.lastUpdated).toBe(111);
  });

  it("sets an error when permission is denied", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "denied" });
    mockRequestForegroundPermissionsAsync.mockResolvedValue({ status: "denied" });

    const { result } = renderHook(() => useCurrentLocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Location permission not granted");
    expect(result.current.location).toBeNull();
    expect(result.current.source).toBeNull();
    expect(result.current.lastUpdated).toBeNull();
  });

  it("sets an error when reverse geocoding fails for the fresh location", async () => {
    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetLastKnownPositionAsync.mockResolvedValue(null);
    mockGetCurrentPositionAsync.mockResolvedValue({
      coords: freshCoords,
      timestamp: 222,
    });
    mockReverseGeocodeAsync.mockResolvedValue([]);

    const { result } = renderHook(() => useCurrentLocation());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Unable to resolve location name");
    expect(result.current.location).toBeNull();
  });

  it("falls back to the cached location when the fresh GPS lookup times out", async () => {
    jest.useFakeTimers();

    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetLastKnownPositionAsync.mockResolvedValue({
      coords: cachedCoords,
      timestamp: 111,
    });
    mockGetCurrentPositionAsync.mockReturnValue(new Promise(() => {}));
    mockReverseGeocodeAsync.mockResolvedValue([cachedPlace]);

    const { result } = renderHook(() => useCurrentLocation());

    await waitFor(() => {
      expect(result.current.source).toBe("cached");
    });

    await act(async () => {
      jest.advanceTimersByTime(16000);
      await Promise.resolve();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.source).toBe("cached");
    expect(result.current.location?.city).toBe("Riyadh");
  });

  it("does not update state after unmount", async () => {
    const currentPosition = deferred<{ coords: typeof freshCoords; timestamp: number }>();

    mockGetForegroundPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockGetLastKnownPositionAsync.mockResolvedValue(null);
    mockGetCurrentPositionAsync.mockReturnValue(currentPosition.promise);

    const { result, unmount } = renderHook(() => useCurrentLocation());

    unmount();

    await act(async () => {
      currentPosition.resolve({
        coords: freshCoords,
        timestamp: 222,
      });
      await Promise.resolve();
    });

    expect(result.current.location).toBeNull();
  });
});
