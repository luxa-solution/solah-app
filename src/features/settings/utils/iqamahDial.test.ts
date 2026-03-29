import { clampIqamahMinutes, sanitizeIqamahMinutesInput, xyToDialMinutes } from "./iqamahDial";

describe("iqamahDial", () => {
  it("clamps values between 5 and 60", () => {
    expect(clampIqamahMinutes(1)).toBe(5);
    expect(clampIqamahMinutes(75)).toBe(60);
    expect(clampIqamahMinutes(27)).toBe(27);
  });

  it("sanitizes typed values to numeric input", () => {
    expect(sanitizeIqamahMinutesInput("2a9")).toBe("29");
    expect(sanitizeIqamahMinutesInput("07")).toBe("07");
  });

  it("maps dial coordinates to snapped minute values", () => {
    expect(xyToDialMinutes(100, 8, 100, 100)).toBe(5);
    expect(xyToDialMinutes(100, 192, 100, 100)).toBe(33);
  });
});
