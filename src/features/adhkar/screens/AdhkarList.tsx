import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { List, TitleBar } from "@/features-adhkar/components";
import { AdhkarType } from "@/features-adhkar/data";
import { screenStyle } from "@/shared/styles";

interface AdhkarListProps {
  adhkar_type: AdhkarType;
}

export function AdhkarList({ adhkar_type }: AdhkarListProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        ...screenStyle.container,
        backgroundColor: "white",
        paddingBottom: bottom,
      }}
    >
      <TitleBar adhkar_type={adhkar_type} />
      <List type={adhkar_type} />
    </View>
  );
}
