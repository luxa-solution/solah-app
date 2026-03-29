import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { FlatList } from "react-native";

import type { OnboardingContentProps } from "@/features-onboarding/components/OnboardingContent";
import type { ButtonProps } from "@/shared/components/Button";
import type { ProgressBarProps } from "@/shared/components/ProgressBar";

import { OnboardingScreen } from "./OnboardingScreen";

const mockReplace = jest.fn();
const mockSetHasOnboarded = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock("@/features-onboarding/store", () => ({
  useOnboardingStore: (selector: (s: any) => unknown) =>
    selector({
      setHasOnboarded: mockSetHasOnboarded,
    }),
}));

jest.mock("@/features-onboarding/data", () => ({
  onboardingData: [
    { id: 1, title: "One", description: "Desc 1", imgsrc: null, imgPos: "top" },
    { id: 2, title: "Two", description: "Desc 2", imgsrc: null, imgPos: "middle" },
    { id: 3, title: "Three", description: "Desc 3", imgsrc: null, imgPos: "bottom" },
  ],
}));

jest.mock("@/features-onboarding/components", () => {
  const { Text } = require("react-native");

  return {
    OnboardingContent: ({ title }: OnboardingContentProps) => <Text>{`CONTENT:${title}`}</Text>,
  };
});

jest.mock("@/shared/components", () => {
  const { Text, Pressable, View } = require("react-native");

  return {
    ProgressBar: ({ percent }: ProgressBarProps) => <Text>{`PROGRESS:${percent}`}</Text>,
    AppButton: ({ title, onPress, disabled }: ButtonProps) => (
      <Pressable onPress={onPress} disabled={disabled} accessibilityLabel={title}>
        <View>
          <Text>{title}</Text>
        </View>
      </Pressable>
    ),
  };
});

describe("OnboardingScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(require("react-native"), "useWindowDimensions").mockReturnValue({
      width: 100,
      height: 800,
      scale: 1,
      fontScale: 1,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders the initial onboarding state", () => {
    const screen = render(<OnboardingScreen />);

    expect(screen.getByText("CONTENT:One")).toBeTruthy();
    expect(screen.getByText("PROGRESS:0")).toBeTruthy();
    expect(screen.getByLabelText("Continue")).toBeTruthy();
    expect(screen.getByLabelText("Skip")).toBeTruthy();
  });

  it("advances through slides and completes onboarding", () => {
    const screen = render(<OnboardingScreen />);
    const list = screen.UNSAFE_getByType(FlatList);

    fireEvent(list, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 100 } },
    });
    expect(screen.getByText("PROGRESS:50")).toBeTruthy();

    fireEvent(list, "momentumScrollEnd", {
      nativeEvent: { contentOffset: { x: 200 } },
    });
    expect(screen.getByLabelText("Get Started")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Get Started"));
    expect(mockSetHasOnboarded).toHaveBeenCalledWith(true);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("skips onboarding immediately", () => {
    const screen = render(<OnboardingScreen />);

    fireEvent.press(screen.getByLabelText("Skip"));

    expect(mockSetHasOnboarded).toHaveBeenCalledWith(true);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });
});
