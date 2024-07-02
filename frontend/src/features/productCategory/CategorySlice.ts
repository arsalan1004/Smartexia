import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ProductType = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  rating: number;
};
