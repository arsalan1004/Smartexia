import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";

const lightingFilters = [
  "Smart Bulb",
  "Smart Light Strip",
  "Smart Light Switch",
  "Smart Lamp",
];
const securityFilters = [
  "Smart Camera",
  "Smart Doorbell",
  "Smart Lock",
  "Smart Alarm",
];
const climateFilters = [
  "Smart Thermostat",
  "Smart Humidifier",
  "Smart Dehumidifier",
];
const kitchenFilters = [
  "Smart Fridge",
  "Smart Oven",
  "Smart Cooktop",
  "Smart Microwave",
];
const laundryFilters = ["Smart Washer", "Smart Dryer", "Smart Iron"];

export {
  lightingFilters,
  securityFilters,
  climateFilters,
  kitchenFilters,
  laundryFilters,
};

export type SubCategory =
  | "Smart Bulb"
  | "Smart Light Strip"
  | "Smart Light Switch"
  | "Smart Lamp"
  | "Smart Camera"
  | "Smart Doorbell"
  | "Smart Lock"
  | "Smart Alarm"
  | "Smart Thermostat"
  | "Smart Humidifier"
  | "Smart Dehumidifier"
  | "Smart Fridge"
  | "Smart Oven"
  | "Smart Cooktop"
  | "Smart Microwave"
  | "Smart Washer"
  | "Smart Dryer"
  | "Smart Iron";

export type Brand =
  | "Samsung"
  | "LG"
  | "Philips"
  | "Sony"
  | "Bosch"
  | "Nest"
  | "Ecobee"
  | "Arlo"
  | "Wyze"
  | "Belkin"
  | "Xiaomi"
  | "Amazon"
  | "Google"
  | "Apple"
  | "Microsoft"
  | "IKEA"
  | "TP-Link"
  | "Whirlpool"
  | "TCL"
  | "Lenovo"
  | "Huawei"
  | "Panasonic"
  | "Leviton";

export type Protocol =
  | "Wi-Fi"
  | "Bluetooth"
  | "Zigbee"
  | "Z-Wave"
  | "Thread"
  | "Matter";

export type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
  subCategory: SubCategory;
  // // brand: Brand;
  // protocol: Protocol;
};

export type HomeProductState = {
  discounted: ProductType[];
  featured: ProductType[];
  newArrived: ProductType[];
  bestSelling: ProductType[];
};

