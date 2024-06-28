import { Pressable, StyleSheet } from "react-native";
import React, { ComponentProps } from "react";
import { COLORS } from "../../constants/colors";
import TabIcon from "./TabIcon";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomTabBarButtonProps,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { RootHomeTabsParamList } from "../../navigation/HomeTabs";

export type IoniconsProp = ComponentProps<typeof Ionicons>;
type PropTypes = BottomTabBarButtonProps & {
  focused: boolean;
  size: number;
  color: string;
  text: string;
  selectedIcon: IoniconsProp["name"];
  icon: IoniconsProp["name"];
  routeName: keyof RootHomeTabsParamList;
  children: React.ReactNode;
};

const TabBarButton = ({
  focused,
  size,
  text,
  icon,
  selectedIcon,
  routeName,
}: PropTypes) => {
  type TabBarButtonNavigationProp = BottomTabNavigationProp<
    RootHomeTabsParamList,
    keyof RootHomeTabsParamList
  >; // Replace 'T' with a valid type, such as 'string'
  const navigation = useNavigation<TabBarButtonNavigationProp>();

  const onPressHandler = () => {
    navigation.navigate(routeName);
  };

  return (
    <Pressable
      style={[styles.buttonContainer, focused ? { flex: 1 } : { flex: 0.7 }]}
      onPress={onPressHandler}
    >
      <TabIcon
        focused={focused}
        text={text}
        icon={focused ? selectedIcon : icon}
        size={size}
        color={focused ? "white" : COLORS.fgPrimary}
      />
    </Pressable>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
