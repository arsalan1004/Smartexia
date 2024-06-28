import { Text, View } from "react-native";
import React from "react";
import { loginRegStyles } from "../../constants/SharedStyles";
import TextButton from "../UI/TextButton";
import { COLORS, b2Roboto } from "../../constants/colors";

type PropTypes = {
  text: string;
  buttonText: string;
  onPressSwitch: () => void;
};

const SwitchScreen = ({ text, buttonText, onPressSwitch }: PropTypes) => {
  return (
    <View style={loginRegStyles.registrationTextContainer}>
      <Text style={loginRegStyles.registrationText}>{text} </Text>
      <TextButton
        title={buttonText}
        onPressAction={onPressSwitch}
        {...(b2Roboto! as any)}
        color={COLORS.textPrimary}
      />
    </View>
  );
};

export default SwitchScreen;
