import { StyleSheet, Text, View } from "react-native";

import { SolahGroup } from "@/features-solah/types";
import { colors, font } from "@/shared/styles";

interface SolahDescriptionProps {
  items: SolahGroup["items"][number];
}

export const StepDescription = ({ items }: SolahDescriptionProps) => {
  const instruction = items.instruction?.en;
  return (
    <View>
      <Text style={styles.desc}>{instruction}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  desc: {
    ...font.body.small,
    color: colors.context.default.primary,
  },
});
