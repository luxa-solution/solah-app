import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { SearchHeader } from "./SearchHeader";

describe("SearchHeader", () => {
  const mockOnSearchChange = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly with search query", () => {
    const { getByPlaceholderText } = render(
      <SearchHeader searchQuery="test" onSearchChange={mockOnSearchChange} onBack={mockOnBack} />
    );

    expect(getByPlaceholderText("Search adhkar...")).toBeTruthy();
  });

  it("calls onBack when back button is pressed", () => {
    const { getByTestId } = render(
      <SearchHeader searchQuery="" onSearchChange={mockOnSearchChange} onBack={mockOnBack} />
    );

    const backButton = getByTestId("search-back-button");
    fireEvent.press(backButton);
    expect(mockOnBack).toHaveBeenCalled();
  });

  it("calls onSearchChange when text changes", () => {
    const { getByPlaceholderText } = render(
      <SearchHeader searchQuery="" onSearchChange={mockOnSearchChange} onBack={mockOnBack} />
    );

    fireEvent.changeText(getByPlaceholderText("Search adhkar..."), "new search");
    expect(mockOnSearchChange).toHaveBeenCalledWith("new search");
  });

  it("shows clear button when searchQuery is not empty", () => {
    const { getByTestId } = render(
      <SearchHeader searchQuery="test" onSearchChange={mockOnSearchChange} onBack={mockOnBack} />
    );

    expect(getByTestId("search-clear-button")).toBeTruthy();
  });

  it("calls onSearchChange with empty string when clear button is pressed", () => {
    const { getByTestId } = render(
      <SearchHeader searchQuery="test" onSearchChange={mockOnSearchChange} onBack={mockOnBack} />
    );

    const clearButton = getByTestId("search-clear-button");
    fireEvent.press(clearButton);
    expect(mockOnSearchChange).toHaveBeenCalledWith("");
  });
});
