import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";

import { useDefaultStore, useSettingsStore } from "@/features-settings/store";
import type { BottomSheetProps } from "@/shared/components/BottomSheet";

import { SettingsHome } from "./SettingsHome";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 12, top: 0, left: 0, right: 0 }),
}));

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");

  return {
    Ionicons: (props: object) => <Text {...props}>Ionicon</Text>,
  };
});

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

jest.mock("@/shared/components", () => {
  const actual = jest.requireActual("@/shared/components");
  const { Pressable, View } = require("react-native");

  return {
    ...actual,
    BottomSheet: ({ isOpen, onClose, children }: BottomSheetProps) =>
      isOpen ? (
        <View testID="bottom-sheet">
          <Pressable accessibilityLabel="Close sheet" onPress={onClose} />
          {children}
        </View>
      ) : null,
  };
});

const initialSettingsState = useSettingsStore.getState();
const initialDefaultState = useDefaultStore.getState();

describe("SettingsHome integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
    useDefaultStore.setState(initialDefaultState, true);
  });

  it("updates the language through the real sheet flow", async () => {
    const screen = render(<SettingsHome />);

    fireEvent.press(screen.getByText("Language"));

    expect(screen.getByTestId("bottom-sheet")).toBeTruthy();
    expect(screen.getByPlaceholderText("Search")).toBeTruthy();

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "English");
    fireEvent.press(screen.getByText("English"));

    await waitFor(() => {
      expect(useSettingsStore.getState().language.value).toBe("English");
    });

    expect(screen.queryByPlaceholderText("Search")).toBeNull();
    expect(screen.getByText("English")).toBeTruthy();
  });

  it("updates the calculation method through the real sheet flow", async () => {
    const screen = render(<SettingsHome />);

    fireEvent.press(screen.getByText("Calculation method"));

    expect(screen.getByPlaceholderText("Search")).toBeTruthy();

    fireEvent.changeText(screen.getByPlaceholderText("Search"), "Karachi");
    fireEvent.press(screen.getByText("Karachi"));

    await waitFor(() => {
      expect(useSettingsStore.getState().calculationMethod.method).toBe("Karachi");
    });

    expect(screen.queryByPlaceholderText("Search")).toBeNull();
    expect(screen.getByText("Karachi")).toBeTruthy();
  });
});
