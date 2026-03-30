import { renderHook } from "@testing-library/react-native";

import { useAdhkarAutoRotation } from "./useAdhkarAutoRotation";

const mockUseSolahTimes = jest.fn();
const mockUseCurrentSolah = jest.fn();
const mockUseMinuteTick = jest.fn();
const mockUseSettingsStore = jest.fn();
const mockGetCurrentMinutes: jest.Mock = jest.fn(() => 0);
const mockParseTimeToMinutes: jest.Mock = jest.fn((t: string) => parseInt(t, 10));

jest.mock("@/features-solah/hooks", () => ({
  useSolahTimes: () => mockUseSolahTimes(),
  useCurrentSolah: () => mockUseCurrentSolah(),
  useMinuteTick: () => mockUseMinuteTick(),
}));

jest.mock("@/features-settings/store", () => ({
  useSettingsStore: (selector: any) => mockUseSettingsStore(selector),
}));

jest.mock("@/features-solah/utils", () => ({
  ...jest.requireActual("@/features-solah/utils"),
  getCurrentMinutes: (tz: any) => mockGetCurrentMinutes(tz),
  parseTimeToMinutes: (t: any) => mockParseTimeToMinutes(t),
}));

jest.mock("@/features-adhkar/data", () => ({
  adhkarData: [
    {
      type: "before",
      items: [
        {
          id: "b1",
          type: "before",
          title: "Before item",
          cardTitle: "Before",
          illustration: 1,
          entries: [],
        },
      ],
    },
    {
      type: "during",
      items: [
        {
          id: "d1",
          type: "during",
          title: "During item",
          cardTitle: "During",
          illustration: 2,
          entries: [],
        },
      ],
    },
    {
      type: "after",
      items: [
        {
          id: "a1",
          type: "after",
          title: "After item",
          cardTitle: "After",
          illustration: 3,
          entries: [],
        },
      ],
    },
  ],
}));

const TIMEZONE = "Asia/Riyadh";

function setupDefaults(
  overrides: {
    times?: any[] | null;
    currentSolah?: string;
    nowMinutes?: number;
  } = {}
) {
  const times = overrides.times !== undefined ? overrides.times : null;
  const currentSolah = overrides.currentSolah ?? "Subhi";
  const nowMinutes = overrides.nowMinutes ?? 0;

  mockUseSolahTimes.mockReturnValue({ times, loading: times === null });
  mockUseCurrentSolah.mockReturnValue({ currentSolah });
  mockGetCurrentMinutes.mockReturnValue(nowMinutes);

  mockUseSettingsStore.mockImplementation((selector: any) =>
    selector({ timezone: { timezone: TIMEZONE } })
  );
}

describe("useAdhkarAutoRotation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    jest.spyOn(Math, "random").mockRestore();
  });

  it("returns largeCard, topSmallCard, bottomSmallCard", () => {
    setupDefaults();

    const { result } = renderHook(() => useAdhkarAutoRotation());

    expect(result.current).toHaveProperty("largeCard");
    expect(result.current).toHaveProperty("topSmallCard");
    expect(result.current).toHaveProperty("bottomSmallCard");
  });

  it("returns one item from each adhkar group across the three cards", () => {
    setupDefaults();

    const { result } = renderHook(() => useAdhkarAutoRotation());

    const cards = [
      result.current.largeCard,
      result.current.topSmallCard,
      result.current.bottomSmallCard,
    ];

    const types = cards.map((c) => c.type);
    expect(types).toContain("before");
    expect(types).toContain("during");
    expect(types).toContain("after");
  });

  it("uses random phase when times is null", () => {
    setupDefaults({ times: null });

    const { result } = renderHook(() => useAdhkarAutoRotation());

    expect(result.current.largeCard).toBeDefined();
    expect(result.current.largeCard.id).toBe("b1");
  });

  it("uses random phase when times array is empty", () => {
    setupDefaults({ times: [] });

    const { result } = renderHook(() => useAdhkarAutoRotation());

    expect(result.current.largeCard).toBeDefined();
  });

  it("uses random phase when no matching prayer found for currentSolah", () => {
    setupDefaults({
      times: [{ title: "Dhuhr", time: "720" }],
      currentSolah: "UnknownPrayer",
      nowMinutes: 400,
    });

    const { result } = renderHook(() => useAdhkarAutoRotation());

    expect(result.current.largeCard).toBeDefined();
  });

  it("returns before-phase layout: largeCard is a before item when in before window", () => {
    const adhanMinutes = 300;
    const nowMinutes = adhanMinutes - 10;

    mockParseTimeToMinutes.mockReturnValue(adhanMinutes);

    setupDefaults({
      times: [{ title: "Subhi", time: `${adhanMinutes}` }],
      currentSolah: "Subhi",
      nowMinutes,
    });

    const { result } = renderHook(() => useAdhkarAutoRotation());

    expect(result.current.largeCard.type).toBe("before");
  });

  it("returns during-phase layout: largeCard is a during item when in during window", () => {
    const adhanMinutes = 300;
    const IQAMAH_OFFSET = 15;
    const iqamahMinutes = adhanMinutes + IQAMAH_OFFSET;
    const midPoint = adhanMinutes + (iqamahMinutes - adhanMinutes) / 2;
    const nowMinutes = midPoint + 1;

    mockParseTimeToMinutes.mockReturnValue(adhanMinutes);

    setupDefaults({
      times: [{ title: "Subhi", time: `${adhanMinutes}` }],
      currentSolah: "Subhi",
      nowMinutes,
    });

    const { result } = renderHook(() => useAdhkarAutoRotation());

    expect(result.current.largeCard.type).toBe("during");
  });

  it("returns after-phase layout: largeCard is an after item when in after window", () => {
    const adhanMinutes = 300;
    const IQAMAH_OFFSET = 15;
    const iqamahMinutes = adhanMinutes + IQAMAH_OFFSET;
    const DURING_BUFFER = 5;
    const endDuring = iqamahMinutes + DURING_BUFFER;
    const nowMinutes = endDuring + 1;

    mockParseTimeToMinutes.mockReturnValue(adhanMinutes);

    setupDefaults({
      times: [{ title: "Subhi", time: `${adhanMinutes}` }],
      currentSolah: "Subhi",
      nowMinutes,
    });

    const { result } = renderHook(() => useAdhkarAutoRotation());

    expect(result.current.largeCard.type).toBe("after");
  });

  it("calls useMinuteTick to trigger updates at minute boundaries", () => {
    setupDefaults();

    renderHook(() => useAdhkarAutoRotation());

    expect(mockUseMinuteTick).toHaveBeenCalled();
  });

  it("result is stable across re-renders with unchanged inputs", () => {
    setupDefaults();

    const { result, rerender } = renderHook(() => useAdhkarAutoRotation());
    const firstId = result.current.largeCard.id;

    rerender({});

    expect(result.current.largeCard.id).toBe(firstId);
  });
});
