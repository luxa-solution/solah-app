import { renderHook } from "@testing-library/react-native";

import { useQiblaParams } from "./useQiblaParams";

const mockUseCurrentLocation = jest.fn();

jest.mock("./useCurrentLocation", () => ({
  useCurrentLocation: () => mockUseCurrentLocation(),
}));

describe("useQiblaParams", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns null params when no location", () => {
    mockUseCurrentLocation.mockReturnValue({ loading: false, location: null });

    const { result } = renderHook(() => useQiblaParams());

    expect(result.current.loading).toBe(false);
    expect(result.current.location).toBeNull();
    expect(result.current.qiblaBearing).toBeUndefined();
    expect(result.current.distanceKm).toBeUndefined();
  });

  it("computes bearing + distance when location exists", () => {
    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      location: {
        latitude: 24.7136,
        longitude: 46.6753,
        city: "Riyadh",
        region: "Riyadh",
        country: "Saudi Arabia",
      },
    });

    const { result } = renderHook(() => useQiblaParams());

    expect(typeof result.current.qiblaBearing).toBe("number");
    expect(typeof result.current.distanceKm).toBe("number");

    // sanity bounds
    expect(result.current.qiblaBearing).toBeGreaterThanOrEqual(0);
    expect(result.current.qiblaBearing).toBeLessThan(360);
    expect(result.current.distanceKm).toBeGreaterThan(0);
  });
});
