import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";

import React, { useContext, useEffect, useState } from "react";
import {
  COLORS,
  b2Roboto,
  b3Roboto,
  h1Oxygen,
  h5Oxygen,
} from "../../constants/colors";
import { Controller, useForm } from "react-hook-form";
import Ionicon from "@expo/vector-icons/Ionicons";
import MainButton from "../../components/UI/MainButton";
import TextButton from "../../components/UI/TextButton";
import Toast from "../../components/UI/Toast";
import { usePostLoginDataMutation } from "../../features/login/loginDataApi";
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

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootLoggedOutStackParamList,
  "login"
>;
type HomeScreenRouteProp = RouteProp<
  RootLoggedOutStackParamList,
  "registration"
>;

type PropTypes = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export type FormFields = {
  email: string;
  password: string;
};

const Login = ({ navigation, route }: PropTypes) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm<FormFields>({
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
        })
        .catch((error) => {
          console.error("Error signing in with credential", error);
        });
      AsyncStorage.setItem("@isLoggedIn", "true");
      updateIsLoggedIn(true);
    }
  }, [response]);

  const onSubmit = async (data: FormFields) => {
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
  };

  console.log("Is Submit Succesful", isSubmitSuccessful);
  console.log("Root Erros", Boolean(errors.root));
  return (
    <AuthProvider value={{ promptAsync }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.titleText}>Log In</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <View style={styles.fieldContainer}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  validate: (value) => {
                    if (!value.includes("@")) {
                      return "Invalid Email Address";
                    } else return true;
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputField}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="email"
                  />
                )}
              />
            </View>
            {errors.email && (
              <Text style={styles.fieldError}>{errors.email.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.fieldLabel}>Password</Text>
            <View style={styles.fieldContainer}>
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
                    style={styles.inputField}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="password"
                    secureTextEntry={isPasswordMasked}
                  />
                )}
              />
              <Pressable style={({ pressed }) => [pressed && { opacity: 0.7 }]}>
                <Ionicon
                  size={24}
                  color={COLORS.fgPrimary}
                  name={isPasswordMasked ? "eye-off-outline" : "eye-outline"}
                  onPress={() => setIsPasswordMasked(!isPasswordMasked)}
                />
              </Pressable>
            </View>

            {errors.password && (
              <Text style={styles.fieldError}>{errors.password.message}</Text>
            )}
          </View>
          <View style={styles.forgotPasswordbtn}>
            <TextButton
              title="Forgot Password"
              onPressAction={() => {}}
              {...(h5Oxygen! as any)}
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
          <View style={styles.registrationTextContainer}>
            <Text style={styles.registrationText}>Don't Have an account? </Text>
            <TextButton
              title="Register"
              onPressAction={() => {
                navigation.navigate("registration");
              }}
              {...(b3Roboto! as any)}
              color={COLORS.textPrimary}
            />
          </View>

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
  container: {
    flex: 1,
    alignItems: "center",
    //borderWidth: 1,
    marginTop: StatusBar.currentHeight!,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    //borderWidth: 1,
  },
  inputContainer: {
    marginTop: 30,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLabel: {
    color: COLORS.textGray,
    ...b2Roboto,
    marginLeft: 20,
  },
  inputField: {
    width: "80%",
    fontSize: 16,
  },
  fieldError: {
    ...b2Roboto,
    color: COLORS.error,
    marginLeft: 20,
    marginTop: 5,
  },

  titleText: {
    ...h1Oxygen,
    color: COLORS.fgPrimary,
  },
  forgotPasswordbtn: {
    alignSelf: "flex-end",
    marginVertical: 20,
  },
  registrationTextContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  registrationText: {
    ...b3Roboto,
    color: COLORS.textGray,
  },
});
