import responsiveInstance from "./config";

export const getDeviceInfo = () => responsiveInstance.getDeviceInfo();
export const getBreakpoint = () => responsiveInstance.getBreakpoint();
export const isSmallScreen = () => responsiveInstance.isSmallScreen();
export const isMediumScreen = () => responsiveInstance.isMediumScreen();
export const isLargeScreen = () => responsiveInstance.isLargeScreen();
export const isXLScreen = () => responsiveInstance.isXLScreen();
export const screenWidth = () => responsiveInstance.getScreenWidth();
export const screenHeight = () => responsiveInstance.getScreenHeight();
export const configureResponsive = responsiveInstance.configure;
export const cleanupResponsive = responsiveInstance.cleanup;
