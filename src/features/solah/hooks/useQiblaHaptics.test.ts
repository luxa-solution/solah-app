import { renderHook, act } from "@testing-library/react-native";

import { useQiblaHaptics } from "./useQiblaHaptics";

const mockImpactAsync = jest.fn();

jest.mock("expo-haptics", () => ({
  impactAsync: (...args: any[]) => mockImpactAsync(...args),
  ImpactFeedbackStyle: { Heavy: "Heavy" },
}));

describe("useQiblaHaptics", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("fires haptic after dwelling within threshold", () => {
    const needleAngle = { value: 4 }; // within default threshold 5

    renderHook(() => useQiblaHaptics(needleAngle as any));

    // Default dwellTimeMs = 1000, interval = 100ms
    act(() => {
      jest.advanceTimersByTime(1100);
    });

    expect(mockImpactAsync).toHaveBeenCalledTimes(1);
  });

  it("does not fire if not enabled", () => {
    const needleAngle = { value: 0 };

    renderHook(() => useQiblaHaptics(needleAngle as any, { enabled: false }));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockImpactAsync).not.toHaveBeenCalled();
  });

  it("resets when leaving the zone and can fire again after re-entering", () => {
    const needleAngle = { value: 0 };

    renderHook(() => useQiblaHaptics(needleAngle as any, { dwellTimeMs: 300, threshold: 5 }));

    // dwell inside -> fires
    act(() => {
      jest.advanceTimersByTime(400);
    });
    expect(mockImpactAsync).toHaveBeenCalledTimes(1);

    // leave zone
    act(() => {
      needleAngle.value = 30;
      jest.advanceTimersByTime(200);
    });

    // re-enter and dwell -> fires again
    act(() => {
      needleAngle.value = 0;
      jest.advanceTimersByTime(400);
    });

    expect(mockImpactAsync).toHaveBeenCalledTimes(2);
  });
});
