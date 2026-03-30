import React from "react";

import { Item } from "./Item";

type CustomizeNotificationsButtonProps = {
  onPress: () => void;
};

export function CustomizeNotificationsButton({ onPress }: CustomizeNotificationsButtonProps) {
  return (
    <Item
      label="Customize notifications"
      value="Adjust adhan and iqamah alerts"
      onPress={onPress}
    />
  );
}
