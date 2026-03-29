import { formatTime, formatDate } from "./formatDateAndTime";

describe("formatTime", () => {
  const originalDTF = Intl.DateTimeFormat;

  afterEach(() => {
    (Intl as any).DateTimeFormat = originalDTF;
    jest.restoreAllMocks();
  });

  it("returns HH:MM for 24hr format", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "09" },
        { type: "minute", value: "30" },
      ],
    }));

    expect(formatTime(new Date(), "Asia/Riyadh" as any, "24hr")).toBe("09:30");
  });

  it("returns HH:MM AM/PM for 12hr format", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "09" },
        { type: "minute", value: "30" },
        { type: "dayPeriod", value: "AM" },
      ],
    }));

    expect(formatTime(new Date(), "Asia/Riyadh" as any, "12hr")).toBe("09:30 AM");
  });

  it("defaults to 24hr format when timeFormat is not provided", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "14" },
        { type: "minute", value: "05" },
      ],
    }));

    expect(formatTime(new Date(), "Europe/London" as any)).toBe("14:05");
  });

  it("returns PM period for 12hr format in afternoon", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "02" },
        { type: "minute", value: "15" },
        { type: "dayPeriod", value: "PM" },
      ],
    }));

    expect(formatTime(new Date(), "Asia/Karachi" as any, "12hr")).toBe("02:15 PM");
  });

  it("falls back to 00 for hour when part is missing", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [{ type: "minute", value: "45" }],
    }));

    expect(formatTime(new Date(), "UTC" as any, "24hr")).toBe("00:45");
  });

  it("falls back to 00 for minute when part is missing", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [{ type: "hour", value: "07" }],
    }));

    expect(formatTime(new Date(), "UTC" as any, "24hr")).toBe("07:00");
  });

  it("includes undefined dayPeriod in 12hr output when part is absent", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "12" },
        { type: "minute", value: "00" },
      ],
    }));

    expect(formatTime(new Date(), "UTC" as any, "12hr")).toBe("12:00 undefined");
  });

  it("passes the timezone and hour12 option based on format", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "hour", value: "10" },
      { type: "minute", value: "20" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatTime(new Date(), "America/New_York" as any, "24hr");

    expect(mockDTF).toHaveBeenCalledWith(
      "en-US",
      expect.objectContaining({
        timeZone: "America/New_York",
        hour12: false,
      })
    );
  });

  it("passes hour12: true for 12hr format", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "hour", value: "10" },
      { type: "minute", value: "20" },
      { type: "dayPeriod", value: "AM" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatTime(new Date(), "America/New_York" as any, "12hr");

    expect(mockDTF).toHaveBeenCalledWith(
      "en-US",
      expect.objectContaining({
        timeZone: "America/New_York",
        hour12: true,
      })
    );
  });
});

describe("formatDate", () => {
  const originalDTF = Intl.DateTimeFormat;

  afterEach(() => {
    (Intl as any).DateTimeFormat = originalDTF;
    jest.restoreAllMocks();
  });

  it("returns 'day month, year' for full hijri format", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "day", value: "4" },
        { type: "month", value: "Rajab" },
        { type: "year", value: "1447" },
      ],
    }));

    expect(formatDate(new Date(), "hijri", "en-US", "full")).toBe("4 Rajab, 1447");
  });

  it("returns 'day/month/year' for collapse hijri format", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "day", value: "4" },
        { type: "month", value: "7" },
        { type: "year", value: "1447" },
      ],
    }));

    expect(formatDate(new Date(), "hijri", "en-US", "collapse")).toBe("4/7/1447");
  });

  it("returns gregorian date in full format", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "day", value: "28" },
        { type: "month", value: "March" },
        { type: "year", value: "2026" },
      ],
    }));

    expect(formatDate(new Date(), "miladi", "en-US", "full")).toBe("28 March, 2026");
  });

  it("returns gregorian date in collapse format", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "day", value: "28" },
        { type: "month", value: "3" },
        { type: "year", value: "2026" },
      ],
    }));

    expect(formatDate(new Date(), "miladi", "en-US", "collapse")).toBe("28/3/2026");
  });

  it("defaults to hijri calendar when calendar is not provided", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "day", value: "1" },
      { type: "month", value: "Muharram" },
      { type: "year", value: "1447" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatDate(new Date());

    expect(mockDTF).toHaveBeenCalledWith("en-US", expect.objectContaining({ calendar: "islamic" }));
  });

  it("defaults to full output when output is not provided", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "day", value: "15" },
        { type: "month", value: "Sha'ban" },
        { type: "year", value: "1447" },
      ],
    }));

    expect(formatDate(new Date())).toBe("15 Sha'ban, 1447");
  });

  it("does not pass calendar option for miladi", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "day", value: "1" },
      { type: "month", value: "January" },
      { type: "year", value: "2025" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatDate(new Date(), "miladi", "en-US", "full");

    const callArgs = (mockDTF.mock.calls[0] as unknown as [string, Intl.DateTimeFormatOptions])[1];
    expect(callArgs.calendar).toBeUndefined();
  });

  it("passes calendar: 'islamic' for hijri", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "day", value: "1" },
      { type: "month", value: "Muharram" },
      { type: "year", value: "1447" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatDate(new Date(), "hijri", "en-US", "full");

    expect(mockDTF).toHaveBeenCalledWith("en-US", expect.objectContaining({ calendar: "islamic" }));
  });

  it("uses month: 'long' for full output", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "day", value: "1" },
      { type: "month", value: "Muharram" },
      { type: "year", value: "1447" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatDate(new Date(), "hijri", "en-US", "full");

    expect(mockDTF).toHaveBeenCalledWith("en-US", expect.objectContaining({ month: "long" }));
  });

  it("uses month: 'numeric' for collapse output", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "day", value: "1" },
      { type: "month", value: "1" },
      { type: "year", value: "1447" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatDate(new Date(), "hijri", "en-US", "collapse");

    expect(mockDTF).toHaveBeenCalledWith("en-US", expect.objectContaining({ month: "numeric" }));
  });

  it("falls back to empty string for missing parts", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [],
    }));

    expect(formatDate(new Date(), "hijri", "en-US", "full")).toBe(" , ");
    expect(formatDate(new Date(), "hijri", "en-US", "collapse")).toBe("//");
  });

  it("respects custom locale", () => {
    const mockFormatToParts = jest.fn(() => [
      { type: "day", value: "5" },
      { type: "month", value: "Rajab" },
      { type: "year", value: "1447" },
    ]);
    const mockDTF = jest.fn(() => ({ formatToParts: mockFormatToParts }));
    (Intl as any).DateTimeFormat = mockDTF;

    formatDate(new Date(), "hijri", "ar-SA", "full");

    expect(mockDTF).toHaveBeenCalledWith("ar-SA", expect.any(Object));
  });
});
