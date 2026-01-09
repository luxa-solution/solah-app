import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { BookmarkAdhkar } from "./BookmarkAdhkar"; // adjust path if needed

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockUseAdhkarStore = jest.fn();
jest.mock("@/features-adhkar/store", () => ({
  useAdhkarStore: () => mockUseAdhkarStore(),
}));

jest.mock("@/features-adhkar/data", () => ({
  adhkarData: [
    {
      type: "before",
      items: [
        { id: "1", type: "before", title: "Before 1", entries: [{}, {}] },
        { id: "2", type: "before", title: "Before 2", entries: [{}] },
      ],
    },
    {
      type: "after",
      items: [{ id: "1", type: "after", title: "After 1", entries: [{}] }],
    },
  ],
}));

describe("BookmarkAdhkar (critical behavior)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows empty state when there are no bookmarks", () => {
    mockUseAdhkarStore.mockReturnValue({ bookmarkIds: [] });

    const { getByText } = render(<BookmarkAdhkar />);

    expect(getByText("No bookmarks found")).toBeTruthy();
    expect(getByText("Tap the bookmark icon on any adhkar to save it")).toBeTruthy();
  });

  it("renders bookmarked items and navigates on press", () => {
    mockUseAdhkarStore.mockReturnValue({
      bookmarkIds: ["before-2"], // only one is bookmarked
    });

    const { getByText, queryByText } = render(<BookmarkAdhkar />);

    // Should render only the bookmarked one
    expect(getByText("Before 2")).toBeTruthy();
    expect(getByText("(1)")).toBeTruthy(); // entries length
    expect(queryByText("Before 1")).toBeNull();

    fireEvent.press(getByText("Before 2"));

    expect(mockPush).toHaveBeenCalledWith("/adhkar/details?adhkar_type=before&id=2");
  });
});
