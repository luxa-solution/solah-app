import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { TopNav } from "./TopNav";

describe("TopNav", () => {
  it("renders all three tab labels", () => {
    const onChange = jest.fn();

    const { getByText } = render(<TopNav value={"all" as any} onChange={onChange} />);

    expect(getByText("All Adhkar")).toBeTruthy();
    expect(getByText("Favourite")).toBeTruthy();
    expect(getByText("Bookmark")).toBeTruthy();
  });

  it("calls onChange with 'all' when All Adhkar tab is pressed", () => {
    const onChange = jest.fn();

    const { getByText } = render(<TopNav value={"fav" as any} onChange={onChange} />);

    fireEvent.press(getByText("All Adhkar"));
    expect(onChange).toHaveBeenCalledWith("all");
  });

  it("calls onChange with 'fav' when Favourite tab is pressed", () => {
    const onChange = jest.fn();

    const { getByText } = render(<TopNav value={"all" as any} onChange={onChange} />);

    fireEvent.press(getByText("Favourite"));
    expect(onChange).toHaveBeenCalledWith("fav");
  });

  it("calls onChange with 'bm' when Bookmark tab is pressed", () => {
    const onChange = jest.fn();

    const { getByText } = render(<TopNav value={"all" as any} onChange={onChange} />);

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

  it("shows bookmark count badge only when bookmarkCount > 0", () => {
    const onChange = jest.fn();

    const { queryByText, rerender } = render(
      <TopNav value={"all" as any} onChange={onChange} bookmarkCount={0} />
    );

    expect(queryByText("0")).toBeNull();

    rerender(<TopNav value={"bm" as any} onChange={onChange} bookmarkCount={5} />);
    expect(queryByText("5")).toBeTruthy();
  });

  it("does not show count badge when count is exactly 0", () => {
    const onChange = jest.fn();

    const { queryByText } = render(
      <TopNav value={"all" as any} onChange={onChange} favouriteCount={0} bookmarkCount={0} />
    );

    expect(queryByText("0")).toBeNull();
  });

  it("shows both favourite and bookmark counts simultaneously", () => {
    const onChange = jest.fn();

    const { getByText } = render(
      <TopNav value={"all" as any} onChange={onChange} favouriteCount={7} bookmarkCount={4} />
    );

    expect(getByText("7")).toBeTruthy();
    expect(getByText("4")).toBeTruthy();
  });

  it("defaults favouriteCount and bookmarkCount to 0 when not provided", () => {
    const onChange = jest.fn();

    const { queryByText } = render(<TopNav value={"all" as any} onChange={onChange} />);

    expect(queryByText("0")).toBeNull();
  });

  it("captures tab layouts and renders the active indicator", () => {
    const onChange = jest.fn();

    const { getByTestId } = render(<TopNav value={"fav" as any} onChange={onChange} />);

    fireEvent(getByTestId("topnav-tab-all"), "layout", {
      nativeEvent: { layout: { x: 0, width: 80, height: 44 } },
    });
    fireEvent(getByTestId("topnav-tab-fav"), "layout", {
      nativeEvent: { layout: { x: 80, width: 90, height: 44 } },
    });
    fireEvent(getByTestId("topnav-tab-bm"), "layout", {
      nativeEvent: { layout: { x: 170, width: 70, height: 44 } },
    });

    expect(getByTestId("topnav-indicator")).toBeTruthy();
  });
});
