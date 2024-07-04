import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  DefaultInitialFilters,
  Filters,
  applyFilter,
  initialFilters,
} from "../../features/search/SearchProductSlice";
import {
  NavigationProp,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../../App";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, h3Oxygen } from "../../constants/colors";
import { useDispatch } from "react-redux";
import { SubCategoryType } from "../../features/search/SearchProductSlice";
import MainButton from "../../components/UI/MainButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type SubFilterScreenRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "searchSubFilters"
>;

type SubFilterScreenNavigationProp = NativeStackNavigationProp<
  RootLoggedInStackParamList,
  "searchSubFilters"
>;

type PropTypes = {
  route: SubFilterScreenRouteProp;
  navigation: SubFilterScreenNavigationProp;
};

const SubFilterScreen = ({ route, navigation }: PropTypes) => {
  const { title } = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const [initialSubFilters, setInitialSubFilters] = useState<
    Filters[keyof Filters] | undefined
  >();
  const [subFilters, setSubFilters] = useState<
    Filters[keyof Filters] | undefined
  >();

  const [selectedSubFilter, setSelectedSubFilter] = useState<string>();

  const filters = useSelector(
    (state: RootState) => state.searchProduct.filters
  )[title];

  useEffect(() => {
    setSubFilters(filters);
    setInitialSubFilters(DefaultInitialFilters[title]);
  }, []);

  const subFilterObjectKeys = Object.keys(subFilters ?? {});
  const subFilterObjectValues = Object.values(subFilters ?? {});

  console.log(filters);

  const applyFilterHandler = (subfilter: string) => {
    console.log("subfilter @63", subfilter);
    console.log("initial", initialSubFilters);

    console.log(subFilters[subfilter] === true);

    if (subFilters[subfilter] === true) {
      setSubFilters({ ...DefaultInitialFilters[title], [subfilter]: false });
      setSelectedSubFilter("");
    } else {
      setSubFilters({ ...DefaultInitialFilters[title], [subfilter]: true });
      setSelectedSubFilter(subfilter);
    }
  };

  const submitFilter = () => {
    console.log("submit filter called");
    dispatch(
      applyFilter({
        category: title,
        subCategory: selectedSubFilter as SubCategoryType,
      })
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {subFilterObjectKeys.map((subfilter, index) => (
        <Pressable
          key={index}
          style={({ pressed }) => [pressed && styles.pressed]}
          onPress={() => applyFilterHandler(subfilter)}
        >
          <View style={styles.radioContainer}>
            {subFilterObjectValues[index] === true ? (
              <Ionicons
                name={"radio-button-on-outline"}
                size={36}
                color={COLORS.accent}
              />
            ) : (
              <Ionicons
                name={"radio-button-off-outline"}
                size={36}
                color={COLORS.textGray}
              />
            )}
            <Text style={styles.radioLabel}>{subfilter}</Text>
          </View>
        </Pressable>
      ))}
      <MainButton
        title="APPLY SUB FILTER"
        onPressAction={submitFilter}
        variant="primary"
      />
    </View>
  );
};

export default SubFilterScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 50,
    rowGap: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  radioContainer: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  radioLabel: {
    ...h3Oxygen,
    color: COLORS.textPrimary,
  },
});
