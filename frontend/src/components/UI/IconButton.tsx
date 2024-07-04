import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { SvgProps } from "react-native-svg";

type PropTypes = {
  children: React.ReactNode;
  onPressAction: () => void;
};

const IconButton = ({ children, onPressAction }: PropTypes) => {
  return (
    <Pressable
      style={(pressed) => pressed && { opacity: 0.7 }}
      onPress={onPressAction}
    >
      {children}
    </Pressable>
  );
};

export default IconButton;
