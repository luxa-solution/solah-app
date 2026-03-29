import { render } from "@testing-library/react-native";
import React from "react";

import { AdhkarList } from "./AdhkarList";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 20, top: 0, left: 0, right: 0 }),
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn() }),
}));

describe("AdhkarList", () => {
  it("renders 'Before Prayer' title and list items for before type", () => {
    const { getByText } = render(<AdhkarList adhkar_type="before" />);

    expect(getByText("Before Prayer")).toBeTruthy();
  });

  it("renders 'During Prayer' title for during type", () => {
    const { getByText } = render(<AdhkarList adhkar_type="during" />);

    expect(getByText("During Prayer")).toBeTruthy();
  });

  it("renders 'After Prayer' title for after type", () => {
    const { getByText } = render(<AdhkarList adhkar_type="after" />);

    expect(getByText("After Prayer")).toBeTruthy();
  });
});
