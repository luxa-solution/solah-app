import { render } from "@testing-library/react-native";
import React from "react";

import { SheetBody } from "./SheetBody";

const mockOnClose = jest.fn();

jest.mock("@/features-settings/components/pickers", () => {
  const { Text } = require("react-native");

  return {
    CalculationMethod: ({ onClose }: any) => <Text onPress={onClose}>CalculationMethod</Text>,
    Location: ({ onClose }: any) => <Text onPress={onClose}>Location</Text>,
    TimeZone: ({ onClose }: any) => <Text onPress={onClose}>TimeZone</Text>,
    ArabicFontSize: ({ onClose }: any) => <Text onPress={onClose}>ArabicFontSize</Text>,
    ArabicFontStyle: ({ onClose }: any) => <Text onPress={onClose}>ArabicFontStyle</Text>,
    Language: ({ onClose }: any) => <Text onPress={onClose}>Language</Text>,
    SolahTimeNotification: () => <Text>SolahTimeNotification</Text>,
    Sound: ({ onClose }: any) => <Text onPress={onClose}>Sound</Text>,
    CalendarFormat: ({ onClose }: any) => <Text onPress={onClose}>CalendarFormat</Text>,
    TimeFormat: ({ onClose }: any) => <Text onPress={onClose}>TimeFormat</Text>,
  };
});

describe("SheetBody", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders CalculationMethod for calmethod", () => {
    const { getByText } = render(<SheetBody settings_type="calmethod" onClose={mockOnClose} />);
    expect(getByText("CalculationMethod")).toBeTruthy();
  });

  it("renders TimeZone for timezone", () => {
    const { getByText } = render(<SheetBody settings_type="timezone" onClose={mockOnClose} />);
    expect(getByText("TimeZone")).toBeTruthy();
  });

  it("renders Location for location", () => {
    const { getByText } = render(<SheetBody settings_type="location" onClose={mockOnClose} />);
    expect(getByText("Location")).toBeTruthy();
  });

  it("renders ArabicFontSize for arabicfontsize", () => {
    const { getByText } = render(
      <SheetBody settings_type="arabicfontsize" onClose={mockOnClose} />
    );
    expect(getByText("ArabicFontSize")).toBeTruthy();
  });

  it("renders ArabicFontStyle for arabicfontstyle", () => {
    const { getByText } = render(
      <SheetBody settings_type="arabicfontstyle" onClose={mockOnClose} />
    );
    expect(getByText("ArabicFontStyle")).toBeTruthy();
  });

  it("renders SolahTimeNotification for solahtimenotif", () => {
    const { getByText } = render(
      <SheetBody settings_type="solahtimenotif" onClose={mockOnClose} />
    );
    expect(getByText("SolahTimeNotification")).toBeTruthy();
  });

  it("renders Sound for sound", () => {
    const { getByText } = render(<SheetBody settings_type="sound" onClose={mockOnClose} />);
    expect(getByText("Sound")).toBeTruthy();
  });

  it("renders Language for language", () => {
    const { getByText } = render(<SheetBody settings_type="language" onClose={mockOnClose} />);
    expect(getByText("Language")).toBeTruthy();
  });

  it("renders CalendarFormat for calendarformat", () => {
    const { getByText } = render(
      <SheetBody settings_type="calendarformat" onClose={mockOnClose} />
    );
    expect(getByText("CalendarFormat")).toBeTruthy();
  });

  it("renders TimeFormat for timeformat", () => {
    const { getByText } = render(<SheetBody settings_type="timeformat" onClose={mockOnClose} />);
    expect(getByText("TimeFormat")).toBeTruthy();
  });

  it("returns null for unknown settings type", () => {
    // @ts-expect-error - intentionally testing default branch
    const { toJSON } = render(<SheetBody settings_type="unknown" />);
    expect(toJSON()).toBeNull();
  });

  it("forwards onClose to pickers that accept it", () => {
    const { getByText } = render(<SheetBody settings_type="calmethod" onClose={mockOnClose} />);
    const { fireEvent } = require("@testing-library/react-native");
    fireEvent.press(getByText("CalculationMethod"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
