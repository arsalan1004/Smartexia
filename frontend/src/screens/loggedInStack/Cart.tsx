import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  CartItemType,
  useGetCartItemsMutation,
} from "../../features/cart/CartApi";
import { COLORS, h3Oxygen, h4Oxygen } from "../../constants/colors";

import CartItem from "../../components/cart/CartItem";
import SecondaryButton from "../../components/UI/SecondaryButton";
import Checkout from "../../../assets/images/toCheckout.svg";

type Props = {};

const dummy_cart: CartItemType[] = [
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

const Cart = (props: Props) => {
  // const [getCartItems, { isLoading, isSuccess }] = useGetCartItemsMutation();
  const [cartItems, setCartItems] = useState<CartItemType[]>(dummy_cart);

  // if (cartItems?.length === 0 ) {
  //   if(isLoading) {
  //     return (
  //       <View style={styles.loading}>
  //         <ActivityIndicator size={"large"} color={COLORS.fgPrimary} />
  //       </View>
  //     );
  //   }
  //   if(isSuccess) {
  //     return (
  //       <View>
  //         <Text>Cart is empty</Text>
  //       </View>
  //     );
  //   }
  // }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <CartItem key={item.productId} {...item} />
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Order Summary</Text>
          <View style={styles.summaryInfo}>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.grandTotal}>
              ${" "}
              {cartItems.reduce(
                (acc, item) => acc + item.productPrice * item.productQuantity,
                0
              )}
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <SecondaryButton
            title="Continue to Checkout"
            onPressAction={() => console.log("checkout")}
          >
            <Checkout color={COLORS.accent} />
          </SecondaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 1,
    width: "90%",
    alignSelf: "center",
  },
  cartItemsContainer: {
    // flex: 1,
    rowGap: 20,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    backgroundColor: COLORS.bgSecondary,
    width: "90%",
    alignSelf: "center",
    elevation: 2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    marginTop: 30,
  },
  summaryText: {
    ...h4Oxygen,
    color: COLORS.fgPrimary,
    fontWeight: "bold",
  },
  summaryInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalText: {
    ...h3Oxygen,
    color: COLORS.textPrimary,
  },
  grandTotal: {
    ...h3Oxygen,
    color: COLORS.fgPrimary,
  },
});
