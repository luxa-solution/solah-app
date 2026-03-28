import { render } from "@testing-library/react-native";

import { OnboardingContent } from "./OnboardingContent";

jest.mock("expo-image", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    Image: ({ ...props }) => React.createElement(View, { ...props, testID: "onboarding-image" }),
  };
});

describe("OnboardingContent", () => {
  const baseProps = {
    imgsrc: { uri: "demo-image" },
    title: "Welcome",
    description: "Track your prayers and reminders.",
  };

  it("renders content for the default top layout", () => {
    const screen = render(<OnboardingContent {...baseProps} />);

    expect(screen.getByText("Welcome")).toBeTruthy();
    expect(screen.getByText("Track your prayers and reminders.")).toBeTruthy();
    expect(screen.getByTestId("onboarding-image")).toBeTruthy();
  });

  it("renders content when the image is placed in the middle", () => {
    const screen = render(<OnboardingContent {...baseProps} imgPos="middle" />);

    expect(screen.getByText("Welcome")).toBeTruthy();
    expect(screen.getByText("Track your prayers and reminders.")).toBeTruthy();
    expect(screen.getByTestId("onboarding-image")).toBeTruthy();
  });

  it("renders content when the image is placed at the bottom", () => {
    const screen = render(<OnboardingContent {...baseProps} imgPos="bottom" />);

    expect(screen.getByText("Welcome")).toBeTruthy();
    expect(screen.getByText("Track your prayers and reminders.")).toBeTruthy();
    expect(screen.getByTestId("onboarding-image")).toBeTruthy();
  });

  it("falls back to the default layout for unexpected positions", () => {
    const screen = render(<OnboardingContent {...baseProps} imgPos={"unexpected" as "top"} />);

    expect(screen.getByText("Welcome")).toBeTruthy();
    expect(screen.getByText("Track your prayers and reminders.")).toBeTruthy();
    expect(screen.getByTestId("onboarding-image")).toBeTruthy();
  });
});
