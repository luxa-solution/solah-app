import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { BottomSheet } from "./BottomSheet";

describe("BottomSheet", () => {
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

  it("renders multiple children when open", () => {
    const { getByText } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>CHILD_ONE</Text>
        <Text>CHILD_TWO</Text>
      </BottomSheet>
    );

    expect(getByText("CHILD_ONE")).toBeTruthy();
    expect(getByText("CHILD_TWO")).toBeTruthy();
  });

  it("renders with 25% snapPoint and shows content", () => {
    const { getByText } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()} snapPoint="25%">
        <Text>SNAP25</Text>
      </BottomSheet>
    );

    expect(getByText("SNAP25")).toBeTruthy();
  });

  it("renders with 75% snapPoint and shows content", () => {
    const { getByText } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()} snapPoint="75%">
        <Text>SNAP75</Text>
      </BottomSheet>
    );

    expect(getByText("SNAP75")).toBeTruthy();
  });

  it("renders backdrop when open", () => {
    const { getByTestId } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>CONTENT</Text>
      </BottomSheet>
    );

    expect(getByTestId("bottomsheet-backdrop")).toBeTruthy();
  });

  it("does not render backdrop when closed", () => {
    const { queryByTestId } = render(
      <BottomSheet isOpen={false} onClose={jest.fn()}>
        <Text>CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByTestId("bottomsheet-backdrop")).toBeNull();
  });

  it("updates to show content when re-rendered as open", () => {
    const onClose = jest.fn();

    const { queryByText, rerender } = render(
      <BottomSheet isOpen={false} onClose={onClose}>
        <Text>DYNAMIC_CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByText("DYNAMIC_CONTENT")).toBeNull();

    rerender(
      <BottomSheet isOpen={true} onClose={onClose}>
        <Text>DYNAMIC_CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByText("DYNAMIC_CONTENT")).toBeTruthy();
  });
});
