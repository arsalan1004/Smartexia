import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { loginRegStyles } from "../../../constants/SharedStyles";
import { Controller, useForm } from "react-hook-form";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../../../constants/colors";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import TextButton from "../../../components/UI/TextButton";
import { useDispatch } from "react-redux";
import {
  clearSearchHistory,
  setSearchQuery,
} from "../../../features/search/SearchProductSlice";
import NoHistory from "../../../../assets/images/noHistory.svg";
import { RootHomeTabsParamList } from "../../../navigation/HomeTabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RootLoggedInStackParamList } from "../../../../App";

type SearchScreenNavigationProp = BottomTabNavigationProp<
  RootHomeTabsParamList & {
    searchProductGridScreen: RootLoggedInStackParamList["searchProductGridScreen"];
  },
  "search"
>;

type PropTypes = {
  navigation: SearchScreenNavigationProp;
};

type searchFormFields = { searchQuery: string };

const Search = ({ navigation }: PropTypes) => {
  const { searchHistory } = useSelector(
    (state: RootState) => state.searchProduct
  );

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    watch,
  } = useForm<searchFormFields>({});

  const SearchValue = watch("searchQuery");

  const handleSearch = (searchValue: string) => {
    dispatch(setSearchQuery(searchValue));

    navigation.navigate("searchProductGridScreen", {
      title: "Search Results",
      searchQuery: searchValue,
    });
  };

  const onSubmit = (data: searchFormFields) => {
    console.log(data.searchQuery);
    handleSearch(data.searchQuery);
  };

  const onSubmitHistory = (historyQuery: string) => {
    console.log(historyQuery);
    handleSearch(historyQuery);
  };

  /**
   * TODO
   * Add Handling for Empty State
   */

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View
          style={[
            loginRegStyles.inputContainer,
            { width: "85%", marginTop: 0 },
          ]}
        >
          <View style={loginRegStyles.fieldContainer}>
            <Controller
              control={control}
              name="searchQuery"
              rules={{
                required: "Search Keyword is required",
                validate: (value) => {
                  if (value.trim().length <= 0) {
                    return "Invalid Search Value";
                  } else return true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[loginRegStyles.inputField, { fontSize: 18 }]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Search"
                />
              )}
            />
          </View>
          {errors.searchQuery && (
            <Text style={loginRegStyles.fieldError}>
              {errors.searchQuery.message}: {SearchValue}
            </Text>
          )}
        </View>
        <Pressable
          onPress={handleSubmit(onSubmit)}
          style={({ pressed }) => [
            styles.searchButton,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="search" size={24} color={COLORS.accent} />
        </Pressable>
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Search History</Text>

        {searchHistory.length === 0 && (
          <View style={{ alignItems: "center" }}>
            <NoHistory width={150} height={200} />
            <Text style={{ color: COLORS.textGray, fontSize: 16 }}>
              No Search History
            </Text>
          </View>
        )}

        <View style={styles.historyButtonListContainer}>
          {searchHistory.length > 0 &&
            searchHistory.map((historyQuery, index) => (
              <View key={index} style={styles.historyButtonContainer}>
                <TextButton
                  title={historyQuery}
                  fontSize={16}
                  fontWeight={"normal"}
                  fontFamily={"Roboto"}
                  color={COLORS.textGray}
                  onPressAction={() => onSubmitHistory(historyQuery)}
                />
                <Ionicons
                  name="link-outline"
                  size={24}
                  color={COLORS.textGray}
                />
              </View>
            ))}
        </View>

        {searchHistory.length > 0 && (
          <TextButton
            title="CLEAR HISTORY"
            fontSize={14}
            fontWeight={"bold"}
            fontFamily={"Roboto"}
            color={COLORS.tertiary}
            onPressAction={() => dispatch(clearSearchHistory())}
          />
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    rowGap: 30,
  },
  searchContainer: {
    flexDirection: "row",
    columnGap: 15,
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: COLORS.fgPrimary,
    padding: 10,
    borderRadius: 30,
    width: "15%",
    alignItems: "center",
    borderWidth: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  historyContainer: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.lightGray,
    padding: 20,
    rowGap: 20,
  },
  historyTitle: {
    fontSize: 18,
    color: COLORS.fgPrimary,
  },
  historyButtonListContainer: {
    rowGap: 10,
    marginTop: 20,
  },
  historyButtonContainer: {
    borderBottomWidth: 2,
    borderColor: COLORS.lightGray,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
