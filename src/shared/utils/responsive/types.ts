export type ScaleType = "width" | "height" | "text" | "moderate";
export type DeviceType = "phone" | "tablet" | "tv";
export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl";

export interface ResponsiveConfig {
  designWidth?: number;
  designHeight?: number;
  moderateFactor?: number;
  maxFontScale?: number;
  minFontScale?: number;
  androidFontAdjustment?: number;
}

export interface DeviceInfo {
  type: DeviceType;
  isTablet: boolean;
  isLandscape: boolean;
  aspectRatio: number;
  pixelDensity: number;
  isHighDensity: boolean;
  breakpoint: Breakpoint;
}

export interface FontScaleOptions {
  maxScale?: number;
  minScale?: number;
  respectAccessibility?: boolean;
}
