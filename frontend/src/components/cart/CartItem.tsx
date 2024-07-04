import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  CartItemType,
  useDeleteCartItemMutation,
  useIncrementQuantityMutation,
} from "../../features/cart/CartApi";
import { COLORS, h4Oxygen } from "../../constants/colors";
import QuantityControlInput from "../Inputs/QuantityControlInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const CartItem = ({
  productId,
  productName,
  productQuantity,
  productPrice,
  image,
}: CartItemType) => {
  console.log(productName, productQuantity, productPrice, image);
  const [quantity, setQuantity] = useState(1);
  const { userId } = useSelector((state: RootState) => state.auth);

  const [incrementQuantity] = useIncrementQuantityMutation();
  const [decrementQuantity] = useIncrementQuantityMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  const handleQuantityChange = (quantity: string) => {
    if (quantity.length === 2 && quantity.match(/[0-9]/)) {
      setQuantity(Number(quantity[1]));
    }
    console.log("Quantity: ", quantity);
  };

  const incrementQuantityHandler = () => {
    const queryObject = {
      userId: userId,
      productId: Number(productId),
      quantity: quantity,
    };

    console.log("Multi Increment Called", queryObject);
    // try {
    //   const response = await incrementQuantity(queryObject).unwrap();
    //   console.log(response);
    //   setQuantity("0");
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const decrementQuantityHandler = () => {
    const queryObject = {
      userId: userId,
      productId: Number(productId),
      quantity: quantity,
    };

    console.log("Multi Decrement Called", queryObject);
    // try {
    //   const response = await decrementQuantity(queryObject).unwrap();
    //   console.log(response);
    //   setQuantity("0");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const cartItemDeleteHandler = () => {
    const queryObject = {
      userId: userId,
      productId: Number(productId),
    };

    console.log("Delete Called", queryObject);
    // try {
    //   const response = await deleteCartItem(queryObject).unwrap();
    //   console.log(response);
    //   setQuantity("0");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.detailContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../assets/images/productSample.png")}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cartItemDetails}>
            <Text style={styles.name}>{productName}</Text>
            <Text style={styles.quantity}>Quantity: {productQuantity}</Text>
            <Text style={styles.price}>$ {productPrice}</Text>
          </View>
        </View>
        <View style={styles.cartControl}>
          <Pressable onPress={cartItemDeleteHandler}>
            <View style={styles.deleteCartItemButton}>
              <Ionicons name="trash" size={30} color={COLORS.fgPrimary} />
            </View>
          </Pressable>
          <QuantityControlInput
            incrementQuantity={incrementQuantityHandler}
            decrementQuantity={decrementQuantityHandler}
            onChangeQuantityInput={handleQuantityChange}
            quantity={quantity.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
  },
  innerContainer: {
    backgroundColor: COLORS.bgSecondary,
    padding: 20,
    borderWidth: 1,
    elevation: 3,
    borderColor: COLORS.lightGray,
  },
  detailContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  imageContainer: {},
  cartItemDetails: {
    rowGap: 8,
  },
  name: {
    ...h4Oxygen,
    color: COLORS.fgPrimary,
    fontWeight: "bold",
  },
  quantity: {
    color: COLORS.textGray,
  },
  price: {
    color: COLORS.fgPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },
  cartControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  deleteCartItemButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.fgPrimary,
  },
});
