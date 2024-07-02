import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import ProductGrid from "../../components/product/ProductGrid";
import { RouteProp } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../../App";

type ProductGridRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "productGridScreen"
>;

type PropTypes = {
  route: ProductGridRouteProp;
};

//

const ProductGridScreen = ({ route }: PropTypes) => {
  const { listData } = route.params;

  if (route.params) {
    return <ProductGrid listData={listData ?? []} />;
  }

  return <ProductGrid listData={listData ?? []} />;
};

export default ProductGridScreen;

const styles = StyleSheet.create({});
