import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, b1Roboto } from "../../constants/colors";
type PropTypes = {
  message: string;
  position: "top" | "bottom";
  type: "success" | "error";
  closeAction: () => void;
  //visible: boolean;
};

const Toast = ({
  message,
  position = "bottom",
  type,
  closeAction,
}: PropTypes) => {
  //console.log("Toast Visible: ", toastVisible);
  console.log("Toast Type: ", type);

  // useEffect(() => {
  //   console.log("setting toast visible", visible);
  //   setToastVisible(visible);
  // }, [visible]);

  const backgroundColor = type === "success" ? COLORS.success : COLORS.error;

  return (
    <View style={[styles.toast, { backgroundColor, [position]: 30 }]}>
      <Ionicons
        name={
          type === "success"
            ? "checkmark-circle-outline"
            : "close-circle-outline"
        }
        size={28}
        color={"white"}
      />
      <Text style={styles.toastMessage}>{message}</Text>
      <Pressable onPress={closeAction}>
        <Ionicons
          name="close"
          size={28}
          color={"white"}
          style={styles.toastCloseBtn}
        />
      </Pressable>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    ...b1Roboto,
  },
  toastCloseBtn: {
    alignSelf: "flex-end",
  },
  toastMessage: {
    color: "white",
  },
});
