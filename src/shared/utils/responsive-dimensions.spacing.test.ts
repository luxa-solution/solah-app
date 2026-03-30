import { act, renderHook } from "@testing-library/react-native";

import responsiveInstance, {
  configureResponsive,
  hp,
  responsiveSize,
  spacing,
  useResponsive,
  wp,
} from "./responsive-dimensions";
import { resetResponsiveTestState, restoreResponsiveTestState } from "./responsive-dimensions.testUtils";

describe("responsive-dimensions spacing and instance helpers", () => {
  beforeEach(() => {
    resetResponsiveTestState();
  });

  afterEach(() => {
    restoreResponsiveTestState();
  });

  it("spacing equals wp(value)", () => {
    expect(spacing(16)).toBeCloseTo(wp(16), 5);
  });

  it("interpolates between ranges", () => {
    expect(responsiveInstance.interpolate(5, [0, 10], [0, 100])).toBe(50);
  });

  it("subscribes and unsubscribes listeners", () => {
    const callback = jest.fn();
    const unsubscribe = responsiveInstance.subscribe(callback);

    configureResponsive({ designWidth: 414 });
    expect(callback).toHaveBeenCalledTimes(1);

    unsubscribe();
    configureResponsive({ designWidth: 375 });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("configureResponsive does not throw", () => {
    expect(() => configureResponsive({ designWidth: 414 })).not.toThrow();
  });

  it("changing designWidth changes wp output", () => {
    const before = wp(100);
    configureResponsive({ designWidth: 414 });
    const after = wp(100);
    expect(after).not.toEqual(before);
  });

  it("useResponsive exposes the responsive API", () => {
    const { result } = renderHook(() => useResponsive());

    expect(typeof result.current.scale(16)).toBe("number");
    expect(typeof result.current.verticalScale(16)).toBe("number");
    expect(typeof result.current.moderateScale(16)).toBe("number");
    expect(typeof result.current.moderateVerticalScale(16)).toBe("number");
    expect(typeof result.current.fontSize(16)).toBe("number");
    expect(typeof result.current.spacing(16)).toBe("number");
    expect(typeof result.current.hper(50)).toBe("number");
    expect(typeof result.current.wper(50)).toBe("number");
    expect(result.current.ds(16, "height")).toBeCloseTo(hp(16), 5);
    expect(result.current.responsiveSize(300, 400)).toEqual(responsiveSize(300, 400));
    expect(result.current.responsiveValue({ xs: 1, md: 2 })).toBeDefined();
    expect(result.current.deviceInfo).toHaveProperty("type");
    expect(typeof result.current.breakpoint).toBe("string");
    expect(typeof result.current.isSmallScreen).toBe("boolean");
    expect(typeof result.current.isMediumScreen).toBe("boolean");
    expect(typeof result.current.isLargeScreen).toBe("boolean");
    expect(typeof result.current.isXLScreen).toBe("boolean");
    expect(result.current.screenWidth).toBeGreaterThan(0);
    expect(result.current.screenHeight).toBeGreaterThan(0);
  });

  it("useResponsive rerenders when configuration changes", () => {
    let renderCount = 0;
    renderHook(() => {
      renderCount += 1;
      return useResponsive();
    });

    act(() => {
      configureResponsive({ designWidth: 414 });
    });

    expect(renderCount).toBeGreaterThan(1);
  });
});
