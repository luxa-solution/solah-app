import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { FlatList } from "react-native";

import { useOnboardingStore } from "@/features-onboarding/store";

import { OnboardingScreen } from "./OnboardingScreen";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock("expo-image", () => ({
  Image: require("react-native").Image,
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("@/features-onboarding/data", () => ({
  onboardingData: [
    { id: 1, title: "One", description: "Desc 1", imgsrc: null, imgPos: "top" },
    { id: 2, title: "Two", description: "Desc 2", imgsrc: null, imgPos: "middle" },
    { id: 3, title: "Three", description: "Desc 3", imgsrc: null, imgPos: "bottom" },
  ],
}));

const initialState = useOnboardingStore.getState();

describe("OnboardingScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    useOnboardingStore.setState(initialState, true);
    jest.spyOn(require("react-native"), "useWindowDimensions").mockReturnValue({
      width: 100,
      height: 800,
      scale: 1,
      fontScale: 1,
    });
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("renders the initial onboarding state with first slide content", () => {
    const screen = render(<OnboardingScreen />);

    expect(screen.getByText("One")).toBeTruthy();
    expect(screen.getByText("Desc 1")).toBeTruthy();
    expect(screen.getByText("Continue")).toBeTruthy();
    expect(screen.getByText("Skip")).toBeTruthy();
  });

  it("advances through slides and completes onboarding", () => {
    const screen = render(<OnboardingScreen />);
    const list = screen.UNSAFE_getByType(FlatList);

    act(() => {
      fireEvent(list, "momentumScrollEnd", {
        nativeEvent: { contentOffset: { x: 100 } },
      });
      jest.runOnlyPendingTimers();
    });

    act(() => {
      fireEvent(list, "momentumScrollEnd", {
        nativeEvent: { contentOffset: { x: 200 } },
      });
      jest.runOnlyPendingTimers();
    });
    expect(screen.getByText("Get Started")).toBeTruthy();

    act(() => {
      fireEvent.press(screen.getByText("Get Started"));
      jest.runOnlyPendingTimers();
    });
    expect(useOnboardingStore.getState().hasOnboarded).toBe(true);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });

  it("skips onboarding immediately", () => {
    const screen = render(<OnboardingScreen />);

    act(() => {
      fireEvent.press(screen.getByText("Skip"));
      jest.runOnlyPendingTimers();
    });

    expect(useOnboardingStore.getState().hasOnboarded).toBe(true);
    expect(mockReplace).toHaveBeenCalledWith("/");
  });
});
