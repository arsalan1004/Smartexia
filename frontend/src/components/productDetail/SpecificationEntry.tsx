import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, h4Oxygen, h5Oxygen } from "../../constants/colors";

type PropTypes = {
  specificationName: string;
  specificationValue: string;
};

const SpecificationEntry = ({
  specificationName,
  specificationValue,
}: PropTypes) => {
  return (
    <View style={styles.specificationContainer}>
      <Text style={styles.nameStyle}>{specificationName}</Text>
      <Text style={styles.valueStyle}>{specificationValue}</Text>
    </View>
  );
};

export default SpecificationEntry;

const styles = StyleSheet.create({
  specificationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameStyle: {
    ...h4Oxygen,
    fontWeight: "normal",
    color: COLORS.textPrimary,
  },
  valueStyle: {
    fontSize: 18,
  },
});
