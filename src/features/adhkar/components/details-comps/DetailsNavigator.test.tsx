import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import type { AdhkarItem } from "@/features-adhkar/types";

import { DetailsNavigator } from "./DetailsNavigator";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/features-adhkar/data", () => ({
  totalAdhkarAmt: {
    morning: 3,
    evening: 3,
  },
}));

describe("DetailsNavigator (critical behavior)", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("navigates to previous when id > 1", () => {
    const item: AdhkarItem = {
      id: "2",
      title: "Adhkar 2",
      type: "morning" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsNavigator item={item} />);

    fireEvent.press(getByLabelText("previous"));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/adhkar/details",
      params: { adhkar_type: "morning", id: "1" },
    });
  });

  it("does not navigate to previous when id === 1", () => {
    const item: AdhkarItem = {
      id: "1",
      title: "Adhkar 1",
      type: "morning" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsNavigator item={item} />);

    fireEvent.press(getByLabelText("previous"));
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("navigates to next when id < total", () => {
    const item: AdhkarItem = {
      id: "2",
      title: "Adhkar 2",
      type: "morning" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsNavigator item={item} />);

    fireEvent.press(getByLabelText("next"));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/adhkar/details",
      params: { adhkar_type: "morning", id: "3" },
    });
  });

  it("does not navigate to next when id === total", () => {
    const item: AdhkarItem = {
      id: "3",
      title: "Adhkar 3",
      type: "morning" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsNavigator item={item} />);

    fireEvent.press(getByLabelText("next"));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
