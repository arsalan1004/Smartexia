import { View, Text, Pressable, StyleSheet, ViewStyle } from "react-native";
import React, { Children, useEffect } from "react";
import { COLORS, b2Roboto } from "../../constants/colors";
import { ActivityIndicator } from "react-native";

type PropTypes = {
  title: string;
  variant: "primary" | "secondary"; // Primary = Yellow, Secondary = green
  onPressAction: () => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  bottomPosition?: number; // if -1 then don't stick
  widthPC?: number; // Width Percentage => number choosen instead of String for Proper Typing
  paddingVertical?: number;
};

const MainButton = ({
  title,
  variant,
  onPressAction,
  isSubmitting = false,
  disabled = false,
  bottomPosition = -1,
  widthPC = 100,
  paddingVertical = 16,
}: PropTypes) => {
  console.log("Main Button Disabled: ", disabled);
  console.log("Main Button isSubmitting: ", isSubmitting);

  let backgroundColor = "";

  if (disabled) backgroundColor = COLORS.textGray;
  else if (isSubmitting) backgroundColor = COLORS.textGray;
  else if (variant === "primary") backgroundColor = COLORS.accent;
  else if (variant === "secondary") backgroundColor = COLORS.fgPrimary;

  let foregroundColor = "";
  if (disabled) foregroundColor = "white";
  else if (isSubmitting) foregroundColor = "white";
  else if (variant === "primary") foregroundColor = COLORS.fgPrimary;
  else if (variant === "secondary") foregroundColor = "white";

  //const foregroundColor = variant === "primary" ? COLORS.fgPrimary : "white";

  const positionStyle: ViewStyle | null =
    bottomPosition !== -1
      ? { position: "absolute", bottom: bottomPosition }
      : null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          width: `${widthPC}%`,
          backgroundColor: backgroundColor,
          paddingVertical: paddingVertical,
          ...positionStyle,
        },
        pressed && styles.pressed,
      ]}
      onPress={onPressAction}
    >
      <View>
        <Text style={{ color: foregroundColor, fontWeight: "bold" }}>
          {!isSubmitting && title}
          {isSubmitting && (
            <ActivityIndicator size={"small"} color={COLORS.bgPrimary} />
          )}
        </Text>
      </View>
    </Pressable>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  pressableStyle: {
    flex: 1,
  },
  pressed: {
    opacity: 0.7,
  },
});
