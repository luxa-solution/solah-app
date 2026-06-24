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
    const { getByLabelText } = render(
      <SearchHeader searchQuery="" onSearchChange={mockOnSearchChange} onBack={mockOnBack} />
    );

    fireEvent.press(getByLabelText("back"));
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
    const { getByLabelText } = render(
      <SearchHeader searchQuery="test" onSearchChange={mockOnSearchChange} onBack={mockOnBack} />
    );

    expect(getByLabelText("clear")).toBeTruthy();
  });

  it("calls onClearSearch when clear button is pressed", () => {
    // Create a mock function for onSearchChange to verify clear works
    const mockOnSearchChangeWithClear = jest.fn();
    const { getByLabelText } = render(
      <SearchHeader
        searchQuery="test"
        onSearchChange={mockOnSearchChangeWithClear}
        onBack={mockOnBack}
      />
    );

    fireEvent.press(getByLabelText("clear"));
    // The SearchHeader calls onSearchChange with empty string when clear is pressed
    expect(mockOnSearchChangeWithClear).toHaveBeenCalledWith("");
  });
});
