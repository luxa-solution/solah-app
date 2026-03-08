import { render } from "@testing-library/react-native";
import React from "react";

import { QiblaDirectionScreen } from "./QiblaDirectionScreen";

const mockUseQiblaParams = jest.fn();

jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));

jest.mock("@/features-solah/hooks", () => ({
  useQiblaParams: () => mockUseQiblaParams(),
}));

jest.mock("@/shared/components", () => {
  const { Text } = require("react-native");
  return {
    TitleBar: ({ title }: any) => <Text>{title}</Text>,
  };
});

jest.mock("@/features-solah/components", () => {
  const { Text, View } = require("react-native");
  return {
    CurrentLocation: ({ type }: any) => <Text>{`CurrentLocation:${type}`}</Text>,
    QiblaCompass: ({ qiblaBearing, distanceKm }: any) => (
      <View>
        <Text testID="qibla-compass">{`Qibla:${qiblaBearing}`}</Text>
        {distanceKm !== undefined && <Text>{`Distance:${distanceKm}`}</Text>}
      </View>
    ),
  };
});

describe("QiblaDirectionScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders title and location; hides compass while loading", () => {
    mockUseQiblaParams.mockReturnValue({
      qiblaBearing: 120,
      distanceKm: 800,
      loading: true,
    });

    const { getByText, queryByTestId } = render(<QiblaDirectionScreen />);

    expect(getByText("Qibla direction")).toBeTruthy();
    expect(getByText("CurrentLocation:container")).toBeTruthy();
    expect(queryByTestId("qibla-compass")).toBeNull();
  });

  it("renders compass when not loading and bearing is defined", () => {
    mockUseQiblaParams.mockReturnValue({
      qiblaBearing: 123.45,
      distanceKm: 900,
      loading: false,
    });

    const { getByTestId } = render(<QiblaDirectionScreen />);

    expect(getByTestId("qibla-compass")).toBeTruthy();
  });

  it("does not render compass when bearing is undefined even if not loading", () => {
    mockUseQiblaParams.mockReturnValue({
      qiblaBearing: undefined,
      distanceKm: undefined,
      loading: false,
    });

    const { queryByTestId } = render(<QiblaDirectionScreen />);

    expect(queryByTestId("qibla-compass")).toBeNull();
  });
});
