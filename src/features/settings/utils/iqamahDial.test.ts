import {
  clampIqamahMinutes,
  dialMinutesToAngle,
  sanitizeIqamahMinutesInput,
  xyToDialMinutes,
} from "./iqamahDial";

describe("iqamahDial", () => {
  it("clamps values between 5 and 60", () => {
    expect(clampIqamahMinutes(1)).toBe(5);
    expect(clampIqamahMinutes(75)).toBe(60);
    expect(clampIqamahMinutes(27)).toBe(27);
  });

  it("sanitizes typed values to numeric input", () => {
    expect(sanitizeIqamahMinutesInput("2a9")).toBe("29");
    expect(sanitizeIqamahMinutesInput("07")).toBe("07");
    expect(sanitizeIqamahMinutesInput("123")).toBe("12");
  });

  it("maps dial coordinates to snapped minute values", () => {
    expect(xyToDialMinutes(100, 8, 100, 100)).toBe(5);
    expect(xyToDialMinutes(100, 192, 100, 100)).toBe(33);
  });

  it("handles invalid numeric dial values and converts minutes back to angles", () => {
    expect(clampIqamahMinutes(Number.NaN)).toBe(5);
    expect(dialMinutesToAngle(5)).toBeCloseTo(-Math.PI / 2);
    expect(dialMinutesToAngle(60)).toBeCloseTo((Math.PI * 3) / 2);
  });
});
