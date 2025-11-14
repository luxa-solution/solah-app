import { View, Text, StyleSheet } from "react-native";

import { useCurrentLocation, useCurrentSolah, useSolahTimes } from "@/features-solah/hooks";
import { CalendarFormat } from "@/features-solah/types";
import { formatDate, SolahIcons } from "@/features-solah/utils";
import { colors, spacing, borderRadius, font, fontweight } from "@/shared/styles";

interface CurrentSolahTimesProps {
  selectedDate: Date;
}

export function CurrentSolahTimes({ selectedDate }: CurrentSolahTimesProps) {
  const { times } = useSolahTimes(selectedDate);
  const { location } = useCurrentLocation();
  const { currentSolah } = useCurrentSolah();

  const calendarFormat: CalendarFormat = "hijri";
  const dayName = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const locale = "en-US";

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.dateLocContainer}>
        <Text style={styles.dateText}>
          {dayName} • {formatDate(selectedDate, calendarFormat, locale, "collapse")}
        </Text>
        <Text style={styles.locationText}>{location?.country}</Text>
      </View>

      {/* Solah Times List */}
      {times.map(({ title, time }) => {
        const isActive = title === currentSolah;
        const Icon = SolahIcons[title];

        return (
          <View
            key={title}
            style={[styles.row, isActive && { backgroundColor: colors.background.brand.primary }]}
          >
            <View style={styles.left}>
              <Icon size={20} color={colors.context.default.inverted} style={{ marginRight: 8 }} />
              <Text style={styles.rowText}>{title}</Text>
            </View>

            <Text style={styles.rowText}>{time}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius[4],
    backgroundColor: colors.background.default.inverted,
    gap: spacing.m,
  },
  dateLocContainer: {
    gap: spacing["3xs"],
  },
  dateText: {
    ...font.label.small,
    fontWeight: fontweight.bold,
    color: colors.context.default.inverted,
  },
  locationText: {
    ...font.body.small,
    fontWeight: "600",
    color: colors.context.default.tertiary,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius[7],
    marginVertical: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowText: {
    color: colors.context.default.inverted,
    marginLeft: spacing.sm,
    fontFamily: "Figtree",
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: 0,
  },
});
