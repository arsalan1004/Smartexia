import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CheckoutProgressIndicator from "../../components/checkout/CheckoutProgressIndicator";
import Shipping, {
  ShippingFormFields,
} from "../../components/checkout/Shipping";
import Payment from "../../components/checkout/Payment";
import { RouteProp } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";
import {
  confirmPaymentSheetPayment,
  initPaymentSheet,
  presentPaymentSheet,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { useGetPaymentSecretsMutation } from "../../features/checkout/CheckoutApi";
import { set } from "react-hook-form";
import CheckoutReview from "../../components/checkout/CheckoutReview";
import { RootHomeTabsParamList } from "../../navigation/HomeTabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type CheckoutScreenRouteProp = RouteProp<
  RootLoggedInStackParamList & RootHomeTabsParamList,
  "checkout" | "orders"
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
  const [getPaymentSecrets] = useGetPaymentSecretsMutation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootHomeTabsParamList, "orders">>();

  console.log("CartITem Price", cartItemPrice);

  const [checkoutStep, setCheckoutStep] =
    useState<CheckoutStepType>("shipping");
  const [amount, setAmount] = useState<number>(0);

  const [checkoutIndicatorState, setCheckoutIndicatorState] =
    useState<CheckoutIndicatorType>({
      shipping: "inProgress",
      payment: "notStarted",
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
    initializePaymentSheet();
    console.log("Checkout Complete");
  };

  useEffect(() => {
    setAmount(
      Object.values(cartItemPrice).reduce((acc, curr) => curr + acc, 0)
    );
  }, []);

  // useEffect(() => {
  //   if (checkoutStep === "payment") {
  //     console.log("Payment Step @ Checkout.tsx");

  //   }
  // }, [shippingDetails]);

  const initializePaymentSheet = async () => {
    // setLoading(true);

    try {
      const { data } = await getPaymentSecrets(amount);
      console.log(data);
      const { paymentIntent, ephemeralKey, customer } = data;
      console.log(paymentIntent, ephemeralKey, customer);

      const address = {
        city: shippingDetails?.city,
        country: "PK",
        line1: shippingDetails?.street,
        postalCode: shippingDetails?.postalCode,
        state: shippingDetails?.city,
      };

      const billingDetails = {
        email: "john@gmail.com",
        name: shippingDetails?.fullName,
        phone: shippingDetails?.phoneNumber,
        address: address,
      };

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: paymentIntent,
        customerEphemeralKeySecret: ephemeralKey,
        customerId: customer,
        merchantDisplayName: "Smartexia",
        defaultBillingDetails: billingDetails,
        customFlow: true,
        // appearance: customAppearance,
      });
    } catch (error) {
      console.log("Error Occured in Stripe Payment");
      console.log(error);
    }

    // const address = {
    //   city: "San Francisco",
    //   country: "US",
    //   line1: "510 Townsend St.",
    //   line2: "123 Street",
    //   postalCode: "94102",
    //   state: "California",
    // };

    // await new Promise((resolve) => setTimeout(resolve, 2500));
    // await openPaymentSheet();
    // if (!error) {
    //   setLoading(false);
    // } else {
    //   Alert.alert(`Error code: ${error.code}`, error.message);
    //   setLoading(false);
    // }
  };

  const openPaymentSheet = async () => {
    console.log("Paymetn Sheet Opened");

    const sheet = await presentPaymentSheet();
    console.log(sheet);
    if (sheet.error) {
      Alert.alert(`Error code: ${sheet.error.code}`, sheet.error.message);
    } else {
      Alert.alert("Success", "Payment successful");
    }
    setCheckoutStep("review");
    setCheckoutIndicatorState({
      shipping: "completed",
      payment: "completed",
      review: "inProgress",
    });
  };

  const confirmPayment = async () => {
    console.log("Confirm Payment");
    const { error } = await confirmPaymentSheetPayment();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Payment successful");
    }
    navigation.navigate("orders");
  };

  return (
    <StripeProvider
      publishableKey={
        "pk_test_51PO1TJRuuDG2jDrHIBUIVP1neLqdT5op7KgjTrjZUGWUkpLzh8owYw5BMano7OAmSaXTxFwancnVthpIQlkJH8LR001Zz6loiI"
      }
    >
      <View style={styles.container}>
        <CheckoutProgressIndicator
          checkoutIndicatorState={checkoutIndicatorState}
        />
        <View style={styles.innerContainer}>
          {checkoutStep === "shipping" && (
            <Shipping onShippingComplete={shippingCompleteHandler} />
          )}
          {checkoutStep === "payment" && (
            <Payment amount={amount} openPaymentSheet={openPaymentSheet} />
          )}
          {checkoutStep === "review" && (
            <CheckoutReview
              shippingDetails={shippingDetails as ShippingFormFields}
              orderDetails={cartItemPrice}
              amount={amount}
              confirmPayment={confirmPayment}
            />
          )}
        </View>
      </View>
    </StripeProvider>
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
    // borderWidth: 1,
  },
});
