import { renderHook, act } from "@testing-library/react-native";

import { useQiblaHeading } from "./useQiblaHeading";

const mockIsAvailableAsync = jest.fn();
const mockRequestPermissionsAsync = jest.fn();
const mockSetUpdateInterval = jest.fn();
const mockAddListener = jest.fn();

jest.mock("expo-sensors", () => ({
  Magnetometer: {
    isAvailableAsync: () => mockIsAvailableAsync(),
    requestPermissionsAsync: () => mockRequestPermissionsAsync(),
    setUpdateInterval: (...args: any[]) => mockSetUpdateInterval(...args),
    addListener: (cb: any) => mockAddListener(cb),
  },
}));

// minimal reanimated mock for shared values + withTiming
jest.mock("react-native-reanimated", () => ({
  useSharedValue: (v: any) => ({ value: v }),
  withTiming: (v: any) => v,
}));

jest.mock("@/features-solah/utils", () => ({
  magnetometerToHeading: (_x: number, _y: number) => 100, // constant for predictability
  smoothAngle: (_prev: number, next: number) => next,
  calculateQiblaOffset: (bearing: number, heading: number) => bearing - heading,
}));

describe("useQiblaHeading", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets error when magnetometer not available", async () => {
    mockIsAvailableAsync.mockResolvedValue(false);

    const { result } = renderHook(() => useQiblaHeading(200));

    // allow effect async to run
    await act(async () => {});

    expect(result.current.hasMagnetometer).toBe(false);
    expect(result.current.error).toBe("Compass not available on this device");
  });

  it("updates heading and needleAngle when listener emits", async () => {
    mockIsAvailableAsync.mockResolvedValue(true);
    mockRequestPermissionsAsync.mockResolvedValue({ status: "granted" });

    let listenerCb: any;
    mockAddListener.mockImplementation((cb: any) => {
      listenerCb = cb;
      return { remove: jest.fn() };
    });

    const { result } = renderHook(() => useQiblaHeading(200));
    await act(async () => {});

    act(() => {
      listenerCb({ x: 1, y: 2 });
    });

    expect(result.current.heading.value).toBe(100);
    // offset = bearing - heading = 200 - 100 = 100
    expect(result.current.needleAngle.value).toBe(100);
  });
});
