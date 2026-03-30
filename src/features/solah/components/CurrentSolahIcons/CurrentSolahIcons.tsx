import { View, Text } from "react-native";

import { useCurrentSolah } from "@/features-solah/hooks";
import { SolahName } from "@/features-solah/types";
import { SolahIcons } from "@/features-solah/utils";
import { context, fontsize, fontweight } from "@/shared/styles";

const currentIconColor = context.default.inverted;
const defaultIconColor = context.brand.inverted;
const iconSize = 16;

export function CurrentSolahIcons() {
  const { currentSolah } = useCurrentSolah();
  const solahOrder: SolahName[] = ["Subhi", "Dhuhr", "Asr", "Maghrib", "Isha"];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 14,
      }}
    >
      {solahOrder.map((title) => {
        const Icon = SolahIcons[title];
        const isCurrent = currentSolah === title;
        const color = isCurrent ? currentIconColor : defaultIconColor;

        return (
          <View
            key={title}
            style={{
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 2,
            }}
          >
            <Icon color={color} size={iconSize} />
            <Text
              style={{
                textAlign: "left",
                color,
                fontWeight: isCurrent ? fontweight.extrabold : fontweight.normal,
                fontSize: fontsize.xs,
              }}
            >
              {title}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
