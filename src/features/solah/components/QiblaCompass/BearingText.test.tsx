import { render } from "@testing-library/react-native";
import React from "react";

import { BearingText } from "./BearingText";

describe("BearingText", () => {
  it("renders formatted bearing with 2 decimals", () => {
    const { getByText } = render(<BearingText qiblaBearing={12.3456} />);

    expect(getByText("Qibla 12.35° from the North")).toBeTruthy();
  });

  it("renders distance text only when distanceKm is provided", () => {
    const { queryByText, rerender, getByText } = render(<BearingText qiblaBearing={10} />);

    expect(queryByText(/Distance to Ka‘bah/i)).toBeNull();

    rerender(<BearingText qiblaBearing={10} distanceKm={123} />);
    expect(getByText("Distance to Ka‘bah 123 km")).toBeTruthy();
  });
});
