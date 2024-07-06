import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CheckoutStep from "./CheckoutStep";
import { COLORS } from "../../constants/colors";
import { CheckoutIndicatorType } from "../../screens/loggedInStack/Checkout";

type PropTypes = {
  checkoutIndicatorState: CheckoutIndicatorType;
};

export type CheckoutStateType = "inProgress" | "completed" | "notStarted";

const CheckoutProgressIndicator = ({ checkoutIndicatorState }: PropTypes) => {
  const { shipping, payment, review } = checkoutIndicatorState;

  return (
    <View style={styles.container}>
      <CheckoutStep state={shipping} step={1} label="Shipping" />
      <View
        style={[styles.underline, payment === "inProgress" && styles.progress]}
      ></View>
      <CheckoutStep state={payment} step={2} label="Payment" />
      <View style={[styles.underline, styles.progress]}></View>
      <CheckoutStep state={review} step={3} label="Review" />
    </View>
  );
};

export default CheckoutProgressIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    elevation: 1,
    backgroundColor: COLORS.bgSecondary,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  underline: {
    borderBottomWidth: 2,
    flex: 1,
    marginHorizontal: 10,
  },
  progress: {
    borderBottomColor: COLORS.fgPrimary,
  },
});
