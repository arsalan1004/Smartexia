import SmartHub from "../../assets/images/smartHub.svg";
import SmartLighting from "../../assets/images/smartLighting.svg";
import SmartSecurity from "../../assets/images/smartSecurity.svg";
import SmartClimate from "../../assets/images/smartClimate.svg";
import SmartLaundary from "../../assets/images/smartLaundary.svg";
import SmartKitchen from "../../assets/images/smartKitchen.svg";
import { SvgProps } from "react-native-svg";
import { FC } from "react";
import { SortingType } from "../screens/loggedInStack/homeTabs/SearchProductGridScreen";

type IconDataType = {
  Icon: FC<SvgProps>;
  label: string;
  onPressAction?: () => void;
};

const iconsData: IconDataType[] = [
  {
    Icon: SmartHub,
    label: "Hubs",
  },
  {
    Icon: SmartLighting,
    label: "Lighting",
  },
  {
    Icon: SmartSecurity,
    label: "Security",
  },
  {
    Icon: SmartClimate,
    label: "Climate",
  },
  {
    Icon: SmartLaundary,
    label: "Laundary",
  },
  {
    Icon: SmartKitchen,
    label: "Kitchen",
  },
];

const PAGE_SIZE = 10;

const sortingOptions = [
  "Price - Low To High",
  "Price - High To Low",
  "5 stars",
  "4 stars",
  "3 stars",
  "2 stars",
  "1 star",
];
type SortOptionsMapType = {
  [key: string]: SortingType;
};
// type SortOptionsMapType = {
//   [key: string]: SortingType["selectedSort"];
// };

const sortingOptionsMap: SortOptionsMapType = {
  "Price - Low To High": "asc",
  "Price - High To Low": "desc",
  "5 stars": 5,
  "4 stars": 4,
  "3 stars": 3,
  "2 stars": 2,
  "1 star": 1,
};

export { iconsData, PAGE_SIZE, sortingOptions, sortingOptionsMap };
