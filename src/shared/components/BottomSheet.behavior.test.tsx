import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import { BottomSheet } from "./BottomSheet";

describe("BottomSheet behavior", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders null when closed", () => {
    const { queryByText } = render(
      <BottomSheet isOpen={false} onClose={jest.fn()}>
        <Text>SHEET_CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByText("SHEET_CONTENT")).toBeNull();
  });

  it("renders children when open", () => {
    const { getByText, getByTestId } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>SHEET_CONTENT</Text>
      </BottomSheet>
    );

    expect(getByText("SHEET_CONTENT")).toBeTruthy();
    expect(getByTestId("bottomsheet-backdrop")).toBeTruthy();
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

  it("supports alternate snap points", () => {
    const { getByText, rerender } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()} snapPoint="25%">
        <Text>SNAP25</Text>
      </BottomSheet>
    );

    expect(getByText("SNAP25")).toBeTruthy();

    rerender(
      <BottomSheet isOpen={true} onClose={jest.fn()} snapPoint="75%">
        <Text>SNAP75</Text>
      </BottomSheet>
    );

    expect(getByText("SNAP75")).toBeTruthy();
  });

  it("shows content when rerendered from closed to open", () => {
    const { queryByText, rerender } = render(
      <BottomSheet isOpen={false} onClose={jest.fn()}>
        <Text>DYNAMIC_CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByText("DYNAMIC_CONTENT")).toBeNull();

    rerender(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>DYNAMIC_CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByText("DYNAMIC_CONTENT")).toBeTruthy();
  });

  it("handles rerender from open to closed without crashing", () => {
    const { queryByText, rerender } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>CLOSING_CONTENT</Text>
      </BottomSheet>
    );

    expect(queryByText("CLOSING_CONTENT")).toBeTruthy();

    act(() => {
      rerender(
        <BottomSheet isOpen={false} onClose={jest.fn()}>
          <Text>CLOSING_CONTENT</Text>
        </BottomSheet>
      );
      jest.runOnlyPendingTimers();
    });

    expect(queryByText("CLOSING_CONTENT")).toBeTruthy();
  });

  it("renders the animated structure repeatedly without crashing", () => {
    const { rerender, getByText } = render(
      <BottomSheet isOpen={true} onClose={jest.fn()}>
        <Text>SHEET_CONTENT</Text>
      </BottomSheet>
    );

    act(() => {
      rerender(
        <BottomSheet isOpen={true} onClose={jest.fn()} snapPoint="75%">
          <Text>SHEET_CONTENT</Text>
        </BottomSheet>
      );
      jest.runOnlyPendingTimers();
    });

    expect(getByText("SHEET_CONTENT")).toBeTruthy();
  });
});
