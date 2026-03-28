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

describe("Adhkar TitleBar wrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsBookmarked.mockReturnValue(false);
  });

  it("renders 'Before Prayer' title for before type", () => {
    const { getByText } = render(<TitleBar adhkar_type={"before" as any} />);
    expect(getByText("Before Prayer")).toBeTruthy();
  });

  it("renders 'During Prayer' title for during type", () => {
    const { getByText } = render(<TitleBar adhkar_type={"during" as any} />);
    expect(getByText("During Prayer")).toBeTruthy();
  });

  it("renders 'After Prayer' title for after type", () => {
    const { getByText } = render(<TitleBar adhkar_type={"after" as any} />);
    expect(getByText("After Prayer")).toBeTruthy();
  });

  it("does not show bookmark when adhkarItem is missing", () => {
    const { getByText } = render(<TitleBar adhkar_type={"before" as any} showBookmark />);

    expect(getByText("Before Prayer")).toBeTruthy();
    expect(getByText("showBookmark:false")).toBeTruthy();
  });

  it("does not show bookmark when showBookmark is false even with item", () => {
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;

    const { getByText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark={false} />
    );

    expect(getByText("showBookmark:false")).toBeTruthy();
  });

  it("shows bookmark when item is provided and showBookmark is true", () => {
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;

    const { getByText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark />
    );

    expect(getByText("showBookmark:true")).toBeTruthy();
  });

  it("toggles bookmark when item is provided and showBookmark is true", () => {
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;

    const { getByLabelText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark />
    );

    fireEvent.press(getByLabelText("bookmark"));
    expect(mockToggleBookmark).toHaveBeenCalledWith(item);
  });

  it("does not call toggleBookmark when no item is provided", () => {
    const { getByLabelText } = render(<TitleBar adhkar_type={"before" as any} showBookmark />);

    fireEvent.press(getByLabelText("bookmark"));
    expect(mockToggleBookmark).not.toHaveBeenCalled();
  });

  it("reflects isBookmarked true from store", () => {
    mockIsBookmarked.mockReturnValue(true);
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;

    const { getByText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark />
    );

    expect(getByText("isBookmarked:true")).toBeTruthy();
  });

  it("reflects isBookmarked false when item is absent", () => {
    mockIsBookmarked.mockReturnValue(true);

    const { getByText } = render(<TitleBar adhkar_type={"before" as any} />);

    expect(getByText("isBookmarked:false")).toBeTruthy();
  });
});
