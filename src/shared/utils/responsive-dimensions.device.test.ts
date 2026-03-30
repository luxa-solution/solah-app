import { act, renderHook } from "@testing-library/react-native";
import { Dimensions, PixelRatio, Platform } from "react-native";

import responsiveInstance, {
  cleanupResponsive,
  getBreakpoint,
  getDeviceInfo,
  isLargeScreen,
  isMediumScreen,
  isSmallScreen,
  isXLScreen,
  screenHeight,
  screenWidth,
  useBreakpoint,
  useDeviceInfo,
} from "./responsive-dimensions";
import { resetResponsiveTestState, restoreResponsiveTestState, simDimensions } from "./responsive-dimensions.testUtils";

describe("responsive-dimensions device helpers", () => {
  beforeEach(() => {
    resetResponsiveTestState();
  });

  afterEach(() => {
    restoreResponsiveTestState();
  });

  it("returns xs for width < 576", () => {
    simDimensions(320, 568);
    expect(getBreakpoint()).toBe("xs");
  });

  it("returns sm for 576 <= width < 768", () => {
    simDimensions(600, 900);
    expect(getBreakpoint()).toBe("sm");
  });

  it("returns md for 768 <= width < 992", () => {
    simDimensions(800, 1200);
    expect(getBreakpoint()).toBe("md");
  });

  it("returns lg for 992 <= width < 1200", () => {
    simDimensions(1024, 1366);
    expect(getBreakpoint()).toBe("lg");
  });

  it("returns xl for width >= 1200", () => {
    simDimensions(1280, 800);
    expect(getBreakpoint()).toBe("xl");
  });

  it("reports small screens correctly", () => {
    simDimensions(320, 568);
    expect(isSmallScreen()).toBe(true);
    simDimensions(600, 900);
    expect(isSmallScreen()).toBe(false);
  });

  it("reports medium screens correctly", () => {
    simDimensions(600, 900);
    expect(isMediumScreen()).toBe(true);
    simDimensions(800, 1200);
    expect(isMediumScreen()).toBe(true);
    simDimensions(320, 568);
    expect(isMediumScreen()).toBe(false);
  });

  it("reports large and xl screens correctly", () => {
    simDimensions(1024, 1366);
    expect(isLargeScreen()).toBe(true);
    expect(isXLScreen()).toBe(false);

    simDimensions(1280, 800);
    expect(isLargeScreen()).toBe(true);
    expect(isXLScreen()).toBe(true);

    simDimensions(320, 568);
    expect(isLargeScreen()).toBe(false);
  });

  it("returns device info with the expected shape", () => {
    const info = getDeviceInfo();
    expect(info).toHaveProperty("type");
    expect(info).toHaveProperty("isTablet");
    expect(info).toHaveProperty("isLandscape");
    expect(info).toHaveProperty("aspectRatio");
    expect(info).toHaveProperty("pixelDensity");
    expect(info).toHaveProperty("isHighDensity");
    expect(info).toHaveProperty("breakpoint");
  });

  it("computes landscape and tablet state correctly", () => {
    simDimensions(812, 375);
    expect(getDeviceInfo().isLandscape).toBe(true);
    simDimensions(375, 812);
    expect(getDeviceInfo().isLandscape).toBe(false);
    simDimensions(768, 1024);
    expect(getDeviceInfo().isTablet).toBe(true);
    simDimensions(375, 812);
    expect(getDeviceInfo().isTablet).toBe(false);
  });

  it("computes high-density state correctly", () => {
    jest.spyOn(PixelRatio, "get").mockReturnValue(3);
    expect(getDeviceInfo().isHighDensity).toBe(true);
    jest.spyOn(PixelRatio, "get").mockReturnValue(2);
    expect(getDeviceInfo().isHighDensity).toBe(false);
  });

  it("detects phone, tablet, and tv device types", () => {
    simDimensions(375, 812);
    expect(getDeviceInfo().type).toBe("phone");
    simDimensions(1000, 1400);
    expect(getDeviceInfo().type).toBe("tablet");

    const originalIsTV = Platform.isTV;
    Object.defineProperty(Platform, "isTV", { value: true, configurable: true });
    expect(getDeviceInfo().type).toBe("tv");
    Object.defineProperty(Platform, "isTV", { value: originalIsTV, configurable: true });
  });

  it("computes aspect ratio from the long and short dimensions", () => {
    simDimensions(375, 812);
    expect(getDeviceInfo().aspectRatio).toBeCloseTo(812 / 375, 2);
  });

  it("returns current screen dimensions and updates after dimension changes", () => {
    expect(screenWidth()).toBeGreaterThan(0);
    expect(screenHeight()).toBeGreaterThan(0);

    simDimensions(414, 896);
    expect(screenWidth()).toBe(414);
    expect(screenHeight()).toBe(896);

    expect((responsiveInstance as any).getScreenDimensions()).toMatchObject({
      width: 414,
      height: 896,
    });
  });

  it("cleans up the dimension subscription when present", () => {
    const remove = jest.fn();
    (responsiveInstance as any).dimensionSubscription = { remove };

    cleanupResponsive();

    expect(remove).toHaveBeenCalledTimes(1);
  });

  it("registers a dimension listener and reacts to emitted changes", () => {
    const callback = jest.fn();
    let capturedHandler: ((payload: any) => void) | undefined;

    const addEventListenerSpy = jest.spyOn(Dimensions, "addEventListener").mockImplementation(((
      _event: string,
      handler: any
    ) => {
      capturedHandler = handler;
      return { remove: jest.fn() } as any;
    }) as any);

    const unsubscribe = responsiveInstance.subscribe(callback);

    (responsiveInstance as any).setupDimensionListener();
    capturedHandler?.({
      window: { width: 414, height: 896, scale: 2, fontScale: 1 },
    });

    expect(screenWidth()).toBe(414);
    expect(screenHeight()).toBe(896);
    expect(callback).toHaveBeenCalled();

    unsubscribe();
    addEventListenerSpy.mockRestore();
  });

  it("useBreakpoint reacts to dimension changes", () => {
    simDimensions(375, 812);
    const { result } = renderHook(() => useBreakpoint());

    expect(result.current).toBe("xs");

    act(() => {
      (responsiveInstance as any).screenDimensions = {
        width: 1024,
        height: 1366,
        scale: 2,
        fontScale: 1,
      };
      (responsiveInstance as any).notifySubscribers();
    });

    expect(result.current).toBe("lg");
  });

  it("useDeviceInfo reacts to dimension changes", () => {
    simDimensions(375, 812);
    const { result } = renderHook(() => useDeviceInfo());

    expect(result.current.type).toBe("phone");

    act(() => {
      (responsiveInstance as any).screenDimensions = {
        width: 1000,
        height: 1400,
        scale: 2,
        fontScale: 1,
      };
      (responsiveInstance as any).notifySubscribers();
    });

    expect(result.current.type).toBe("tablet");
    expect(result.current.isTablet).toBe(true);
  });
});
