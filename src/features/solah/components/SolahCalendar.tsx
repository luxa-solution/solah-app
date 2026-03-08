import React from "react";
// import { View, Text, Pressable } from "react-native";
import { View } from "react-native";

import { CalendarStrip } from "./CalendarStrip";

interface SolahCalendarProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function SolahCalendar({ setSelectedDate }: SolahCalendarProps) {
  return (
    <View>
      <CalendarStrip setSelectedDate={setSelectedDate} />
    </View>
  );
}
