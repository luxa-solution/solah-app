import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { BottomSheet } from "./BottomSheet";

describe("BottomSheet (critical behavior)", () => {
  it("renders null when closed", () => {
    const { queryByText } = render(
      <BottomSheet isOpen={false} onClose={jest.fn()}>
        <Text>SHEET_CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByText("SHEET_CONTENT")).toBeNull();
  });

  it("renders children when open", () => {
    const { getByText } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>SHEET_CONTENT</Text>
      </BottomSheet>
    );

    expect(getByText("SHEET_CONTENT")).toBeTruthy();
  });

  it("calls onClose when backdrop is pressed", () => {
    const onClose = jest.fn();

    const { getByTestId } = render(
      <BottomSheet isOpen={true} onClose={onClose}>
        <Text>SHEET_CONTENT</Text>
      </BottomSheet>
    );

    fireEvent.press(getByTestId("bottomsheet-backdrop"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
