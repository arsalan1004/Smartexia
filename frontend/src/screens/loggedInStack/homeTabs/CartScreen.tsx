import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Cart from "../Cart";
import TextButton from "../../../components/UI/TextButton";
import { COLORS } from "../../../constants/colors";

type Props = {};

type ModeType = "cart" | "orders";

const CartScreen = (props: Props) => {
  const [mode, setMode] = useState<ModeType>("cart");

  return (
    <View style={styles.container}>
      <View style={styles.modeControlContainer}>
        <View style={mode === "cart" ? styles.underline : null}>
          <TextButton
            title="Cart Items"
            onPressAction={() => setMode("cart")}
            fontSize={20}
            fontFamily={"oxygen"}
            fontWeight={"bold"}
            color={mode === "cart" ? COLORS.fgPrimary : COLORS.textGray}
          />
        </View>
        <View style={mode === "orders" ? styles.underline : null}>
          <TextButton
            title="Orders"
            onPressAction={() => setMode("orders")}
            fontSize={20}
            fontFamily={"oxygen"}
            fontWeight={"bold"}
            color={mode === "orders" ? COLORS.fgPrimary : COLORS.textGray}
          />
        </View>
      </View>
      <View style={styles.modeContainer}>
        {mode === "cart" && <Cart />}
        {mode === "orders" && <Text>Orders</Text>}
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeControlContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  underline: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
  },
  modeContainer: {
    flex: 1,
  },
});
