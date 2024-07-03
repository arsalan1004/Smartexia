import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ProductType } from "../../features/products/HomeProductSlice";
import ProductItem from "./ProductItem";
import { COLORS } from "../../constants/colors";

type PropTypes = {
  listData: ProductType[];
  horizontal: boolean;
};

const ProductList = ({ listData, horizontal }: PropTypes) => {
  return (
    <View>
      <FlatList
        data={listData}
        renderItem={({ item }: ListRenderItemInfo<ProductType>) => (
          <ProductItem
            imageUrl={item.imageUrl}
            name={item.name}
            price={item.price}
            rating={item.rating}
            onPressAction={() => {}}
            applyWidth={false}
          />
        )}
        keyExtractor={(item: ProductType) => item.id}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        // ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
        style={styles.listStyle}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.bgSecondary,
  },
  listStyle: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    // paddingHorizontal: 40,
  },
});
