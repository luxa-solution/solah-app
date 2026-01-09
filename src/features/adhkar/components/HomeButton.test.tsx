import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { HomeButton } from "./HomeButton";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("HomeButton (critical behavior)", () => {
  beforeEach(() => mockPush.mockClear());

  it("renders counts", () => {
    const { getByText } = render(
      <HomeButton
        category={"Morning" as any}
        subCount={2}
        adhkarCount={11}
        image={1 as any}
        href="/adhkar"
      />
    );

    expect(getByText("2 Sub-categories • 11 Adhkar")).toBeTruthy();
  });

  it("navigates to href when pressed", () => {
    const { getByText } = render(
      <HomeButton
        category={"Morning" as any}
        subCount={0}
        adhkarCount={0}
        image={1 as any}
        href="/adhkar"
      />
    );

    fireEvent.press(getByText("Morning"));
    expect(mockPush).toHaveBeenCalledWith("/adhkar");
  });
});
