import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import { COLORS, OnBoardingTextType, h1Oxygen } from "../../constants/colors";
import DotProgressIndicator from "../../components/UI/DotProgressIndicator";
import MainButton from "../../components/UI/MainButton";

type PropTypes = OnBoardingTextType & {
  dotSelected: number;
  buttonAction: () => void;
};

export default function OnBoarding({
  image,
  onBoardingTitle,
  onBoardingText,
  dotSelected,
  buttonAction,
}: PropTypes) {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Image
          source={
            image == "welcome"
              ? require("../../../assets/images/onboardingWelcome.png")
              : require("../../../assets/images/onboardingShopping.png")
          }
          style={{ width: 200, height: 200 }}
        />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.titleText}>{onBoardingTitle[0]}</Text>
          <Text style={styles.titleText}>{onBoardingTitle[1]}</Text>
        </View>
        <Text style={styles.descriptionText}>{onBoardingText}</Text>
      </View>
      <DotProgressIndicator dotNumber={2} dotSelected={dotSelected} />
      <MainButton
        title={dotSelected === 1 ? "NEXT" : "GET STARTED"}
        variant="secondary"
        onPressAction={buttonAction}
        bottomPosition={40}
        widthPC={90}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 20,
    backgroundColor: COLORS.bgPrimary,
  },
  innerContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    ...h1Oxygen,
    fontFamily: "oxygen",
    color: COLORS.fgPrimary,
    textAlign: "center",
  },
  descriptionText: {
    color: COLORS.textGray,
    textAlign: "center",
    marginTop: 20,
  },
});
