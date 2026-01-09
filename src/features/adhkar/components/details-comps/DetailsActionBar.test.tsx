import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Share } from "react-native";

import type { AdhkarItem } from "@/features-adhkar/types";

import { DetailsActionBar } from "./DetailsActionBar";

const mockToggleFavourite = jest.fn();
const mockIsFavourite = jest.fn();

jest.mock("@/features-adhkar/store", () => ({
  useAdhkarStore: () => ({
    toggleFavourite: mockToggleFavourite,
    isFavourite: mockIsFavourite,
  }),
}));

describe("DetailsActionBar (critical behavior)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shares a composed message when item has at least one entry", async () => {
    const shareSpy = jest
      .spyOn(Share, "share")
      .mockResolvedValueOnce({ action: "sharedAction" } as any);

    mockIsFavourite.mockReturnValue(false);

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

    mockIsFavourite.mockReturnValue(false);

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
    mockIsFavourite.mockReturnValue(false);

    const item: AdhkarItem = {
      id: "2",
      title: "Evening Adhkar",
      type: "evening" as any,
      entries: [],
    } as any;

    const { getByLabelText } = render(<DetailsActionBar item={item} />);

    fireEvent.press(getByLabelText("favorite"));

    expect(mockToggleFavourite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavourite).toHaveBeenCalledWith(item);
  });
});
