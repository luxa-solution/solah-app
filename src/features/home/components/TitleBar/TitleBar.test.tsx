import { fireEvent, render } from "@testing-library/react-native";

import { TitleBar } from "./TitleBar";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Home TitleBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to qibla direction when pressing the qibla button", () => {
    const { getByTestId } = render(<TitleBar />);

    fireEvent.press(getByTestId("qibla-direction"));

    expect(mockPush).toHaveBeenCalledWith("/solah/qibla-direction");
  });

  it("renders the Arabic greeting title text", () => {
    const { getByText } = render(<TitleBar />);

    expect(getByText("السلام عليكم")).toBeTruthy();
  });

  it("renders the logo image", () => {
    const { UNSAFE_getAllByType } = render(<TitleBar />);
    const { Image } = require("react-native");
    const images = UNSAFE_getAllByType(Image);

    expect(images.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the qibla icon with accessibility label", () => {
    const { getByLabelText } = render(<TitleBar />);

    expect(getByLabelText("Qibla direction")).toBeTruthy();
  });

  it("qibla button has correct testID", () => {
    const { getByTestId } = render(<TitleBar />);

    expect(getByTestId("qibla-direction")).toBeTruthy();
  });
});
