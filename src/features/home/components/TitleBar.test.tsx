import { fireEvent, render } from "@testing-library/react-native";

import { TitleBar } from "./TitleBar";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Home TitleBar (critical behavior)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to qibla direction when pressing the qibla button", () => {
    const { getByTestId } = render(<TitleBar />);

    fireEvent.press(getByTestId("qibla-direction"));

    expect(mockPush).toHaveBeenCalledWith("/solah/qibla-direction");
  });
});
