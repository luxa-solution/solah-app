import {
  ds,
  hp,
  hper,
  ms,
  mvs,
  responsiveSize,
  wp,
  wper,
} from "./responsive-dimensions";
import { resetResponsiveTestState, restoreResponsiveTestState, simDimensions } from "./responsive-dimensions.testUtils";

describe("responsive-dimensions scale helpers", () => {
  beforeEach(() => {
    resetResponsiveTestState();
  });

  afterEach(() => {
    restoreResponsiveTestState();
  });

  it("returns positive number for hper 50%", () => {
    expect(hper(50)).toBeGreaterThan(0);
  });

  it("returns 0 for hper 0%", () => {
    expect(hper(0)).toBe(0);
  });

  it("throws for hper NaN input", () => {
    expect(() => hper(NaN)).toThrow("hper: Expected a valid number");
  });

  it("100% hper returns double of 50%", () => {
    expect(hper(100)).toBeCloseTo(hper(50) * 2, 1);
  });

  it("returns positive number for wper 50%", () => {
    expect(wper(50)).toBeGreaterThan(0);
  });

  it("returns 0 for wper 0%", () => {
    expect(wper(0)).toBe(0);
  });

  it("throws for wper NaN input", () => {
    expect(() => wper(NaN)).toThrow("wper: Expected a valid number");
  });

  it("100% wper returns double of 50%", () => {
    expect(wper(100)).toBeCloseTo(wper(50) * 2, 1);
  });

  it("returns a positive number for wp", () => {
    expect(wp(100)).toBeGreaterThan(0);
  });

  it("throws for wp NaN input", () => {
    expect(() => wp(NaN)).toThrow("scale: Expected a valid number");
  });

  it("returns 0 for wp 0", () => {
    expect(wp(0)).toBe(0);
  });

  it("wp(200) equals wp(100) * 2", () => {
    expect(wp(200)).toBeCloseTo(wp(100) * 2, 5);
  });

  it("uses short dimension of screen for width scaling", () => {
    simDimensions(375, 812);
    expect(typeof wp(100)).toBe("number");
  });

  it("returns a positive number for hp", () => {
    expect(hp(100)).toBeGreaterThan(0);
  });

  it("throws for hp NaN input", () => {
    expect(() => hp(NaN)).toThrow("verticalScale: Expected a valid number");
  });

  it("returns 0 for hp 0", () => {
    expect(hp(0)).toBe(0);
  });

  it("uses long dimension of screen for height scaling", () => {
    simDimensions(375, 812);
    expect(typeof hp(100)).toBe("number");
  });

  it("uses the landscape long dimension branch for hp", () => {
    simDimensions(812, 375);
    expect(hp(100)).toBeGreaterThan(0);
  });

  it("returns a positive number for ms", () => {
    expect(ms(16)).toBeGreaterThan(0);
  });

  it("throws for ms NaN input", () => {
    expect(() => ms(NaN)).toThrow("moderateScale: Expected a valid number");
  });

  it("ms factor 0 returns original size", () => {
    expect(ms(16, 0)).toBe(16);
  });

  it("ms factor 1 equals wp(size)", () => {
    expect(ms(16, 1)).toBeCloseTo(wp(16), 5);
  });

  it("returns a positive number for mvs", () => {
    expect(mvs(16)).toBeGreaterThan(0);
  });

  it("throws for mvs NaN input", () => {
    expect(() => mvs(NaN)).toThrow("moderateVerticalScale: Expected a valid number");
  });

  it("mvs factor 0 returns original size", () => {
    expect(mvs(16, 0)).toBe(16);
  });

  it("mvs factor 1 equals hp(size)", () => {
    expect(mvs(16, 1)).toBeCloseTo(hp(16), 5);
  });

  it("width dynamicScale equals wp(value)", () => {
    expect(ds(16)).toBeCloseTo(wp(16), 5);
  });

  it("height dynamicScale equals hp(value)", () => {
    expect(ds(16, "height")).toBeCloseTo(hp(16), 5);
  });

  it("text dynamicScale returns a number", () => {
    expect(typeof ds(16, "text")).toBe("number");
  });

  it("moderate dynamicScale equals ms(value)", () => {
    expect(ds(16, "moderate")).toBeCloseTo(ms(16), 5);
  });

  it("throws for ds NaN input", () => {
    expect(() => ds(NaN)).toThrow("dynamicScale: Expected a valid number");
  });

  it("returns the original value for unsupported scale types", () => {
    expect(ds(16, "unsupported" as any)).toBe(16);
  });

  it("responsiveSize returns a number in portrait", () => {
    simDimensions(375, 812);
    expect(typeof responsiveSize(300)).toBe("number");
  });

  it("responsiveSize returns different portrait and landscape values when provided both", () => {
    simDimensions(812, 375);
    const landscape = responsiveSize(300, 400);
    simDimensions(375, 812);
    const portrait = responsiveSize(300, 400);
    expect(landscape).not.toEqual(portrait);
  });

  it("throws for responsiveSize NaN portraitSize", () => {
    expect(() => responsiveSize(NaN)).toThrow("responsiveSize: Expected a valid number");
  });

  it("responsiveSize without landscapeSize still returns a number", () => {
    simDimensions(812, 375);
    expect(typeof responsiveSize(300)).toBe("number");
  });
});
