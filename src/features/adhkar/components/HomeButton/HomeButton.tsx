import { Href, useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { AdhkarCategory } from "@/features-adhkar/types";
import { background, font } from "@/shared/styles";

export interface HomeButtonProps {
  category: AdhkarCategory;
  subCount?: number;
  adhkarCount?: number;
  image: any;
  backgroundColor?: string;
  href?: Href;
}

export function HomeButton({
  category,
  subCount = 0, // CHANGED: Was 3, now 0 (will receive real counts)
  adhkarCount = 0, // CHANGED: Was 20, now 0 (will receive real counts)
  image,
  backgroundColor = background.brand.primary,
  href = "/",
}: HomeButtonProps) {
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
    backgroundColor: background.brand.primary,
    paddingLeft: 16,
    borderRadius: 14,
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  title: {
    ...font.display.medium,
    color: "white",
  },

  subtitle: {
    ...font.label.xsmall,
    color: "white",
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
