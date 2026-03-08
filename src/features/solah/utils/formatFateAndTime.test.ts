import { formatTime, formatDate } from "./formatDateAndTime";

describe("formatTime", () => {
  const originalDTF = Intl.DateTimeFormat;

  afterEach(() => {
    Intl.DateTimeFormat = originalDTF;
    jest.restoreAllMocks();
  });

  it("returns HH:MM for 24hr", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "09" },
        { type: "minute", value: "30" },
      ],
    }));

    expect(formatTime(new Date(), "Asia/Riyadh" as any, "24hr")).toBe("09:30");
  });

  it("returns HH:MM AM/PM for 12hr", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "09" },
        { type: "minute", value: "30" },
        { type: "dayPeriod", value: "AM" },
      ],
    }));

    expect(formatTime(new Date(), "Asia/Riyadh" as any, "12hr")).toBe("09:30 AM");
  });
});

describe("formatDate", () => {
  const originalDTF = Intl.DateTimeFormat;

  afterEach(() => {
    Intl.DateTimeFormat = originalDTF;
    jest.restoreAllMocks();
  });

  it("returns 'day month, year' for full", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "day", value: "4" },
        { type: "month", value: "Rajab" },
        { type: "year", value: "1447" },
      ],
    }));

    expect(formatDate(new Date(), "hijri", "en-US", "full")).toBe("4 Rajab, 1447");
  });

  it("returns 'day/month/year' for collapse", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "day", value: "4" },
        { type: "month", value: "7" },
        { type: "year", value: "1447" },
      ],
    }));

    expect(formatDate(new Date(), "hijri", "en-US", "collapse")).toBe("4/7/1447");
  });
});
