import { act, fireEvent, render } from "@testing-library/react-native";
import React from "react";

import { SolahGuide } from "./SolahGuide";

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

const mockBack = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

jest.mock("@/features-solah/data", () => ({
  solahGuides: {
    Fajr: {
      items: [
        {
          title: "Step One",
          instruction: { en: "Do the first thing" },
          entries: [
            {
              arabicText: "Arabic One",
              transliteration: "Transliteration One",
              media: {
                image: 1,
                audio: "/audio/solah/common/takbir.mp3",
              },
            },
          ],
        },
        {
          title: "Step Two",
          instruction: { en: "Do the second thing" },
          entries: [
            {
              arabicText: "Arabic Two",
              transliteration: "Transliteration Two",
              media: {},
            },
          ],
        },
        {
          title: "Step Three",
          instruction: { en: "Do the third thing" },
          entries: [
            {
              arabicText: "Arabic Three",
              transliteration: "Transliteration Three",
              media: {},
            },
          ],
        },
      ],
    },
  },
}));

describe("SolahGuide", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders the real current step content", () => {
    const { getByText } = render(<SolahGuide solahName={"Fajr" as any} />);

    expect(getByText("Fajr")).toBeTruthy();
    expect(getByText(/Step\s*1\s*\/\s*3/)).toBeTruthy();
    expect(getByText("Step One")).toBeTruthy();
    expect(getByText("Do the first thing")).toBeTruthy();
    expect(getByText("Arabic One")).toBeTruthy();
    expect(getByText("Transliteration One")).toBeTruthy();
    expect(getByText("Play audio")).toBeTruthy();
  });

  it("moves forward and backward through the real guide content", () => {
    const { getByText } = render(<SolahGuide solahName={"Fajr" as any} />);

    act(() => {
      fireEvent.press(getByText("Next"));
      jest.runOnlyPendingTimers();
    });

    expect(getByText(/Step\s*2\s*\/\s*3/)).toBeTruthy();
    expect(getByText("Step Two")).toBeTruthy();
    expect(getByText("Transliteration Two")).toBeTruthy();

    act(() => {
      fireEvent.press(getByText("Next"));
      jest.runOnlyPendingTimers();
    });

    expect(getByText(/Step\s*3\s*\/\s*3/)).toBeTruthy();
    expect(getByText("Step Three")).toBeTruthy();
    expect(getByText("Transliteration Three")).toBeTruthy();

    act(() => {
      fireEvent.press(getByText("Previous"));
      jest.runOnlyPendingTimers();
    });

    expect(getByText(/Step\s*2\s*\/\s*3/)).toBeTruthy();
    expect(getByText("Step Two")).toBeTruthy();
  });

  it("keeps navigation bounded at the first and last steps", () => {
    const { getByText } = render(<SolahGuide solahName={"Fajr" as any} />);

    act(() => {
      fireEvent.press(getByText("Previous"));
      jest.runOnlyPendingTimers();
    });

    expect(getByText(/Step\s*1\s*\/\s*3/)).toBeTruthy();

    act(() => {
      fireEvent.press(getByText("Next"));
      jest.runOnlyPendingTimers();
    });
    act(() => {
      fireEvent.press(getByText("Next"));
      jest.runOnlyPendingTimers();
    });
    act(() => {
      fireEvent.press(getByText("Next"));
      jest.runOnlyPendingTimers();
    });

    expect(getByText("Step 3/3")).toBeTruthy();
    expect(getByText("Step Three")).toBeTruthy();
  });

  it("uses the real title bar back action", () => {
    const { getByLabelText } = render(<SolahGuide solahName={"Fajr" as any} />);

    fireEvent.press(getByLabelText("Back"));

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
