import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CheckoutProgressIndicator from "../../components/checkout/CheckoutProgressIndicator";
import Shipping, {
  ShippingFormFields,
} from "../../components/checkout/Shipping";
import Payment from "../../components/checkout/Payment";
import { RouteProp } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";

type CheckoutScreenRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "checkout"
>;

type Props = {
  route: CheckoutScreenRouteProp;
};

export type CheckoutIndicatorType = {
  shipping: "inProgress" | "completed" | "notStarted";
  payment: "inProgress" | "completed" | "notStarted";
  review: "inProgress" | "completed" | "notStarted";
};

type CheckoutStepType = keyof CheckoutIndicatorType;

const Checkout = ({ route }: Props) => {
  const { cartItemPrice } = route.params;

  console.log("CartITem Price", cartItemPrice);

  const [checkoutStep, setCheckoutStep] = useState<CheckoutStepType>("payment");

  const [checkoutIndicatorState, setCheckoutIndicatorState] =
    useState<CheckoutIndicatorType>({
      shipping: "completed",
      payment: "inProgress",
      review: "notStarted",
    });

  const [shippingDetails, setShippingDetails] = useState<
    ShippingFormFields | undefined
  >();

  const shippingCompleteHandler = (shippingAddress: ShippingFormFields) => {
    setShippingDetails(shippingAddress);
    setCheckoutStep("payment");
    console.log(shippingAddress);
    setCheckoutIndicatorState({
      shipping: "completed",
      payment: "inProgress",
      review: "notStarted",
    });
    console.log("Checkout Complete");
  };

  return (
    <View style={styles.container}>
      <CheckoutProgressIndicator
        checkoutIndicatorState={checkoutIndicatorState}
      />
      <View style={styles.innerContainer}>
        {checkoutStep === "shipping" && (
          <Shipping onShippingComplete={shippingCompleteHandler} />
        )}
        {checkoutStep === "payment" && (
          <Payment cartItemPrice={cartItemPrice} />
        )}
      </View>
    </View>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
  },
});
