import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

import { useAdhkarStore } from "@/features-adhkar/store";

import { AdhkarHome } from "./AdhkarHome";

const mockBack = jest.fn();
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
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
          entries: [{ arabicText: "A", transliteration: "Alif", translation: { en: "First" } }],
          illustration: null,
        },
        {
          id: "b2",
          type: "before",
          title: "Before Item 2",
          entries: [{ arabicText: "C", transliteration: "Cee", translation: { en: "Third" } }],
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
          entries: [{ arabicText: "D", transliteration: "Dee", translation: { en: "Fourth" } }],
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
          entries: [{ arabicText: "E", transliteration: "Ee", translation: { en: "Fifth" } }],
          illustration: null,
        },
      ],
    },
  ],
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useAdhkarStore.getState();

describe("AdhkarHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAdhkarStore.setState(initialState, true);
  });

  it("renders the all tab by default", () => {
    const { getByText, queryByText } = render(<AdhkarHome />);

    expect(getByText(/Before prayer/)).toBeTruthy();
    expect(getByText(/During prayer/)).toBeTruthy();
    expect(getByText(/After prayer/)).toBeTruthy();
    expect(queryByText("No bookmarks found")).toBeNull();
    expect(queryByText("No favourite adhkar found")).toBeNull();
  });

  it("shows FavouriteAdhkar empty state when fav tab is selected and no favourites exist", () => {
    useAdhkarStore.setState({ favouriteIds: [], bookmarkIds: [] });

    const { getByText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByText("Favourite"));

    expect(queryByText("No favourite adhkar found")).toBeTruthy();
    expect(queryByText(/Before prayer/)).toBeNull();
  });

  it("shows favourite items when fav tab is selected and favourites exist", () => {
    useAdhkarStore.setState({
      favouriteIds: ["before-b1"],
      bookmarkIds: [],
    });

    const { getByText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByText("Favourite"));

    expect(getByText("A")).toBeTruthy();
    expect(queryByText("No favourite adhkar found")).toBeNull();
  });

  it("shows BookmarkAdhkar screen when bookmark tab is selected", () => {
    useAdhkarStore.setState({ favouriteIds: [], bookmarkIds: [] });

    const { getByText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByText("Bookmark"));

    expect(queryByText("No bookmarks found")).toBeTruthy();
    expect(queryByText(/Before prayer/)).toBeNull();
  });

  it("switching back to all tab restores HomeButton content", () => {
    useAdhkarStore.setState({ favouriteIds: [], bookmarkIds: [] });

    const { getByText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByText("Bookmark"));
    expect(queryByText("No bookmarks found")).toBeTruthy();

    fireEvent.press(getByText("All Adhkar"));
    expect(queryByText("No bookmarks found")).toBeNull();
    expect(queryByText(/Before prayer/)).toBeTruthy();
  });

  it("calls router.back when back button is pressed", () => {
    useAdhkarStore.setState({ favouriteIds: [], bookmarkIds: [] });

    const { UNSAFE_getAllByType } = render(<AdhkarHome />);

    fireEvent.press(UNSAFE_getAllByType(TouchableOpacity)[0]);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it("favouriteItems filtering only includes items matching favouriteIds", () => {
    useAdhkarStore.setState({
      favouriteIds: ["before-b2"],
      bookmarkIds: [],
    });

    const { getByText, queryByText } = render(<AdhkarHome />);

    fireEvent.press(getByText("Favourite"));

    expect(getByText("C")).toBeTruthy();
    expect(queryByText("A")).toBeNull();
    expect(queryByText("D")).toBeNull();
  });

  it("toggles search when search icon is pressed", () => {
    const { getByLabelText, queryByPlaceholderText } = render(<AdhkarHome />);

    expect(queryByPlaceholderText("Search adhkar...")).toBeNull();

    fireEvent.press(getByLabelText("search"));

    expect(queryByPlaceholderText("Search adhkar...")).toBeTruthy();
  });

  it("closes search when back button is pressed", () => {
    const { getByLabelText, queryByPlaceholderText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("search"));
    expect(queryByPlaceholderText("Search adhkar...")).toBeTruthy();

    fireEvent.press(getByLabelText("back"));
    expect(queryByPlaceholderText("Search adhkar...")).toBeNull();
  });

  it("shows search results when typing", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("search"));

    const searchInput = getByPlaceholderText("Search adhkar...");
    fireEvent.changeText(searchInput, "Before");

    expect(getByText("Before Item 1")).toBeTruthy();
    expect(getByText("Before Item 2")).toBeTruthy();
  });

  it("shows no results message when search returns no matches", () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(<AdhkarHome />);

    fireEvent.press(getByLabelText("search"));

    const searchInput = getByPlaceholderText("Search adhkar...");
    fireEvent.changeText(searchInput, "xyzabc");

    expect(getByText("No adhkar found. Try different keywords.")).toBeTruthy();
  });

  // ✅ FIXED: Clear search test - use queryByText with rerender or check input value
  it("clears search results when clear button is pressed", () => {
    const { getByLabelText, getByPlaceholderText, getByTestId, getByText, queryByText } = render(
      <AdhkarHome />
    );

    fireEvent.press(getByLabelText("search"));

    const searchInput = getByPlaceholderText("Search adhkar...");
    fireEvent.changeText(searchInput, "Before");

    expect(getByText("Before Item 1")).toBeTruthy();

    const clearButton = getByTestId("search-clear-button");
    fireEvent.press(clearButton);

    const result = queryByText(/Before Item 1/);
    expect(result).toBeNull();
  });
});
