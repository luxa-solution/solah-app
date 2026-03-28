import { fireEvent, render } from "@testing-library/react-native";

import { TitleBar } from "./TitleBar";

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
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

describe("TitleBar", () => {
  beforeEach(() => {
    mockBack.mockClear();
  });

  it("renders the title and back action by default", () => {
    const screen = render(<TitleBar title="Settings" />);

    expect(screen.getByText("Settings")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Back"));
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("hides the back action when requested", () => {
    const screen = render(<TitleBar title="Settings" showBack={false} />);

    expect(screen.queryByLabelText("Back")).toBeNull();
  });

  it("renders bookmark action state and calls the bookmark handler", () => {
    const onBookmark = jest.fn();
    const screen = render(
      <TitleBar title="Details" showBookmark onBookmark={onBookmark} isBookmarked />
    );

    expect(screen.getByText("bookmark")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Remove bookmark"));
    expect(onBookmark).toHaveBeenCalledTimes(1);
  });

  it("renders the add-bookmark state when the item is not bookmarked", () => {
    const onBookmark = jest.fn();
    const screen = render(<TitleBar title="Details" showBookmark onBookmark={onBookmark} />);

    expect(screen.getByText("bookmark-outline")).toBeTruthy();

    fireEvent.press(screen.getByLabelText("Add bookmark"));
    expect(onBookmark).toHaveBeenCalledTimes(1);
  });

  it("does not render bookmark action without a handler", () => {
    const screen = render(<TitleBar title="Details" showBookmark />);

    expect(screen.queryByLabelText("Add bookmark")).toBeNull();
    expect(screen.queryByLabelText("Remove bookmark")).toBeNull();
  });
});
