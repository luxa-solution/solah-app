import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { totalAdhkarAmt } from "@/features-adhkar/data";
import type { AdhkarItem } from "@/features-adhkar/types";

import { DetailsNavigator } from "./DetailsNavigator";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
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
    const beforeTotal = totalAdhkarAmt.before;

    expect(beforeTotal).toBeGreaterThan(1);

    const item: AdhkarItem = {
      id: "1",
      title: "Adhkar 1",
      type: "before" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsNavigator item={item} />);

    fireEvent.press(getByLabelText("next"));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/adhkar/details",
      params: { adhkar_type: "before", id: "2" },
    });
  });

  it("does not navigate to next when id equals total", () => {
    const beforeTotal = totalAdhkarAmt.before;
    const item: AdhkarItem = {
      id: String(beforeTotal),
      title: "Last Adhkar",
      type: "before" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsNavigator item={item} />);

    fireEvent.press(getByLabelText("next"));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
