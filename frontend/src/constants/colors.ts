import { TextStyle } from "react-native";

const COLORS = {
  bgPrimary: "#F2F7F5",
  bgSecondary: "#F8FDFB",
  fgPrimary: "#00473E",
  fgPrimaryLight: "#AFCCC8",
  fgPrimaryLight2: "#E3F1EC",
  textPrimary: "#475D5B",
  accent: "#FAAE2B",
  secondary: "#FFA8BA",
  tertiary: "#FA5246",
  textGray: "#80869A",
  lightGray: "#E2E2E2",
  success: "#82DD55",
  error: "#E23636",
  warning: "#EDB95E",
};

export type OnBoardingTextType = {
  image: "welcome" | "shopping"; // indicates Screen type
  onBoardingTitle: string[];
  onBoardingText: string;
};

const ON_BOARDING_TEXT: { [key: string]: OnBoardingTextType } = {
  welcome: {
    image: "welcome",
    onBoardingTitle: ["Welcome to", "Smart Home Store"],
    onBoardingText:
      "Discover the best in smart home technology. Transform your living space with innovative appliances designed to make your life easier, safer, and more connected.",
  },
  shopping: {
    image: "shopping",
    onBoardingTitle: ["Shopping Experience", "worth Remembering"],
    onBoardingText:
      "Discover the ideal products for your home. Browse through our curated collection and choose from the best selections available",
  },
};

export type CustomTextStyle = TextStyle & {
  fontSize: number;
  fontFamily: "Roboto" | "oxygen";
  fontWeight: "bold" | "normal" | "semibold";
};

const h1Oxygen: CustomTextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  fontFamily: "oxygen",
};

const h4Oxygen: CustomTextStyle = {
  fontSize: 18,
  fontWeight: "normal",
  fontFamily: "oxygen",
};
const h5Oxygen: CustomTextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: "oxygen",
};

const b1Roboto: CustomTextStyle = {
  fontSize: 16,
  fontWeight: "semibold",
  fontFamily: "Roboto",
};

const b2Roboto: CustomTextStyle = {
  fontSize: 14,
  fontWeight: "semibold",
  fontFamily: "Roboto",
};
const b3Roboto: CustomTextStyle = {
  fontSize: 12,
  fontFamily: "Roboto",
  fontWeight: "normal",
};
export {
  COLORS,
  h1Oxygen,
  h4Oxygen,
  h5Oxygen,
  b1Roboto,
  b2Roboto,
  b3Roboto,
  ON_BOARDING_TEXT,
};
