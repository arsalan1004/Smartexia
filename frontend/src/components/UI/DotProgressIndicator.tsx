import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/colors";

type PropTypes = {
  dotNumber: number;
  dotSelected: number;
};

const DotProgressIndicator = ({
  dotNumber = 2,
  dotSelected = 1,
}: PropTypes) => {
  if (dotSelected > dotNumber) {
    return (
      <View>
        <Text>Invalid Dot Selection</Text>
      </View>
    );
  }

  const dots = Array.from({ length: dotNumber }, (_, index) => {
    const isSelected = index + 1 === dotSelected;
    const dotStyle = isSelected ? styles.filledDot : styles.outlineDot;
    return <View key={index} style={dotStyle} />;
  });

  return <View style={styles.dotContainer}>{dots}</View>;
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  filledDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.textGray,
    margin: 5,
  },
  outlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.textGray,
    margin: 5,
  },
});

export default DotProgressIndicator;
