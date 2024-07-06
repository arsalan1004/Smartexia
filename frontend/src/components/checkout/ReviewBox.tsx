import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, h3Oxygen } from "../../constants/colors";

type Props = {
  details: Record<string, string | number>;
  title: string;
};

const ReviewBox = ({ details, title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{title}</Text>
      {Object.keys(details).map((key, index) => (
        <View key={index} style={styles.rowEntry}>
          <Text style={styles.key}>{key}</Text>
          <Text style={styles.value}>{details[key]}</Text>
        </View>
      ))}
    </View>
  );
};

export default ReviewBox;

const styles = StyleSheet.create({
  container: {
    rowGap: 10,
    backgroundColor: COLORS.bgSecondary,
    width: "90%",
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    elevation: 3,
  },
  heading: {
    ...h3Oxygen,
    color: COLORS.fgPrimary,
  },
  rowEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginVertical: 5,
  },
  key: {
    color: COLORS.textPrimary,
  },
  value: {
    color: COLORS.fgPrimary,
  },
});
