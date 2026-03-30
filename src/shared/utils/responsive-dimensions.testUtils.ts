import { Dimensions, PixelRatio } from "react-native";

import responsiveInstance, { configureResponsive } from "./responsive-dimensions";

export function simDimensions(width: number, height: number) {
  (Dimensions as any).set({
    window: { width, height, scale: 2, fontScale: 1 },
    screen: { width, height, scale: 2, fontScale: 1 },
  });
}

export function resetResponsiveTestState() {
  jest.spyOn(PixelRatio, "roundToNearestPixel").mockImplementation((value) => value);
  jest.spyOn(PixelRatio, "get").mockReturnValue(2);
  jest.spyOn(PixelRatio, "getFontScale").mockReturnValue(1);
  simDimensions(375, 812);
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
}

export function restoreResponsiveTestState() {
  jest.restoreAllMocks();
}
