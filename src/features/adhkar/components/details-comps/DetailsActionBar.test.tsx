import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Share } from "react-native";

import { useAdhkarStore } from "@/features-adhkar/store";
import type { AdhkarItem } from "@/features-adhkar/types";

import { DetailsActionBar } from "./DetailsActionBar";

jest.mock("@react-native-async-storage/async-storage", () => {
  const { createAsyncStorageMock } = require("@/shared/test");
  return createAsyncStorageMock();
});

const initialState = useAdhkarStore.getState();

describe("DetailsActionBar (critical behavior)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAdhkarStore.setState(initialState, true);
  });

  it("shares a composed message when item has at least one entry", async () => {
    const shareSpy = jest
      .spyOn(Share, "share")
      .mockResolvedValueOnce({ action: "sharedAction" } as any);

    const item: AdhkarItem = {
      id: "1",
      title: "Morning Adhkar",
      type: "morning" as any,
      entries: [
        {
          arabicText: "اللَّهُمَّ أَنْتَ رَبِّي",
          transliteration: "Allahumma anta rabbi",
          translation: { en: "O Allah, You are my Lord" } as any,
        } as any,
      ],
    } as any;

    const { getByLabelText } = render(<DetailsActionBar item={item} />);

    fireEvent.press(getByLabelText("share"));

    expect(shareSpy).toHaveBeenCalledTimes(1);

    const arg = shareSpy.mock.calls[0]?.[0] as { title: string; message: string };

    expect(arg.title).toBe("Morning Adhkar");

    expect(arg.message).toContain("Morning Adhkar");
    expect(arg.message).toContain("اللَّهُمَّ أَنْتَ رَبِّي");
    expect(arg.message).toContain("Allahumma anta rabbi");
    expect(arg.message).toContain("O Allah, You are my Lord");
  });

  it("shares just the title when there are no entries", async () => {
    jest.spyOn(Share, "share").mockResolvedValueOnce({ action: "sharedAction" } as any);

    const item: AdhkarItem = {
      id: "1",
      title: "Empty Adhkar",
      type: "morning" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsActionBar item={item} />);

    fireEvent.press(getByLabelText("share"));

    expect(Share.share).toHaveBeenCalledWith({
      title: "Empty Adhkar",
      message: "Empty Adhkar",
    });
  });

  it("toggles favourite when pressing favorite", () => {
    const item: AdhkarItem = {
      id: "2",
      title: "Evening Adhkar",
      type: "evening" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsActionBar item={item} />);

    fireEvent.press(getByLabelText("favorite"));

    expect(useAdhkarStore.getState().favouriteIds).toContain("evening-2");
  });

  it("swallows share failures without throwing", async () => {
    jest.spyOn(Share, "share").mockRejectedValueOnce(new Error("share failed"));

    const item: AdhkarItem = {
      id: "3",
      title: "Broken Share",
      type: "evening" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsActionBar item={item} />);

    await expect(async () => {
      fireEvent.press(getByLabelText("share"));
      await Promise.resolve();
    }).not.toThrow();
  });

  it("allows pressing the play button", () => {
    const item: AdhkarItem = {
      id: "4",
      title: "Playable",
      type: "evening" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsActionBar item={item} />);

    expect(() => fireEvent.press(getByLabelText("play"))).not.toThrow();
  });
});
