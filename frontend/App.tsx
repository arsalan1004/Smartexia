import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Address from "./assets/images/address.svg";
import { COLORS } from "./src/constants/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />

      <Address width={100} height={100} fill={COLORS.fgPrimary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
