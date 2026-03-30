import { Dimensions, PixelRatio, Platform, ScaledSize } from "react-native";

import type {
  Breakpoint,
  DeviceInfo,
  DeviceType,
  FontScaleOptions,
  ResponsiveConfig,
  ScaleType,
} from "./types";

class ResponsiveDesignSystem {
  private static instance: ResponsiveDesignSystem;
  private screenDimensions: ScaledSize = Dimensions.get("window");
  private dimensionSubscription?: { remove?: () => void };
  private cache = new Map<string, number>();
  private subscribers = new Set<() => void>();

  private designWidth = 375;
  private designHeight = 812;
  private defaultModerateFactor = 0.45;
  private maxFontScale = 1.25;
  private minFontScale = 0.85;
  private androidFontAdjustment = 1;

  private readonly breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  } as const;

  constructor() {
    this.setupDimensionListener();
  }

  public static getInstance(): ResponsiveDesignSystem {
    if (!ResponsiveDesignSystem.instance) {
      ResponsiveDesignSystem.instance = new ResponsiveDesignSystem();
    }
    return ResponsiveDesignSystem.instance;
  }

  public setupDimensionListener = (): void => {
    const changeHandler = ({ window }: { window: ScaledSize }) => {
      this.screenDimensions = window;
      this.clearCache();
      this.notifySubscribers();
    };

    this.dimensionSubscription = Dimensions.addEventListener("change", changeHandler) as any;
  };

  public cleanup = (): void => {
    if (this.dimensionSubscription?.remove) {
      this.dimensionSubscription.remove();
    }
    this.clearCache();
    this.subscribers.clear();
  };

  public subscribe = (callback: () => void): (() => void) => {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  };

  public notifySubscribers = (): void => {
    this.subscribers.forEach((callback) => callback());
  };

  private get screenWidth(): number {
    return this.screenDimensions.width;
  }

  private get screenHeight(): number {
    return this.screenDimensions.height;
  }

  public configure = (config: Partial<ResponsiveConfig>): void => {
    if (config.designWidth) this.designWidth = config.designWidth;
    if (config.designHeight) this.designHeight = config.designHeight;
    if (config.moderateFactor) this.defaultModerateFactor = config.moderateFactor;
    if (config.maxFontScale) this.maxFontScale = config.maxFontScale;
    if (config.minFontScale) this.minFontScale = config.minFontScale;
    if (config.androidFontAdjustment !== undefined) {
      this.androidFontAdjustment = config.androidFontAdjustment;
    }
    this.clearCache();
    this.notifySubscribers();
  };

  private clearCache = (): void => {
    this.cache.clear();
  };

  private getCachedValue = (key: string, calculator: () => number): number => {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const value = calculator();
    this.cache.set(key, value);
    return value;
  };

  private validateInput = (value: number, methodName: string): void => {
    if (typeof value !== "number" || isNaN(value)) {
      throw new Error(`${methodName}: Expected a valid number, got ${value}`);
    }
  };

  public clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  };

  public interpolate = (
    value: number,
    inputRange: [number, number],
    outputRange: [number, number]
  ): number => {
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    const ratio = (value - inputMin) / (inputMax - inputMin);
    return outputMin + ratio * (outputMax - outputMin);
  };

  public hper = (percent: number): number => {
    this.validateInput(percent, "hper");
    const key = `hper_${percent}_${this.screenHeight}`;
    return this.getCachedValue(key, () =>
      PixelRatio.roundToNearestPixel((this.screenHeight * percent) / 100)
    );
  };

  public wper = (percent: number): number => {
    this.validateInput(percent, "wper");
    const key = `wper_${percent}_${this.screenWidth}`;
    return this.getCachedValue(key, () =>
      PixelRatio.roundToNearestPixel((this.screenWidth * percent) / 100)
    );
  };

  public scale = (size: number): number => {
    this.validateInput(size, "scale");
    const key = `scale_${size}_${this.screenWidth}`;
    return this.getCachedValue(key, () => {
      const [shortDimension] =
        this.screenWidth < this.screenHeight
          ? [this.screenWidth, this.screenHeight]
          : [this.screenHeight, this.screenWidth];
      const scaleWidth = shortDimension / this.designWidth;
      return PixelRatio.roundToNearestPixel(size * scaleWidth);
    });
  };

  public verticalScale = (size: number): number => {
    this.validateInput(size, "verticalScale");
    const key = `verticalScale_${size}_${this.screenHeight}`;
    return this.getCachedValue(key, () => {
      const [, longDimension] =
        this.screenWidth < this.screenHeight
          ? [this.screenWidth, this.screenHeight]
          : [this.screenHeight, this.screenWidth];
      const scaleHeight = longDimension / this.designHeight;
      return PixelRatio.roundToNearestPixel(size * scaleHeight);
    });
  };

  public moderateScale = (size: number, factor = this.defaultModerateFactor): number => {
    this.validateInput(size, "moderateScale");
    const key = `moderateScale_${size}_${factor}_${this.screenWidth}`;
    return this.getCachedValue(key, () => {
      const scaledSize = this.scale(size);
      return size + (scaledSize - size) * factor;
    });
  };

  public moderateVerticalScale = (size: number, factor = this.defaultModerateFactor): number => {
    this.validateInput(size, "moderateVerticalScale");
    const key = `moderateVerticalScale_${size}_${factor}_${this.screenHeight}`;
    return this.getCachedValue(key, () => {
      const scaledSize = this.verticalScale(size);
      return size + (scaledSize - size) * factor;
    });
  };

  public fontSize = (size: number, options?: FontScaleOptions): number => {
    this.validateInput(size, "fontSize");
    const {
      maxScale = this.maxFontScale,
      minScale = this.minFontScale,
      respectAccessibility = true,
    } = options || {};

    const key = `fontSize_${size}_${maxScale}_${minScale}_${respectAccessibility}_${this.screenWidth}`;
    return this.getCachedValue(key, () => {
      let scale = this.screenWidth / this.designWidth;

      if (respectAccessibility) {
        const fontScale = PixelRatio.getFontScale();
        scale *= Math.min(fontScale, maxScale);
      }

      scale = this.clamp(scale, minScale, maxScale);
      const newSize = size * scale;
      const rounded = Math.round(PixelRatio.roundToNearestPixel(newSize));
      return Platform.OS === "ios" ? rounded : rounded - this.androidFontAdjustment;
    });
  };

  public responsiveSize = (portraitSize: number, landscapeSize?: number): number => {
    this.validateInput(portraitSize, "responsiveSize");
    const key = `responsiveSize_${portraitSize}_${landscapeSize}_${this.screenWidth}_${this.screenHeight}`;
    return this.getCachedValue(key, () => {
      const isPortrait = this.screenHeight > this.screenWidth;
      if (landscapeSize && !isPortrait) {
        return this.scale(landscapeSize);
      }
      return this.scale(portraitSize);
    });
  };

  public getBreakpoint = (): Breakpoint => {
    const width = this.screenWidth;
    if (width >= this.breakpoints.xl) return "xl";
    if (width >= this.breakpoints.lg) return "lg";
    if (width >= this.breakpoints.md) return "md";
    if (width >= this.breakpoints.sm) return "sm";
    return "xs";
  };

  public getDeviceType = (): DeviceType => {
    if (Platform.isTV || (Platform as any).isTVOS) return "tv";

    const shortDimension = Math.min(this.screenWidth, this.screenHeight);
    const longDimension = Math.max(this.screenWidth, this.screenHeight);

    if (shortDimension <= 428 && longDimension <= 926) {
      return "phone";
    }

    return "tablet";
  };

  public getDeviceInfo = (): DeviceInfo => {
    const { width, height } = this.screenDimensions;
    const shortDimension = Math.min(width, height);
    const longDimension = Math.max(width, height);
    const aspectRatio = longDimension / shortDimension;
    const pixelDensity = PixelRatio.get();

    return {
      type: this.getDeviceType(),
      isTablet: shortDimension >= 768,
      isLandscape: width > height,
      aspectRatio,
      pixelDensity,
      isHighDensity: pixelDensity >= 3,
      breakpoint: this.getBreakpoint(),
    };
  };

  public spacing = (baseSpacing: number): number => {
    return this.scale(baseSpacing);
  };

  public dynamicScale = (value: number, type: ScaleType = "width"): number => {
    this.validateInput(value, "dynamicScale");

    switch (type) {
      case "width":
        return this.scale(value);
      case "height":
        return this.verticalScale(value);
      case "text":
        return this.fontSize(value);
      case "moderate":
        return this.moderateScale(value);
      default:
        return value;
    }
  };

  public isSmallScreen = (): boolean => {
    return this.getBreakpoint() === "xs";
  };

  public isMediumScreen = (): boolean => {
    return ["sm", "md"].includes(this.getBreakpoint());
  };

  public isLargeScreen = (): boolean => {
    return ["lg", "xl"].includes(this.getBreakpoint());
  };

  public isXLScreen = (): boolean => {
    return this.getBreakpoint() === "xl";
  };

  public responsiveValue = <T>(values: Partial<Record<Breakpoint, T>>): T | undefined => {
    const currentBreakpoint = this.getBreakpoint();
    const currentBreakpointValue = this.breakpoints[currentBreakpoint];

    if (values[currentBreakpoint] !== undefined) {
      return values[currentBreakpoint];
    }

    const availableBreakpoints = Object.keys(values) as Breakpoint[];
    const validBreakpoints = availableBreakpoints
      .filter((bp) => this.breakpoints[bp] <= currentBreakpointValue)
      .sort((left, right) => this.breakpoints[right] - this.breakpoints[left]);

    if (validBreakpoints.length > 0) {
      return values[validBreakpoints[0]];
    }

    const smallestBreakpoint = availableBreakpoints.sort(
      (left, right) => this.breakpoints[left] - this.breakpoints[right]
    )[0];

    return values[smallestBreakpoint];
  };

  public getScreenWidth = (): number => this.screenWidth;
  public getScreenHeight = (): number => this.screenHeight;
  public getScreenDimensions = (): ScaledSize => this.screenDimensions;
}

const responsiveInstance = ResponsiveDesignSystem.getInstance();

export { ResponsiveDesignSystem };
export default responsiveInstance;
