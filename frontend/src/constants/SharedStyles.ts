import { StatusBar, StyleSheet } from "react-native";
import { COLORS, b2Roboto, b3Roboto, h1Oxygen } from "./colors";

export const loginRegStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //borderWidth: 1,
    marginTop: StatusBar.currentHeight!,
  },
  innerContainer: {
    flex: 1,
    width: "90%",
    //borderWidth: 1,
  },
  titleText: {
    ...h1Oxygen,
    color: COLORS.fgPrimary,
  },

  inputContainer: {
    marginTop: 30,
  },
  fieldContainer: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fieldLabel: {
    color: COLORS.textGray,
    ...b2Roboto,
    marginLeft: 20,
  },
  inputField: {
    width: "80%",
    fontSize: 16,
  },
  fieldError: {
    ...b2Roboto,
    color: COLORS.error,
    marginLeft: 20,
    marginTop: 5,
  },
  registrationTextContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  registrationText: {
    ...b2Roboto,
    color: COLORS.textGray,
  },
});
