import { resolveAutomaticTimeZone } from "./automaticTimeZone";

describe("resolveAutomaticTimeZone", () => {
  const realIntl = Intl.DateTimeFormat;

  afterEach(() => {
    Intl.DateTimeFormat = realIntl;
  });

  it("falls back to Africa/Abidjan when the system timezone is missing", () => {
    Intl.DateTimeFormat = jest.fn(() => ({
      resolvedOptions: () => ({ timeZone: "" }),
    })) as any;

    expect(resolveAutomaticTimeZone()).toEqual({
      name: "(UTC+00:00) Greenwich Mean Time",
      timezone: "Africa/Abidjan",
      isDefault: true,
    });
  });

  it("falls back to Africa/Abidjan when timezone resolution throws", () => {
    Intl.DateTimeFormat = jest.fn(() => {
      throw new Error("intl unavailable");
    }) as any;

    expect(resolveAutomaticTimeZone()).toEqual({
      name: "(UTC+00:00) Greenwich Mean Time",
      timezone: "Africa/Abidjan",
      isDefault: true,
    });
  });
});
