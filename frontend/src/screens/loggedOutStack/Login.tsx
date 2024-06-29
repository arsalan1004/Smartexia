import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";

import React, { useContext, useEffect, useState } from "react";
import { COLORS, h5Oxygen } from "../../constants/colors";
import { Controller, useForm } from "react-hook-form";
import MainButton from "../../components/UI/MainButton";
import TextButton from "../../components/UI/TextButton";
import Toast from "../../components/UI/Toast";
import {
  usePostGoogleLoginDataMutation,
  usePostLoginDataMutation,
} from "../../features/loginReg/loginDataApi";
import { makeRedirectUri } from "expo-auth-session";
import { useAuthRequest } from "expo-auth-session/providers/google";

import {
  Auth,
  GoogleAuthProvider,
  OAuthCredential,
  signInWithCredential,
} from "firebase/auth";

import { FIREBASE_AUTH } from "../../config/firebaseConfig";
import { AuthProvider } from "../../context/AuthContext";
import GoogleButton from "../../components/login/GoogleButton";
import { RootLoggedOutStackParamList } from "../../../App";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginContext from "../../context/LoginContext";
import { RegistrationFormFields } from "./Registration";
import MaskPasswordButton from "../../components/UI/MaskPasswordButton";
import SwitchScreen from "../../components/login/SwitchScreen";
import { loginRegStyles } from "../../constants/SharedStyles";
//import axios from "axios";

// TODO

/**
 * Add correct Validation Rules
 */

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootLoggedOutStackParamList,
  "login"
>;
type LoginScreenRouteProp = RouteProp<RootLoggedOutStackParamList, "login">;

type PropTypes = {
  navigation: LoginScreenNavigationProp;
  route: LoginScreenRouteProp;
};

export type LoginFormFields = Pick<
  RegistrationFormFields,
  "email" | "password"
>;

export type GoogleLoginFields = {
  name: string;
  email: string;
  token: string;
};

const Login = ({ navigation }: PropTypes) => {
  const { updateIsLoggedIn, isLoggedIn } = useContext(LoginContext);

  const [postLoginData, { isError, isLoading, isSuccess }] =
    usePostLoginDataMutation();

  const [postGoogleLoginData] = usePostGoogleLoginDataMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginFormFields>({});

  const [isPasswordMasked, setIsPasswordMasked] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  console.log("Is Logged In in Login.tsx @86", isLoggedIn);

  const [request, response, promptAsync] = useAuthRequest({
    androidClientId:
      "637938020233-1od1uuejvf85md6p03iakober8g4m7a9.apps.googleusercontent.com",
    webClientId:
      "637938020233-cgfcl1bjfuigsov296cfur46298gdm1n.apps.googleusercontent.com",

    redirectUri: makeRedirectUri({
      scheme: "com.smartexia.ecommerce",
      //native: "com.smartexia.ecommerce://",
    }),
  });

  useEffect(() => {
    if (
      isSuccess === true ||
      isError === true ||
      response?.type === "success"
    ) {
      setIsToastVisible(true);
    }
  }, [isSuccess, isError, response]);

  useEffect(() => {
    const handleGoogleLogin = async (
      firebaseAuth: Auth,
      credential: OAuthCredential
    ) => {
      try {
        const { user }: any = await signInWithCredential(
          firebaseAuth,
          credential
        );

        console.log("googleResponse:User", user);

        const googleData: GoogleLoginFields = {
          email: user.email as string,
          name: user.displayName as string,
          token: user.accessToken as string,
        };

        postGoogleLoginData(googleData);
        setToastMessage("Google Login Successful");
        updateIsLoggedIn(true);
        AsyncStorage.setItem("@isLoggedIn", "true");
      } catch (error) {
        setToastMessage("Error signing in with credential");
      }
    };

    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      handleGoogleLogin(FIREBASE_AUTH, credential);
    }
  }, [response]);

  const onSubmit = async (dataFields: LoginFormFields) => {
    Keyboard.dismiss();

    try {
      const res = await postLoginData(dataFields).unwrap();
      console.log("RESPONSE", res);
      setToastMessage(res.message);
      AsyncStorage.setItem("@isLoggedIn", "true");
      updateIsLoggedIn(true);
    } catch (error: any) {
      console.log("error", error);
      setToastMessage(error.data.message ?? "An error occurred");
    }
  };
  console.log("Is Submit Succesfull @162", isSubmitSuccessful);

  return (
    <AuthProvider value={{ promptAsync }}>
      <View style={loginRegStyles.container}>
        <View style={loginRegStyles.innerContainer}>
          <Text style={loginRegStyles.titleText}>Log In</Text>

          <View style={loginRegStyles.inputContainer}>
            <Text style={loginRegStyles.fieldLabel}>Email</Text>
            <View style={loginRegStyles.fieldContainer}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  validate: (value) => {
                    if (!value.includes("@") && value.trim().length > 0) {
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
                    value: 2,
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
          <View style={styles.forgotPasswordbtn}>
            <TextButton
              {...h5Oxygen}
              title="Forgot Password"
              onPressAction={() => {}}
              color={COLORS.textPrimary}
            />
          </View>
          <MainButton
            title="LOG IN"
            onPressAction={handleSubmit(onSubmit)}
            disabled={errors.email && errors.password ? true : false}
            isSubmitting={isLoading}
            variant="primary"
          />
          <GoogleButton />
          <SwitchScreen
            text="Don't have an account?"
            buttonText="Register"
            onPressSwitch={() => navigation.navigate("registration")}
          />

          {isToastVisible && (
            <Toast
              message={toastMessage}
              type={
                isSuccess || response?.type === "success" ? "success" : "error"
              }
              position="bottom"
              closeAction={() => setIsToastVisible(false)}
            />
          )}
        </View>
      </View>
    </AuthProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  forgotPasswordbtn: {
    alignSelf: "flex-end",
    marginVertical: 20,
  },
});
