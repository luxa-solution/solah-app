import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import {
  animateBottomSheetWithSpring,
  BottomSheet,
  clampBottomSheetTranslateY,
  createBottomSheetPanStartHandler,
  createBottomSheetPanEndHandler,
  createBottomSheetPanUpdateHandler,
  createBottomSheetSpringAnimator,
  finishBottomSheetClose,
  shouldCloseBottomSheet,
  settleBottomSheetPosition,
  updateBottomSheetPosition,
} from "./BottomSheet";

describe("BottomSheet", () => {
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

  it("clamps pan translation within sheet bounds", () => {
    expect(clampBottomSheetTranslateY(300, 50, 200, 1000)).toBe(200);
    expect(clampBottomSheetTranslateY(100, -200, 200, 1000)).toBe(0);
    expect(clampBottomSheetTranslateY(100, 500, 200, 1000)).toBe(200);
  });

  it("uses the default screen height when one is not provided to the clamp helper", () => {
    expect(clampBottomSheetTranslateY(100, 25, 50)).toBe(50);
  });

  it("decides when a drag should close the sheet", () => {
    expect(shouldCloseBottomSheet(101, 500)).toBe(true);
    expect(shouldCloseBottomSheet(100, 500)).toBe(false);
  });

  it("updates the shared translation value during a drag", () => {
    const translateY = { value: 300 };
    const startY = { value: 300 };

    expect(updateBottomSheetPosition(translateY, startY, 50, 200, 1000)).toBe(200);
    expect(translateY.value).toBe(200);
  });

  it("uses the default screen height when updating the shared position", () => {
    const translateY = { value: 300 };
    const startY = { value: 300 };

    expect(updateBottomSheetPosition(translateY, startY, 25, 200)).toBe(200);
  });

  it("captures the starting translation before the drag begins", () => {
    const translateY = { value: 40 };
    const startY = { value: 0 };
    const handler = createBottomSheetPanStartHandler(translateY, startY);

    handler();

    expect(startY.value).toBe(40);
  });

  it("creates a pan update handler that updates the shared value", () => {
    const translateY = { value: 40 };
    const startY = { value: 40 };
    const handler = createBottomSheetPanUpdateHandler(translateY, startY, 200, 1000);

    handler({ translationY: 75 });

    expect(translateY.value).toBe(115);
  });

  it("does not compound cumulative gesture translation across updates", () => {
    const translateY = { value: 40 };
    const startY = { value: 40 };
    const handler = createBottomSheetPanUpdateHandler(translateY, startY, 200, 1000);

    handler({ translationY: 20 });
    handler({ translationY: 30 });

    expect(translateY.value).toBe(70);
  });

  it("settles to closed and calls onClose when threshold is crossed", () => {
    const translateY = { value: 420 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number) => value);

    expect(settleBottomSheetPosition(translateY, 250, 500, animateTo, onClose)).toBe("closed");
    expect(animateTo).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("settles back to the collapsed snap point when the drag ends near the default height", () => {
    const translateY = { value: 260 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number) => value);

    expect(settleBottomSheetPosition(translateY, 250, 500, animateTo, onClose)).toBe("collapsed");
    expect(translateY.value).toBe(250);
    expect(onClose).not.toHaveBeenCalled();
    expect(animateTo).toHaveBeenCalledWith(250);
  });

  it("settles up to expanded when the drag ends above the collapsed snap point", () => {
    const translateY = { value: 80 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number) => value);

    expect(settleBottomSheetPosition(translateY, 250, 500, animateTo, onClose)).toBe("expanded");
    expect(translateY.value).toBe(0);
    expect(onClose).not.toHaveBeenCalled();
    expect(animateTo).toHaveBeenCalledWith(0);
  });

  it("creates a pan end handler that closes through the supplied animation callback", () => {
    const translateY = { value: 420 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number) => value);
    const handler = createBottomSheetPanEndHandler(translateY, 250, 500, animateTo, onClose);

    handler();

    expect(animateTo).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("animates with the spring helper without passing a completion callback", () => {
    const spring = jest.fn((value: number) => value);

    expect(animateBottomSheetWithSpring(spring as any, 320)).toBe(320);
    expect(spring).toHaveBeenCalledWith(320, {});
  });

  it("creates a spring animator from the provided spring function", () => {
    const spring = jest.fn((value: number) => value);
    const animator = createBottomSheetSpringAnimator(spring);

    expect(animator(250)).toBe(250);
    expect(spring).toHaveBeenCalledWith(250, {});
  });

  it("finishes a close only when the animation reports success", () => {
    const onClose = jest.fn();

    finishBottomSheetClose(false, onClose);
    finishBottomSheetClose(true, onClose);

    expect(onClose).toHaveBeenCalledTimes(1);
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
