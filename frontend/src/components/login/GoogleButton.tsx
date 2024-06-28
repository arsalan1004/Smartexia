import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { COLORS, h5Oxygen } from "../../constants/colors";
import AuthContext from "../../context/AuthContext";

type Props = {};

const GoogleButton = (props: Props) => {
  const { promptAsync } = useContext(AuthContext);

  const onPresshandler = () => {
    console.log("Press Handler Called");
    promptAsync();
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.googleButton, pressed && styles.pressed]}
      onPress={onPresshandler}
    >
      <View style={styles.googleButtonContainer}>
        <Image
          source={require("../../../assets/images/GoogleLogo.png")}
          width={36}
          height={36}
        />
        <Text style={styles.googleButtonText}>Log In With Google</Text>
      </View>
    </Pressable>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  googleButton: {
    paddingVertical: 8,
    borderRadius: 50,
    // alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: COLORS.fgPrimary,
    paddingHorizontal: 8,
    marginTop: 40,
  },
  googleButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  googleButtonText: {
    ...h5Oxygen,
    flex: 1,
    textAlign: "center",
    marginRight: 36, // Giving to balance in center -> same value as GoogleLogo.png
    color: COLORS.bgPrimary,
  },
  pressed: {
    opacity: 0.7,
  },
});
