import { renderHook, act } from "@testing-library/react-native";

import { useDateAndTime, useMinuteTick } from "./useDateAndTime";

const mockFormatTime = jest.fn();
const mockFormatDate = jest.fn();

jest.mock("@/features-solah/utils", () => ({
  formatTime: (date: any, tz: any, fmt: any) => mockFormatTime(date, tz, fmt),
  formatDate: (date: any, cal: any, locale: any) => mockFormatDate(date, cal, locale),
}));

const mockUseSettingsStore = jest.fn();

jest.mock("@/features/settings/store/settingsStore", () => ({
  useSettingsStore: (selector: any) => mockUseSettingsStore(selector),
}));

const TIMEZONE = "Asia/Riyadh";
const TIME_FORMAT = "12hr" as const;
const CALENDAR = "hijri" as const;

function setupSettingsStore() {
  mockFormatTime.mockImplementation((date: Date) => `T:${date.getMinutes()}`);
  mockFormatDate.mockImplementation((date: Date) => `D:${date.getDate()}`);
  mockUseSettingsStore.mockImplementation((selector: any) =>
    selector({
      timezone: { timezone: TIMEZONE },
      timeFormat: { value: TIME_FORMAT },
      calendarFormat: { value: CALENDAR },
    })
  );
}

describe("useDateAndTime", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupSettingsStore();
  });

  it("returns date and time strings on initial render", () => {
    const { result, unmount } = renderHook(() => useDateAndTime());

    expect(typeof result.current.date).toBe("string");
    expect(typeof result.current.time).toBe("string");

    unmount();
  });

  it("calls formatTime and formatDate with current date on mount", () => {
    const { unmount } = renderHook(() => useDateAndTime());

    expect(mockFormatTime).toHaveBeenCalled();
    expect(mockFormatDate).toHaveBeenCalled();

    unmount();
  });

  it("passes locale option to formatDate", () => {
    const { unmount } = renderHook(() => useDateAndTime({ locale: "ar-SA" }));

    expect(mockFormatDate).toHaveBeenCalledWith(expect.any(Date), CALENDAR, "ar-SA");

    unmount();
  });

  it("uses en-US locale by default", () => {
    const { unmount } = renderHook(() => useDateAndTime());

    expect(mockFormatDate).toHaveBeenCalledWith(expect.any(Date), CALENDAR, "en-US");

    unmount();
  });

  it("forwards timezone setting to formatTime", () => {
    const { unmount } = renderHook(() => useDateAndTime());

    expect(mockFormatTime).toHaveBeenCalledWith(expect.any(Date), TIMEZONE, TIME_FORMAT);

    unmount();
  });

  it("updates date/time after the minute boundary timeout fires", async () => {
    jest.useFakeTimers();

    const { unmount } = renderHook(() => useDateAndTime());
    const callsBefore = mockFormatTime.mock.calls.length;

    await act(async () => {
      jest.advanceTimersByTime(61000);
    });

    expect(mockFormatTime.mock.calls.length).toBeGreaterThan(callsBefore);

    unmount();
    jest.useRealTimers();
  });

  it("ticks every 60 seconds after the initial alignment", async () => {
    jest.useFakeTimers();

    const { unmount } = renderHook(() => useDateAndTime());

    const callsAfterMount = mockFormatTime.mock.calls.length;

    await act(async () => {
      jest.advanceTimersByTime(70000);
    });

    const callsAfterFirstTick = mockFormatTime.mock.calls.length;

    await act(async () => {
      jest.advanceTimersByTime(60000);
    });

    expect(mockFormatTime.mock.calls.length).toBeGreaterThan(callsAfterFirstTick);
    expect(mockFormatTime.mock.calls.length).toBeGreaterThan(callsAfterMount);

    unmount();
    jest.useRealTimers();
  });

  it("clears the repeating interval on unmount after the first tick", async () => {
    jest.useFakeTimers();
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() => useDateAndTime());

    await act(async () => {
      jest.advanceTimersByTime(70000);
    });

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("clears the alignment timeout when unmounted before the first minute tick", () => {
    jest.useFakeTimers();
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");

    const { unmount } = renderHook(() => useDateAndTime());
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });
});

describe("useMinuteTick", () => {
  it("renders without error", () => {
    jest.useFakeTimers();

    expect(() => {
      const { unmount } = renderHook(() => useMinuteTick());
      unmount();
    }).not.toThrow();

    jest.useRealTimers();
  });

  it("triggers re-render at minute boundary", async () => {
    jest.useFakeTimers();

    let renderCount = 0;
    const { result, unmount } = renderHook(() => {
      renderCount++;
      useMinuteTick();
      return renderCount;
    });

    const before = result.current;

    await act(async () => {
      jest.advanceTimersByTime(65000);
    });

    expect(result.current).toBeGreaterThan(before);

    unmount();
    jest.useRealTimers();
  });

  it("clears timeout on unmount without errors", () => {
    jest.useFakeTimers();

    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const { unmount } = renderHook(() => useMinuteTick());

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();

    jest.useRealTimers();
  });

  it("clears the repeating interval after the first tick has started", async () => {
    jest.useFakeTimers();
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = renderHook(() => useMinuteTick());

    await act(async () => {
      jest.advanceTimersByTime(65000);
    });

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });
});
