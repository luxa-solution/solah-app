import React from "react";
import { Text, Pressable } from "react-native";

import { itemStyles } from "./Item.styles";

export type ItemProps = {
  label: string;
  value: string;
  onPress?: () => void;
  disabled?: boolean;
};

export const Item: React.FC<ItemProps> = ({ label, value, onPress, disabled = false }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [itemStyles.container, pressed && itemStyles.pressed]}
    >
      <Text style={itemStyles.label}>{label}</Text>
      <Text style={itemStyles.value}>{value}</Text>
    </Pressable>
  );
};
