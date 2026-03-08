import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { TitleBar } from "./TitleBar";

const mockToggleBookmark = jest.fn();
const mockIsBookmarked = jest.fn();

jest.mock("../store/adhkarStore", () => ({
  useAdhkarStore: () => ({
    toggleBookmark: mockToggleBookmark,
    isBookmarked: mockIsBookmarked,
  }),
}));

jest.mock("@/shared/components", () => ({
  TitleBar: ({
    title,
    showBookmark,
    onBookmark,
    isBookmarked,
  }: {
    title: string;
    showBookmark: boolean;
    onBookmark?: () => void;
    isBookmarked?: boolean;
  }) => {
    const { Text, Pressable, View } = require("react-native");
    return (
      <View>
        <Text>{title}</Text>
        <Text>showBookmark:{String(showBookmark)}</Text>
        <Text>isBookmarked:{String(isBookmarked)}</Text>
        <Pressable accessibilityLabel="bookmark" onPress={onBookmark}>
          <Text>bookmark-btn</Text>
        </Pressable>
      </View>
    );
  },
}));

describe("Adhkar TitleBar wrapper (critical behavior)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsBookmarked.mockReturnValue(false);
  });

  it("does not show bookmark when adhkarItem is missing", () => {
    const { getByText } = render(<TitleBar adhkar_type={"before" as any} showBookmark />);

    expect(getByText("Before Prayer")).toBeTruthy();
    expect(getByText("showBookmark:false")).toBeTruthy();
  });

  it("toggles bookmark when item is provided and showBookmark is true", () => {
    const item = { id: "1", type: "before", title: "T", entries: [] } as any;

    const { getByText, getByLabelText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark />
    );

    expect(getByText("showBookmark:true")).toBeTruthy();

    fireEvent.press(getByLabelText("bookmark"));
    expect(mockToggleBookmark).toHaveBeenCalledWith(item);
  });
});
