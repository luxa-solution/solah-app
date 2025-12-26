import { useRouter } from "expo-router";
import { Compass, Search } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { fontsize } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

export const TitleBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solah Guide</Text>

      <View style={styles.ctaWrapper}>
        <Pressable onPress={() => router.push("/solah/qibla-direction")}>
          <Compass />
        </Pressable>
        <Pressable>
          <Search />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: ds(38),
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: ds(10),
  },
  title: {
    fontSize: fontsize.xxl,
    textAlign: "left",
    fontWeight: "bold",
  },
  ctaWrapper: {
    flexDirection: "row",
    width: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    gap: ds(12),
  },
});
