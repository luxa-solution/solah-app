import { act, renderHook } from "@testing-library/react-native";

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
  });

  it("starts with null location and null error on initial state", () => {
    mockGetForegroundPermissionsAsync.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useCurrentLocation());

    expect(result.current.location).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets location after successful fetch with existing permission", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();
    const geocode = deferred<Array<typeof mockPlace>>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);
    mockReverseGeocodeAsync.mockReturnValue(geocode.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
      position.resolve({ coords: mockCoords });
      await Promise.resolve();
      geocode.resolve([mockPlace]);
      await Promise.resolve();
    });

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
    const permissions = deferred<{ status: string }>();
    const requestPermission = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();
    const geocode = deferred<Array<typeof mockPlace>>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockRequestForegroundPermissionsAsync.mockReturnValue(requestPermission.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);
    mockReverseGeocodeAsync.mockReturnValue(geocode.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "undetermined" });
      await Promise.resolve();
      requestPermission.resolve({ status: "granted" });
      await Promise.resolve();
      position.resolve({ coords: mockCoords });
      await Promise.resolve();
      geocode.resolve([mockPlace]);
      await Promise.resolve();
    });

    expect(mockRequestForegroundPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(result.current.location).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("sets error when existing permission is denied and request is also denied", async () => {
    const permissions = deferred<{ status: string }>();
    const requestPermission = deferred<{ status: string }>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockRequestForegroundPermissionsAsync.mockReturnValue(requestPermission.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "denied" });
      await Promise.resolve();
      requestPermission.resolve({ status: "denied" });
      await Promise.resolve();
    });

    expect(result.current.error).toBe("Location permission not granted");
    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("does not request permission when already granted", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();
    const geocode = deferred<Array<typeof mockPlace>>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);
    mockReverseGeocodeAsync.mockReturnValue(geocode.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
      position.resolve({ coords: mockCoords });
      await Promise.resolve();
      geocode.resolve([mockPlace]);
      await Promise.resolve();
    });

    expect(mockRequestForegroundPermissionsAsync).not.toHaveBeenCalled();
    expect(result.current.location).not.toBeNull();
  });

  it("sets error when reverseGeocode returns no place", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();
    const geocode = deferred<Array<typeof mockPlace>>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);
    mockReverseGeocodeAsync.mockReturnValue(geocode.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
      position.resolve({ coords: mockCoords });
      await Promise.resolve();
      geocode.resolve([]);
      await Promise.resolve();
    });

    expect(result.current.error).toBe("Unable to resolve location name");
    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("sets error when getCurrentPositionAsync throws", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
      position.reject(new Error("GPS unavailable"));
      await Promise.resolve();
    });

    expect(result.current.error).toBe("GPS unavailable");
    expect(result.current.location).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("handles null/undefined city and region gracefully", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();
    const geocode = deferred<Array<{ city: null; region: null; country: string }>>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);
    mockReverseGeocodeAsync.mockReturnValue(geocode.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
      position.resolve({ coords: mockCoords });
      await Promise.resolve();
      geocode.resolve([{ city: null, region: null, country: "Saudi Arabia" }]);
      await Promise.resolve();
    });

    expect(result.current.location?.city).toBe("");
    expect(result.current.location?.region).toBe("");
    expect(result.current.location?.country).toBe("Saudi Arabia");
  });

  it("falls back to empty strings for all nullable place fields", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();
    const geocode = deferred<Array<{ city: null; region: null; country: null }>>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);
    mockReverseGeocodeAsync.mockReturnValue(geocode.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
      position.resolve({ coords: mockCoords });
      await Promise.resolve();
      geocode.resolve([{ city: null, region: null, country: null }]);
      await Promise.resolve();
    });

    expect(result.current.location).toEqual({
      latitude: 24.7136,
      longitude: 46.6753,
      city: "",
      region: "",
      country: "",
    });
  });

  it("uses the generic error when a non-Error is thrown", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);

    const { result } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
      position.reject("unexpected");
      await Promise.resolve();
    });

    expect(result.current.error).toBe("Unable to get current location");
    expect(result.current.location).toBeNull();
  });

  it("does not update state after unmount", async () => {
    const permissions = deferred<{ status: string }>();
    const position = deferred<{ coords: typeof mockCoords }>();

    mockGetForegroundPermissionsAsync.mockReturnValue(permissions.promise);
    mockGetCurrentPositionAsync.mockReturnValue(position.promise);

    const { result, unmount } = renderHook(() => useCurrentLocation());

    await act(async () => {
      permissions.resolve({ status: "granted" });
      await Promise.resolve();
    });

    unmount();

    await act(async () => {
      position.resolve({ coords: mockCoords });
      await Promise.resolve();
    });

    expect(result.current.location).toBeNull();
  });
});
