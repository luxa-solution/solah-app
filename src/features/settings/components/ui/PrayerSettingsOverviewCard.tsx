import {
  PRAYER_SETTINGS_OVERVIEW_ITEMS,
  PrayerSettingsOverviewType,
} from "@/features-settings/constants";
import { SettingsType } from "@/features-settings/types";

import { Card } from "./Card";
import { Item } from "./Item";

type PrayerSettingsOverviewCardProps = {
  type: PrayerSettingsOverviewType;
  onPress: (type: SettingsType) => void;
};

export function PrayerSettingsOverviewCard({ type, onPress }: PrayerSettingsOverviewCardProps) {
  const config = PRAYER_SETTINGS_OVERVIEW_ITEMS.find((entry) => entry.type === type);

  if (!config) {
    return null;
  }

  return (
    <Card title={config.cardTitle}>
      <Item label={config.label} value={config.value} onPress={() => onPress(config.type)} />
    </Card>
  );
}
