import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { TopNav } from "./TopNav";

describe("TopNav (critical behavior)", () => {
  it("calls onChange with correct tab key when tab is pressed", () => {
    const onChange = jest.fn();

    const { getByText } = render(<TopNav value={"all" as any} onChange={onChange} />);

    fireEvent.press(getByText("Favourite"));
    expect(onChange).toHaveBeenCalledWith("fav");

    fireEvent.press(getByText("Bookmark"));
    expect(onChange).toHaveBeenCalledWith("bm");
  });

  it("shows favourite count badge only when favouriteCount > 0", () => {
    const onChange = jest.fn();

    const { queryByText, rerender } = render(
      <TopNav value={"all" as any} onChange={onChange} favouriteCount={0} />
    );

    expect(queryByText("0")).toBeNull();

    rerender(<TopNav value={"fav" as any} onChange={onChange} favouriteCount={3} />);
    expect(queryByText("3")).toBeTruthy();
  });
});
