import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useAdhkarStore } from "@/features-adhkar/store";

import { TitleBar } from "./TitleBar";

jest.mock("expo-router", () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Text, View, Pressable } = require("react-native");

  return {
    Appbar: {
      Header: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
        React.createElement(View, props, children),
      BackAction: ({ onPress }: { onPress: () => void }) =>
        React.createElement(Pressable, { onPress, accessibilityLabel: "Back" }, "Back"),
      Content: ({ title }: { title: string }) => React.createElement(Text, null, title),
      Action: ({
        icon,
        onPress,
        accessibilityLabel,
      }: {
        icon: string;
        onPress: () => void;
        accessibilityLabel: string;
      }) =>
        React.createElement(
          Pressable,
          { onPress, accessibilityLabel },
          React.createElement(Text, null, icon)
        ),
    },
  };
});

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useAdhkarStore.getState();

describe("Adhkar TitleBar wrapper", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAdhkarStore.setState(initialState, true);
  });

  it("renders 'Before Prayer' title for before type", () => {
    const { getByText } = render(<TitleBar adhkar_type={"before" as any} />);
    expect(getByText("Before Prayer")).toBeTruthy();
  });

  it("renders 'During Prayer' title for during type", () => {
    const { getByText } = render(<TitleBar adhkar_type={"during" as any} />);
    expect(getByText("During Prayer")).toBeTruthy();
  });

  it("renders 'After Prayer' title for after type", () => {
    const { getByText } = render(<TitleBar adhkar_type={"after" as any} />);
    expect(getByText("After Prayer")).toBeTruthy();
  });

  it("does not show bookmark when adhkarItem is missing", () => {
    const { getByText, queryByLabelText } = render(
      <TitleBar adhkar_type={"before" as any} showBookmark />
    );

    expect(getByText("Before Prayer")).toBeTruthy();
    // No bookmark button because adhkarItem is absent
    expect(queryByLabelText("Add bookmark")).toBeNull();
    expect(queryByLabelText("Remove bookmark")).toBeNull();
  });

  it("does not show bookmark when showBookmark is false even with item", () => {
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;

    const { queryByLabelText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark={false} />
    );

    expect(queryByLabelText("Add bookmark")).toBeNull();
    expect(queryByLabelText("Remove bookmark")).toBeNull();
  });

  it("shows bookmark when item is provided and showBookmark is true", () => {
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;

    const { getByLabelText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark />
    );

    expect(getByLabelText("Add bookmark")).toBeTruthy();
  });

  it("toggles bookmark when item is provided and showBookmark is true", () => {
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;

    const { getByLabelText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark />
    );

    fireEvent.press(getByLabelText("Add bookmark"));
    expect(useAdhkarStore.getState().bookmarkIds).toContain("before-1");
  });

  it("does not call toggleBookmark when no item is provided", () => {
    const { queryByLabelText } = render(<TitleBar adhkar_type={"before" as any} showBookmark />);

    expect(queryByLabelText("Add bookmark")).toBeNull();
  });

  it("reflects isBookmarked true from store", () => {
    const item = { id: "1", type: "before", title: "T", entries: [], illustration: null } as any;
    useAdhkarStore.setState({ bookmarkIds: ["before-1"] });

    const { getByLabelText } = render(
      <TitleBar adhkar_type={"before" as any} adhkarItem={item} showBookmark />
    );

    expect(getByLabelText("Remove bookmark")).toBeTruthy();
  });

  it("reflects isBookmarked false when item is absent", () => {
    useAdhkarStore.setState({ bookmarkIds: ["before-1"] });

    const { queryByLabelText } = render(<TitleBar adhkar_type={"before" as any} />);

    expect(queryByLabelText("Remove bookmark")).toBeNull();
    expect(queryByLabelText("Add bookmark")).toBeNull();
  });
});
