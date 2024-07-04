import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  Filters,
  SubCategoryType,
  initialFilters,
  setSearchQueryObject,
} from "../../features/search/SearchProductSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, b2Roboto, h4Oxygen } from "../../constants/colors";
import MainButton from "../../components/UI/MainButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";
import { RouteProp } from "@react-navigation/native";
import { SearchQueryType } from "../../features/searchProductResults/SearchResultsApi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { SubCategory } from "../../features/products/HomeProductSlice";

type FilterScreenNavigationProp = NativeStackNavigationProp<
  RootLoggedInStackParamList,
  "searchSubFilters"
>;

type FilterScreenRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "searchFilters"
>;

type PropTypes = {
  navigation: FilterScreenNavigationProp;
  route: FilterScreenRouteProp;
};

const FilterScreen = ({ navigation, route }: PropTypes) => {
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(300);

  const filters = useSelector(
    (state: RootState) => state.searchProduct.filters
  );

  const dispatch = useDispatch<AppDispatch>();

  const onChangeMinPrice = (text: string) => {
    if (text === "" || Number(text) <= 0) {
      setMinPrice(0);
      return;
    } else if (text.trim().length > 0 && text.trim().length < 6) {
      console.log(text);
      setMinPrice(Number(text));
    }
  };

  const onChangeMaxPrice = (text: string) => {
    if (text === "" || Number(text) <= 0) {
      setMaxPrice(0);
      return;
    } else if (text.trim().length > 0 && text.trim().length < 6) {
      console.log(text);
      setMaxPrice(Number(text));
    }
  };

  const onBlurMinPrice = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const text = event.nativeEvent.text;
    if (text === "") {
      setMinPrice(0);
    } else if (maxPrice < minPrice) {
      onChangeMinPrice(`${maxPrice - 100}`);
    }
  };
  const onBlurMaxPrice = (
    event: NativeSyntheticEvent<TextInputFocusEventData>
  ) => {
    const text = event.nativeEvent.text;
    if (text === "") {
      setMaxPrice(0);
    } else if (maxPrice < minPrice) {
      onChangeMaxPrice(`${minPrice + 100}`);
    }
  };

  const onFilterApply = () => {
    const result: (SubCategory | null)[] = [];

    (Object.keys(filters) as Array<keyof Filters>).forEach((category) => {
      const subFilters = filters[category];
      (Object.keys(subFilters) as Array<keyof typeof subFilters>).forEach(
        (key) => {
          if (subFilters[key]) {
            result.push(key);
          }
        }
      );
    });

    const searchResultQueryObject: SearchQueryType = {
      searchQuery: route.params.searchQuery,
      filters: {
        SubCategory: result,
      },
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
    };

    dispatch(setSearchQueryObject(searchResultQueryObject));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {(Object.keys(initialFilters) as Array<keyof Filters>).map(
        (filter: keyof Filters, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.navigate("searchSubFilters", {
                  title: filter,
                })
              }
              style={({ pressed }) => [pressed && styles.pressed]}
            >
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>{filter}</Text>
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.textGray}
                />
              </View>
            </Pressable>
          );
        }
      )}
      <View style={styles.priceContainer}>
        <Text style={styles.priceRangeTitle}>Price Range</Text>
        <View style={styles.priceRangeContainer}>
          <View>
            <TextInput
              keyboardType="number-pad"
              style={styles.textInputStyles}
              onChangeText={onChangeMinPrice}
              value={minPrice !== 0 ? minPrice.toString() : ""}
              onBlur={onBlurMinPrice}
            />
            <Text style={styles.priceRangeSubTitle}>Min</Text>
          </View>
          <Text style={{ fontSize: 20 }}> ---- </Text>
          <View>
            <TextInput
              keyboardType="number-pad"
              style={styles.textInputStyles}
              onChangeText={onChangeMaxPrice}
              value={maxPrice !== 0 ? maxPrice.toString() : ""}
              onBlur={onBlurMaxPrice}
            />
            <Text style={styles.priceRangeSubTitle}>Max</Text>
          </View>
        </View>
      </View>
      <MainButton
        title="SHOW RESULTS"
        onPressAction={onFilterApply}
        variant="primary"
        bottomPosition={100}
      />
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textGray,
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.textGray,
  },
  pressed: {
    opacity: 0.8,
  },
  priceContainer: {
    marginTop: 60,
  },
  priceRangeContainer: {
    flexDirection: "row",
    rowGap: 5,
    justifyContent: "space-between",
    alignItems: "center",
    width: "60%",
    alignSelf: "center",
    marginTop: 30,
  },
  priceRangeTitle: {
    ...h4Oxygen,
    fontWeight: "bold",
    color: COLORS.fgPrimary,
  },
  textInputStyles: {
    fontSize: 20,
    borderBottomWidth: 1,
    width: 70,
  },
  priceRangeSubTitle: {
    ...b2Roboto,
    color: COLORS.textGray,
  },
});
