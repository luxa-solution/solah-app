import { render } from "@testing-library/react-native";
import React from "react";

import { SheetBody } from "./SheetBody";

jest.mock("@/features-settings/components/pickers", () => {
  const { Text } = require("react-native");

  return {
    CalculationMethod: () => <Text>CalculationMethod</Text>,
    Location: () => <Text>Location</Text>,
    TimeZone: () => <Text>TimeZone</Text>,
    ArabicFontSize: () => <Text>ArabicFontSize</Text>,
    ArabicFontStyle: () => <Text>ArabicFontStyle</Text>,
    Language: () => <Text>Language</Text>,
    SolahTimeNotification: () => <Text>SolahTimeNotification</Text>,
    Sound: () => <Text>Sound</Text>,
    CalendarFormat: () => <Text>CalendarFormat</Text>,
    TimeFormat: () => <Text>TimeFormat</Text>,
  };
});

describe("SheetBody", () => {
  it("renders the correct picker for a known settings type", () => {
    const { getByText } = render(<SheetBody settings_type="language" />);
    expect(getByText("Language")).toBeTruthy();
  });

  it("returns null for unknown settings type", () => {
    // @ts-expect-error - intentionally testing default branch
    const { toJSON } = render(<SheetBody settings_type="unknown" />);
    expect(toJSON()).toBeNull();
  });
});
