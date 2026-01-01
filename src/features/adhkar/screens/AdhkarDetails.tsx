import { useMemo } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Details, TitleBar } from "@/features-adhkar/components";
import { adhkarData, AdhkarType } from "@/features-adhkar/data";
import { screenStyle } from "@/shared/styles";

interface AdhkarDetailsProps {
  adhkar_type: AdhkarType;
  id: string;
}

export function AdhkarDetails({ adhkar_type, id }: AdhkarDetailsProps) {
  const { bottom } = useSafeAreaInsets();

  const currentAdhkar = useMemo(() => {
    return adhkarData
      .flatMap((group) => group.items)
      .find((item) => item.id === id && item.type === adhkar_type);
  }, [adhkar_type, id]);

  return (
    <View
      style={{
        ...screenStyle.container,
        backgroundColor: "white",
        paddingBottom: bottom,
      }}
    >
      {/* Pass the adhkar item to TitleBar */}
      <TitleBar adhkar_type={adhkar_type} adhkarItem={currentAdhkar} showBookmark={true} />
      <Details id={id} adhkar_type={adhkar_type} />
    </View>
  );
}
