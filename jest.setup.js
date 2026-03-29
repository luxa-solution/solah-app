jest.mock("react-native-worklets", () => require("react-native-worklets/lib/module/mock"));

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));

require("react-native-reanimated").setUpTests();

jest.mock("expo-image", () => {
  const React = require("react");
  const { Image } = require("react-native");

  return {
    Image: (props) => React.createElement(Image, props),
  };
});

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  const { Text } = require("react-native");
  const MockIcon = (props) => React.createElement(Text, props, props.name || "Icon");

  return {
    Ionicons: MockIcon,
    MaterialCommunityIcons: MockIcon,
  };
});

jest.mock("@expo/vector-icons/Ionicons", () => {
  const React = require("react");
  const { Text } = require("react-native");

  return function IoniconsMock(props) {
    return React.createElement(Text, { ...props }, props.name || "Ionicon");
  };
});

jest.mock("lucide-react-native", () => {
  const React = require("react");
  const { Text } = require("react-native");
  const makeIcon = (label) => (props) => React.createElement(Text, props, label);

  return {
    ChevronDown: makeIcon("ChevronDown"),
    Clock: makeIcon("Clock"),
    CloudMoon: makeIcon("CloudMoon"),
    Sun: makeIcon("Sun"),
    CloudSun: makeIcon("CloudSun"),
    Sunset: makeIcon("Sunset"),
    MoonStar: makeIcon("MoonStar"),
    Moon: makeIcon("Moon"),
  };
});

jest.mock("react-native-paper", () => {
  const React = require("react");
  const { Pressable, Text, View } = require("react-native");

  return {
    Appbar: {
      Header: ({ children, ...props }) => React.createElement(View, props, children),
      BackAction: ({ onPress, accessibilityLabel = "Back" }) =>
        React.createElement(
          Pressable,
          { onPress, accessibilityLabel },
          React.createElement(Text, null, "Back")
        ),
      Content: ({ title }) => React.createElement(Text, null, title),
      Action: ({ icon, onPress, accessibilityLabel }) =>
        React.createElement(
          Pressable,
          { onPress, accessibilityLabel },
          React.createElement(Text, null, icon)
        ),
    },
  };
});
