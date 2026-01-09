import { renderHook } from "@testing-library/react-native";

import { useSyncDefaultLocation } from "./useDefaultLocation";

const mockSetDefaultLocation = jest.fn();

jest.mock("@/features-settings/store", () => ({
  useDefaultStore: () => ({
    setDefaultLocation: mockSetDefaultLocation,
  }),
}));

const mockUseCurrentLocation = jest.fn();

jest.mock("@/features-solah/hooks", () => ({
  useCurrentLocation: () => mockUseCurrentLocation(),
}));

describe("useSyncDefaultLocation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("does nothing while loading", () => {
    mockUseCurrentLocation.mockReturnValue({
      loading: true,
      error: null,
      location: { latitude: 1, longitude: 2, city: "X", region: "Y", country: "Z" },
    });

    renderHook(() => useSyncDefaultLocation());

    expect(mockSetDefaultLocation).not.toHaveBeenCalled();
  });

  it("does nothing on error", () => {
    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      error: new Error("boom"),
      location: { latitude: 1, longitude: 2, city: "X", region: "Y", country: "Z" },
    });

    renderHook(() => useSyncDefaultLocation());

    expect(mockSetDefaultLocation).not.toHaveBeenCalled();
  });

  it("syncs latest location when ready", () => {
    const location = {
      latitude: 24.7136,
      longitude: 46.6753,
      city: "Riyadh",
      region: "Riyadh",
      country: "Saudi Arabia",
    };

    mockUseCurrentLocation.mockReturnValue({
      loading: false,
      error: null,
      location,
    });

    renderHook(() => useSyncDefaultLocation());

    expect(mockSetDefaultLocation).toHaveBeenCalledTimes(1);
    expect(mockSetDefaultLocation).toHaveBeenCalledWith({
      name: "Default (Current Location)",
      location,
      timezone: {
        name: "Default (System Timezone)",
        timezone: "Asia/Riyadh",
        isDefault: true,
      },
      isDefault: true,
    });
  });
});
