import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";

type PropTypes = {
  onPressNavigate: () => void;
};

const HeaderCartButton = ({ onPressNavigate }: PropTypes) => {
  return (
    <Pressable style={{ marginRight: 10 }} onPress={onPressNavigate}>
      <Ionicons name="cart-outline" size={30} color={COLORS.fgPrimary} />
    </Pressable>
  );
};

export default HeaderCartButton;

const styles = StyleSheet.create({});
