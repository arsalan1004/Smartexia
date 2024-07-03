import { StyleSheet, Text, View } from "react-native";
import React from "react";
import TextButton from "../UI/TextButton";
import { COLORS, h4Oxygen, h5Oxygen } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type PropTypes = {
  heading: string;
  onPressAction: () => void;
};

const HomeProductsViewAll = ({ heading, onPressAction }: PropTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{heading}</Text>
      <View style={styles.innerContainer}>
        <TextButton
          title="View All"
          onPressAction={onPressAction}
          fontSize={16}
          fontFamily="Roboto"
          fontWeight="normal"
          color={COLORS.textGray}
        />
        <Ionicons
          name="arrow-forward-outline"
          size={22}
          color={COLORS.textGray}
        />
      </View>
    </View>
  );
};

export default HomeProductsViewAll;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 5,
    paddingHorizontal: "5%",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
  },
  text: {
    ...h5Oxygen,
  },
});
