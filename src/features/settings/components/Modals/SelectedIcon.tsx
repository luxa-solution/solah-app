import { Image, StyleSheet } from "react-native";

import { spacing } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

export function SelectedIcon() {
  return (
    <Image source={require("@/assets/adhkar-icons/verified-check.png")} style={styles.checkIcon} />
  );
}

const styles = StyleSheet.create({
  checkIcon: {
    width: ds(20),
    height: ds(20),
    marginLeft: spacing.sm,
  },
});
