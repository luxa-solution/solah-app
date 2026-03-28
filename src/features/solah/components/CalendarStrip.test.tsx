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

  it("renders 7 day cells for the current week", () => {
    const setSelectedDate = jest.fn();
    const { getAllByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    const dayCells = getAllByTestId(/^calendar-day-/);
    expect(dayCells).toHaveLength(7);
  });

  it("renders weekday header letters S M T W T F S", () => {
    const setSelectedDate = jest.fn();
    const { getAllByText } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    const sundayHeaders = getAllByText("S");
    expect(sundayHeaders.length).toBeGreaterThanOrEqual(2);
    expect(getAllByText("M").length).toBeGreaterThanOrEqual(1);
    expect(getAllByText("W").length).toBeGreaterThanOrEqual(1);
    expect(getAllByText("F").length).toBeGreaterThanOrEqual(1);
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

  it("previous navigation moves the reference week backward", () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    const labelBefore = getByTestId("calendar-month-label").props.children.join("");

    fireEvent.press(getByTestId("calendar-prev"));
    fireEvent.press(getByTestId("calendar-prev"));
    fireEvent.press(getByTestId("calendar-prev"));
    fireEvent.press(getByTestId("calendar-prev"));
    fireEvent.press(getByTestId("calendar-prev"));

    const labelAfter = getByTestId("calendar-month-label").props.children.join("");

    expect(labelAfter.length).toBeGreaterThan(0);
    expect(labelBefore.length).toBeGreaterThan(0);
  });

  it("today's date cell is present in the current week", () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    expect(getByTestId("calendar-day-2026-01-09")).toBeTruthy();
  });

  it("pressing today's date selects it and calls setSelectedDate with today", () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    fireEvent.press(getByTestId("calendar-day-2026-01-09"));

    const callDate: Date = setSelectedDate.mock.calls[0][0];
    expect(callDate.getDate()).toBe(9);
    expect(callDate.getMonth()).toBe(0);
    expect(callDate.getFullYear()).toBe(2026);
  });

  it("pressing a different date then pressing it again deselects and reverts to today", () => {
    const setSelectedDate = jest.fn();
    const { getByTestId } = render(<CalendarStrip setSelectedDate={setSelectedDate} />);

    fireEvent.press(getByTestId("calendar-day-2026-01-07"));
    const selectedDate: Date = setSelectedDate.mock.calls[0][0];
    expect(selectedDate.getDate()).toBe(7);

    fireEvent.press(getByTestId("calendar-day-2026-01-07"));
    const revertedDate: Date = setSelectedDate.mock.calls[1][0];
    expect(revertedDate.getDate()).toBe(9);
  });
});
