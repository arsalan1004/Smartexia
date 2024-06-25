import { TextStyle } from "react-native";

const COLORS = {
  bgPrimary: "#F2F7F5",
  bgSecondary: "#F8FDFB",
  fgPrimary: "#00473E",
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

const h1Oxygen: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  fontFamily: "oxygen",
};
const h5Oxygen: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  fontFamily: "oxygen",
};

const b1Roboto: TextStyle = {
  fontSize: 16,
  fontWeight: "semibold",
};

const b2Roboto: TextStyle = {
  fontSize: 14,
  fontWeight: "semibold",
};
const b3Roboto: TextStyle = {
  fontSize: 12,
  fontWeight: "semibold",
};
export {
  COLORS,
  h1Oxygen,
  h5Oxygen,
  b1Roboto,
  b2Roboto,
  b3Roboto,
  ON_BOARDING_TEXT,
};
