import { render } from "@testing-library/react-native";

import { SheetTitle } from "./SheetTitle";

describe("SheetTitle", () => {
  it("shows the correct title for a settings type", () => {
    const { getByText } = render(<SheetTitle settings_type="timezone" />);

    expect(getByText("Time Zone")).toBeTruthy();
  });
});
