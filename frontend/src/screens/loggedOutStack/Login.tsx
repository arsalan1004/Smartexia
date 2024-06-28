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

import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

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

export type GoogleLoginFields = Pick<RegistrationFormFields, "name" | "email">;

const Login = ({ navigation }: PropTypes) => {
  const [postLoginData, { isError, isLoading, isSuccess }] =
    usePostLoginDataMutation();
  const [postGoogleLoginData] = usePostGoogleLoginDataMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<LoginFormFields>({
    defaultValues: {
      // email: "Test@email.com",
      // password: "1234567",
    },
  });

  const [isPasswordMasked, setIsPasswordMasked] = useState(true);
  const [isToastVisible, setIsToastVisible] = useState(false);
  //const [user, setUser] = useState();

  const { updateIsLoggedIn, isLoggedIn } = useContext(LoginContext);

  console.log("Is Logged In in Login.tsx", isLoggedIn);

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

  //const [postLoginData] = usePostLoginDataMutation();

  useEffect(() => {
    if (errors.root || isSubmitSuccessful) setIsToastVisible(true);
  }, [errors.root, isSubmitSuccessful]);

  useEffect(() => {
    console.log("response", response);
    console.log("request", request);
    if (response?.type === "success") {
      const { id_token } = response.params;
      console.log("id_token", id_token);
      const credential = GoogleAuthProvider.credential(id_token);
      console.log("credential", credential);
      signInWithCredential(FIREBASE_AUTH, credential)
        .then((userCredential) => {
          const userData = userCredential.user;
          console.log(userData);

          const googleData: GoogleLoginFields = {
            email: userData.email as string,
            name: userData.displayName as string,
          };

          postGoogleLoginData(googleData);
        })
        .catch((error) => {
          console.error("Error signing in with credential", error);
        });
      AsyncStorage.setItem("@isLoggedIn", "true");
      updateIsLoggedIn(true);
    }
  }, [response]);

  const onSubmit = async (data: LoginFormFields) => {
    Keyboard.dismiss();
    try {
      //const response = await postLoginData(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //throw new Error();
    } catch (error) {
      setError("root", {
        message: "Incorrect Password or Email",
      });
    } finally {
      console.log(data);
      updateIsLoggedIn(true);
    }

    const response = await postLoginData(data);
    console.log(response);
    // try {
    //   const { message, status } = await postLoginData(data);

    //   if(status === 404 || status === 401) {
    //     setError("root", { message: message });
    //   }
    //   else if (status === 200) {
    //     AsyncStorage.setItem("@isLoggedIn", "true");
    //     updateIsLoggedIn(true);
    //   }
    // }
  };

  console.log("Is Submit Succesful", isSubmitSuccessful);
  console.log("Root Erros", Boolean(errors.root));
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
            isSubmitting={isSubmitting}
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
              message="Incorrect Email or Password"
              type={isSubmitSuccessful ? "success" : "error"}
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
