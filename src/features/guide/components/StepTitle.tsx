import { StyleSheet, Text, View } from "react-native";

import { SolahGroup } from "@/features-solah/types";
import { fontweight, fontsize, colors } from "@/shared/styles";

interface SolahTitleProps {
  items: SolahGroup["items"][number];
}

export const StepTitle = ({ items }: SolahTitleProps) => {
  return (
    <View>
      <Text style={styles.title}>{items.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fontsize.xl,
    fontWeight: fontweight.semibold,
    color: colors.context.default.primary,
    alignSelf: "flex-start",
  },
});
