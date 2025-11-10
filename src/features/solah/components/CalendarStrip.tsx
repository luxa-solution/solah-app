import { useEffect, useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { colors, borderRadius } from "@/shared/styles";

type CalendarStripProps = {
  setSelectedDate: (date: Date) => void;
};

export const CalendarStrip = ({ setSelectedDate }: CalendarStripProps) => {
  const [referenceDate, setReferenceDate] = useState(new Date()); // controls the visible week
  const [today, setToday] = useState(new Date()); // tracks the real current date

  // 🕒 Auto-update at midnight
  useEffect(() => {
    const scheduleNextUpdate = () => {
      const now = new Date();
      const msUntilMidnight =
        new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

      return setTimeout(() => {
        setToday(new Date());
        scheduleNextUpdate();
      }, msUntilMidnight);
    };

    const timeout = scheduleNextUpdate();
    return () => clearTimeout(timeout);
  }, []);

  // --- Generate the 7 days of the current reference week (Sunday → Saturday) ---
  const weekDays = useMemo(() => {
    const startOfWeek = new Date(referenceDate);
    const dayOfWeek = startOfWeek.getDay(); // 0 = Sunday
    startOfWeek.setDate(referenceDate.getDate() - dayOfWeek);

    const arr: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [referenceDate]);

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const handlePrev = () => {
    setReferenceDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const handleNext = () => {
    setReferenceDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const displayMonth = referenceDate.toLocaleString("default", { month: "long" });
  const displayYear = referenceDate.getFullYear();

  return (
    <View style={styles.container}>
      {/* --- Header with chevrons --- */}
      <View style={styles.header}>
        <Pressable onPress={handlePrev}>
          <Text style={styles.chevron}>‹</Text>
        </Pressable>
        <Text style={styles.monthLabel}>
          {displayMonth} {displayYear}
        </Text>
        <Pressable onPress={handleNext}>
          <Text style={styles.chevron}>›</Text>
        </Pressable>
      </View>

      {/* --- Fixed Weekday Header --- */}
      <View style={styles.weekdayRow}>
        {["S", "M", "T", "W", "T", "F", "S"].map((letter, i) => (
          <Text key={i} style={styles.weekdayText}>
            {letter}
          </Text>
        ))}
      </View>

      {/* --- Dates Row --- */}
      <View style={styles.datesRow}>
        {weekDays.map((date) => {
          const isToday = isSameDay(date, today);
          return (
            <Pressable
              key={date.toISOString()}
              onPress={() => setSelectedDate(date)} // only update SolahTimes display
              style={({ pressed }) => [
                styles.dayContainer,
                isToday && styles.selectedDayContainer, // highlight today
                pressed && styles.pressedDayContainer, // temporary highlight
              ]}
            >
              {(
                { pressed } // 👈 this gives access to `pressed` for inner elements too
              ) => (
                <Text
                  style={[
                    styles.dayText,
                    isToday && styles.selectedDayText,
                    pressed && styles.pressedDayText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.background.brand.inverted,
    borderRadius: borderRadius[4],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  monthLabel: {
    fontSize: 18,
    fontWeight: "600",
  },
  chevron: {
    fontSize: 26,
    paddingHorizontal: 12,
    fontWeight: "bold",
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekdayText: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
    width: 40,
    textAlign: "center",
  },
  datesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius[2],
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDayContainer: {
    borderColor: colors.background.brand.primary,
    borderWidth: borderRadius[1],
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
  },
  selectedDayText: {
    fontWeight: "700",
  },
  pressedDayContainer: {
    backgroundColor: colors.background.brand.primary, // brand color highlight
    borderRadius: borderRadius[2],
  },
  pressedDayText: {
    color: colors.context.brand.inverted,
    fontWeight: "700",
  },
});
