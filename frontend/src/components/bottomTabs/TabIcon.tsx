import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { COLORS, b2Roboto } from "../../constants/colors";
import { IoniconsProp } from "./TabBarButton";

type PropTypes = {
  focused: boolean;
  size: number;
  color: string;
  text: string;
  icon: IoniconsProp["name"];
};

const focusedStyleOuter = {
  backgroundColor: COLORS.fgPrimaryLight,
  marginVertical: 8,
  borderRadius: 30,
  paddingRight: 8,
  marginRight: 4,
};

const focusedStyleInner = {
  backgroundColor: COLORS.fgPrimary,
  borderRadius: 30,
  padding: 10,
};

const TabIcon = ({ focused, size, color, text, icon }: PropTypes) => {
  return (
    <View style={[styles.container, focused && focusedStyleOuter]}>
      <View style={[styles.innerContainer, focused && focusedStyleInner]}>
        <Ionicons
          name={icon}
          size={focused ? size : size * 0.9}
          color={color}
        />
      </View>
      {focused && <Text style={styles.label}>{text}</Text>}
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  innerContainer: {},
  label: {
    ...b2Roboto,
    color: COLORS.fgPrimary,
    fontWeight: "bold",
  },
});
