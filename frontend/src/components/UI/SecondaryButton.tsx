import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropTypes = {
  title: string;
  children: React.ReactNode;
  onPressAction: () => void;
};

const SecondaryButton = ({ children, title, onPressAction }: PropTypes) => {
  return (
    <Pressable
      onPress={onPressAction}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.buttonContainer}>
        <View style={styles.iconTextContainer}>
          {children}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={36} color={"white"} />
      </View>
    </Pressable>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.fgPrimary,
    padding: 10,
    borderRadius: 10,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  pressed: {
    opacity: 0.7,
  },
});
