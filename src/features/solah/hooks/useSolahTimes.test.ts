import { renderHook, act } from "@testing-library/react-native";

import { useSolahTimes, useCurrentSolah, useNextSolah } from "./useSolahTimes";

const mockUseSettingsStore = jest.fn();
const mockUseSolahStore = jest.fn();
const mockSetLastKnownTimes = jest.fn();

jest.mock("@/features-settings/store", () => ({
  useSettingsStore: (selector: any) => mockUseSettingsStore(selector),
}));

jest.mock("@/features-solah/store", () => ({
  useSolahStore: () => mockUseSolahStore(),
}));

const mockFormatTime = jest.fn();
const mockGetAdhanParams = jest.fn();
const mockGetCurrentMinutes = jest.fn();
const mockParseTimeToMinutes = jest.fn();

jest.mock("@/features-solah/utils", () => ({
  ...jest.requireActual("@/features-solah/utils"),
  formatTime: (date: any, tz: any, fmt: any) => mockFormatTime(date, tz, fmt),
  getAdhanParams: (method: any) => mockGetAdhanParams(method),
  getCurrentMinutes: (tz: any) => mockGetCurrentMinutes(tz),
  parseTimeToMinutes: (t: any) => mockParseTimeToMinutes(t),
}));

const mockPrayerTimes = {
  fajr: new Date("2024-01-01T05:00:00Z"),
  dhuhr: new Date("2024-01-01T12:00:00Z"),
  asr: new Date("2024-01-01T15:30:00Z"),
  maghrib: new Date("2024-01-01T18:00:00Z"),
  isha: new Date("2024-01-01T19:30:00Z"),
};

const MockCoordinates: jest.Mock = jest.fn();
const MockPrayerTimes: jest.Mock = jest.fn(() => mockPrayerTimes);

jest.mock("adhan", () => ({
  Coordinates: function (lat: any, lon: any) {
    return MockCoordinates(lat, lon);
  },
  PrayerTimes: function (coords: any, date: any, params: any) {
    return MockPrayerTimes(coords, date, params);
  },
}));

jest.mock("./useDateAndTime", () => ({
  useMinuteTick: jest.fn(),
}));

const mockLocation = {
  latitude: 24.7136,
  longitude: 46.6753,
  city: "Riyadh",
  region: "Riyadh",
  country: "Saudi Arabia",
};

function setupStores(overrides: { location?: any; lastKnownTimes?: any[] } = {}) {
  const location = overrides.location !== undefined ? overrides.location : mockLocation;
  const lastKnownTimes = overrides.lastKnownTimes ?? [];

  mockFormatTime.mockReturnValue("05:00");
  mockGetAdhanParams.mockReturnValue({});
  mockGetCurrentMinutes.mockReturnValue(300);
  mockParseTimeToMinutes.mockImplementation((t: string) => parseInt(t, 10));

  mockUseSettingsStore.mockImplementation((selector: any) =>
    selector({
      calculationMethod: { method: "MoonsightingCommittee" },
      timeFormat: { value: "12hr" },
      location: { location },
      timezone: { timezone: "Asia/Riyadh" },
    })
  );

  mockUseSolahStore.mockReturnValue({
    lastKnownTimes,
    setLastKnownTimes: mockSetLastKnownTimes,
  });
}

describe("useSolahTimes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatTime.mockImplementation(() => "05:00");
  });

  it("returns formatted times when location is available", async () => {
    setupStores();

    const { result } = renderHook(() => useSolahTimes());

    await act(async () => {});

    expect(result.current.times).not.toBeNull();
    expect(result.current.times).toHaveLength(5);
    expect(result.current.loading).toBe(false);
  });

  it("returns loading true when no location and no cached times are available yet", () => {
    setupStores({ location: null, lastKnownTimes: [] });

    const { result } = renderHook(() => useSolahTimes());

    expect(result.current.loading).toBe(true);
    expect(result.current.times).toEqual([]);
  });

  it("falls back to lastKnownTimes when location is missing", () => {
    const cached = [
      { title: "Subhi", time: "05:00" },
      { title: "Dhuhr", time: "12:00" },
      { title: "Asr", time: "15:30" },
      { title: "Maghrib", time: "18:00" },
      { title: "Isha", time: "19:30" },
    ];
    setupStores({ location: null, lastKnownTimes: cached });

    const { result } = renderHook(() => useSolahTimes());

    expect(result.current.times).toEqual(cached);
    expect(result.current.loading).toBe(false);
  });

  it("calls setLastKnownTimes with formatted times after computation", async () => {
    setupStores();

    renderHook(() => useSolahTimes());

    await act(async () => {});

    expect(mockSetLastKnownTimes).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ title: "Subhi" })]),
      expect.any(Date)
    );
  });

  it("treats zero coordinates as a real location instead of an unresolved placeholder", () => {
    setupStores({ location: { latitude: 0, longitude: 0 }, lastKnownTimes: [] });

    const { result } = renderHook(() => useSolahTimes());

    expect(result.current.times).not.toEqual([]);
    expect(MockPrayerTimes).toHaveBeenCalled();
  });

  it("falls back to lastKnownTimes when PrayerTimes constructor throws", () => {
    const cached = [{ title: "Subhi", time: "05:00" }];
    setupStores({ lastKnownTimes: cached });
    MockPrayerTimes.mockImplementationOnce(() => {
      throw new Error("adhan error");
    });

    const { result } = renderHook(() => useSolahTimes());

    expect(result.current.times).toEqual(cached);
    expect(result.current.loading).toBe(false);
  });

  it("formats times with correct solah titles", async () => {
    setupStores();
    mockFormatTime
      .mockReturnValueOnce("05:12")
      .mockReturnValueOnce("12:30")
      .mockReturnValueOnce("15:45")
      .mockReturnValueOnce("18:05")
      .mockReturnValueOnce("19:35");

    const { result } = renderHook(() => useSolahTimes());

    await act(async () => {});

    const titles = result.current.times?.map((t) => t.title);
    expect(titles).toEqual(["Subhi", "Dhuhr", "Asr", "Maghrib", "Isha"]);
  });

  it("accepts an explicit date argument", async () => {
    setupStores();
    const specificDate = new Date("2025-06-15");

    const { result } = renderHook(() => useSolahTimes(specificDate));

    await act(async () => {});

    expect(MockPrayerTimes).toHaveBeenCalledWith(
      expect.anything(),
      specificDate,
      expect.anything()
    );
    expect(result.current.loading).toBe(false);
  });
});

