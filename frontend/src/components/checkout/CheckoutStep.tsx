import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../constants/colors";
import { CheckoutStateType } from "./CheckoutProgressIndicator";

type Props = {
  state: CheckoutStateType;
  label: "Shipping" | "Payment" | "Review";
  step: number;
};

const CheckoutStep = ({ state, step, label }: Props) => {
  let indicator;

  switch (state) {
    case "inProgress":
      indicator = (
        <View style={[styles.stepContainer, styles.inProgressStyle]}>
          <Text>{step}</Text>
        </View>
      );
      break;
    case "completed":
      indicator = (
        <Ionicons name="checkmark-circle" size={24} color={COLORS.fgPrimary} />
      );
      break;
    default:
      indicator = (
        <View style={[styles.stepContainer, styles.noStartedStyle]}>
          <Text>{step}</Text>
        </View>
      );
  }

  return (
    <View style={styles.container}>
      {indicator}
      <Text style={styles.textStyle}>{label}</Text>
    </View>
  );
};

export default CheckoutStep;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  stepContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 26,
    height: 26,
    borderRadius: 50,
  },
  inProgressStyle: {
    backgroundColor: COLORS.accent,
  },
  noStartedStyle: {
    backgroundColor: COLORS.textGray,
  },
  textStyle: {
    color: COLORS.fgPrimary,
    fontSize: 16,
  },
});
