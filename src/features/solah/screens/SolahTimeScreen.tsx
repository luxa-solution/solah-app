import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CurrentSolahTimes, PrayerTimesCard, SolahCalendar } from "@/features-solah/components";
import { FindQiblaButton } from "@/features-solah/components/FindQiblaButton";
import { TitleBar } from "@/shared/components";
import { colors, screenStyle } from "@/shared/styles";
import { ds } from "@/shared/utils/responsive-dimensions";

export function SolahTimeScreen() {
  const { bottom } = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  return (
    <ScrollView
      style={{
        ...screenStyle.container,
        backgroundColor: colors.background.default.primary,
      }}
      contentContainerStyle={{
        paddingBottom: bottom,
      }}
      showsVerticalScrollIndicator={false}
    >
      <TitleBar title="Solah time" />

      <View style={{ gap: ds(8) }}>
        <PrayerTimesCard style={{ marginTop: 0 }} />
        <FindQiblaButton />
        <SolahCalendar setSelectedDate={setSelectedDate} />
        <CurrentSolahTimes selectedDate={selectedDate} />
      </View>
    </ScrollView>
  );
}
