import SmartHub from "../../assets/images/smartHub.svg";
import SmartLighting from "../../assets/images/smartLighting.svg";
import SmartSecurity from "../../assets/images/smartSecurity.svg";
import SmartClimate from "../../assets/images/smartClimate.svg";
import SmartLaundary from "../../assets/images/smartLaundary.svg";
import SmartKitchen from "../../assets/images/smartKitchen.svg";
import { SvgProps } from "react-native-svg";
import { FC } from "react";

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

export { iconsData };
