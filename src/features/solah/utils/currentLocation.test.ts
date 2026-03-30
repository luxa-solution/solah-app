import * as Location from "expo-location";

import { getDistanceMeters, getFreshPosition, resolveLocationData } from "./currentLocation";

const mockGetCurrentPositionAsync = jest.fn();
const mockReverseGeocodeAsync = jest.fn();

jest.mock("expo-location", () => ({
  getCurrentPositionAsync: (...args: any[]) => mockGetCurrentPositionAsync(...args),
  reverseGeocodeAsync: (...args: any[]) => mockReverseGeocodeAsync(...args),
  Accuracy: {
    Balanced: "balanced",
  },
}));

describe("currentLocation utils", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("returns the fresh GPS position when it resolves before timeout", async () => {
    const position = { coords: { latitude: 1, longitude: 2 } };
    mockGetCurrentPositionAsync.mockResolvedValue(position);

    await expect(getFreshPosition()).resolves.toBe(position);
    expect(mockGetCurrentPositionAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        accuracy: (Location as any).Accuracy?.Balanced,
      })
    );
  });

  it("returns null when the fresh GPS lookup times out", async () => {
    mockGetCurrentPositionAsync.mockReturnValue(new Promise(() => {}));

    const promise = getFreshPosition();
    jest.advanceTimersByTime(16000);

    await expect(promise).resolves.toBeNull();
  });

  it("resolves reverse-geocoded location data", async () => {
    mockReverseGeocodeAsync.mockResolvedValue([
      { city: "Makkah", region: "Makkah", country: "Saudi Arabia" },
    ]);

    await expect(resolveLocationData({ latitude: 21.42, longitude: 39.82 })).resolves.toEqual({
      latitude: 21.42,
      longitude: 39.82,
      city: "Makkah",
      region: "Makkah",
      country: "Saudi Arabia",
    });
  });

  it("throws when reverse geocoding returns no place", async () => {
    mockReverseGeocodeAsync.mockResolvedValue([]);

    await expect(resolveLocationData({ latitude: 21.42, longitude: 39.82 })).rejects.toThrow(
      "Unable to resolve location name"
    );
  });

  it("computes zero distance for identical points and positive distance for different points", () => {
    expect(getDistanceMeters({ latitude: 1, longitude: 1 }, { latitude: 1, longitude: 1 })).toBe(0);
    expect(
      getDistanceMeters(
        { latitude: 24.7136, longitude: 46.6753 },
        { latitude: 6.5244, longitude: 3.3792 }
      )
    ).toBeGreaterThan(0);
  });
});
