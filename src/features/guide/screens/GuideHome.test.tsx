import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { GuideHome } from "./GuideHome";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/features-solah/data", () => ({
  solahNames: ["Subhi", "Dhuhr"],
  solahGuides: {
    Subhi: {
      solah: "Subhi",
      description: { en: "Dawn solah" },
      rakaat: 2,
      illustration: null,
      items: [],
    },
    Dhuhr: {
      solah: "Dhuhr",
      description: { en: "Midday solah" },
      rakaat: 4,
      illustration: null,
      items: [],
    },
  },
}));

describe("GuideHome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Solah Guide title", () => {
    const { getByText } = render(<GuideHome />);

    expect(getByText("Solah Guide")).toBeTruthy();
  });

  it("renders a button for each solah name", () => {
    const { getByText } = render(<GuideHome />);

    expect(getByText("Subhi • Dawn solah")).toBeTruthy();
    expect(getByText("Dhuhr • Midday solah")).toBeTruthy();
  });

  it("navigates to the correct guide route when a solah button is pressed", () => {
    const { getByText } = render(<GuideHome />);

    fireEvent.press(getByText("Subhi • Dawn solah"));

    expect(mockPush).toHaveBeenCalledWith("/guide/Subhi");
  });
});
