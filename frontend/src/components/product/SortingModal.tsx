import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import IconButton from "../UI/IconButton";
import { COLORS, h2Oxygen } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SortingType } from "../../screens/loggedInStack/homeTabs/SearchProductGridScreen";
import { sortingOptions, sortingOptionsMap } from "../../constants/constants";
import { set } from "react-hook-form";
import TextButton from "../UI/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { applySorting } from "../../features/search/SearchProductSlice";

type PropTypes = {
  modalIsVisible: boolean;
  closeModal: () => void;
};

const height = Dimensions.get("window").height;

const SortingModal = ({ modalIsVisible, closeModal }: PropTypes) => {
  const dispatch = useDispatch<AppDispatch>();

  const { sorting } = useSelector((state: RootState) => state.searchProduct);

  const sortingHandler = (option: string) => {
    if (sorting === sortingOptionsMap[option]) {
      dispatch(applySorting("none"));
      return;
    }

    switch (option) {
      case "Price - Low To High":
        dispatch(applySorting("asc"));
        break;
      case "Price - High To Low":
        dispatch(applySorting("desc"));
        break;

      case "5 stars":
        dispatch(applySorting(5));
        break;
      case "4 stars":
        dispatch(applySorting(4));
        break;
      case "3 stars":
        dispatch(applySorting(3));
        break;
      case "2 stars":
        dispatch(applySorting(2));
        break;
      case "1 star":
        dispatch(applySorting(1));
        break;
      default:
        console.log("option", option);
        break;
    }
  };

  return (
    <Modal visible={modalIsVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeadingText}>Sort By</Text>
            <IconButton onPressAction={closeModal}>
              <Ionicons
                name={"close-outline"}
                size={36}
                color={COLORS.fgPrimary}
              />
            </IconButton>
          </View>
          <View style={styles.sortingOptions}>
            {sortingOptions.map((option, index) => (
              <View style={styles.sortingOption}>
                <TextButton
                  key={index}
                  title={option}
                  onPressAction={() => {
                    sortingHandler(option);
                    closeModal();
                  }}
                  color={"black"}
                  fontFamily={"Roboto"}
                  fontSize={20}
                  fontWeight={"normal"}
                />
                {sorting === sortingOptionsMap[option] && (
                  <Ionicons
                    name="checkmark"
                    size={32}
                    color={COLORS.fgPrimary}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SortingModal;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modalContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    height: height * 0.6,
    backgroundColor: COLORS.bgSecondary,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeadingText: {
    ...h2Oxygen,
    color: COLORS.fgPrimary,
  },
  sortingOptions: {
    marginTop: 20,
    flexDirection: "column",
    rowGap: 20,
  },
  sortingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
