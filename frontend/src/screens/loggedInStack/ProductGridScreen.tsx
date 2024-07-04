import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import ProductGrid from "../../components/product/ProductGrid";
import { RouteProp } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../../App";
import { ProductType } from "../../features/products/HomeProductSlice";
import {
  CategoryProductType,
  useGetCategoryProductsMutation,
} from "../../features/categoryProducts/CategoryProductsApi";
import { useGetSearchedProductsMutation } from "../../features/searchProductResults/SearchResultsApi";

type ProductGridRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "productGridScreen"
>;

type PropTypes = {
  route: ProductGridRouteProp;
};

// Featured Product List Data
// Id from Category

const ProductGridScreen = ({ route }: PropTypes) => {
  const [getCategories, { isLoading }] = useGetCategoryProductsMutation();

  const [categoryProducts, setCategoryProducts] =
    useState<CategoryProductType[]>();

  useEffect(() => {
    const getCategoriesHandler = async () => {
      try {
        console.log(`@36: ${route.params.categoryId}`);
        const response = await getCategories(
          Number(route.params.categoryId)!
        ).unwrap();
        console.log(`@40: ${response}`);
        setCategoryProducts(response);
      } catch (error) {
        console.log(`@39${error}`);
        console.log(error);
      }
    };

    if (route.params.categoryId) {
      getCategoriesHandler();
    }
  }, []);

  if (route.params.listData) {
    return <ProductGrid listData={route.params.listData ?? []} />;
  } else if (route.params.categoryId) {
    return isLoading ? (
      <Text style={{ alignSelf: "center" }}>Loading...</Text>
    ) : (
      <ProductGrid listData={categoryProducts ?? []} />
    );
  }
};

export default ProductGridScreen;

const styles = StyleSheet.create({});
