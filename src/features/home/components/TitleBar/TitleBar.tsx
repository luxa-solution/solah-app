import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";

import { fontsize } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

// assets
const logoImg = require("@/assets/images/Logo.png");
const qiblaImg = require("@/assets/images/Qiblah.png");

export const TitleBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.leftGroup}>
        <Image source={logoImg} style={styles.logo} />
        <Text style={styles.title}>السلام عليكم</Text>
      </View>

      <View style={styles.ctaWrapper}>
        <Pressable
          onPress={() => router.push("/solah/qibla-direction")}
          testID="qibla-direction"
          accessibilityLabel="Qibla direction"
        >
          <Image source={qiblaImg} style={styles.qiblaIcon} />
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
    fontSize: fontsize.xl,
    fontFamily: "ReemKufi_400Regular",
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
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: ds(8),
  },
  logo: {
    width: ds(33),
    height: ds(33),
    transform: [{ rotate: "0deg" }],
    opacity: 1,
    borderRadius: 2,
    resizeMode: "contain",
  },

  qiblaIcon: {
    width: ds(42),
    height: ds(40),
    transform: [{ rotate: "0deg" }],
    opacity: 1,
    resizeMode: "contain",
  },
});
