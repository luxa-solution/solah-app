import {
  animateBottomSheetWithSpring,
  createBottomSheetSpringAnimator,
  finishBottomSheetClose,
} from "./BottomSheet";

describe("BottomSheet animation helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
