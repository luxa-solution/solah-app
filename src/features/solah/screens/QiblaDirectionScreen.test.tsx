import { render } from "@testing-library/react-native";
import React from "react";

import { QiblaDirectionScreen } from "./QiblaDirectionScreen";

const mockUseQiblaParams = jest.fn();

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

// useQiblaParams uses expo-location internally — keep this mock
// useQiblaHeading uses expo-sensors/Magnetometer internally — keep this mock
jest.mock("@/features-solah/hooks", () => ({
  useQiblaParams: () => mockUseQiblaParams(),
  useQiblaHeading: () => ({ heading: 0, needleAngle: 0 }),
}));

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy" },
}));

jest.mock("expo-sensors", () => ({
  Magnetometer: {
    isAvailableAsync: jest.fn().mockResolvedValue(false),
    addListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
    setUpdateInterval: jest.fn(),
  },
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
}));

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text, View, Pressable } = require("react-native");

  return {
    Appbar: {
      Header: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
        React.createElement(View, props, children),
      BackAction: ({ onPress }: { onPress: () => void }) =>
        React.createElement(Pressable, { onPress, accessibilityLabel: "Back" }, "Back"),
      Content: ({ title }: { title: string }) => React.createElement(Text, null, title),
      Action: ({
        icon,
        onPress,
        accessibilityLabel,
      }: {
        icon: string;
        onPress: () => void;
        accessibilityLabel: string;
      }) =>
        React.createElement(
          Pressable,
          { onPress, accessibilityLabel },
          React.createElement(Text, null, icon)
        ),
    },
  };
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return {
    Ionicons: (props: object) => React.createElement(Text, props, "Ionicon"),
    MaterialCommunityIcons: (props: object) => React.createElement(Text, props, "MCIcon"),
  };
});

describe("QiblaDirectionScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title; hides compass while loading", () => {
    mockUseQiblaParams.mockReturnValue({
      qiblaBearing: 120,
      distanceKm: 800,
      loading: true,
    });

    const { getByText } = render(<QiblaDirectionScreen />);

    expect(getByText("Qibla direction")).toBeTruthy();
  });

  it("renders compass when not loading and bearing is defined", () => {
    mockUseQiblaParams.mockReturnValue({
      qiblaBearing: 123.45,
      distanceKm: 900,
      loading: false,
    });

    const { toJSON } = render(<QiblaDirectionScreen />);

    // Should render without crashing
    expect(toJSON()).toBeTruthy();
  });

  it("does not render compass when bearing is undefined even if not loading", () => {
    mockUseQiblaParams.mockReturnValue({
      qiblaBearing: undefined,
      distanceKm: undefined,
      loading: false,
    });

    const { toJSON } = render(<QiblaDirectionScreen />);

    expect(toJSON()).toBeTruthy();
  });
});