const initialState: HomeProductState = {
  discounted: [
    // Products from 1 to 10
    {
      id: "GP-LBU001",
      name: "Samsung Smart Bulb",
      imageUrl: "",
      price: 20,
      rating: 4.5,
      subCategory: "Smart Bulb",
      // brand: "Samsung",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-LBU002",
      name: "LG Smart Bulb",
      imageUrl: "",
      price: 22,
      rating: 4.4,
      subCategory: "Smart Bulb",
      // brand: "LG",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-LBU003",
      name: "Philips Smart Bulb",
      imageUrl: "",
      price: 25,
      rating: 4.6,
      subCategory: "Smart Bulb",
      // brand: "Philips",
      // protocol: "Zigbee",
    },
    {
      id: "GP-LBU005",
      name: "Bosch Smart Bulb",
      imageUrl: "",
      price: 24,
      rating: 4.4,
      subCategory: "Smart Bulb",
      // brand: "Bosch",
      // protocol: "Z-Wave",
    },
    {
      id: "GP-LS001",
      name: "Nest Smart Light Strip",
      imageUrl: "",
      price: 30,
      rating: 4.7,
      subCategory: "Smart Light Strip",
      // brand: "Nest",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-LS002",
      name: "Ecobee Smart Light Strip",
      imageUrl: "",
      price: 32,
      rating: 4.5,
      subCategory: "Smart Light Strip",
      // brand: "Ecobee",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-CAM002",
      name: "LG Smart Camera",
      imageUrl: "",
      price: 110,
      rating: 4.5,
      subCategory: "Smart Camera",
      // brand: "LG",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-CAM003",
      name: "Philips Smart Camera",
      imageUrl: "",
      price: 105,
      rating: 4.4,
      subCategory: "Smart Camera",
      // brand: "Philips",
      // protocol: "Zigbee",
    },
    {
      id: "GP-CAM004",
      name: "Sony Smart Camera",
      imageUrl: "",
      price: 115,
      rating: 4.6,
      subCategory: "Smart Camera",
      // brand: "Sony",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-DB002",
      name: "Arlo Smart Doorbell",
      imageUrl: "",
      price: 120,
      rating: 4.5,
      subCategory: "Smart Doorbell",
      // brand: "Arlo",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-DB003",
      name: "Wyze Smart Doorbell",
      imageUrl: "",
      price: 115,
      rating: 4.4,
      subCategory: "Smart Doorbell",
      // brand: "Wyze",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-DB004",
      name: "Belkin Smart Doorbell",
      imageUrl: "",
      price: 125,
      rating: 4.6,
      subCategory: "Smart Doorbell",
      // brand: "Belkin",
      // protocol: "Z-Wave",
    },
    {
      id: "GP-LK002",
      name: "Apple Smart Lock",
      imageUrl: "",
      price: 150,
      rating: 4.7,
      subCategory: "Smart Lock",
      // brand: "Apple",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-LK003",
      name: "Microsoft Smart Lock",
      imageUrl: "",
      price: 145,
      rating: 4.6,
      subCategory: "Smart Lock",
      // brand: "Microsoft",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-LK004",
      name: "IKEA Smart Lock",
      imageUrl: "",
      price: 140,
      rating: 4.5,
      subCategory: "Smart Lock",
      // brand: "IKEA",
      // protocol: "Zigbee",
    },
  ],
  featured: [
    {
      id: "GP-AL001",
      name: "TCL Smart Alarm",
      imageUrl: "",
      price: 60,
      rating: 4.2,
      subCategory: "Smart Alarm",
      // brand: "TCL",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-AL002",
      name: "Lenovo Smart Alarm",
      imageUrl: "",
      price: 65,
      rating: 4.3,
      subCategory: "Smart Alarm",
      // brand: "Lenovo",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-TH001",
      name: "Samsung Smart Thermostat",
      imageUrl: "",
      price: 180,
      rating: 4.6,
      subCategory: "Smart Thermostat",
      // brand: "Samsung",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-TH003",
      name: "Philips Smart Thermostat",
      imageUrl: "",
      price: 175,
      rating: 4.5,
      subCategory: "Smart Thermostat",
      // brand: "Philips",
      // protocol: "Zigbee",
    },
    {
      id: "GP-TH004",
      name: "Sony Smart Thermostat",
      imageUrl: "",
      price: 190,
      rating: 4.7,
      subCategory: "Smart Thermostat",
      // brand: "Sony",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-HM001",
      name: "Xiaomi Smart Humidifier",
      imageUrl: "",
      price: 60,
      rating: 4.4,
      subCategory: "Smart Humidifier",
      // brand: "Xiaomi",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-HM002",
      name: "Amazon Smart Humidifier",
      imageUrl: "",
      price: 65,
      rating: 4.5,
      subCategory: "Smart Humidifier",
      // brand: "Amazon",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-HM003",
      name: "Google Smart Humidifier",
      imageUrl: "",
      price: 70,
      rating: 4.6,
      subCategory: "Smart Humidifier",
      // brand: "Google",
      // protocol: "Zigbee",
    },
    {
      id: "GP-DM001",
      name: "Apple Smart Dehumidifier",
      imageUrl: "",
      price: 150,
      rating: 4.7,
      subCategory: "Smart Dehumidifier",
      // brand: "Apple",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-DM002",
      name: "Microsoft Smart Dehumidifier",
      imageUrl: "",
      price: 155,
      rating: 4.6,
      subCategory: "Smart Dehumidifier",
      // brand: "Microsoft",
      // protocol: "Wi-Fi",
    },
  ],
  newArrived: [
    {
      id: "GP-FR004",
      name: "Sony Smart Fridge",
      imageUrl: "",
      price: 1200,
      rating: 4.5,
      subCategory: "Smart Fridge",
      // brand: "Sony",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-FR005",
      name: "Bosch Smart Fridge",
      imageUrl: "",
      price: 1300,
      rating: 4.6,
      subCategory: "Smart Fridge",
      // brand: "Bosch",
      // protocol: "Zigbee",
    },
    {
      id: "GP-OV004",
      name: "Wyze Smart Oven",
      imageUrl: "",
      price: 400,
      rating: 4.4,
      subCategory: "Smart Oven",
      // brand: "Wyze",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-OV005",
      name: "Belkin Smart Oven",
      imageUrl: "",
      price: 450,
      rating: 4.5,
      subCategory: "Smart Oven",
      // brand: "Belkin",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-CT001",
      name: "Xiaomi Smart Cooktop",
      imageUrl: "",
      price: 200,
      rating: 4.3,
      subCategory: "Smart Cooktop",
      // brand: "Xiaomi",
      // protocol: "Zigbee",
    },
    {
      id: "GP-CT002",
      name: "Amazon Smart Cooktop",
      imageUrl: "",
      price: 220,
      rating: 4.4,
      subCategory: "Smart Cooktop",
      // brand: "Amazon",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-MW003",
      name: "Whirlpool Smart Microwave",
      imageUrl: "",
      price: 300,
      rating: 4.5,
      subCategory: "Smart Microwave",
      // brand: "Whirlpool",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-MW004",
      name: "TCL Smart Microwave",
      imageUrl: "",
      price: 320,
      rating: 4.6,
      subCategory: "Smart Microwave",
      // brand: "TCL",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-MW005",
      name: "Lenovo Smart Microwave",
      imageUrl: "",
      price: 330,
      rating: 4.7,
      subCategory: "Smart Microwave",
      // brand: "Lenovo",
      // protocol: "Zigbee",
    },
    {
      id: "GP-WS001",
      name: "Samsung Smart Washer",
      imageUrl: "",
      price: 600,
      rating: 4.5,
      subCategory: "Smart Washer",
      // brand: "Samsung",
      // protocol: "Wi-Fi",
    },
  ],
  bestSelling: [
    {
      id: "GP-WS002",
      name: "LG Smart Washer",
      imageUrl: "",
      price: 650,
      rating: 4.6,
      subCategory: "Smart Washer",
      // brand: "LG",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-WS003",
      name: "Philips Smart Washer",
      imageUrl: "",
      price: 700,
      rating: 4.5,
      subCategory: "Smart Washer",
      // brand: "Philips",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-DR002",
      name: "Ecobee Smart Dryer",
      imageUrl: "",
      price: 500,
      rating: 4.4,
      subCategory: "Smart Dryer",
      // brand: "Ecobee",
      // protocol: "Zigbee",
    },
    {
      id: "GP-DR003",
      name: "Arlo Smart Dryer",
      imageUrl: "",
      price: 550,
      rating: 4.5,
      subCategory: "Smart Dryer",
      // brand: "Arlo",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-DR004",
      name: "Wyze Smart Dryer",
      imageUrl: "",
      price: 520,
      rating: 4.3,
      subCategory: "Smart Dryer",
      // brand: "Wyze",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-IR003",
      name: "Google Smart Iron",
      imageUrl: "",
      price: 100,
      rating: 4.4,
      subCategory: "Smart Iron",
      // brand: "Google",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-IR004",
      name: "Apple Smart Iron",
      imageUrl: "",
      price: 110,
      rating: 4.5,
      subCategory: "Smart Iron",
      // brand: "Apple",
      // protocol: "Bluetooth",
    },
    {
      id: "GP-IR005",
      name: "Microsoft Smart Iron",
      imageUrl: "",
      price: 120,
      rating: 4.6,
      subCategory: "Smart Iron",
      // brand: "Microsoft",
      // protocol: "Wi-Fi",
    },
    {
      id: "GP-LP001",
      name: "IKEA Smart Lamp",
      imageUrl: "",
      price: 60,
      rating: 4.5,
      subCategory: "Smart Lamp",
      // brand: "IKEA",
      // protocol: "Zigbee",
    },
    {
      id: "GP-LP002",
      name: "TP-Link Smart Lamp",
      imageUrl: "",
      price: 65,
      rating: 4.4,
      subCategory: "Smart Lamp",
      // brand: "TP-Link",
      // protocol: "Wi-Fi",
    },
  ],
};

const HomeProductSlice = createSlice({
  name: "homeProduct",
  initialState: initialState,
  reducers: {
    setDiscountedProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.discounted = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.featured = action.payload;
    },
    setNewArrivedProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.newArrived = action.payload;
    },
    setBestSellingProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.bestSelling = action.payload;
    },
  },
});

export const {
  setDiscountedProducts,
  setFeaturedProducts,
  setNewArrivedProducts,
  setBestSellingProducts,
} = HomeProductSlice.actions;

export default HomeProductSlice.reducer;
