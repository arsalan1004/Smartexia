import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

type PropTypes = {
  title: string;
  onPressAction: () => void;
  fontSize?: number;
  fontFamily?: "Roboto" | "oxygen";
  fontWeight?: "bold" | "normal";
  disabled?: boolean;
  color: string;
};

const TextButton = ({
  title = "TextButton",
  onPressAction,
  fontSize = 12,
  fontFamily = "Roboto",
  fontWeight = "normal",
  disabled = false,
  color = "black",
}: PropTypes) => {
  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={onPressAction}
      disabled={disabled}
    >
      <Text style={{ fontSize, fontFamily, fontWeight, color }}>{title}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
