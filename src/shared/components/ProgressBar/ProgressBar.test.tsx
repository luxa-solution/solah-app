import { render } from "@testing-library/react-native";
import { Animated } from "react-native";

import { ProgressBar } from "./ProgressBar";

describe("ProgressBar", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("animates using the provided percentage when it is in range", () => {
    const start = jest.fn();
    const timingSpy = jest
      .spyOn(Animated, "timing")
      .mockReturnValue({ start } as unknown as Animated.CompositeAnimation);

    render(<ProgressBar percent={45} />);

    expect(timingSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        toValue: 45,
        duration: 500,
        useNativeDriver: false,
      })
    );
    expect(start).toHaveBeenCalled();
  });

  it("clamps values below zero", () => {
    const timingSpy = jest
      .spyOn(Animated, "timing")
      .mockReturnValue({ start: jest.fn() } as unknown as Animated.CompositeAnimation);

    render(<ProgressBar percent={-5} />);

    expect(timingSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ toValue: 0 })
    );
  });

  it("clamps values above one hundred", () => {
    const timingSpy = jest
      .spyOn(Animated, "timing")
      .mockReturnValue({ start: jest.fn() } as unknown as Animated.CompositeAnimation);

    render(<ProgressBar percent={150} />);

    expect(timingSpy).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ toValue: 100 })
    );
  });
});
