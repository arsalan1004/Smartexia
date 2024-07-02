import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC, SVGProps } from "react";
import { SvgProps } from "react-native-svg";
import { COLORS } from "../../constants/colors";
import { IoniconsProp } from "../bottomTabs/TabBarButton";

type Props = {
  children: React.ReactNode;
  onPressAction: () => void;
};

const PlusButton = ({ children, onPressAction }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed && styles.pressed,
      ]}
      onPress={onPressAction}
    >
      <View>{children}</View>
    </Pressable>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  buttonContainer: {
    backgroundColor: COLORS.accent,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
