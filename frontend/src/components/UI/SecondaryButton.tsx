import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropTypes = {
  title: string;
  children: React.ReactNode;
  onPressAction: () => void;
  bottomPosition?: number;
  disabled?: boolean;
};

const SecondaryButton = ({
  children,
  title,
  onPressAction,
  bottomPosition = -1,
  disabled = false,
}: PropTypes) => {
  // console.log("SecondaryBTN : is Valid", disabled);

  return (
    <Pressable
      onPress={onPressAction}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.buttonContainer,
        disabled
          ? { backgroundColor: COLORS.textGray }
          : { backgroundColor: COLORS.fgPrimary },

        bottomPosition !== -1
          ? { position: "absolute", bottom: bottomPosition }
          : null,
      ]}
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
    // backgroundColor: COLORS.fgPrimary,
    padding: 5,
    borderRadius: 10,
    width: "100%",
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
