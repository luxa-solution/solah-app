import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useOnboardingStore } from "@/features-onboarding/store";

import { OnboardingScreen } from "./OnboardingScreen";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("expo-image", () => ({
  Image: require("react-native").Image,
}));

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

jest.mock("@/features-onboarding/data", () => ({
  onboardingData: [
    { id: 1, title: "Welcome", description: "Start here", imgsrc: null, imgPos: "top" },
    { id: 2, title: "Finish", description: "You are ready", imgsrc: null, imgPos: "bottom" },
  ],
}));

const initialState = useOnboardingStore.getState();

describe("OnboardingScreen integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOnboardingStore.setState(initialState, true);
    jest.spyOn(require("react-native"), "useWindowDimensions").mockReturnValue({
      width: 320,
      height: 800,
      scale: 1,
      fontScale: 1,
    });
    jest
      .spyOn(require("react-native").FlatList.prototype, "scrollToIndex")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("completes onboarding with the real screen flow", async () => {
    const screen = render(<OnboardingScreen />);

    expect(screen.getByText("Welcome")).toBeTruthy();
    expect(screen.getByText("Start here")).toBeTruthy();
    expect(screen.getByText("Continue")).toBeTruthy();
    expect(screen.getByText("Skip")).toBeTruthy();

    fireEvent.press(screen.getByText("Continue"));

    expect(screen.getByText("Get Started")).toBeTruthy();

    fireEvent.press(screen.getByText("Get Started"));

    await waitFor(() => {
      expect(useOnboardingStore.getState().hasOnboarded).toBe(true);
    });

    expect(mockReplace).toHaveBeenCalledWith("/");
  });
});
