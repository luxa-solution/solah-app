import { Sun, Moon } from "lucide-react-native";
import { View, Text, StyleSheet } from "react-native";

import { useSettingsStore } from "@/features-settings/store";
import { useNextSolah } from "@/features-solah/hooks";
import { getPrayerTimingDisplay } from "@/features-solah/utils";
import { background, borderRadius, spacing, context, font } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

interface TimingCardProps {
  type: "adhan" | "iqaamah";
  time: string;
}

function TimingCard({ type, time }: TimingCardProps) {
  const isAdhan = type === "adhan";
  const Icon = isAdhan ? Sun : Moon;
  const label = isAdhan ? "Adhan starts" : "Iqaamah starts";

  return (
    <View style={styles.card}>
      <Icon size={ds(32)} color={context.brand.primary} />
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

export function PrayerTimingCard() {
  const { nextSolah } = useNextSolah();
  const prayerSchedule = useSettingsStore((state) => state.prayerSchedule);
  const timeFormat = useSettingsStore((state) => state.timeFormat.value);
  const timezone = useSettingsStore((state) => state.timezone.timezone);
  const { adhanDisplay, iqamahDisplay } = getPrayerTimingDisplay(
    nextSolah.title,
    nextSolah.time,
    prayerSchedule,
    timeFormat,
    timezone
  );

  return (
    <View style={styles.container}>
      <TimingCard type="adhan" time={adhanDisplay} />
      <TimingCard type="iqaamah" time={iqamahDisplay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing.xs,
    flexDirection: "row",
    marginVertical: spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: background.brand.inverted,
    borderRadius: borderRadius[4],
    borderWidth: 1,
    borderColor: background.brand.primary,
    padding: spacing.xs,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  textContainer: {
    flex: 1,
    gap: spacing["3xs"],
  },
  label: {
    ...font.body.xsmall,
    fontWeight: "400",
    color: context.brand.primary,
  },
  time: {
    ...font.heading.small,
    fontWeight: "700",
    color: context.brand.primary,
  },
});
