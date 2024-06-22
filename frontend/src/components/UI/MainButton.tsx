import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";
import React from "react";
import { COLORS, b2Roboto } from "../../constants/colors";

type PropTypes = {
  title: string;
  variant: "primary" | "secondary"; // Primary = Yellow, Secondary = green
  onPressAction: () => void;
  disabled?: boolean;
  bottomPosition?: number; // if -1 then don't stick
};

const MainButton = ({
  title,
  variant,
  onPressAction,
  disabled = false,
  bottomPosition = -1,
}: PropTypes) => {
  const backgroundColor =
    variant === "primary" ? COLORS.accent : COLORS.fgPrimary;
  const foregroundColor = variant === "primary" ? COLORS.fgPrimary : "white";

  const positionStyle: ViewStyle | null =
    bottomPosition !== -1
      ? { position: "absolute", bottom: bottomPosition }
      : null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,

        { backgroundColor: backgroundColor, ...positionStyle },
        pressed && styles.pressed,
      ]}
      onPress={onPressAction}
    >
      <View>
        <Text style={{ color: foregroundColor }}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  pressableStyle: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
