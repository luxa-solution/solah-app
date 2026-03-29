import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { GuideHome } from "./GuideHome";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

const mockBack = jest.fn();
const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
    replace: jest.fn(),
  }),
}));

jest.mock("@/features-solah/data", () => ({
  solahNames: ["Subhi", "Dhuhr"],
  solahGuides: {
    Subhi: {
      solah: "Subhi",
      description: { en: "Dawn prayer" },
      rakaat: 2,
      illustration: 1,
      items: [],
    },
    Dhuhr: {
      solah: "Dhuhr",
      description: { en: "Noon prayer" },
      rakaat: 4,
      illustration: 1,
      items: [],
    },
  },
}));

describe("GuideHome integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the real guide buttons and routes from a button press", () => {
    const screen = render(<GuideHome />);

    expect(screen.getByText("Solah Guide")).toBeTruthy();
    expect(screen.getByText("Subhi • Dawn prayer")).toBeTruthy();
    expect(screen.getByText("Dhuhr • Noon prayer")).toBeTruthy();
    expect(screen.getByText("2 Raka’at")).toBeTruthy();

    fireEvent.press(screen.getByText("Subhi • Dawn prayer"));

    expect(mockPush).toHaveBeenCalledWith("/guide/Subhi");
  });
});
