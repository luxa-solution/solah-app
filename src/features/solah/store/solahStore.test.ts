import type { SolahTime } from "@/features-solah/types";

import { useSolahStore } from "./solahStore";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useSolahStore.getState();
const sampleTimes: SolahTime[] = [
  { title: "Subhi", time: "05:10" },
  { title: "Dhuhr", time: "12:15" },
];

describe("useSolahStore", () => {
  beforeEach(() => {
    useSolahStore.setState(initialState, true);
    jest.useRealTimers();
  });

  it("starts empty", () => {
    expect(useSolahStore.getState().lastKnownTimes).toEqual([]);
    expect(useSolahStore.getState().lastKnownDate).toBeUndefined();
  });

  it("stores times with an explicit date", () => {
    const date = new Date("2026-03-28T10:00:00.000Z");

    useSolahStore.getState().setLastKnownTimes(sampleTimes, date);

    expect(useSolahStore.getState().lastKnownTimes).toEqual(sampleTimes);
    expect(useSolahStore.getState().lastKnownDate).toEqual(date);
  });

  it("uses the current date when no explicit date is provided", () => {
    const now = new Date("2026-03-28T12:34:56.000Z");
    jest.useFakeTimers().setSystemTime(now);

    useSolahStore.getState().setLastKnownTimes(sampleTimes);

    expect(useSolahStore.getState().lastKnownDate).toEqual(now);
  });

  it("clears persisted timing state", () => {
    useSolahStore.getState().setLastKnownTimes(sampleTimes, new Date("2026-03-28T10:00:00.000Z"));
    useSolahStore.getState().clearLastKnownTimes();

    expect(useSolahStore.getState().lastKnownTimes).toEqual([]);
    expect(useSolahStore.getState().lastKnownDate).toBeUndefined();
  });
});
