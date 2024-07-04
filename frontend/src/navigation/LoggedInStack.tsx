import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ProductType } from "../features/products/HomeProductSlice";
import { Filters } from "../features/search/SearchProductSlice";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { COLORS } from "../constants/colors";
import HomeTabs, { RootHomeTabsParamList } from "./HomeTabs";
import ProductGridScreen from "../screens/loggedInStack/ProductGridScreen";
import SearchProductGridScreen from "../screens/loggedInStack/homeTabs/SearchProductGridScreen";
import SubFilterScreen from "../screens/loggedInStack/SubFilterScreen";
import FilterScreen from "../screens/loggedInStack/FilterScreen";
import ProductDetailScreen from "../screens/loggedInStack/ProductDetailScreen";
import HeaderCartButton from "../components/UI/HeaderCartButton";
import { useNavigation } from "@react-navigation/native";
import ProductReviewScreen from "../screens/loggedInStack/ProductReviewScreen";
import { ReviewType } from "../features/productDetail/ProductDetailApi";

type Props = {};

export type RootLoggedInStackParamList = {
  homestack: undefined;
  productGridScreen: {
    listData?: ProductType[];
    title: string;
    categoryId?: string;
    // searchQuery?: string;
  };
  searchProductGridScreen: {
    title: string;
    searchQuery: string;
  };
  searchFilters: {
    searchQuery: string;
  };
  searchSubFilters: {
    title: keyof Filters;
  };
  productDetail: {
    productId: string;
  };
  review: {
    reviewArray: ReviewType[];
  };
};

export type HeaderCartButtonNavigationProp = NativeStackNavigationProp<
  RootLoggedInStackParamList & RootHomeTabsParamList,
  "orders"
>;

const loggedInStack = createNativeStackNavigator<RootLoggedInStackParamList>();

const LoggedInStack = () => {
  const navigation = useNavigation<HeaderCartButtonNavigationProp>();

  return (
    <loggedInStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bgPrimary,
          //borderBottomColor: COLORS.fgPrimary,
        },
        headerTintColor: COLORS.fgPrimary,
      }}
    >
      <loggedInStack.Screen
        name="homestack"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <loggedInStack.Screen
        name="productGridScreen"
        component={ProductGridScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <loggedInStack.Screen
        name="searchProductGridScreen"
        component={SearchProductGridScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <loggedInStack.Screen
        name="searchFilters"
        component={FilterScreen}
        options={{ title: "Filter By" }}
      />
      <loggedInStack.Screen
        name="searchSubFilters"
        component={SubFilterScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <loggedInStack.Screen
        name="productDetail"
        component={ProductDetailScreen}
        options={{
          title: "Product Detail",
          headerRight: () => (
            <HeaderCartButton
              onPressNavigate={() => {
                navigation.navigate("orders");
              }}
            />
          ),
        }}
      />
      <loggedInStack.Screen
        name="review"
        component={ProductReviewScreen}
        options={{ title: "Ratings & Reviews" }}
      />
    </loggedInStack.Navigator>
  );
};

export default LoggedInStack;

const styles = StyleSheet.create({});
