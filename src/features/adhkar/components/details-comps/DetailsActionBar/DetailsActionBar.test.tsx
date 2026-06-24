import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Share } from "react-native";

import { useAdhkarStore } from "@/features-adhkar/store";
import type { AdhkarEntry, AdhkarItem } from "@/features-adhkar/types";

import { DetailsActionBar } from "./DetailsActionBar";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");

  return createAsyncStorageMock();
});

const initialState = useAdhkarStore.getState();

const entry: AdhkarEntry = {
  arabicText: "اللَّهُمَّ أَنْتَ رَبِّي",
  transliteration: "Allahumma anta rabbi",
  translation: {
    en: "O Allah, You are my Lord",
  },
  audio: "audio.mp3",
  sourceId: "source-1",
} as any;

const item: AdhkarItem = {
  id: "1",
  title: "Morning Adhkar",
  type: "morning",
  entries: [entry],
} as any;

describe("DetailsActionBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAdhkarStore.setState(initialState, true);
  });

  it("shares composed message when item has an entry", async () => {
    const shareSpy = jest
      .spyOn(Share, "share")
      .mockResolvedValueOnce({ action: "sharedAction" } as any);

    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={item} entry={entry} entryIndex={0} />
    );

    fireEvent.press(getByLabelText("share"));

    expect(shareSpy).toHaveBeenCalledTimes(1);

    const args = shareSpy.mock.calls[0][0];

    expect(args.title).toBe("Morning Adhkar");

    expect(args.message).toContain("Morning Adhkar");
    expect(args.message).toContain("اللَّهُمَّ أَنْتَ رَبِّي");
    expect(args.message).toContain("Allahumma anta rabbi");
    expect(args.message).toContain("O Allah, You are my Lord");
  });

  it("shares only title when there are no entries", async () => {
    jest.spyOn(Share, "share").mockResolvedValueOnce({
      action: "sharedAction",
    } as any);

    const emptyItem = {
      id: "2",
      title: "Empty Adhkar",
      entries: [],
    } as any;

    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={emptyItem} entry={{} as AdhkarEntry} entryIndex={0} />
    );

    fireEvent.press(getByLabelText("share"));

    expect(Share.share).toHaveBeenCalledWith({
      title: "Empty Adhkar",
      message: "Empty Adhkar",
    });
  });

  it("toggles favourite when favorite is pressed", () => {
    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={item} entry={entry} entryIndex={0} />
    );

    fireEvent.press(getByLabelText("favorite"));

    // ✅ UPDATED: Now checking entry-level favorite ID
    expect(useAdhkarStore.getState().favouriteIds).toContain("morning-1-entry-0");
  });

  it("does not throw when share fails", async () => {
    jest.spyOn(Share, "share").mockRejectedValueOnce(new Error("share failed"));

    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={item} entry={entry} entryIndex={0} />
    );

    expect(() => fireEvent.press(getByLabelText("share"))).not.toThrow();
  });

  it("calls onPlay when audio exists", () => {
    const onPlay = jest.fn();

    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={item} entry={entry} entryIndex={0} onPlay={onPlay} />
    );

    fireEvent.press(getByLabelText("play"));

    expect(onPlay).toHaveBeenCalledWith(entry);
  });

  it("does not call onPlay when entry has no audio", () => {
    const onPlay = jest.fn();

    const noAudioEntry = {
      ...entry,
      audio: undefined,
      sourceId: undefined,
    } as any;

    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={item} entry={noAudioEntry} entryIndex={0} onPlay={onPlay} />
    );

    fireEvent.press(getByLabelText("play"));

    expect(onPlay).not.toHaveBeenCalled();
  });

  it("shows pause accessibility label when playing", () => {
    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={item} entry={entry} entryIndex={0} isPlaying />
    );

    expect(getByLabelText("pause")).toBeTruthy();
  });

  it("shows loading indicator while buffering", () => {
    // ✅ ADDED entryIndex={0}
    const { getByLabelText } = render(
      <DetailsActionBar item={item} entry={entry} entryIndex={0} isLoading />
    );

    expect(getByLabelText("play")).toBeTruthy();
  });
});
