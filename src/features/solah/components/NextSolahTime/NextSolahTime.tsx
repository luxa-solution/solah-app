import { Clock } from "lucide-react-native";
import { View, Text } from "react-native";

import { useNextSolah } from "@/features-solah/hooks";
import { context } from "@/shared/styles";
import { fontsize } from "@/shared/styles/font";

export function NextSolahTime() {
  const { nextSolah } = useNextSolah();
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Text
        style={{
          fontSize: fontsize.xs,
          textAlign: "left",
          color: context.brand.inverted,
        }}
      >
        Next prayer time
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
        <Clock size={20} color={context.default.inverted} />

        <Text
          style={{
            fontSize: fontsize.md,
            textAlign: "left",
            fontWeight: "semibold",
            color: context.default.inverted,
          }}
        >
          {nextSolah?.time}
        </Text>
      </View>
    </View>
  );
}
