import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";

import React, { useEffect, useState } from "react";
import { COLORS, b2Roboto, h1Oxygen, h5Oxygen } from "../../constants/colors";
import { Controller, set, useForm } from "react-hook-form";
import Ionicon from "@expo/vector-icons/Ionicons";
import MainButton from "../../components/UI/MainButton";
import TextButton from "../../components/UI/TextButton";
import Toast from "../../components/UI/Toast";
import { usePostLoginDataMutation } from "../../features/login/loginDataApi";
type PropTypes = {};

export type FormFields = {
  email: string;
  password: string;
};

const Login = (props: PropTypes) => {
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
  const [postLoginData] = usePostLoginDataMutation();

  useEffect(() => {
    if (errors.root || isSubmitSuccessful) setIsToastVisible(true);
  }, [errors.root, isSubmitSuccessful]);

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
    }
    console.log(data);
  };

  console.log("Is Submit Succesful", isSubmitSuccessful);
  console.log("Root Erros", Boolean(errors.root));
  return (
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
});
