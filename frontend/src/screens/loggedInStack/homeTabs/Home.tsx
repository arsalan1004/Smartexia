import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS, h4Oxygen, h5Oxygen } from "../../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootHomeTabsParamList } from "../../../navigation/HomeTabs";
import CategoryButton from "../../../components/home/CategoryButton";
import { iconsData } from "../../../constants/constants";
import PlusButton from "../../../components/UI/PlusButton";
import WishlistButton from "../../../components/UI/WishlistButton";
import ProductItem from "../../../components/home/ProductItem";
import HomeProductsViewAll from "../../../components/home/HomeProductsViewAll";
import ProductList from "../../../components/home/ProductList";
import HomeProductSlice, {
  HomeProductState,
  ProductType,
} from "../../../features/products/HomeProductSlice";
import { useGetHomeProductsQuery } from "../../../features/products/HomeProductApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { RootLoggedInStackParamList } from "../../../../App";
import { useGetCategoriesQuery } from "../../../features/category/CategoryApi";

type HomeScreenNavigationProp = BottomTabNavigationProp<
  RootHomeTabsParamList & {
    productGridScreen: RootLoggedInStackParamList["productGridScreen"];
  },
  "home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export type HomeProductType = keyof HomeProductState;

/**
 * On Category Click Route to Product Grid
 * On View Alll Clic Route to Product Grid
 * On + button click add to Cart
 *
 * load on
 *
 * @param param0
 * @returns
 */

const Home = ({ navigation }: Props) => {
  // const { data: discountedProducts } = useGetHomeProductsQuery("discounted");
  // const { data: featuredProducts } = useGetHomeProductsQuery("featured");
  // const { data: newArrivedProducts } = useGetHomeProductsQuery("newArrived");
  // const { data: bestSellingProducts } = useGetHomeProductsQuery("bestSelling");
  // const { data: categoryList } = useGetCategoriesQuery();

  const discountedProducts = useSelector(
    (state: RootState) => state.homeProduct.discounted
  );
  const featuredProducts = useSelector(
    (state: RootState) => state.homeProduct.featured
  );
  const newArrivedProducts = useSelector(
    (state: RootState) => state.homeProduct.newArrived
  );
  const bestSellingProducts = useSelector(
    (state: RootState) => state.homeProduct.bestSelling
  );

  const navigateTo = (screenTitle: string) => {
    switch (screenTitle) {
      case "Discounted Products":
        navigation.navigate("productGridScreen", {
          listData: discountedProducts,
          title: "Discounted Products",
        });
        break;

      case "Featured Products":
        navigation.navigate("productGridScreen", {
          listData: featuredProducts,
          title: "Featured Products",
        });
        break;

      case "New Arrived Products":
        navigation.navigate("productGridScreen", {
          listData: newArrivedProducts,
          title: "New Arrived Products",
        });
        break;

      case "Best Selling Products":
        navigation.navigate("productGridScreen", {
          listData: bestSellingProducts,
          title: "Best Selling Products",
        });
        break;

      default:
        navigation.navigate("productGridScreen", { title: screenTitle });
    }
  };

  const navigateToCategoryProducts = (
    categoryId: string,
    screenTitle: string
  ) => {
    navigation.navigate("productGridScreen", {
      categoryId: categoryId,
      title: screenTitle,
    });
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable
          style={styles.searchStyles}
          onPress={() => navigation.navigate("search")}
        >
          <Ionicons name="search" size={24} color={COLORS.textGray} />
          <Text style={styles.searchText}>Search Smart Appliances</Text>
        </Pressable>
        <Text style={styles.titleText}>Categories</Text>

        <FlatList
          data={iconsData}
          renderItem={({ item }) => (
            <CategoryButton
              Icon={item.Icon}
              label={item.label}
              onPressAction={() => navigateTo(item.label)}
            />
          )}
          keyExtractor={(item) => item.label}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
          style={styles.listStyle}
        />

        {/* <FlatList
          data={categoryList}
          renderItem={({ item, index }) => (
            <CategoryButton
              Icon={iconsData[index].Icon}
              label={iconsData[index].label}
              onPressAction={() => navigateToCategoryProducts(item.id, item.name)}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
          style={styles.listStyle}
        /> */}
        <HomeProductsViewAll
          heading="Discounted Products"
          onPressAction={() => navigateTo("Discounted Products")}
        />
        <ProductList
          listData={discountedProducts.slice(0, 5)}
          horizontal={true}
        />
        <HomeProductsViewAll
          heading="Featured Products"
          onPressAction={() => navigateTo("Featured Products")}
        />
        <ProductList
          listData={featuredProducts.slice(0, 5)}
          horizontal={true}
        />
        <HomeProductsViewAll
          heading="New Arrived Products"
          onPressAction={() => navigateTo("New Arrived Products")}
        />
        <ProductList
          listData={newArrivedProducts.slice(0, 5)}
          horizontal={true}
        />
        <HomeProductsViewAll
          heading="Best Selling Products"
          onPressAction={() => navigateTo("Best Selling Products")}
        />
        <ProductList
          listData={bestSellingProducts.slice(0, 5)}
          horizontal={true}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  searchButton: {
    borderWidth: 1,
    borderColor: COLORS.textGray,
    marginTop: 20,
  },
  searchStyles: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  searchText: {
    ...h4Oxygen,
    color: COLORS.textGray,
  },
  titleText: {
    ...h5Oxygen,
    marginTop: 20,
    paddingLeft: 20,
  },
  listStyle: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    // paddingHorizontal: 40,
  },
});
