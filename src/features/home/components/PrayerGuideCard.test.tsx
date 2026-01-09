import { fireEvent, render } from "@testing-library/react-native";

import { PrayerGuideCard } from "./PrayerGuideCard";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Avoid testing AppButton internals here
jest.mock("@/shared/components", () => {
  const { Pressable, Text } = require("react-native");
  return {
    AppButton: ({ title, onPress }: any) => (
      <Pressable onPress={onPress} accessibilityLabel={title}>
        <Text>{title}</Text>
      </Pressable>
    ),
  };
});

describe("PrayerGuideCard (critical behavior)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to guide when pressing Get started", () => {
    const { getByLabelText } = render(<PrayerGuideCard />);

    fireEvent.press(getByLabelText("Get started"));

    expect(mockPush).toHaveBeenCalledWith("/(tabs)/guide");
  });
});
