import { fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { useSettingsStore } from "@/features-settings/store";

import { SheetBody } from "./SheetBody";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const mockOnClose = jest.fn();

const initialSettingsState = useSettingsStore.getState();

describe("SheetBody", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSettingsStore.setState(initialSettingsState, true);
  });

  it("renders CalculationMethod picker for calmethod", () => {
    const { getByPlaceholderText } = render(
      <SheetBody settings_type="calmethod" onClose={mockOnClose} />
    );
    expect(getByPlaceholderText("Search")).toBeTruthy();
  });

  it("renders Language picker for language", () => {
    const { getByPlaceholderText } = render(
      <SheetBody settings_type="language" onClose={mockOnClose} />
    );
    expect(getByPlaceholderText("Search")).toBeTruthy();
  });

  it("renders ArabicFontSize picker for arabicfontsize", () => {
    const { toJSON } = render(<SheetBody settings_type="arabicfontsize" onClose={mockOnClose} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders ArabicFontStyle picker for arabicfontstyle", () => {
    const { toJSON } = render(<SheetBody settings_type="arabicfontstyle" onClose={mockOnClose} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders TimeZone picker for timezone", () => {
    const { getByPlaceholderText } = render(
      <SheetBody settings_type="timezone" onClose={mockOnClose} />
    );
    expect(getByPlaceholderText("Search")).toBeTruthy();
  });

  it("renders Location picker for location", () => {
    const { getByPlaceholderText } = render(
      <SheetBody settings_type="location" onClose={mockOnClose} />
    );
    expect(getByPlaceholderText("Search")).toBeTruthy();
  });

  it("renders Sound picker for sound", () => {
    const { toJSON } = render(<SheetBody settings_type="sound" onClose={mockOnClose} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders TimeFormat picker for timeformat", () => {
    const { toJSON } = render(<SheetBody settings_type="timeformat" onClose={mockOnClose} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders CalendarFormat picker for calendarformat", () => {
    const { toJSON } = render(<SheetBody settings_type="calendarformat" onClose={mockOnClose} />);
    expect(toJSON()).toBeTruthy();
  });

  it("renders SolahTimeNotification picker for solahtimenotif", () => {
    const { getByText } = render(
      <SheetBody settings_type="solahtimenotif" onClose={mockOnClose} />
    );
    expect(getByText("On")).toBeTruthy();
    expect(getByText("Off")).toBeTruthy();
  });

  it("renders notification customization controls for customizenotifications", () => {
    const { getByText, getByTestId } = render(
      <SheetBody settings_type="customizenotifications" onClose={mockOnClose} />
    );

    expect(getByText("Solah")).toBeTruthy();
    expect(getByText("Adhan")).toBeTruthy();
    expect(getByText("Iqamah")).toBeTruthy();
    expect(getByTestId("notification-mode-subhi-adhan")).toBeTruthy();
    expect(getByTestId("notification-mode-isha-iqamah")).toBeTruthy();
  });

  it("renders the adhan and iqamah settings sheets", () => {
    const adhanSettings = render(<SheetBody settings_type="adhansettings" onClose={mockOnClose} />);
    expect(adhanSettings.getByText("Dhuhr adhan")).toBeTruthy();

    const iqamahSettings = render(
      <SheetBody settings_type="iqamahsettings" onClose={mockOnClose} />
    );
    expect(iqamahSettings.getByText("Maghrib iqamah")).toBeTruthy();

    const adhan = render(<SheetBody settings_type="adhan_dhuhr" onClose={mockOnClose} />);
    expect(adhan.getByText("At solah time")).toBeTruthy();

    const iqamah = render(<SheetBody settings_type="iqamah_maghrib" onClose={mockOnClose} />);
    expect(iqamah.getByTestId("iqamah-minute-dial")).toBeTruthy();
  });

  it("navigates from prayer settings menus to the prayer-specific editor", () => {
    const onNavigate = jest.fn();
    const { getByText } = render(
      <SheetBody settings_type="adhansettings" onClose={mockOnClose} onNavigate={onNavigate} />
    );

    fireEvent.press(getByText("Dhuhr adhan"));

    expect(onNavigate).toHaveBeenCalledWith("adhan_dhuhr");
  });

  it("returns null for unknown settings type", () => {
    // @ts-expect-error - intentionally testing default branch
    const { toJSON } = render(<SheetBody settings_type="unknown" />);
    expect(toJSON()).toBeNull();
  });
});
