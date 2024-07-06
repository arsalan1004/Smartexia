import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { loginRegStyles } from "../../constants/SharedStyles";
import { Controller, useForm } from "react-hook-form";
import SecondaryButton from "../UI/SecondaryButton";
import Payment from "../../../assets/images/payment.svg";
import { COLORS, h3Oxygen } from "../../constants/colors";

type PropTypes = {
  onShippingComplete: (shippingAddress: ShippingFormFields) => void;
};

export type ShippingFormFields = {
  fullName: string;
  city: string;
  street: string;
  postalCode: string;
  phoneNumber: string;
};

const Shipping = ({ onShippingComplete }: PropTypes) => {
  const {
    control,
    handleSubmit,

    formState: { errors, isSubmitSuccessful, isValid },
  } = useForm<ShippingFormFields>({
    defaultValues: {
      fullName: "Muhammad Zain",
      street: "Syed Ali St. Block 15 R-1142",
      city: "Karachi",
      postalCode: "78097",
      phoneNumber: "0324 1215122",
    },
  });

  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
      setKeyboardIsVisible(true);
    });

    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      setKeyboardIsVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // write regEx to validate fullname

  const nameRegex = /^[A-Za-z]/;
  const postalCodeRegex = /^[0-9]{5}$/;
  const phoneRegex: RegExp = /^0\d{3} \d{7}$/;

  const onSubmit = async (data: ShippingFormFields) => {
    onShippingComplete(data);
    console.log("On Submit Pressed");
  };

  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === "ios" && "padding"}
    //   keyboardVerticalOffset={100}
    // >
    //   <ScrollView
    //     contentContainerStyle={{ flex: 1 }}
    //     bounces={false}
    //     ref={scrollViewRef}
    //   >
    <View style={styles.container}>
      <Text style={styles.stepHeading}>Enter Your Shipping Details</Text>
      <View style={loginRegStyles.inputContainer}>
        <Text style={loginRegStyles.fieldLabel}>Full Name</Text>
        <View style={[loginRegStyles.fieldContainer]}>
          <Controller
            control={control}
            name="fullName"
            rules={{
              required: "Full Name is required",
              validate: (value) => {
                if (value[0] === " ") return "Name should not start with space";

                // parseInt("123") => 123, parseInt("abc") => Nan => !isNan(Nan) == true -> is a digit
                if (!nameRegex.test(value) || !isNaN(parseInt(value)))
                  return "Invalid Name";
                else return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[loginRegStyles.inputField]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="eg: John Doe"
              />
            )}
          />
        </View>
        {errors.fullName && (
          <Text style={loginRegStyles.fieldError}>
            {errors.fullName.message}
          </Text>
        )}
      </View>
      <View style={loginRegStyles.inputContainer}>
        <Text style={loginRegStyles.fieldLabel}>Street Address</Text>
        <View style={loginRegStyles.fieldContainer}>
          <Controller
            control={control}
            name="street"
            rules={{
              required: "Street Address is required",
              validate: (value) => {
                if (value.trim().length <= 0) {
                  return "Invalid Street Address";
                } else return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={loginRegStyles.inputField}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="eg: Syed Ali St. Block 15 R-1142"
              />
            )}
          />
        </View>
        {errors.street && (
          <Text style={loginRegStyles.fieldError}>{errors.street.message}</Text>
        )}
      </View>
      <View style={loginRegStyles.inputContainer}>
        <Text style={loginRegStyles.fieldLabel}>City</Text>
        <View style={loginRegStyles.fieldContainer}>
          <Controller
            control={control}
            name="city"
            rules={{
              required: "City is required",
              validate: (value) => {
                if (value.trim().length <= 0) {
                  return "Invalid City Name";
                } else return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={loginRegStyles.inputField}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="eg: Karachi"
              />
            )}
          />
        </View>
        {errors.city && (
          <Text style={loginRegStyles.fieldError}>{errors.city.message}</Text>
        )}
      </View>
      <View style={loginRegStyles.inputContainer}>
        <Text style={loginRegStyles.fieldLabel}>Postal / Zip Code</Text>
        <View style={loginRegStyles.fieldContainer}>
          <Controller
            control={control}
            name={"postalCode"}
            rules={{
              required: "Postal Code is required",
              validate: (value) => {
                if (value.trim().length <= 0 || !postalCodeRegex.test(value)) {
                  return "Invalid Postal Code";
                } else return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={loginRegStyles.inputField}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="eg: 78097"
              />
            )}
          />
        </View>
        {errors.postalCode && (
          <Text style={loginRegStyles.fieldError}>
            {errors.postalCode.message}
          </Text>
        )}
      </View>
      <View style={loginRegStyles.inputContainer}>
        <Text style={loginRegStyles.fieldLabel}>Phone Number</Text>
        <View style={loginRegStyles.fieldContainer}>
          <Controller
            control={control}
            name={"phoneNumber"}
            rules={{
              required: "Phone Number is required",
              validate: (value) => {
                if (value.trim().length <= 0 || !phoneRegex.test(value)) {
                  return "Invalid Phone Number";
                } else return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={loginRegStyles.inputField}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="eg: 0324 1215122"
              />
            )}
          />
        </View>
        {errors.phoneNumber && (
          <Text style={loginRegStyles.fieldError}>
            {errors.phoneNumber.message}
          </Text>
        )}
      </View>

      {!keyboardIsVisible && (
        <SecondaryButton
          title="Continue to Payment"
          onPressAction={handleSubmit(onSubmit)}
          bottomPosition={20}
          disabled={!isValid}
        >
          <Payment fill={COLORS.accent} width={32} />
        </SecondaryButton>
      )}
    </View>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Shipping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    // borderWidth: 1,
  },
  stepHeading: {
    ...h3Oxygen,
    color: COLORS.fgPrimary,
  },
});
