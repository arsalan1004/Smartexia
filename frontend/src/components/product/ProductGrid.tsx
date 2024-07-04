import {
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ProductType } from "../../features/products/HomeProductSlice";
import ProductItem from "../home/ProductItem";
import { CategoryProductType } from "../../features/categoryProducts/CategoryProductsApi";
import { useNavigation } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type listType = ProductType | CategoryProductType;
type listArrayType = ProductType[] | CategoryProductType[];

type PropTypes = {
  listData: listArrayType;
};

const ProductGrid = ({ listData }: PropTypes) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootLoggedInStackParamList, "productDetail">
    >();

  return (
    <View style={styles.containerStyles}>
      <FlatList
        data={listData}
        renderItem={({ item }: ListRenderItemInfo<listType>) => (
          <ProductItem
            productId={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            rating={item.rating}
            // onPressAction={() => {
            //   navigation.navigate("productDetail", { productId: item.id });
            //   console.log("Product ID: ", item.id);
            // }}
            applyWidth={false}
          />
        )}
        keyExtractor={(item: listType) => item.id}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        // ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
      />
    </View>
  );
};

export default ProductGrid;

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    alignItems: "center",
    marginBottom: 30,
  },
  listStyle: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    // paddingHorizontal: 40,
    // borderWidth: 1,
  },
});
