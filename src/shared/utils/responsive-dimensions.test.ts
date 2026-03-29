import { act, renderHook } from "@testing-library/react-native";
import { Dimensions, PixelRatio, Platform } from "react-native";

import {
  default as responsiveInstance,
  hper,
  wper,
  wp,
  hp,
  ms,
  mvs,
  fontSize,
  spacing,
  ds,
  responsiveSize,
  responsiveValue,
  getBreakpoint,
  getDeviceInfo,
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  isXLScreen,
  screenWidth,
  screenHeight,
  configureResponsive,
  cleanupResponsive,
  useBreakpoint,
  useDeviceInfo,
  useResponsive,
} from "./responsive-dimensions";

const sim = (width: number, height: number) => {
  (Dimensions as any).set({
    window: { width, height, scale: 2, fontScale: 1 },
    screen: { width, height, scale: 2, fontScale: 1 },
  });
};

beforeEach(() => {
  jest.spyOn(PixelRatio, "roundToNearestPixel").mockImplementation((v) => v);
  jest.spyOn(PixelRatio, "get").mockReturnValue(2);
  jest.spyOn(PixelRatio, "getFontScale").mockReturnValue(1);
  sim(375, 812);
  (responsiveInstance as any).screenDimensions = {
    width: 375,
    height: 812,
    scale: 2,
    fontScale: 1,
  };
  configureResponsive({
    designWidth: 375,
    designHeight: 812,
    moderateFactor: 0.45,
    maxFontScale: 1.25,
    minFontScale: 0.85,
    androidFontAdjustment: 1,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("responsive-dimensions", () => {
  describe("hper", () => {
    it("returns positive number for 50%", () => {
      expect(hper(50)).toBeGreaterThan(0);
    });

    it("returns 0 for 0%", () => {
      expect(hper(0)).toBe(0);
    });

    it("throws for NaN input", () => {
      expect(() => hper(NaN)).toThrow("hper: Expected a valid number");
    });

    it("100% returns double of 50%", () => {
      expect(hper(100)).toBeCloseTo(hper(50) * 2, 1);
    });
  });

  describe("wper", () => {
    it("returns positive number for 50%", () => {
      expect(wper(50)).toBeGreaterThan(0);
    });

    it("returns 0 for 0%", () => {
      expect(wper(0)).toBe(0);
    });

    it("throws for NaN input", () => {
      expect(() => wper(NaN)).toThrow("wper: Expected a valid number");
    });

    it("100% returns double of 50%", () => {
      expect(wper(100)).toBeCloseTo(wper(50) * 2, 1);
    });
  });

  describe("wp (scale)", () => {
    it("returns a positive number", () => {
      expect(wp(100)).toBeGreaterThan(0);
    });

    it("throws for NaN input", () => {
      expect(() => wp(NaN)).toThrow("scale: Expected a valid number");
    });

    it("returns 0 for 0", () => {
      expect(wp(0)).toBe(0);
    });

    it("wp(200) === wp(100) * 2", () => {
      expect(wp(200)).toBeCloseTo(wp(100) * 2, 5);
    });

    it("uses short dimension of screen for scaling", () => {
      sim(375, 812);
      const result = wp(100);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe("number");
    });
  });

  describe("hp (verticalScale)", () => {
    it("returns a positive number", () => {
      expect(hp(100)).toBeGreaterThan(0);
    });

    it("throws for NaN input", () => {
      expect(() => hp(NaN)).toThrow("verticalScale: Expected a valid number");
    });

    it("returns 0 for 0", () => {
      expect(hp(0)).toBe(0);
    });

    it("uses long dimension of screen for scaling", () => {
      sim(375, 812);
      const result = hp(100);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe("number");
    });

    it("uses the landscape long dimension branch", () => {
      sim(812, 375);
      expect(hp(100)).toBeGreaterThan(0);
    });
  });

  describe("ms (moderateScale)", () => {
    it("returns a positive number", () => {
      expect(ms(16)).toBeGreaterThan(0);
    });

    it("throws for NaN input", () => {
      expect(() => ms(NaN)).toThrow("moderateScale: Expected a valid number");
    });

    it("factor 0 returns original size", () => {
      expect(ms(16, 0)).toBe(16);
    });

    it("factor 1 equals wp(size)", () => {
      expect(ms(16, 1)).toBeCloseTo(wp(16), 5);
    });
  });

  describe("mvs (moderateVerticalScale)", () => {
    it("returns a positive number", () => {
      expect(mvs(16)).toBeGreaterThan(0);
    });

    it("throws for NaN input", () => {
      expect(() => mvs(NaN)).toThrow("moderateVerticalScale: Expected a valid number");
    });

    it("factor 0 returns original size", () => {
      expect(mvs(16, 0)).toBe(16);
    });

    it("factor 1 equals hp(size)", () => {
      expect(mvs(16, 1)).toBeCloseTo(hp(16), 5);
    });
  });

  describe("fontSize", () => {
    it("returns a positive number", () => {
      expect(fontSize(16)).toBeGreaterThan(0);
    });

    it("throws for NaN input", () => {
      expect(() => fontSize(NaN)).toThrow("fontSize: Expected a valid number");
    });

    it("larger input produces larger output", () => {
      expect(fontSize(24)).toBeGreaterThan(fontSize(16));
    });

    it("tight maxScale produces smaller result than loose maxScale with large fontScale", () => {
      jest.spyOn(PixelRatio, "getFontScale").mockReturnValue(3.0);
      const tight = fontSize(16, { maxScale: 0.9 });
      const loose = fontSize(16, { maxScale: 1.25 });
      expect(loose).toBeGreaterThan(tight);
    });

    it("minScale prevents output going below minimum", () => {
      jest.spyOn(PixelRatio, "getFontScale").mockReturnValue(0.1);
      const result = fontSize(16, { minScale: 0.85, respectAccessibility: false });
      expect(result).toBeGreaterThan(0);
    });

    it("respectAccessibility false ignores fontScale multiplier", () => {
      jest.spyOn(PixelRatio, "getFontScale").mockReturnValue(3.0);
      const withA11y = fontSize(16, { respectAccessibility: true, maxScale: 3.0, minScale: 0.5 });
      const withoutA11y = fontSize(16, {
        respectAccessibility: false,
        maxScale: 3.0,
        minScale: 0.5,
      });
      expect(withA11y).not.toEqual(withoutA11y);
    });

    it("subtracts androidFontAdjustment on Android vs iOS", () => {
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, "OS", { value: "android", configurable: true });
      configureResponsive({});
      const androidResult = fontSize(16);
      Object.defineProperty(Platform, "OS", { value: "ios", configurable: true });
      configureResponsive({});
      const iosResult = fontSize(16);
      expect(iosResult - androidResult).toBe(1);
      Object.defineProperty(Platform, "OS", { value: originalOS, configurable: true });
    });

    it("result is an integer", () => {
      const originalOS = Platform.OS;
      Object.defineProperty(Platform, "OS", { value: "ios", configurable: true });
      expect(Number.isInteger(fontSize(16))).toBe(true);
      Object.defineProperty(Platform, "OS", { value: originalOS, configurable: true });
    });
  });

  describe("spacing", () => {
    it("equals wp(value)", () => {
      expect(spacing(16)).toBeCloseTo(wp(16), 5);
    });
  });

  describe("ds (dynamicScale)", () => {
    it("'width' type equals wp(value)", () => {
      expect(ds(16)).toBeCloseTo(wp(16), 5);
    });

    it("'height' type equals hp(value)", () => {
      expect(ds(16, "height")).toBeCloseTo(hp(16), 5);
    });

    it("'text' type returns a number", () => {
      expect(typeof ds(16, "text")).toBe("number");
    });

    it("'moderate' type equals ms(value)", () => {
      expect(ds(16, "moderate")).toBeCloseTo(ms(16), 5);
    });

    it("throws for NaN input", () => {
      expect(() => ds(NaN)).toThrow("dynamicScale: Expected a valid number");
    });

    it("returns the original value for unsupported scale types", () => {
      expect(ds(16, "unsupported" as any)).toBe(16);
    });
  });

  describe("instance helpers", () => {
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
  });

  describe("responsiveSize", () => {
    it("returns a number in portrait", () => {
      sim(375, 812);
      expect(typeof responsiveSize(300)).toBe("number");
    });

    it("portrait and landscape with landscapeSize return different values", () => {
      sim(812, 375);
      const landscape = responsiveSize(300, 400);
      sim(375, 812);
      const portrait = responsiveSize(300, 400);
      expect(landscape).not.toEqual(portrait);
    });

    it("throws for NaN portraitSize", () => {
      expect(() => responsiveSize(NaN)).toThrow("responsiveSize: Expected a valid number");
    });

    it("landscape without landscapeSize still returns a number", () => {
      sim(812, 375);
      expect(typeof responsiveSize(300)).toBe("number");
    });
  });

  describe("getBreakpoint", () => {
    it("returns xs for width < 576", () => {
      sim(320, 568);
      expect(getBreakpoint()).toBe("xs");
    });

    it("returns sm for 576 <= width < 768", () => {
      sim(600, 900);
      expect(getBreakpoint()).toBe("sm");
    });

    it("returns md for 768 <= width < 992", () => {
      sim(800, 1200);
      expect(getBreakpoint()).toBe("md");
    });

    it("returns lg for 992 <= width < 1200", () => {
      sim(1024, 1366);
      expect(getBreakpoint()).toBe("lg");
    });

    it("returns xl for width >= 1200", () => {
      sim(1280, 800);
      expect(getBreakpoint()).toBe("xl");
    });
  });

  describe("isSmallScreen / isMediumScreen / isLargeScreen / isXLScreen", () => {
    it("isSmallScreen true for xs", () => {
      sim(320, 568);
      expect(isSmallScreen()).toBe(true);
    });

    it("isSmallScreen false for sm", () => {
      sim(600, 900);
      expect(isSmallScreen()).toBe(false);
    });

    it("isMediumScreen true for sm", () => {
      sim(600, 900);
      expect(isMediumScreen()).toBe(true);
    });

    it("isMediumScreen true for md", () => {
      sim(800, 1200);
      expect(isMediumScreen()).toBe(true);
    });

    it("isMediumScreen false for xs", () => {
      sim(320, 568);
      expect(isMediumScreen()).toBe(false);
    });

    it("isLargeScreen true for lg", () => {
      sim(1024, 1366);
      expect(isLargeScreen()).toBe(true);
    });

    it("isLargeScreen true for xl", () => {
      sim(1280, 800);
      expect(isLargeScreen()).toBe(true);
    });

    it("isLargeScreen false for xs", () => {
      sim(320, 568);
      expect(isLargeScreen()).toBe(false);
    });

    it("isXLScreen true for xl", () => {
      sim(1280, 800);
      expect(isXLScreen()).toBe(true);
    });

    it("isXLScreen false for lg", () => {
      sim(1024, 768);
      expect(isXLScreen()).toBe(false);
    });
  });

  describe("getDeviceInfo", () => {
    it("has expected shape", () => {
      const info = getDeviceInfo();
      expect(info).toHaveProperty("type");
      expect(info).toHaveProperty("isTablet");
      expect(info).toHaveProperty("isLandscape");
      expect(info).toHaveProperty("aspectRatio");
      expect(info).toHaveProperty("pixelDensity");
      expect(info).toHaveProperty("isHighDensity");
      expect(info).toHaveProperty("breakpoint");
    });

    it("isLandscape true when width > height", () => {
      sim(812, 375);
      expect(getDeviceInfo().isLandscape).toBe(true);
    });

    it("isLandscape false when height > width", () => {
      sim(375, 812);
      expect(getDeviceInfo().isLandscape).toBe(false);
    });

    it("isTablet true for short dimension >= 768", () => {
      sim(768, 1024);
      expect(getDeviceInfo().isTablet).toBe(true);
    });

    it("isTablet false for phone dimensions", () => {
      sim(375, 812);
      expect(getDeviceInfo().isTablet).toBe(false);
    });

    it("isHighDensity true when pixelDensity >= 3", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(3);
      expect(getDeviceInfo().isHighDensity).toBe(true);
    });

    it("isHighDensity false when pixelDensity < 3", () => {
      jest.spyOn(PixelRatio, "get").mockReturnValue(2);
      expect(getDeviceInfo().isHighDensity).toBe(false);
    });

    it("type is phone for 375x812", () => {
      sim(375, 812);
      expect(getDeviceInfo().type).toBe("phone");
    });

    it("type is tablet for 1000x1400", () => {
      sim(1000, 1400);
      expect(getDeviceInfo().type).toBe("tablet");
    });

    it("type is tv when Platform.isTV is true", () => {
      const originalIsTV = Platform.isTV;
      Object.defineProperty(Platform, "isTV", { value: true, configurable: true });
      expect(getDeviceInfo().type).toBe("tv");
      Object.defineProperty(Platform, "isTV", { value: originalIsTV, configurable: true });
    });

    it("aspectRatio equals long/short dimension", () => {
      sim(375, 812);
      expect(getDeviceInfo().aspectRatio).toBeCloseTo(812 / 375, 2);
    });
  });

  describe("screenWidth and screenHeight", () => {
    it("screenWidth > 0", () => {
      expect(screenWidth()).toBeGreaterThan(0);
    });

    it("screenHeight > 0", () => {
      expect(screenHeight()).toBeGreaterThan(0);
    });

    it("screenWidth updates after sim", () => {
      sim(414, 896);
      expect(screenWidth()).toBe(414);
    });

    it("screenHeight updates after sim", () => {
      sim(414, 896);
      expect(screenHeight()).toBe(896);
    });

    it("exposes the full screen dimensions from the singleton", () => {
      expect((responsiveInstance as any).getScreenDimensions()).toMatchObject({
        width: 375,
        height: 812,
      });
    });
  });

  describe("responsiveValue", () => {
    it("returns exact match at xs", () => {
      sim(320, 568);
      expect(responsiveValue({ xs: 10, sm: 20, md: 30 })).toBe(10);
    });

    it("falls back to closest smaller breakpoint when no exact match", () => {
      sim(600, 900);
      expect(responsiveValue({ xs: 10, md: 30 })).toBe(10);
    });

    it("falls back to smallest when no smaller exists", () => {
      sim(320, 568);
      expect(responsiveValue({ md: 30, lg: 40 })).toBe(30);
    });

    it("returns undefined for empty values", () => {
      expect(responsiveValue({})).toBeUndefined();
    });

    it("returns xl value at xl breakpoint", () => {
      sim(1280, 800);
      expect(responsiveValue({ xs: 1, xl: 5 })).toBe(5);
    });

    it("returns sm value at sm breakpoint", () => {
      sim(600, 900);
      expect(responsiveValue({ xs: 1, sm: 2, md: 3 })).toBe(2);
    });

    it("sorts multiple smaller breakpoints before picking the closest fallback", () => {
      sim(1024, 1366);
      expect(responsiveValue({ xs: 1, sm: 2, md: 3 })).toBe(3);
    });
  });

  describe("configureResponsive", () => {
    it("does not throw", () => {
      expect(() => configureResponsive({ designWidth: 414 })).not.toThrow();
    });

    it("changing designWidth changes wp output", () => {
      const before = wp(100);
      configureResponsive({ designWidth: 414 });
      const after = wp(100);
      expect(after).not.toEqual(before);
    });
  });

  describe("cleanupResponsive", () => {
    it("does not throw", () => {
      expect(() => cleanupResponsive()).not.toThrow();
    });

    it("removes the dimension subscription when present", () => {
      const remove = jest.fn();
      (responsiveInstance as any).dimensionSubscription = { remove };

      cleanupResponsive();

      expect(remove).toHaveBeenCalledTimes(1);
    });
  });

  describe("internal listener wiring", () => {
    it("registers a dimension listener and reacts to emitted changes", () => {
      const callback = jest.fn();
      let capturedHandler: ((payload: any) => void) | undefined;

      const addEventListenerSpy = jest
        .spyOn(Dimensions, "addEventListener")
        .mockImplementation(((_event: string, handler: any) => {
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
  });

  describe("responsive hooks", () => {
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

    it("useBreakpoint reacts to dimension changes", () => {
      sim(375, 812);
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
      sim(375, 812);
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
});
