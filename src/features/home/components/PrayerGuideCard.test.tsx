import { fireEvent, render } from "@testing-library/react-native";

import { PrayerGuideCard } from "./PrayerGuideCard";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

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

describe("PrayerGuideCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to guide when pressing Get started", () => {
    const { getByLabelText } = render(<PrayerGuideCard />);

    fireEvent.press(getByLabelText("Get started"));

    expect(mockPush).toHaveBeenCalledWith("/(tabs)/guide");
  });

  it("renders the Prayer Guide title text", () => {
    const { getByText } = render(<PrayerGuideCard />);

    expect(getByText("Prayer Guide")).toBeTruthy();
  });

  it("renders the subtitle text", () => {
    const { getByText } = render(<PrayerGuideCard />);

    expect(getByText("Learn Solah the Prophetic Way")).toBeTruthy();
  });

  it("renders the Get started button", () => {
    const { getByText } = render(<PrayerGuideCard />);

    expect(getByText("Get started")).toBeTruthy();
  });

  it("renders the illustration image", () => {
    const { UNSAFE_getAllByType } = render(<PrayerGuideCard />);
    const { Image } = require("react-native");
    const images = UNSAFE_getAllByType(Image);

    expect(images.length).toBeGreaterThanOrEqual(1);
  });
});
