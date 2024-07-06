import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { COLORS, h3Oxygen } from "../../constants/colors";
import { loginRegStyles } from "../../constants/SharedStyles";
import SecondaryButton from "../UI/SecondaryButton";
import Review from ".../../../assets/images/review.svg";
import { StripeProvider } from "@stripe/stripe-react-native";

type PropTypes = {
  amount: number;
  openPaymentSheet: () => Promise<void>;
};

const Payment = ({ amount, openPaymentSheet }: PropTypes) => {
  const [amountIsValid, setAmountIsValid] = useState("untouched");

  const onChangeTextHandler = (text: string) => {
    if (amountIsValid === "untouched") setAmountIsValid("false");
    if (text === amount.toString()) {
      setAmountIsValid("true");
    } else {
      setAmountIsValid("false");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepHeading}>Payment</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>Total Amount: $ {amount}</Text>
      </View>
      <Text style={styles.guideline}>
        To confirm your purchase, please enter the total amount shown above in
        the box below. This extra step helps ensure accuracy and protect against
        accidental overcharges.
      </Text>
      <TextInput
        placeholder={`${amount}`}
        keyboardType="numeric"
        style={[loginRegStyles.fieldContainer, styles.fieldStyles]}
        onChangeText={onChangeTextHandler}
      />
      {amountIsValid === "false" && (
        <Text style={{ alignSelf: "center" }}>Amount entered is incorrect</Text>
      )}

      <SecondaryButton
        title="Perform Payment"
        onPressAction={openPaymentSheet}
        bottomPosition={20}
        disabled={!amountIsValid}
      >
        <Review fill={COLORS.accent} width={32} />
      </SecondaryButton>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    rowGap: 30,
    flex: 1,
  },
  stepHeading: {
    ...h3Oxygen,
    color: COLORS.fgPrimary,
  },
  amountContainer: {
    padding: 5,
    backgroundColor: COLORS.fgPrimary,
    width: "50%",
    borderRadius: 10,
    alignSelf: "center",
  },
  amountText: {
    color: COLORS.bgPrimary,
    textAlign: "center",
    fontSize: 18,
  },
  guideline: {
    fontSize: 16,
  },
  fieldStyles: {
    width: "50%",
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 2,
    borderColor: COLORS.fgPrimary,
    textAlign: "center",
    fontSize: 18,
  },
});
