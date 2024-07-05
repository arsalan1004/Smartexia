import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import PlusButton from "../UI/PlusButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";

type PropTypes = {
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  onChangeQuantityInput: (text: string) => void;
  quantity: string;
};

const QuantityControlInput = ({
  incrementQuantity,
  decrementQuantity,
  onChangeQuantityInput,
  quantity,
}: PropTypes) => {
  return (
    <View style={styles.quantityControl}>
      <PlusButton onPressAction={incrementQuantity}>
        <Ionicons name="add" size={30} color={COLORS.fgPrimary} />
      </PlusButton>
      <TextInput
        keyboardType="number-pad"
        style={styles.quantityInput}
        onChangeText={onChangeQuantityInput}
        value={quantity}
        //  onBlur={onBlurMinPrice}
      />
      <PlusButton onPressAction={decrementQuantity}>
        <Ionicons name={"remove"} size={30} color={COLORS.fgPrimary} />
      </PlusButton>
    </View>
  );
};

export default QuantityControlInput;

const styles = StyleSheet.create({
  quantityControl: {
    flexDirection: "row",
    width: "40%",
    alignItems: "center",
  },
  quantityInput: {
    width: "40%",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    textAlign: "center",
  },
});
