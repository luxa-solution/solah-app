import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Text } from "react-native";

import {
  animateBottomSheetWithSpring,
  BottomSheet,
  clampBottomSheetTranslateY,
  createBottomSheetCloseScheduler,
  createBottomSheetPanEndHandler,
  createBottomSheetPanUpdateHandler,
  createBottomSheetSpringAnimator,
  finishBottomSheetClose,
  scheduleBottomSheetClose,
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
    expect(clampBottomSheetTranslateY(300, 50, 200, 1000)).toBe(350);
    expect(clampBottomSheetTranslateY(300, -200, 200, 1000)).toBe(200);
    expect(clampBottomSheetTranslateY(900, 500, 200, 1000)).toBe(1000);
  });

  it("uses the default screen height when one is not provided to the clamp helper", () => {
    expect(clampBottomSheetTranslateY(100, 25, 50)).toBeGreaterThanOrEqual(125);
  });

  it("decides when a drag should close the sheet", () => {
    expect(shouldCloseBottomSheet(101, 500)).toBe(true);
    expect(shouldCloseBottomSheet(100, 500)).toBe(false);
  });

  it("updates the shared translation value during a drag", () => {
    const translateY = { value: 300 };

    expect(updateBottomSheetPosition(translateY, 50, 200, 1000)).toBe(350);
    expect(translateY.value).toBe(350);
  });

  it("uses the default screen height when updating the shared position", () => {
    const translateY = { value: 300 };

    expect(updateBottomSheetPosition(translateY, 25, 200)).toBeGreaterThanOrEqual(325);
  });

  it("creates a pan update handler that updates the shared value", () => {
    const translateY = { value: 250 };
    const handler = createBottomSheetPanUpdateHandler(translateY, 200, 1000);

    handler({ translationY: 75 });

    expect(translateY.value).toBe(325);
  });

  it("settles to closed and calls onClose when threshold is crossed", () => {
    const translateY = { value: 150 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number, onFinished?: (finished: boolean) => void) => {
      onFinished?.(true);
      return value;
    });

    expect(settleBottomSheetPosition(translateY, 500, animateTo, onClose)).toBe("closed");
    expect(animateTo).toHaveBeenCalledWith(500, expect.any(Function));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when the settle animation reports unfinished", () => {
    const translateY = { value: 150 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number, onFinished?: (finished: boolean) => void) => {
      onFinished?.(false);
      return value;
    });

    expect(settleBottomSheetPosition(translateY, 500, animateTo, onClose)).toBe("closed");
    expect(onClose).not.toHaveBeenCalled();
  });

  it("settles back to open when threshold is not crossed", () => {
    const translateY = { value: 80 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number) => value);

    expect(settleBottomSheetPosition(translateY, 500, animateTo, onClose)).toBe("open");
    expect(translateY.value).toBe(0);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("creates a pan end handler that closes through the supplied animation callback", () => {
    const translateY = { value: 150 };
    const onClose = jest.fn();
    const animateTo = jest.fn((value: number, onFinished?: (finished: boolean) => void) => {
      onFinished?.(true);
      return value;
    });
    const handler = createBottomSheetPanEndHandler(translateY, 500, animateTo, onClose);

    handler();

    expect(animateTo).toHaveBeenCalledWith(500, expect.any(Function));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("wraps the spring callback and forwards the finished state", () => {
    const spring = jest.fn(
      (value: number, _config: object, callback: (finished: boolean) => void) => {
        callback(true);
        return value;
      }
    );
    const onFinished = jest.fn();

    expect(animateBottomSheetWithSpring(spring, 320, onFinished)).toBe(320);
    expect(onFinished).toHaveBeenCalledWith(true);
  });

  it("schedules the close callback through the provided scheduler", () => {
    const scheduler = jest.fn((fn: () => void) => fn());
    const onClose = jest.fn();

    scheduleBottomSheetClose(scheduler, onClose);

    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("creates a spring animator from the provided spring function", () => {
    const spring = jest.fn(
      (value: number, _config: object, callback: (finished: boolean) => void) => {
        callback(false);
        return value;
      }
    );
    const onFinished = jest.fn();
    const animator = createBottomSheetSpringAnimator(spring);

    expect(animator(250, onFinished)).toBe(250);
    expect(onFinished).toHaveBeenCalledWith(false);
  });

  it("creates a close scheduler wrapper", () => {
    const scheduler = jest.fn((fn: () => void) => fn());
    const onClose = jest.fn();
    const close = createBottomSheetCloseScheduler(scheduler, onClose);

    close();

    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
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
