import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { AdhkarHome } from "./AdhkarHome"; // adjust path if needed

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

// Keep data minimal so the screen can mount without noise
jest.mock("@/features-adhkar/data", () => ({
  adhkarData: [
    { type: "before", items: [] },
    { type: "during", items: [] },
    { type: "after", items: [] },
  ],
}));

const mockUseAdhkarStore = jest.fn();
jest.mock("@/features-adhkar/store", () => ({
  useAdhkarStore: () => mockUseAdhkarStore(),
}));

// Mock child screens shown in tabs
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

// Mock TopNav so we can click buttons to switch tabs
jest.mock("@/features-adhkar/components", () => {
  const { View, Pressable, Text } = require("react-native");
  return {
    // Only mock what AdhkarHome uses
    TopNav: ({ onChange }: { onChange: (t: string) => void }) => (
      <View>
        <Pressable accessibilityLabel="tab-all" onPress={() => onChange("all")}>
          <Text>tab-all</Text>
        </Pressable>
        <Pressable accessibilityLabel="tab-fav" onPress={() => onChange("fav")}>
          <Text>tab-fav</Text>
        </Pressable>
        <Pressable accessibilityLabel="tab-bm" onPress={() => onChange("bm")}>
          <Text>tab-bm</Text>
        </Pressable>
      </View>
    ),
    HomeButton: () => null,
    AdhkarDisplay: () => null,
  };
});

describe("AdhkarHome (necessary behavior only)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows FavouriteAdhkar empty state when on fav tab and there are no favourites", () => {
    mockUseAdhkarStore.mockReturnValue({ favouriteIds: [] });

    const { getByLabelText, queryByText } = render(<AdhkarHome />);

    // switch to fav tab
    fireEvent.press(getByLabelText("tab-fav"));

    expect(queryByText("FAV_EMPTY_SCREEN")).toBeTruthy();
  });

  it("shows BookmarkAdhkar screen when on bm tab", () => {
    mockUseAdhkarStore.mockReturnValue({ favouriteIds: [] });

    const { getByLabelText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("tab-bm"));

    expect(queryByText("BOOKMARK_SCREEN")).toBeTruthy();
  });
});
