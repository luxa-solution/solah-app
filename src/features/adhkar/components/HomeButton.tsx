import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { background } from "@/shared/styles";

import { AdhkarCategory } from "../types/AdhkarCategory";

interface Props {
  category: AdhkarCategory;
  subCount?: number;
  adhkarCount?: number;
  image: any;
  backgroundColor?: string;
  href?: string;
}

export function HomeButton({
  category,
  subCount = 3,
  adhkarCount = 20,
  image,
  backgroundColor = background.brand.primary,
  href = "/",
}: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={() => router.push(href)}
      activeOpacity={0.9}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{category}</Text>
        <Text style={styles.subtitle}>
          {subCount} Sub-categories • {adhkarCount} Adhkar
        </Text>
      </View>

      <Image source={image} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: background.brand.primary, // will be overridden per category
    paddingLeft: 16,
    borderRadius: 14,
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontFamily: "Figtree_700Bold",
    fontWeight: "700",
    fontSize: 36,
    lineHeight: 43,
  },
  subtitle: {
    color: "white",
    fontFamily: "Figtree_600SemiBold",
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 14,
    marginTop: 4,
    opacity: 0.85,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
    alignSelf: "stretch",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
