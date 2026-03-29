import { CalculationMethod } from "adhan";

import { getAdhanParams } from "./adhanHelpers";

describe("getAdhanParams", () => {
  it("returns MuslimWorldLeague params", () => {
    const result = getAdhanParams("MuslimWorldLeague");
    expect(result).toEqual(CalculationMethod.MuslimWorldLeague());
  });

  it("returns Egyptian params", () => {
    const result = getAdhanParams("Egyptian");
    expect(result).toEqual(CalculationMethod.Egyptian());
  });

  it("returns Karachi params", () => {
    const result = getAdhanParams("Karachi");
    expect(result).toEqual(CalculationMethod.Karachi());
  });

  it("returns UmmAlQura params", () => {
    const result = getAdhanParams("UmmAlQura");
    expect(result).toEqual(CalculationMethod.UmmAlQura());
  });

  it("returns Dubai params", () => {
    const result = getAdhanParams("Dubai");
    expect(result).toEqual(CalculationMethod.Dubai());
  });

  it("returns Qatar params", () => {
    const result = getAdhanParams("Qatar");
    expect(result).toEqual(CalculationMethod.Qatar());
  });

  it("returns Kuwait params", () => {
    const result = getAdhanParams("Kuwait");
    expect(result).toEqual(CalculationMethod.Kuwait());
  });

  it("returns MoonsightingCommittee params", () => {
    const result = getAdhanParams("MoonsightingCommittee");
    expect(result).toEqual(CalculationMethod.MoonsightingCommittee());
  });

  it("returns Singapore params", () => {
    const result = getAdhanParams("Singapore");
    expect(result).toEqual(CalculationMethod.Singapore());
  });

  it("returns Turkey params", () => {
    const result = getAdhanParams("Turkey");
    expect(result).toEqual(CalculationMethod.Turkey());
  });

  it("returns Tehran params", () => {
    const result = getAdhanParams("Tehran");
    expect(result).toEqual(CalculationMethod.Tehran());
  });

  it("returns NorthAmerica params", () => {
    const result = getAdhanParams("NorthAmerica");
    expect(result).toEqual(CalculationMethod.NorthAmerica());
  });

  it("returns MoonsightingCommittee params for unknown/Other method", () => {
    const result = getAdhanParams("Other");
    expect(result).toEqual(CalculationMethod.MoonsightingCommittee());
  });

  it("returns an object with fajr and isha angles (spot-check structure)", () => {
    const result = getAdhanParams("MuslimWorldLeague");
    expect(result).toHaveProperty("fajrAngle");
    expect(result).toHaveProperty("ishaAngle");
  });

  it("different methods return different params", () => {
    const mwl = getAdhanParams("MuslimWorldLeague");
    const karachi = getAdhanParams("Karachi");
    expect(mwl).not.toEqual(karachi);
  });
});
