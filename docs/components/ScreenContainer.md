# Screen Container Component

The Screen Container is a flexible, reusable component that provides a consistent layout wrapper for
screens in the application. It handles common mobile development concerns such as safe areas,
keyboard avoidance, and scrolling.

## Features

- Safe Area handling with configurable edges
- Keyboard avoidance (iOS) with automatic scrolling
- Optional scrolling capability
- Configurable padding
- Flexible styling options

## Props

| Prop                      | Type                   | Default                    | Description                                             |
| ------------------------- | ---------------------- | -------------------------- | ------------------------------------------------------- |
| `children`                | `ReactNode`            | -                          | The content to be rendered within the container         |
| `containerStyle`          | `StyleProp<ViewStyle>` | -                          | Custom styles for the container                         |
| `contentStyle`            | `StyleProp<ViewStyle>` | -                          | Custom styles for the content wrapper                   |
| `withPadding`             | `boolean`              | `true`                     | Enable/disable default padding                          |
| `paddingHorizontal`       | `number`               | `20`                       | Horizontal padding value (in design units)              |
| `paddingVertical`         | `number`               | `0`                        | Vertical padding value (in design units)                |
| `edges`                   | `Edge[]`               | `['left', 'right', 'top']` | Safe area edges to respect                              |
| `scrollable`              | `boolean`              | `false`                    | Enable scrolling capability                             |
| `keyboardShouldAvoidView` | `boolean`              | `false`                    | Enable keyboard avoidance                               |
| `scrollViewProps`         | `ScrollViewProps`      | -                          | Additional props for ScrollView when scrollable is true |

## Usage

```tsx
import ScreenContainer from "@/shared/components/screen-container";

// Basic usage
const MyScreen = () => (
  <ScreenContainer>
    <MyContent />
  </ScreenContainer>
);

// With scrolling enabled
const ScrollableScreen = () => (
  <ScreenContainer scrollable>
    <LongContent />
  </ScreenContainer>
);

// With custom padding and keyboard avoidance
const FormScreen = () => (
  <ScreenContainer paddingHorizontal={24} paddingVertical={16} keyboardShouldAvoidView>
    <FormContent />
  </ScreenContainer>
);

// With custom styles
const CustomScreen = () => (
  <ScreenContainer containerStyle={{ backgroundColor: "gray" }} contentStyle={{ gap: 16 }}>
    <Content />
  </ScreenContainer>
);
```

## Tips

1. Use `keyboardShouldAvoidView` when your screen contains input fields - this will automatically
   enable scrolling
2. Enable `scrollable` when content might exceed screen height
3. Adjust `edges` when you need specific safe area behavior
4. Use `containerStyle` for styling the outer container and `contentStyle` for the inner content
   wrapper
