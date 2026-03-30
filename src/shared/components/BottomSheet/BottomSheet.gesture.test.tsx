import {
  clampBottomSheetTranslateY,
  createBottomSheetPanEndHandler,
  createBottomSheetPanStartHandler,
  createBottomSheetPanUpdateHandler,
  settleBottomSheetPosition,
  shouldCloseBottomSheet,
  updateBottomSheetPosition,
} from "./BottomSheet";

describe("BottomSheet gesture helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
