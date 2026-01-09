require("react-native-reanimated").setUpTests();

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

jest.mock("@expo/vector-icons/Ionicons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return function IoniconsMock(props) {
    // render something deterministic, no internal state updates
    return React.createElement(Text, { ...props }, "Ionicon");
  };
});
