import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { loginRegStyles } from "../../constants/SharedStyles";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../../components/UI/MainButton";
import MaskPasswordButton from "../../components/UI/MaskPasswordButton";
import Toast from "../../components/UI/Toast";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RouteProp } from "@react-navigation/native";
import { RootLoggedOutStackParamList } from "../../../App";
import SwitchScreen from "../../components/login/SwitchScreen";
import { usePostRegDataMutation } from "../../features/loginReg/RegDataApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../context/LoginContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { login } from "../../features/auth/AuthSlice";

type RegistrationScreenNavigationProp = NativeStackNavigationProp<
  RootLoggedOutStackParamList,
  "registration"
>;
type RegistrationScreenRouteProp = RouteProp<
  RootLoggedOutStackParamList,
  "registration"
>;

type PropTypes = {
  navigation: RegistrationScreenNavigationProp;
  route: RegistrationScreenRouteProp;
};

export type RegistrationFormFields = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Registration = ({ navigation }: PropTypes) => {
  const { updateIsLoggedIn, isLoggedIn } = useContext(LoginContext);
  const dispatch = useDispatch<AppDispatch>();

  const [postRegData, { isLoading, isSuccess, isError }] =
    usePostRegDataMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegistrationFormFields>({});

  useEffect(() => {
    if (isSuccess == true || isError == true) {
      setIsToastVisible(true);
    }
  }, [isSuccess, isError]);

  const password = watch("password");

  const [isPasswordMasked, setIsPasswordMasked] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const onSubmit = async (dataFields: RegistrationFormFields) => {
    Keyboard.dismiss();

    try {
      const res = await postRegData(dataFields).unwrap();
      console.log("RESPONSE", res);
      setToastMessage(res.message);
      updateIsLoggedIn(true);
      //dispatch(login({token: "", userId: res.userId}))
      AsyncStorage.setItem("isLoggedIn", "true");
    } catch (error: any) {
      console.log("error", error);
      setToastMessage(error.data.message ?? "An error occurred");
    }
  };

  return (
    <View style={loginRegStyles.container}>
      <View style={loginRegStyles.innerContainer}>
        <Text style={loginRegStyles.titleText}>Registration</Text>

        <View style={loginRegStyles.inputContainer}>
          <Text style={loginRegStyles.fieldLabel}>Name</Text>
          <View style={loginRegStyles.fieldContainer}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name is required",
                validate: (value) => {
                  if (value.trim().length < 0) {
                    return "Invalid Name";
                  } else return true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={loginRegStyles.inputField}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Name"
                />
              )}
            />
          </View>
          {errors.name && (
            <Text style={loginRegStyles.fieldError}>{errors.name.message}</Text>
          )}
        </View>
        <View style={loginRegStyles.inputContainer}>
          <Text style={loginRegStyles.fieldLabel}>Email</Text>
          <View style={loginRegStyles.fieldContainer}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                validate: (value) => {
                  if (!value.includes("@") && value.trim().length < 8) {
                    return "Invalid Email Address";
                  } else return true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={loginRegStyles.inputField}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="email"
                />
              )}
            />
          </View>
          {errors.email && (
            <Text style={loginRegStyles.fieldError}>
              {errors.email.message}
            </Text>
          )}
        </View>
        <View style={loginRegStyles.inputContainer}>
          <Text style={loginRegStyles.fieldLabel}>Password</Text>
          <View style={loginRegStyles.fieldContainer}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={loginRegStyles.inputField}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="password"
                  secureTextEntry={isPasswordMasked}
                />
              )}
            />
            <MaskPasswordButton
              isPasswordMasked={isPasswordMasked}
              setIsPasswordMasked={setIsPasswordMasked}
            />
          </View>
          {errors.password && (
            <Text style={loginRegStyles.fieldError}>
              {errors.password.message}
            </Text>
          )}
        </View>
        <View style={loginRegStyles.inputContainer}>
          <Text style={loginRegStyles.fieldLabel}>Confirm Password</Text>
          <View style={loginRegStyles.fieldContainer}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                validate: (value) =>
                  value === password || "The passwords do not match",
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={loginRegStyles.inputField}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="password"
                  secureTextEntry={isPasswordMasked}
                />
              )}
            />
          </View>
          {errors.confirmPassword && (
            <Text style={loginRegStyles.fieldError}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
        <View style={styles.btnContainer}>
          <MainButton
            title="REGISTER"
            onPressAction={handleSubmit(onSubmit)}
            disabled={errors.email && errors.password ? true : false}
            isSubmitting={isLoading}
            variant="primary"
          />
        </View>
        <SwitchScreen
          onPressSwitch={() => navigation.navigate("login")}
          text="Already have an account?"
          buttonText="Login Here"
        />

        {isToastVisible && (
          <Toast
            message={toastMessage}
            type={isSuccess ? "success" : "error"}
            position="bottom"
            closeAction={() => setIsToastVisible(false)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 30,
  },
});

export default Registration;
