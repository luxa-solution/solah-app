import { render } from "@testing-library/react-native";
import React from "react";

import { SolahTimeScreen } from "./SolahTimeScreen";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 24, top: 0, left: 0, right: 0 }),
}));

jest.mock("expo-router", () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
}));

describe("SolahTimeScreen", () => {
  it("renders the screen title", () => {
    const screen = render(<SolahTimeScreen />);

    expect(screen.getByText("Solah time")).toBeTruthy();
  });

  it("renders Find Qibla Direction button", () => {
    const screen = render(<SolahTimeScreen />);

    expect(screen.getByText("Find Qibla Direction")).toBeTruthy();
  });
});
