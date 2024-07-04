import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../../../App";
import { useGetSearchedProductsMutation } from "../../../features/searchProductResults/SearchResultsApi";
import TextButton from "../../../components/UI/TextButton";
import { COLORS, b1Roboto } from "../../../constants/colors";
import { ProductType } from "../../../features/products/HomeProductSlice";
import ProductItem from "../../../components/home/ProductItem";
import { PAGE_SIZE } from "../../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import IconButton from "../../../components/UI/IconButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import SortingModal from "../../../components/product/SortingModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { resetSearchStates } from "../../../features/search/SearchProductSlice";

type SearchProductGridRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "searchProductGridScreen"
>;

type SearchProductGridNavigationProp = NativeStackNavigationProp<
  RootLoggedInStackParamList,
  "searchFilters"
>;

type PropTypes = {
  route: SearchProductGridRouteProp;
  navigation: SearchProductGridNavigationProp;
};

// export type SortingType = {
//   sortType: "rating" | "price";
//   selectedSort: "asc" | "desc" | 1 | 2 | 3 | 4 | 5;
// };

export type SortingType = "asc" | "desc" | "none" | 1 | 2 | 3 | 4 | 5;

const SearchProductGridScreen = ({ route, navigation }: PropTypes) => {
  const [getSearchedProducts, { isLoading }] = useGetSearchedProductsMutation();
  const [page, setPage] = useState(1);
  const [searchedProducts, setSearchedProducts] = useState<ProductType[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductType[]>([]);

  const searchQueryObject = useSelector(
    (state: RootState) => state.searchProduct.searchQueryObject
  );
  const dispatch = useDispatch<AppDispatch>();

  const [modalIsVisible, setModalIsVisible] = useState(false);

  // const discountedProducts = useSelector(
  //   (state: RootState) => state.homeProduct.bestSelling
  // );

  const { sorting } = useSelector((state: RootState) => state.searchProduct);

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log("SearchProductScreen Unmounted - 73");
        dispatch(resetSearchStates());
      };
    }, [])
  );

  useEffect(() => {
    getSearchProductsHandler();
  }, [searchQueryObject]);

  useEffect(() => {
    if (searchedProducts.length > 0) {
      switch (sorting) {
        case "asc":
          setSortedProducts(
            [...searchedProducts].sort((a, b) => a.price - b.price)
          );
          break;
        case "desc":
          setSortedProducts(
            [...searchedProducts].sort((a, b) => b.price - a.price)
          );
          break;
        case 1:
          setSortedProducts(
            [...searchedProducts].filter((product) => product.rating <= 1)
          );
          break;
        case 2:
          setSortedProducts(
            [...searchedProducts].filter((product) => product.rating <= 2)
          );
          break;
        case 3:
          setSortedProducts(
            [...searchedProducts].filter((product) => product.rating <= 3)
          );
          break;
        case 4:
          setSortedProducts(
            [...searchedProducts].filter((product) => product.rating <= 4)
          );
          break;
        case 5:
          setSortedProducts(
            [...searchedProducts].filter((product) => product.rating <= 5)
          );
          break;
        case "none":
          setSortedProducts([]);
          break;
        default:
          break;
      }
    }
  }, [sorting]);

  const getSearchProductsHandler = async () => {
    console.log("Search Query Object - 131");
    console.log(searchQueryObject);
    try {
      const response = await getSearchedProducts(searchQueryObject).unwrap();
      setSearchedProducts([...response]);
      // setSearchedProducts([...searchedProducts, ...response]);
      setPage((p) => p + 1);
      console.log("Search Response - 135");
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.log("Search Query: ", route.params.searchQuery);
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {isLoading ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <TextButton
            title="Load More"
            onPressAction={getSearchProductsHandler}
            fontFamily={"Roboto"}
            fontSize={16}
            fontWeight="semibold"
            color={COLORS.fgPrimary}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.containerStyles}>
      <View style={styles.topTextContainer}>
        <Text>
          <Text style={styles.queryPreText}>Results for Search Value </Text>
          <Text style={styles.query}>"{route.params.searchQuery}"</Text>
        </Text>
        <Text style={styles.productNum}>
          {sortedProducts.length === 0
            ? searchedProducts.length
            : sortedProducts.length}{" "}
          Results Returned
        </Text>
      </View>

      <FlatList
        data={sortedProducts.length === 0 ? searchedProducts : sortedProducts}
        keyExtractor={(item) => item.id}
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
        ListFooterComponent={renderFooter}
        initialNumToRender={PAGE_SIZE}
        windowSize={5}
        numColumns={2}
        //onEndReached={getSearchProductsHandler}
        //onEndReachedThreshold={0.5}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 20 }}
        style={styles.listStyle}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
      />
      <View style={styles.filterContainer}>
        <IconButton
          onPressAction={() => {
            setModalIsVisible(true);
          }}
        >
          <Ionicons name="funnel-outline" size={36} color={COLORS.fgPrimary} />
        </IconButton>
        <View style={styles.divider}></View>
        <IconButton
          onPressAction={() =>
            navigation.navigate("searchFilters", {
              searchQuery: route.params.searchQuery,
            })
          }
        >
          <Ionicons name="filter-outline" size={36} color={COLORS.fgPrimary} />
        </IconButton>
      </View>
      <SortingModal
        modalIsVisible={modalIsVisible}
        closeModal={() => setModalIsVisible(false)}
      />
    </View>
  );
};

export default SearchProductGridScreen;

const styles = StyleSheet.create({
  containerStyles: {
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
  },

  topTextContainer: {
    flexDirection: "column",
    rowGap: 10,
    width: "90%",
    marginTop: 20,
  },
  queryPreText: {
    ...b1Roboto,
    color: COLORS.textGray,
  },
  query: {
    ...b1Roboto,
    color: COLORS.fgPrimary,
  },
  productNum: {
    ...b1Roboto,
    color: COLORS.textGray,
    fontStyle: "italic",
  },

  listStyle: {
    marginTop: 20,
    width: "90%",
    alignSelf: "center",
    // paddingHorizontal: 40,
    // borderWidth: 1,
  },
  footer: {
    alignSelf: "center",
    marginBottom: 10,
    // marginVertical: 20,
  },

  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "40%",
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
    borderWidth: 1,
    backgroundColor: COLORS.bgPrimary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  divider: {
    borderWidth: 1,
    height: 32,
    borderColor: COLORS.textGray,
  },
});
