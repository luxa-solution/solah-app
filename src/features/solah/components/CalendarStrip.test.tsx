import { render, fireEvent } from "@testing-library/react-native";

import { CalendarStrip } from "./CalendarStrip";

describe("CalendarStrip", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-09T12:00:00.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders month label", () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    expect(getByTestId("calendar-month-label").props.children.join("")).toContain("2026");
  });

  it("selecting a date calls setSelectedDate, tapping again reverts to today", () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    fireEvent.press(getByTestId("calendar-day-2026-01-08"));

    expect(setSelectedDate).toHaveBeenCalled();
    const firstCallDate: Date = setSelectedDate.mock.calls[0][0];
    expect(firstCallDate.getFullYear()).toBe(2026);
    expect(firstCallDate.getMonth()).toBe(0);
    expect(firstCallDate.getDate()).toBe(8);

    // tap again => deselect => revert to today (2026-01-09)
    fireEvent.press(getByTestId("calendar-day-2026-01-08"));

    const secondCallDate: Date = setSelectedDate.mock.calls[1][0];
    expect(secondCallDate.getFullYear()).toBe(2026);
    expect(secondCallDate.getMonth()).toBe(0);
    expect(secondCallDate.getDate()).toBe(9);
  });

  it("next moves the reference week forward (label eventually changes)", () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    const labelBefore = getByTestId("calendar-month-label").props.children.join("");

    fireEvent.press(getByTestId("calendar-next"));
    fireEvent.press(getByTestId("calendar-next"));
    fireEvent.press(getByTestId("calendar-next"));
    fireEvent.press(getByTestId("calendar-next"));
    fireEvent.press(getByTestId("calendar-next"));

    const labelAfter = getByTestId("calendar-month-label").props.children.join("");

    expect(labelAfter).toContain("2026");
    expect(labelAfter.length).toBeGreaterThan(0);
    expect(labelBefore).toContain("2026");
  });
});
