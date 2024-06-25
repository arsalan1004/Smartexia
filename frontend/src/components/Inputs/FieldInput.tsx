import { View, Text, TextInput } from "react-native";
import React from "react";
import {
  Control,
  UseFormHandleSubmit,
  FormState,
  UseFormSetError,
  Controller,
  FieldError
} from "react-hook-form";

type PropTypes = {
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  formState: FormState<any>;
  setError: UseFormSetError<any>;
};

const FieldInput = ({
  control,
  handleSubmit,
  formState: { errors, isSubmitting },
  setError,
}: PropTypes) => {
  return (
    <View>
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
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="email"
          />
        )}
      />
      {errors.email && <Text>{errors.email.message as string}</Text>}
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
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="password"
          />
        )}
      />
    </View>
  );
};

export default FieldInput;
