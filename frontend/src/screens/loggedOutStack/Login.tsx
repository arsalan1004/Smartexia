import { View, Text, StyleSheet } from "react-native";
import React from "react";

type PropTypes = {};

const Login = (props: PropTypes) => {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
