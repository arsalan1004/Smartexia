import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  CartItemType,
  QuantityControlArgType,
  useDecrementQuantityMutation,
  useDeleteCartItemMutation,
  useGetCartItemsMutation,
  useIncrementQuantityMutation,
} from "../../features/cart/CartApi";
import { COLORS, h3Oxygen, h4Oxygen } from "../../constants/colors";

import CartItem from "../../components/cart/CartItem";
import SecondaryButton from "../../components/UI/SecondaryButton";
import Checkout from "../../../assets/images/toCheckout.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useFocusEffect } from "@react-navigation/native";
import EmptyCart from "../../../assets/images/noCartItems.svg";
import { useNavigation } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

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

type PropTypes = {};

const Cart = (props: PropTypes) => {
  const [getCartItems, { isLoading }] = useGetCartItemsMutation();

  const [incrementQuantity, { isLoading: incrementLoading }] =
    useIncrementQuantityMutation();
  const [decrementQuantity, { isLoading: decrementLoading }] =
    useDecrementQuantityMutation();
  const [deleteCartItem, { isLoading: deleteLoading }] =
    useDeleteCartItemMutation();

  const [cartItems, setCartItems] = useState<CartItemType[]>(dummy_cart);
  // const [count, setCount] = useState(0);
  const { userId } = useSelector((state: RootState) => state.auth);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootLoggedInStackParamList, "checkout">
    >();

  useFocusEffect(
    useCallback(() => {
      const getCartItemsHandler = async () => {
        console.log("in getCartItemsHandler @ 55 FOCUS EFFECT - Cart.tsx");
        try {
          const response = await getCartItems(userId).unwrap();
          setCartItems(response);
          console.log(response);
        } catch (error) {
          console.log(error);
          setCartItems([]);
        }
      };

      getCartItemsHandler();
    }, [
      userId,
      getCartItems,
      incrementLoading,
      decrementLoading,
      deleteLoading,
    ])
  );

  console.log("IN cart @50");

  if (cartItems?.length === 0) {
    if (isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size={"large"} color={COLORS.fgPrimary} />
        </View>
      );
    } else
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <EmptyCart width={120} height={120} />
          <Text style={{ ...h3Oxygen, color: COLORS.fgPrimary }}>
            Cart is Empty
          </Text>
        </View>
      );
  }

  const incrementQuantityHandler = async (
    queryObject: QuantityControlArgType
  ) => {
    console.log("Multi Increment Called", queryObject);
    try {
      const response = await incrementQuantity(queryObject).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const decrementQuantityHandler = async (
    queryObject: QuantityControlArgType
  ) => {
    try {
      const response = await decrementQuantity(queryObject).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCartItemHandler = async (
    queryObject: Omit<QuantityControlArgType, "quantity">
  ) => {
    try {
      const response = await deleteCartItem(queryObject).unwrap();
      console.log(response);
    } catch (error) {
      console.log("error received");
      console.log(error);
    }
  };

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + Math.round(item.productPrice) * item.productQuantity,
    0
  );

  const onNavigateToCheckout = () => {
    const cartItemPriceObject: Record<string, number> = {};

    // filling cartItemPriceObject
    cartItems.forEach((item) => {
      cartItemPriceObject[item.productName] = item.productPrice;
    });

    navigation.navigate("checkout", { cartItemPrice: cartItemPriceObject });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cartItemsContainer}>
          {cartItems.map((item) => (
            <CartItem
              key={item.productId}
              {...item}
              incrementQuantityHandler={incrementQuantityHandler}
              decrementQuantityHandler={decrementQuantityHandler}
              deleteCartItemHandler={deleteCartItemHandler}
            />
          ))}
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Order Summary</Text>
          <View style={styles.summaryInfo}>
            <Text style={styles.totalText}>Grand Total</Text>
            <Text style={styles.grandTotal}>$ {cartTotal}</Text>
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <SecondaryButton
            title="Continue to Checkout"
            onPressAction={() => onNavigateToCheckout()}
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
