import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicon from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";

type PropTypes = {
  isPasswordMasked: boolean;
  setIsPasswordMasked: React.Dispatch<React.SetStateAction<boolean>>;
};

const MaskPasswordButton = ({
  isPasswordMasked,
  setIsPasswordMasked,
}: PropTypes) => {
  return (
    <Pressable style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
      <Ionicon
        size={24}
        color={COLORS.fgPrimary}
        name={isPasswordMasked ? "eye-off-outline" : "eye-outline"}
        onPress={() => setIsPasswordMasked((pm: boolean) => !pm)}
      />
    </Pressable>
  );
};

export default MaskPasswordButton;
