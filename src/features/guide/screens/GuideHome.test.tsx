import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import type { SolahButtonProps } from "@/features-guide/components/SolahButton";
import type { TitleBarProps } from "@/shared/components/TitleBar";

import { GuideHome } from "./GuideHome";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/shared/components", () => {
  const { Text } = require("react-native");
  return {
    TitleBar: ({ title }: TitleBarProps) => <Text>{title}</Text>,
  };
});

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

jest.mock("@/features-guide/components", () => {
  const { Text, TouchableOpacity } = require("react-native");
  return {
    SolahButton: ({ data }: SolahButtonProps) => (
      <TouchableOpacity
        accessibilityLabel={`solah-btn-${data.solah}`}
        onPress={() => {
          mockPush(`/guide/${data.solah}`);
        }}
      >
        <Text>
          {data.solah} • {data.rakaat}
        </Text>
      </TouchableOpacity>
    ),
  };
});

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

    expect(getByText("Subhi • 2")).toBeTruthy();
    expect(getByText("Dhuhr • 4")).toBeTruthy();
  });

  it("navigates to the correct guide route when a solah button is pressed", () => {
    const { getByLabelText } = render(<GuideHome />);

    fireEvent.press(getByLabelText("solah-btn-Subhi"));

    expect(mockPush).toHaveBeenCalledWith("/guide/Subhi");
  });
});
