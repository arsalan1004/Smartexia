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

type PropTypes = {
  listData: ProductType[];
};

const ProductGrid = ({ listData }: PropTypes) => {
  return (
    <View style={styles.containerStyles}>
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
