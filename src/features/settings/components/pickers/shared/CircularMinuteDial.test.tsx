import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { CircularMinuteDial } from "./CircularMinuteDial";

describe("CircularMinuteDial", () => {
  it("renders the current minute value", () => {
    const { getByText } = render(<CircularMinuteDial value={25} onChange={jest.fn()} />);

    expect(getByText("25")).toBeTruthy();
    expect(getByText("minutes")).toBeTruthy();
  });

  it("converts responder gestures into snapped minute updates", () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<CircularMinuteDial value={25} onChange={onChange} />);

    fireEvent(getByTestId("iqamah-minute-dial"), "responderGrant", {
      nativeEvent: { locationX: 110, locationY: 8 },
    });
    fireEvent(getByTestId("iqamah-minute-dial"), "responderMove", {
      nativeEvent: { locationX: 110, locationY: 212 },
    });

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toBeGreaterThanOrEqual(5);
    expect(onChange.mock.calls.at(-1)?.[0]).toBeLessThanOrEqual(60);
  });
});
