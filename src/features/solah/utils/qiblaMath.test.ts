import {
  magnetometerToHeading,
  normalizeAngle,
  calculateQiblaOffset,
  smoothAngle,
} from "./qiblaMath";

describe("qibla math utils", () => {
  it("magnetometerToHeading converts x/y to heading", () => {
    // x=0,y=1 => atan2(1,0)=90 => heading=0
    expect(magnetometerToHeading(0, 1)).toBeCloseTo(0, 5);

    // x=1,y=0 => atan2(0,1)=0 => heading=270
    expect(magnetometerToHeading(1, 0)).toBeCloseTo(270, 5);
  });

  it("normalizeAngle clamps into [-180, 180)", () => {
    expect(normalizeAngle(190)).toBe(-170);
    expect(normalizeAngle(-190)).toBe(170);
    expect(normalizeAngle(180)).toBe(-180);
    expect(normalizeAngle(-180)).toBe(-180);
  });

  it("calculateQiblaOffset normalizes bearing - heading", () => {
    // 10 - 350 = -340 => normalized to 20
    expect(calculateQiblaOffset(10, 350)).toBe(20);

    // 350 - 10 = 340 => normalized to -20
    expect(calculateQiblaOffset(350, 10)).toBe(-20);
  });

  it("smoothAngle takes shortest path across 360 boundary", () => {
    // prev 350 -> next 10, shortest delta = +20
    expect(smoothAngle(350, 10, 0.5)).toBeCloseTo(0, 5);

    // prev 10 -> next 350, shortest delta = -20
    expect(smoothAngle(10, 350, 0.5)).toBeCloseTo(0, 5);
  });
});
