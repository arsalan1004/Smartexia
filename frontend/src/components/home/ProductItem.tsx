import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import PlusButton from "../UI/PlusButton";
import { COLORS, b1Roboto, h5Oxygen } from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";
import { useIncrementQuantityMutation } from "../../features/cart/CartApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
// import WishlistButton from "../UI/WishlistButton";

type PropTypes = {
  productId: string;
  imageUrl: string;
  // isWhislisted: boolean; // From Global Wishlist Object
  name: string;
  price: number;
  //discountedPrice?: number;
  rating: number;
  widthPercent?: number;
  applyWidth: boolean;
  // onPressAction: () => void;
};

const screenWidth = Dimensions.get("window").width;

const ProductItem = ({
  productId,
  imageUrl,
  // isWhislisted,
  name,
  price,
  //discountedPrice,
  rating,
  applyWidth = false,
  widthPercent = 50,
}: // onPressAction,
PropTypes) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootLoggedInStackParamList, "productDetail">
    >();

  const { userId } = useSelector((state: RootState) => state.auth);

  const [incrementQuantity] = useIncrementQuantityMutation();

  const onPressHandler = () => {
    console.log("Nav to Product Detail");
    navigation.navigate("productDetail", { productId: productId });
    console.log("Product ID: ", productId);
  };

  const onPressIncrementHandler = async () => {
    const queryArg = {
      userId: userId,
      productId: Number(productId),
      quantity: 1,
    };
    console.log("Single Increment called");
    try {
      const response = await incrementQuantity(queryArg).unwrap();
      console.log(response);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Pressable onPress={onPressHandler} style={[styles.container]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={require("../../../assets/images/productSample.png")}
        />

        {/* <View style={styles.wishlistbtnContainer}>
          <WishlistButton
            isWishlisted={isWhislisted}
            onPressAction={() => {}}
          />
        </View> */}
      </View>

      <Text style={[styles.nameStyle, name.length > 15 && { fontSize: 14 }]}>
        {name}
      </Text>

      <View style={styles.priceContainer}>
        <Text style={styles.priceStyle}>$ {price}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <View style={styles.ratingInnerContainer}>
          <Ionicons name="star" size={24} color={COLORS.fgPrimary} />
          <Text style={styles.ratingTextStyle}>({rating})</Text>
        </View>
        <PlusButton onPressAction={onPressIncrementHandler}>
          <Ionicons name="add" size={30} color={COLORS.fgPrimary} />
        </PlusButton>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    rowGap: 5,
    flexShrink: 1, // For name wrap
    // width: "50%",
    // borderWidth: 1,
    minWidth: 180,
    maxWidth: 220,
    paddingHorizontal: 15,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: COLORS.fgPrimary,
    borderRadius: 20,
    position: "relative",
    padding: 20,
    objectFit: "cover",
    width: "100%",
  },
  imageStyle: {
    width: "100%",
  },
  wishlistbtnContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  nameStyle: {
    ...b1Roboto,

    color: COLORS.textGray,
    flexShrink: 1,
  },
  priceContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
  priceStyle: {
    ...b1Roboto,
    color: COLORS.fgPrimary,
  },
  discountedPriceStyle: {
    ...h5Oxygen,
    color: COLORS.tertiary,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    columnGap: 5,
  },
  ratingInnerContainer: {
    flexDirection: "row",
    columnGap: 5,
  },
  ratingTextStyle: {
    ...b1Roboto,

    color: COLORS.textGray,
  },
});

{
  /* <Text
          style={[
            styles.priceStyle,
            discountedPrice
              ? {
                  textDecorationLine: "line-through",
                  textDecorationStyle: "solid",
                  color: COLORS.textGray,
                }
              : null,
          ]}
        >
          $ {price}
        </Text>
        {discountedPrice && (
          <Text style={styles.discountedPriceStyle}>$ {discountedPrice}</Text>
        )} */
}
