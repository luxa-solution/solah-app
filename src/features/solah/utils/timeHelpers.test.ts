import { parseTimeToMinutes, getCurrentMinutes } from "./timeHelpers";

describe("parseTimeToMinutes", () => {
  it("parses 24hr times", () => {
    expect(parseTimeToMinutes("00:00")).toBe(0);
    expect(parseTimeToMinutes("23:59")).toBe(23 * 60 + 59);
  });

  it("parses 12hr AM/PM times", () => {
    expect(parseTimeToMinutes("12:00 AM")).toBe(0);
    expect(parseTimeToMinutes("12:00 PM")).toBe(12 * 60);
    expect(parseTimeToMinutes("1:05 PM")).toBe(13 * 60 + 5);
    expect(parseTimeToMinutes("1:05 am")).toBe(1 * 60 + 5);
  });

  it("returns 0 for invalid input", () => {
    expect(parseTimeToMinutes("nope")).toBe(0);
    expect(parseTimeToMinutes("")).toBe(0);
    expect(parseTimeToMinutes("1")).toBe(0);
    expect(parseTimeToMinutes("1:2")).toBe(0);
    expect(parseTimeToMinutes("99:99")).toBe(0);
    expect(parseTimeToMinutes("13:00 PM")).toBe(0);
    expect(parseTimeToMinutes("24:00")).toBe(0);
  });
});

describe("getCurrentMinutes", () => {
  const originalDTF = Intl.DateTimeFormat;

  beforeEach(() => {
    // Mock Intl.DateTimeFormat to avoid env differences

    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [
        { type: "hour", value: "09" },
        { type: "minute", value: "30" },
      ],
    }));
  });

  afterEach(() => {
    Intl.DateTimeFormat = originalDTF;
  });

  it("returns hour*60 + minute from formatToParts", () => {
    expect(getCurrentMinutes("Asia/Riyadh" as any)).toBe(9 * 60 + 30);
  });

  it("falls back to 0 when hour and minute parts are missing", () => {
    (Intl as any).DateTimeFormat = jest.fn(() => ({
      formatToParts: () => [{ type: "literal", value: ":" }],
    }));

    expect(getCurrentMinutes("Asia/Riyadh" as any)).toBe(0);
  });
});
