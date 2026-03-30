import { useCallback, useEffect, useState } from "react";

import responsiveInstance from "./config";
import type { Breakpoint, DeviceInfo, ScaleType } from "./types";

export const useResponsive = () => {
  const [, forceUpdate] = useState({});

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    const unsubscribe = responsiveInstance.subscribe(triggerUpdate);
    return unsubscribe;
  }, [triggerUpdate]);

  return {
    scale: responsiveInstance.scale,
    verticalScale: responsiveInstance.verticalScale,
    moderateScale: responsiveInstance.moderateScale,
    moderateVerticalScale: responsiveInstance.moderateVerticalScale,
    fontSize: responsiveInstance.fontSize,
    spacing: responsiveInstance.spacing,
    hper: responsiveInstance.hper,
    wper: responsiveInstance.wper,
    ds: (value: number, type?: ScaleType) => responsiveInstance.dynamicScale(value, type),
    deviceInfo: responsiveInstance.getDeviceInfo(),
    breakpoint: responsiveInstance.getBreakpoint(),
    isSmallScreen: responsiveInstance.isSmallScreen(),
    isMediumScreen: responsiveInstance.isMediumScreen(),
    isLargeScreen: responsiveInstance.isLargeScreen(),
    isXLScreen: responsiveInstance.isXLScreen(),
    responsiveSize: responsiveInstance.responsiveSize,
    responsiveValue: responsiveInstance.responsiveValue,
    screenWidth: responsiveInstance.getScreenWidth(),
    screenHeight: responsiveInstance.getScreenHeight(),
  };
};

export const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState(() => responsiveInstance.getDeviceInfo());

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo(responsiveInstance.getDeviceInfo());
    };

    const unsubscribe = responsiveInstance.subscribe(updateDeviceInfo);
    return unsubscribe;
  }, []);

  return deviceInfo;
};

export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState(() => responsiveInstance.getBreakpoint());

  useEffect(() => {
    const updateBreakpoint = () => {
      setBreakpoint(responsiveInstance.getBreakpoint());
    };

    const unsubscribe = responsiveInstance.subscribe(updateBreakpoint);
    return unsubscribe;
  }, []);

  return breakpoint;
};
