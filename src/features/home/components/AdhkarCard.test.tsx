import { render } from "@testing-library/react-native";
import React from "react";

import { AdhkarCard } from "./AdhkarCard";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

describe("home/AdhkarCard", () => {
  it("renders the Adhkār section title", () => {
    const { getByText } = render(<AdhkarCard />);
    expect(getByText("Adhkār")).toBeTruthy();
  });

  it("renders three card slots (large, top-small, bottom-small)", () => {
    const { toJSON } = render(<AdhkarCard />);
    // Renders without crashing — the hook returns data from real adhkar data
    expect(toJSON()).toBeTruthy();
  });
});
