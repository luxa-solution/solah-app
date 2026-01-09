import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import type { SolahGroup } from "@/features-solah/types";

import { SolahButton } from "./SolahButton";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("SolahButton (critical behavior)", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("navigates to the correct guide route when pressed", () => {
    const data: SolahGroup = {
      solah: "Fajr" as any,
      description: { en: "Dawn prayer" } as any,
      illustration: 1 as any,
      rakaat: 2,
      items: [],
    } as any;

    const { getByText } = render(<SolahButton data={data} />);

    // Press on visible text inside TouchableOpacity
    fireEvent.press(getByText("Fajr • Dawn prayer"));

    expect(mockPush).toHaveBeenCalledWith("/guide/Fajr");
  });
});
