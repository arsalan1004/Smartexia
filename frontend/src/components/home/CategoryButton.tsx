import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { COLORS, b2Roboto } from "../../constants/colors";
import { SvgProps } from "react-native-svg";

type Props = {
  Icon: FC<SvgProps>;
  label: string;
  onPressAction: () => void;
};

const CategoryButton = ({ Icon, label, onPressAction }: Props) => {
  return (
    <Pressable
      onPress={onPressAction} // TODO: onPress Navigate to Product Grid -> See Pagination
    >
      <View>
        <Icon />
      </View>
      <Text style={styles.labelStyle}>{label}</Text>
    </Pressable>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  container: {},
  iconWrapper: {
    padding: 10,
    backgroundColor: COLORS.fgPrimaryLight2,
  },
  labelStyle: {
    ...b2Roboto,
    color: COLORS.textGray,
    textAlign: "center",
    marginTop: 5,
  },
});
