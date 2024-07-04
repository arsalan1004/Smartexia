import React from "react";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Home from "../screens/loggedInStack/homeTabs/Home";
import Cart from "../screens/loggedInStack/homeTabs/Cart";
import More from "../screens/loggedInStack/homeTabs/More";
import Search from "../screens/loggedInStack/homeTabs/Search";
import TabBarButton from "../components/bottomTabs/TabBarButton";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderCartButton from "../components/UI/HeaderCartButton";

type Props = {};

export type RootHomeTabsParamList = {
  home: undefined;
  search: undefined;
  orders: undefined;
  more: undefined;
};

export type TabBarButtonNavigationProp = BottomTabNavigationProp<
  RootHomeTabsParamList,
  keyof RootHomeTabsParamList
>;

const HomeBottomTab = createBottomTabNavigator<RootHomeTabsParamList>();

const screenOpt = {
  tabBarShowLabel: false,
  //headerShown: false,
  tabBarStyle: {
    // /position: "absolute", // commented because being absolute it was hiding flatlist behind it -> AllExpense.js
    bottom: 0,
    right: 0,
    left: 0,
    height: 60,
    backgroundColor: COLORS.bgPrimary,
    borderTopWidth: 2,
  },
  headerStyle: {
    backgroundColor: COLORS.bgPrimary,
    borderBottomWidth: 1,
    //borderBottomColor: COLORS.fgPrimary,
  },
  tabBarHideOnKeyboard: true,
  headerTintColor: COLORS.fgPrimary,
};

const HomeTabs = (props: Props) => {
  const navigation = useNavigation<TabBarButtonNavigationProp>();

  return (
    <HomeBottomTab.Navigator screenOptions={screenOpt}>
      <HomeBottomTab.Screen
        name="home"
        component={Home}
        options={{
          tabBarHideOnKeyboard: true,
          title: "Home",
          tabBarButton: ({ accessibilityState }) => {
            return (
              <TabBarButton
                focused={accessibilityState?.selected!}
                text="Home"
                icon={"home-outline"}
                selectedIcon={"home"}
                size={22}
                routeName="home"
                children={undefined}
                color={""}
              />
            );
          },
          headerRight: () => (
            <HeaderCartButton
              onPressNavigate={() => navigation.navigate("orders")}
            />
          ),
        }}
      />
      <HomeBottomTab.Screen
        name="search"
        component={Search}
        options={{
          title: "Search",
          tabBarButton: ({ accessibilityState }) => {
            return (
              <TabBarButton
                focused={accessibilityState?.selected!}
                text="Search"
                icon={"search-outline"}
                selectedIcon={"search"}
                size={22}
                routeName="search"
                children={undefined}
                color={""}
              />
            );
          },
        }}
      />
      <HomeBottomTab.Screen
        name="orders"
        component={Cart}
        options={{
          title: "Cart",
          tabBarButton: ({ accessibilityState }) => {
            return (
              <TabBarButton
                focused={accessibilityState?.selected!}
                text="Cart"
                icon={"cart-outline"}
                selectedIcon={"cart"}
                size={22}
                routeName="orders"
                children={undefined}
                color={""}
              />
            );
          },
        }}
      />
      <HomeBottomTab.Screen
        name="more"
        component={More}
        options={{
          title: "More",
          tabBarButton: ({ accessibilityState }) => {
            return (
              <TabBarButton
                focused={accessibilityState?.selected!}
                text="More"
                icon={"ellipsis-horizontal-circle-outline"}
                selectedIcon={"ellipsis-horizontal-circle"}
                size={22}
                routeName="more"
                children={undefined}
                color={""}
              />
            );
          },
        }}
      />
    </HomeBottomTab.Navigator>
  );
};

export default HomeTabs;
