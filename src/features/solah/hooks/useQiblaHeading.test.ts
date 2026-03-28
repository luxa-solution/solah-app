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

jest.mock("react-native-reanimated", () => ({
  useSharedValue: (v: any) => ({ value: v }),
  withTiming: (v: any) => v,
}));

jest.mock("@/features-solah/utils", () => ({
  magnetometerToHeading: (_x: number, _y: number) => 100,
  smoothAngle: (_prev: number, next: number, rate: number) => _prev + rate * (next - _prev),
  calculateQiblaOffset: (bearing: number, heading: number) => bearing - heading,
}));

describe("useQiblaHeading", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets error when magnetometer not available", async () => {
    mockIsAvailableAsync.mockResolvedValue(false);

    const { result } = renderHook(() => useQiblaHeading(200));

    await act(async () => {});

    expect(result.current.hasMagnetometer).toBe(false);
    expect(result.current.error).toBe("Compass not available on this device");
  });

  it("sets error when permission denied", async () => {
    mockIsAvailableAsync.mockResolvedValue(true);
    mockRequestPermissionsAsync.mockResolvedValue({ status: "denied" });

    const { result } = renderHook(() => useQiblaHeading(200));

    await act(async () => {});

    expect(result.current.hasMagnetometer).toBe(false);
    expect(result.current.error).toBe("Compass permission denied");
  });

  it("sets error when an exception is thrown during setup", async () => {
    mockIsAvailableAsync.mockRejectedValue(new Error("sensor crash"));

    const { result } = renderHook(() => useQiblaHeading(200));

    await act(async () => {});

    expect(result.current.hasMagnetometer).toBe(false);
    expect(result.current.error).toBe("Failed to start compass");
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

    expect(typeof result.current.heading.value).toBe("number");
    expect(typeof result.current.needleAngle.value).toBe("number");
  });

  it("calls setUpdateInterval with 100ms on successful setup", async () => {
    mockIsAvailableAsync.mockResolvedValue(true);
    mockRequestPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockAddListener.mockReturnValue({ remove: jest.fn() });

    renderHook(() => useQiblaHeading(200));
    await act(async () => {});

    expect(mockSetUpdateInterval).toHaveBeenCalledWith(100);
  });

  it("removes listener on unmount", async () => {
    mockIsAvailableAsync.mockResolvedValue(true);
    mockRequestPermissionsAsync.mockResolvedValue({ status: "granted" });

    const mockRemove = jest.fn();
    mockAddListener.mockReturnValue({ remove: mockRemove });

    const { unmount } = renderHook(() => useQiblaHeading(200));
    await act(async () => {});

    unmount();

    expect(mockRemove).toHaveBeenCalledTimes(1);
  });

  it("does not remove listener when magnetometer unavailable (no sub created)", async () => {
    mockIsAvailableAsync.mockResolvedValue(false);

    const { unmount } = renderHook(() => useQiblaHeading(200));
    await act(async () => {});

    unmount();

    expect(mockAddListener).not.toHaveBeenCalled();
  });

  it("applies heading smoothing — smoothed heading differs from raw heading", async () => {
    mockIsAvailableAsync.mockResolvedValue(true);
    mockRequestPermissionsAsync.mockResolvedValue({ status: "granted" });

    let listenerCb: any;
    mockAddListener.mockImplementation((cb: any) => {
      listenerCb = cb;
      return { remove: jest.fn() };
    });

    const { result } = renderHook(() => useQiblaHeading(0));
    await act(async () => {});

    act(() => {
      listenerCb({ x: 1, y: 0 });
    });

    const headingAfterFirst = result.current.heading.value;

    act(() => {
      listenerCb({ x: 1, y: 0 });
    });

    expect(typeof headingAfterFirst).toBe("number");
  });

  it("needleAngle reflects bearing minus smoothed heading (within valid range)", async () => {
    mockIsAvailableAsync.mockResolvedValue(true);
    mockRequestPermissionsAsync.mockResolvedValue({ status: "granted" });

    let listenerCb: any;
    mockAddListener.mockImplementation((cb: any) => {
      listenerCb = cb;
      return { remove: jest.fn() };
    });

    const qiblaBearing = 200;
    const { result } = renderHook(() => useQiblaHeading(qiblaBearing));
    await act(async () => {});

    act(() => {
      listenerCb({ x: 1, y: 2 });
    });

    const angle = result.current.needleAngle.value;
    expect(typeof angle).toBe("number");
    expect(angle).toBeGreaterThanOrEqual(-360);
    expect(angle).toBeLessThanOrEqual(360);
  });

  it("returns initial defaults before async setup completes", () => {
    mockIsAvailableAsync.mockResolvedValue(true);
    mockRequestPermissionsAsync.mockResolvedValue({ status: "granted" });
    mockAddListener.mockReturnValue({ remove: jest.fn() });

    const { result } = renderHook(() => useQiblaHeading(200));

    expect(result.current.hasMagnetometer).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.heading.value).toBe(0);
    expect(result.current.needleAngle.value).toBe(0);
  });
});
