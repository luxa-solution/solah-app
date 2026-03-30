import { PixelRatio, Platform } from "react-native";

import { configureResponsive, fontSize, responsiveValue } from "./responsive-dimensions";
import { resetResponsiveTestState, restoreResponsiveTestState, simDimensions } from "./responsive-dimensions.testUtils";

describe("responsive-dimensions typography helpers", () => {
  beforeEach(() => {
    resetResponsiveTestState();
  });

  afterEach(() => {
    restoreResponsiveTestState();
  });

  it("returns a positive number for fontSize", () => {
    expect(fontSize(16)).toBeGreaterThan(0);
  });

  it("throws for fontSize NaN input", () => {
    expect(() => fontSize(NaN)).toThrow("fontSize: Expected a valid number");
  });

  it("larger input produces larger font output", () => {
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

  it("respectAccessibility false ignores the fontScale multiplier", () => {
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

  it("returns an integer font size result", () => {
    const originalOS = Platform.OS;
    Object.defineProperty(Platform, "OS", { value: "ios", configurable: true });
    expect(Number.isInteger(fontSize(16))).toBe(true);
    Object.defineProperty(Platform, "OS", { value: originalOS, configurable: true });
  });

  it("returns the exact responsiveValue match at xs", () => {
    simDimensions(320, 568);
    expect(responsiveValue({ xs: 10, sm: 20, md: 30 })).toBe(10);
  });

  it("falls back to the closest smaller responsiveValue breakpoint when no exact match exists", () => {
    simDimensions(600, 900);
    expect(responsiveValue({ xs: 10, md: 30 })).toBe(10);
  });

  it("falls back to the smallest responsiveValue when no smaller breakpoint exists", () => {
    simDimensions(320, 568);
    expect(responsiveValue({ md: 30, lg: 40 })).toBe(30);
  });

  it("returns undefined for empty responsiveValue objects", () => {
    expect(responsiveValue({})).toBeUndefined();
  });

  it("returns the xl responsiveValue at the xl breakpoint", () => {
    simDimensions(1280, 800);
    expect(responsiveValue({ xs: 1, xl: 5 })).toBe(5);
  });

  it("returns the sm responsiveValue at the sm breakpoint", () => {
    simDimensions(600, 900);
    expect(responsiveValue({ xs: 1, sm: 2, md: 3 })).toBe(2);
  });

  it("sorts multiple smaller responsiveValue breakpoints before picking the closest fallback", () => {
    simDimensions(1024, 1366);
    expect(responsiveValue({ xs: 1, sm: 2, md: 3 })).toBe(3);
  });
});
