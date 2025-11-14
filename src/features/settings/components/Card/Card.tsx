import React from "react";
import { View, Text, ViewStyle } from "react-native";

import { cardStyles } from "./Card.styles";

export type CardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
};

export const Card: React.FC<CardProps> = ({ title, children, style }) => {
  return (
    <>
      <Text style={cardStyles.title}>{title}</Text>
      <View style={[cardStyles.container, style]}>
        <View style={cardStyles.content}>{children}</View>
      </View>
    </>
  );
};
