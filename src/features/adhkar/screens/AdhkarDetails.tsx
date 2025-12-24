import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Details, TitleBar } from "@/features-adhkar/components";
import { AdhkarType } from "@/features-adhkar/data";
import { screenStyle } from "@/shared/styles";

interface AdhkarDetailsProps {
  adhkar_type: AdhkarType;
  id: string;
}

export function AdhkarDetails({ adhkar_type, id }: AdhkarDetailsProps) {
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
      <Details id={id} adhkar_type={adhkar_type} />
    </View>
  );
}
