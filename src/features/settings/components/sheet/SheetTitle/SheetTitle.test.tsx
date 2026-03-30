import { render } from "@testing-library/react-native";

import { SheetTitle } from "./SheetTitle";

describe("SheetTitle", () => {
  it("shows 'Calculation Method' for calmethod", () => {
    const { getByText } = render(<SheetTitle settings_type="calmethod" />);
    expect(getByText("Calculation Method")).toBeTruthy();
  });

  it("shows 'Time Zone' for timezone", () => {
    const { getByText } = render(<SheetTitle settings_type="timezone" />);
    expect(getByText("Time Zone")).toBeTruthy();
  });

  it("shows 'Location' for location", () => {
    const { getByText } = render(<SheetTitle settings_type="location" />);
    expect(getByText("Location")).toBeTruthy();
  });

  it("shows 'Arabic Font Size' for arabicfontsize", () => {
    const { getByText } = render(<SheetTitle settings_type="arabicfontsize" />);
    expect(getByText("Arabic Font Size")).toBeTruthy();
  });

  it("shows 'Arabic Font Style' for arabicfontstyle", () => {
    const { getByText } = render(<SheetTitle settings_type="arabicfontstyle" />);
    expect(getByText("Arabic Font Style")).toBeTruthy();
  });

  it("shows 'Solah Time Notification' for solahtimenotif", () => {
    const { getByText } = render(<SheetTitle settings_type="solahtimenotif" />);
    expect(getByText("Solah Time Notification")).toBeTruthy();
  });

  it("shows 'Sound' for sound", () => {
    const { getByText } = render(<SheetTitle settings_type="sound" />);
    expect(getByText("Sound")).toBeTruthy();
  });

  it("shows 'Language' for language", () => {
    const { getByText } = render(<SheetTitle settings_type="language" />);
    expect(getByText("Language")).toBeTruthy();
  });

  it("shows 'Calendar Format' for calendarformat", () => {
    const { getByText } = render(<SheetTitle settings_type="calendarformat" />);
    expect(getByText("Calendar Format")).toBeTruthy();
  });

  it("shows 'Time Format' for timeformat", () => {
    const { getByText } = render(<SheetTitle settings_type="timeformat" />);
    expect(getByText("Time Format")).toBeTruthy();
  });

  it("shows 'Customize Notifications' for customizenotifications", () => {
    const { getByText } = render(<SheetTitle settings_type="customizenotifications" />);
    expect(getByText("Customize Notifications")).toBeTruthy();
  });

  it("shows prayer adhan and iqamah titles", () => {
    const adhanSettings = render(<SheetTitle settings_type="adhansettings" />);
    expect(adhanSettings.getByText("Adhan Settings")).toBeTruthy();

    const iqamahSettings = render(<SheetTitle settings_type="iqamahsettings" />);
    expect(iqamahSettings.getByText("Iqamah Settings")).toBeTruthy();

    const adhan = render(<SheetTitle settings_type="adhan_dhuhr" />);
    expect(adhan.getByText("Dhuhr Adhan")).toBeTruthy();

    const iqamah = render(<SheetTitle settings_type="iqamah_maghrib" />);
    expect(iqamah.getByText("Maghrib Iqamah")).toBeTruthy();
  });
});
