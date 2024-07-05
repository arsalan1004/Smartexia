import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartItemType } from "./CartApi";

const cartItems = [
  {
    productId: 1,
    productName: "Smart Bulb",
    productQuantity: 2,
    productPrice: 20,
    image: "",
  },
  {
    productId: 2,
    productName: "Smart Thermostat",
    productQuantity: 1,
    productPrice: 80,
    image: "",
  },
  {
    productId: 3,
    productName: "Smart Lock",
    productQuantity: 3,
    productPrice: 150,
    image: "",
  },
];

type CartStateType = {
  cartItems: CartItemType[];
};

const initialState: CartStateType = {
  cartItems: cartItems,
};

type PayloadType = {
  productId: number;
  productQuantity: number;
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementQuantity: (state, action: PayloadAction<CartItemType>) => {
      const newCartItem = action.payload;

      let index = cartItems.findIndex(
        (item) => item.productId === newCartItem.productId
      );

      if (index !== -1)
        state.cartItems[index].productQuantity += newCartItem.productQuantity;
      // Product Already Exists then increment it
      else state.cartItems.push(newCartItem);
    },
    decrementQuantity: (state, action: PayloadAction<CartItemType>) => {
      const newCartItem = action.payload;

      let index = cartItems.findIndex(
        (item) => item.productId === newCartItem.productId
      );

      if (index !== -1) {
        if (
          state.cartItems[index].productQuantity > newCartItem.productQuantity
        ) {
          state.cartItems[index].productQuantity -= newCartItem.productQuantity;
        } else if (
          state.cartItems[index].productQuantity <= newCartItem.productQuantity
        ) {
          state.cartItems = state.cartItems.filter(
            (item) => item.productId !== newCartItem.productId
          );
        }
      } else state.cartItems.push(newCartItem);
    },
    deleteCartItem: (
      state,
      action: PayloadAction<Pick<CartItemType, "productId">>
    ) => {
      const { productId } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );
    },
  },
});

export const { incrementQuantity, decrementQuantity, deleteCartItem } =
  CartSlice.actions;

export default CartSlice.reducer;