describe("useCurrentSolah", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatTime.mockReturnValue("05:00");
  });

  it("returns a current solah title string", async () => {
    const times = [
      { title: "Subhi", time: "300" },
      { title: "Dhuhr", time: "720" },
      { title: "Asr", time: "930" },
      { title: "Maghrib", time: "1080" },
      { title: "Isha", time: "1170" },
    ];

    setupStores();
    mockUseSolahStore.mockReturnValue({
      lastKnownTimes: times,
      setLastKnownTimes: mockSetLastKnownTimes,
    });

    mockGetCurrentMinutes.mockReturnValue(400);
    mockParseTimeToMinutes.mockImplementation((t: string) => parseInt(t, 10));

    const { result } = renderHook(() => useCurrentSolah());

    await act(async () => {});

    expect(typeof result.current.currentSolah).toBe("string");
  });

  it("returns the last prayer as current before the first prayer of the day", async () => {
    const times = [
      { title: "Subhi", time: "300" },
      { title: "Dhuhr", time: "720" },
      { title: "Asr", time: "930" },
      { title: "Maghrib", time: "1080" },
      { title: "Isha", time: "1170" },
    ];

    setupStores();
    mockUseSolahStore.mockReturnValue({
      lastKnownTimes: times,
      setLastKnownTimes: mockSetLastKnownTimes,
    });

    mockGetCurrentMinutes.mockReturnValue(100);
    mockParseTimeToMinutes.mockImplementation((t: string) => parseInt(t, 10));

    const { result } = renderHook(() => useCurrentSolah());

    await act(async () => {});

    expect(result.current.currentSolah).toBe("Isha");
  });

  it("falls back to Subhi when times list is empty", async () => {
    setupStores({ location: null, lastKnownTimes: [] });

    const { result } = renderHook(() => useCurrentSolah());

    await act(async () => {});

    expect(result.current.currentSolah).toBe("Subhi");
  });
});

describe("useNextSolah", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatTime.mockReturnValue("05:00");
  });

  it("returns a next solah object with title and time", async () => {
    const times = [
      { title: "Subhi", time: "300" },
      { title: "Dhuhr", time: "720" },
      { title: "Asr", time: "930" },
      { title: "Maghrib", time: "1080" },
      { title: "Isha", time: "1170" },
    ];

    setupStores();
    mockUseSolahStore.mockReturnValue({
      lastKnownTimes: times,
      setLastKnownTimes: mockSetLastKnownTimes,
    });

    mockGetCurrentMinutes.mockReturnValue(400);
    mockParseTimeToMinutes.mockImplementation((t: string) => parseInt(t, 10));

    const { result } = renderHook(() => useNextSolah());

    await act(async () => {});

    expect(result.current.nextSolah).toHaveProperty("title");
    expect(result.current.nextSolah).toHaveProperty("time");
  });

  it("returns the next prayer in the normal middle-of-day case", async () => {
    const times = [
      { title: "Subhi", time: "300" },
      { title: "Dhuhr", time: "720" },
      { title: "Asr", time: "930" },
      { title: "Maghrib", time: "1080" },
      { title: "Isha", time: "1170" },
    ];

    setupStores({ location: null });
    mockUseSolahStore.mockReturnValue({
      lastKnownTimes: times,
      setLastKnownTimes: mockSetLastKnownTimes,
    });

    mockGetCurrentMinutes.mockReturnValue(800);
    mockParseTimeToMinutes.mockImplementation((t: string) => parseInt(t, 10));

    const { result } = renderHook(() => useNextSolah());

    await act(async () => {});

    expect(result.current.nextSolah).toEqual({ title: "Asr", time: "930" });
  });

  it("returns Subhi as fallback when times list is empty", async () => {
    setupStores({ location: null, lastKnownTimes: [] });

    const { result } = renderHook(() => useNextSolah());

    await act(async () => {});

    expect(result.current.nextSolah.title).toBe("Subhi");
  });

  it("wraps around: when past all prayers, next is first prayer (Subhi)", async () => {
    const times = [
      { title: "Subhi", time: "300" },
      { title: "Dhuhr", time: "720" },
      { title: "Asr", time: "930" },
      { title: "Maghrib", time: "1080" },
      { title: "Isha", time: "1170" },
    ];

    setupStores();
    mockUseSolahStore.mockReturnValue({
      lastKnownTimes: times,
      setLastKnownTimes: mockSetLastKnownTimes,
    });

    mockGetCurrentMinutes.mockReturnValue(1400);
    mockParseTimeToMinutes.mockImplementation((t: string) => parseInt(t, 10));

    const { result } = renderHook(() => useNextSolah());

    await act(async () => {});

    expect(result.current.nextSolah.title).toBe("Subhi");
  });
});
