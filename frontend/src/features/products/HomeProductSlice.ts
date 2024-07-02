import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";

export type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
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
      id: "1",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "2",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "3",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "4",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "5",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "6",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "7",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "8",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "9",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "10",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
  ],
  featured: [
    {
      id: "1",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "2",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "3",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "4",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "5",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "6",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "7",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "8",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "9",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "10",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
  ],
  newArrived: [
    {
      id: "1",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "2",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "3",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "4",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "5",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "6",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "7",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "8",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "9",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "10",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
  ],
  bestSelling: [
    {
      id: "1",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "2",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "3",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "4",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "5",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "6",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "7",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "8",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "9",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
    },
    {
      id: "10",
      name: "Google Nest Hub",
      imageUrl: "",
      price: 120,
      rating: 3.4,
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
