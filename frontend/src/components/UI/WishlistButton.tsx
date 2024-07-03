import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";

type PropTypes = {
  isWishlisted: boolean;
  onPressAction: () => void;
};

const WishlistButton = ({ isWishlisted, onPressAction }: PropTypes) => {
  return (
    <Pressable onPress={() => console.log("Wishlist Button Pressed")}>
      <View style={styles.containerStyles}>
        <Ionicons
          name={isWishlisted ? "heart" : "heart-outline"}
          size={24}
          color={isWishlisted ? COLORS.tertiary : COLORS.fgPrimary}
        />
      </View>
    </Pressable>
  );
};

export default WishlistButton;

const styles = StyleSheet.create({
  containerStyles: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    backgroundColor: COLORS.bgPrimary,
    borderRadius: 20,
    zIndex: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
