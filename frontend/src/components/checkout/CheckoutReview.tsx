import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ReviewBox from "./ReviewBox";
import { COLORS, h3Oxygen, h4Oxygen } from "../../constants/colors";
import SecondaryButton from "../UI/SecondaryButton";
import PlaceOrder from "../../../assets/images/placeOrder.svg";

type PropTypes = {
  shippingDetails: Record<string, string>;
  orderDetails: Record<string, number>;
  amount: number;
  confirmPayment: () => Promise<void>;
};

const CheckoutReview = ({
  shippingDetails,
  orderDetails,
  amount,
  confirmPayment,
}: PropTypes) => {
  const shippingDetailsReadableMap = {
    fullName: "Full Name",
    street: "Street Address",
    city: "City",
    postalCode: "Postal Code",
    phoneNumber: "Phone Number",
  };
  let shippingDetailsReadable: Record<string, string> = {};
  Object.keys(shippingDetails).forEach((key: any) => {
    shippingDetailsReadable[shippingDetailsReadableMap[key]] =
      shippingDetails[key];
  });

  return (
    <View style={styles.container}>
      <ReviewBox title={"Shipping Details"} details={shippingDetailsReadable} />
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Order Summary</Text>
        {Object.keys(orderDetails).map((key, index) => (
          <View
            key={index}
            style={{
              marginTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.key}>{key}</Text>
            <Text style={styles.value}>{orderDetails[key]}</Text>
          </View>
        ))}
        <View style={styles.summaryInfo}>
          <Text style={styles.totalText}>Grand Total</Text>
          <Text style={styles.grandTotal}>$ {amount}</Text>
        </View>
      </View>
      <SecondaryButton
        title="Confirm Order Placement"
        onPressAction={confirmPayment}
        bottomPosition={20}
      >
        <PlaceOrder fill={COLORS.accent} width={36} />
      </SecondaryButton>
    </View>
  );
};

export default CheckoutReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  summaryContainer: {
    backgroundColor: COLORS.bgSecondary,
    width: "90%",
    alignSelf: "center",
    elevation: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginTop: 30,
  },
  summaryText: {
    ...h4Oxygen,
    color: COLORS.fgPrimary,
    fontWeight: "bold",
  },
  summaryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: {
    ...h3Oxygen,
    color: COLORS.textPrimary,
  },
  grandTotal: {
    ...h3Oxygen,
    color: COLORS.fgPrimary,
  },
  rowEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginVertical: 5,
  },
  key: {
    color: COLORS.textPrimary,
  },
  value: {
    color: COLORS.fgPrimary,
  },
});
