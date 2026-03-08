# Responsive Design System

The Responsive Design System is a comprehensive utility that provides various functions and hooks
for handling responsive design in React Native applications. It ensures consistent scaling across
different device sizes and orientations.

## Core Features

- Dynamic scaling based on device dimensions
- Orientation-aware sizing
- Breakpoint-based responsive values
- Device type detection
- Font scaling with accessibility support
- Consistent spacing utilities

## Installation

The system is built into the application. Import the utilities you need from:

```typescript
import { ds, wp, hp, fontSize } from "@/shared/utils/responsive_dimensions_system";
```

## Basic Usage

### Dynamic Scaling (ds)

The primary scaling function that adapts to different scenarios:

```typescript
import { ds } from "@/shared/utils/responsive_dimensions_system";

// Width-based scaling (default)
const width = ds(100);

// Height-based scaling
const height = ds(100, "height");

// Text scaling
const size = ds(16, "text");

// Moderate scaling (for items like icons)
const iconSize = ds(24, "moderate");
```

### Percentage-Based Scaling

```typescript
import { wp, hp, wper, hper } from "@/shared/utils/responsive_dimensions_system";

// Width percentage (based on design width)
const width = wp(100);

// Height percentage (based on design height)
const height = hp(50);

// Direct screen percentage
const screenWidth = wper(90); // 90% of screen width
const screenHeight = hper(50); // 50% of screen height
```

### Font Sizing

```typescript
import { fontSize } from "@/shared/utils/responsive_dimensions_system";

// Basic font scaling
const size = fontSize(16);

// With accessibility options
const accessibleSize = fontSize(16, {
  maxScale: 1.2,
  minScale: 0.8,
  respectAccessibility: true,
});
```

### Responsive Values

```typescript
import { responsiveValue } from "@/shared/utils/responsive_dimensions_system";

const padding = responsiveValue({
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
});
```

## Device Information

### Using Hooks

```typescript
import { useDeviceInfo, useBreakpoint } from "@/shared/utils/responsive_dimensions_system";

function MyComponent() {
  const deviceInfo = useDeviceInfo();
  const breakpoint = useBreakpoint();

  console.log(deviceInfo.isTablet); // true/false
  console.log(deviceInfo.isLandscape); // true/false
  console.log(breakpoint); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}
```

### Screen Size Helpers

```typescript
import {
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
  isXLScreen,
} from "@/shared/utils/responsive_dimensions_system";

const isSmall = isSmallScreen(); // true for xs breakpoint
const isMedium = isMediumScreen(); // true for sm/md breakpoint
const isLarge = isLargeScreen(); // true for lg/xl breakpoint
const isExtraLarge = isXLScreen(); // true for xl breakpoint
```

## Configuration

You can configure the responsive system according to your needs:

```typescript
import { configureResponsive } from "@/shared/utils/responsive_dimensions_system";

configureResponsive({
  designWidth: 414,
  designHeight: 896,
  moderateFactor: 0.5,
  maxFontScale: 1.5,
  minFontScale: 0.8,
  androidFontAdjustment: 1,
});
```

## Cleanup

Make sure to clean up when your app unmounts to prevent memory leaks:

```typescript
import { cleanupResponsive } from "@/shared/utils/responsive_dimensions_system";

// In your app's cleanup code:
cleanupResponsive();
```

## Types

The system exports several useful types:

```typescript
import type {
  Breakpoint, // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  DeviceType, // 'phone' | 'tablet' | 'tv'
  DeviceInfo, // Device information interface
  ResponsiveConfig, // Configuration interface
} from "@/shared/utils/responsive_dimensions_system";
```

## Best Practices

1. Use `ds()` as your primary scaling function for most use cases
2. Use percentage functions (`wp`, `hp`) when you need exact percentage-based dimensions
3. Use `fontSize()` for text to ensure proper accessibility support
4. Use `responsiveValue()` when you need different values for different breakpoints
5. Always clean up the responsive system when your app unmounts
6. Use the hooks (`useDeviceInfo`, `useBreakpoint`) when you need reactive responsive behavior
