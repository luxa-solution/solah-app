import { render } from "@testing-library/react-native";
import React from "react";

import { FavouriteAdhkar } from "./FavouriteAdhkar";

jest.mock("@/assets/images/BookmarkEmpty.png", () => "mock-bookmark-empty-image");

describe("FavouriteAdhkar", () => {
  it("renders the empty state title", () => {
    const { getByText } = render(<FavouriteAdhkar />);

    expect(getByText("No favourite adhkar found")).toBeTruthy();
  });

  it("renders the subtitle with instructions", () => {
    const { getByText } = render(<FavouriteAdhkar />);

    expect(getByText("Tap the ☆ icon on any adhkar to add it to favourites")).toBeTruthy();
  });

  it("renders both title and subtitle together", () => {
    const { getByText } = render(<FavouriteAdhkar />);

    expect(getByText("No favourite adhkar found")).toBeTruthy();
    expect(getByText("Tap the ☆ icon on any adhkar to add it to favourites")).toBeTruthy();
  });
});
