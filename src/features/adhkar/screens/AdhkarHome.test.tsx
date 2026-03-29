import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

import type { AdhkarDisplayProps } from "@/features-adhkar/components/details-comps/AdhkarDisplay";
import type { HomeButtonProps } from "@/features-adhkar/components/HomeButton";
import type { TopNavProps } from "@/features-adhkar/components/TopNav";

import { AdhkarHome } from "./AdhkarHome";

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

jest.mock("@/features-adhkar/data", () => ({
  adhkarData: [
    {
      type: "before",
      items: [
        {
          id: "b1",
          type: "before",
          title: "Before Item 1",
          entries: [{ arabicText: "A" }, { arabicText: "B" }],
          illustration: null,
        },
        {
          id: "b2",
          type: "before",
          title: "Before Item 2",
          entries: [{ arabicText: "C" }],
          illustration: null,
        },
      ],
    },
    {
      type: "during",
      items: [
        {
          id: "d1",
          type: "during",
          title: "During Item 1",
          entries: [{ arabicText: "D" }],
          illustration: null,
        },
      ],
    },
    {
      type: "after",
      items: [
        {
          id: "a1",
          type: "after",
          title: "After Item 1",
          entries: [{ arabicText: "E" }],
          illustration: null,
        },
      ],
    },
  ],
}));

const mockUseAdhkarStore = jest.fn();
jest.mock("@/features-adhkar/store", () => ({
  useAdhkarStore: () => mockUseAdhkarStore(),
}));

jest.mock("./BookmarkAdhkar", () => ({
  BookmarkAdhkar: () => {
    const { Text } = require("react-native");
    return <Text>BOOKMARK_SCREEN</Text>;
  },
}));

jest.mock("./FavouriteAdhkar", () => ({
  FavouriteAdhkar: () => {
    const { Text } = require("react-native");
    return <Text>FAV_EMPTY_SCREEN</Text>;
  },
}));

jest.mock("@/features-adhkar/components", () => {
  const { View, Pressable, Text } = require("react-native");
  return {
    TopNav: ({ onChange, favouriteCount, bookmarkCount }: TopNavProps) => (
      <View>
        <Pressable accessibilityLabel="tab-all" onPress={() => onChange("all")}>
          <Text>tab-all</Text>
        </Pressable>
        <Pressable accessibilityLabel="tab-fav" onPress={() => onChange("fav")}>
          <Text>tab-fav ({favouriteCount})</Text>
        </Pressable>
        <Pressable accessibilityLabel="tab-bm" onPress={() => onChange("bm")}>
          <Text>tab-bm ({bookmarkCount})</Text>
        </Pressable>
      </View>
    ),
    HomeButton: ({ category, subCount, adhkarCount }: HomeButtonProps) => (
      <Text>
        HomeButton:{category}:{subCount}:{adhkarCount}
      </Text>
    ),
    AdhkarDisplay: ({ item }: AdhkarDisplayProps) => <Text>DISPLAY:{item.title}</Text>,
  };
});

describe("AdhkarHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the all tab by default showing HomeButton components", () => {
    mockUseAdhkarStore.mockReturnValue({ favouriteIds: [], bookmarkIds: [] });

    const { getByText, queryByText } = render(<AdhkarHome />);

    expect(getByText(/HomeButton:Before prayer:2:3/)).toBeTruthy();
    expect(getByText(/HomeButton:During prayer:1:1/)).toBeTruthy();
    expect(getByText(/HomeButton:After prayer:1:1/)).toBeTruthy();
    expect(queryByText("BOOKMARK_SCREEN")).toBeNull();
    expect(queryByText("FAV_EMPTY_SCREEN")).toBeNull();
  });

  it("shows FavouriteAdhkar empty state when fav tab is selected and no favourites exist", () => {
    mockUseAdhkarStore.mockReturnValue({ favouriteIds: [], bookmarkIds: [] });

    const { getByLabelText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("tab-fav"));

    expect(queryByText("FAV_EMPTY_SCREEN")).toBeTruthy();
    expect(queryByText(/HomeButton:/)).toBeNull();
  });

  it("shows favourite items when fav tab is selected and favourites exist", () => {
    mockUseAdhkarStore.mockReturnValue({
      favouriteIds: ["before-b1"],
      bookmarkIds: [],
    });

    const { getByLabelText, getByText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("tab-fav"));

    expect(getByText("DISPLAY:Before Item 1")).toBeTruthy();
    expect(queryByText("FAV_EMPTY_SCREEN")).toBeNull();
  });

  it("shows BookmarkAdhkar screen when bm tab is selected", () => {
    mockUseAdhkarStore.mockReturnValue({ favouriteIds: [], bookmarkIds: [] });

    const { getByLabelText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("tab-bm"));

    expect(queryByText("BOOKMARK_SCREEN")).toBeTruthy();
    expect(queryByText(/HomeButton:/)).toBeNull();
  });

  it("passes correct favourite and bookmark counts to TopNav", () => {
    mockUseAdhkarStore.mockReturnValue({
      favouriteIds: ["before-b1", "after-a1"],
      bookmarkIds: ["during-d1"],
    });

    const { getByText } = render(<AdhkarHome />);

    expect(getByText("tab-fav (2)")).toBeTruthy();
    expect(getByText("tab-bm (1)")).toBeTruthy();
  });

  it("switching back to all tab restores HomeButton content", () => {
    mockUseAdhkarStore.mockReturnValue({ favouriteIds: [], bookmarkIds: [] });

    const { getByLabelText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("tab-bm"));
    expect(queryByText("BOOKMARK_SCREEN")).toBeTruthy();

    fireEvent.press(getByLabelText("tab-all"));
    expect(queryByText("BOOKMARK_SCREEN")).toBeNull();
    expect(queryByText(/HomeButton:Before prayer/)).toBeTruthy();
  });

  it("calls router.back when back button is pressed", () => {
    mockUseAdhkarStore.mockReturnValue({ favouriteIds: [], bookmarkIds: [] });

    const { UNSAFE_getAllByType } = render(<AdhkarHome />);

    fireEvent.press(UNSAFE_getAllByType(TouchableOpacity)[0]);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("favouriteItems filtering only includes items matching favouriteIds", () => {
    mockUseAdhkarStore.mockReturnValue({
      favouriteIds: ["before-b2"],
      bookmarkIds: [],
    });

    const { getByLabelText, getByText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("tab-fav"));

    expect(getByText("DISPLAY:Before Item 2")).toBeTruthy();
    expect(queryByText("DISPLAY:Before Item 1")).toBeNull();
    expect(queryByText("DISPLAY:During Item 1")).toBeNull();
  });
});
