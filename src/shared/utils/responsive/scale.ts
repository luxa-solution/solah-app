import responsiveInstance from "./config";
import type { Breakpoint, FontScaleOptions, ScaleType } from "./types";

export const ds = (value: number, type?: ScaleType) => responsiveInstance.dynamicScale(value, type);

export const responsiveSize = (portraitSize: number, landscapeSize?: number) =>
  responsiveInstance.responsiveSize(portraitSize, landscapeSize);

export const responsiveValue = <T>(values: Partial<Record<Breakpoint, T>>) =>
  responsiveInstance.responsiveValue(values);

export const wp = (value: number) => responsiveInstance.scale(value);
export const hp = (value: number) => responsiveInstance.verticalScale(value);
export const ms = (value: number, factor?: number) =>
  responsiveInstance.moderateScale(value, factor);
export const mvs = (value: number, factor?: number) =>
  responsiveInstance.moderateVerticalScale(value, factor);
export const hper = (percent: number) => responsiveInstance.hper(percent);
export const wper = (percent: number) => responsiveInstance.wper(percent);
export const fontSize = (size: number, options?: FontScaleOptions) =>
  responsiveInstance.fontSize(size, options);
export const spacing = (value: number) => responsiveInstance.spacing(value);
