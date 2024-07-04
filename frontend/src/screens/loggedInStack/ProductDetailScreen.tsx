import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";
import {
  Firmware,
  NetworkBand,
  ProductDetailType,
  useGetProductDetailsMutation,
} from "../../features/productDetail/ProductDetailApi";
import PlusButton from "../../components/UI/PlusButton";
import {
  COLORS,
  h1Oxygen,
  h2Oxygen,
  h3Oxygen,
  h4Oxygen,
  h5Oxygen,
} from "../../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import MainButton from "../../components/UI/MainButton";
import { Protocol } from "../../features/products/HomeProductSlice";
import SpecificationEntry from "../../components/productDetail/SpecificationEntry";
import ReviewEntry from "../../components/productDetail/ReviewEntry";
import TextButton from "../../components/UI/TextButton";

type ProductDetailRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "productDetail"
>;

type PropTypes = {
  route: ProductDetailRouteProp;
};

const ProductDetailScreen = ({ route }: PropTypes) => {
  const [getProductDetails, { isLoading }] = useGetProductDetailsMutation();

  const [productDetails, setProductDetails] = useState<ProductDetailType>();
  const [quantity, setQuantity] = useState("0");

  useEffect(() => {
    const getProductDetailsHandler = async () => {
      try {
        const response = await getProductDetails(
          Number(route.params.productId)
        ).unwrap();
        console.log(response);
        setProductDetails(response);
      } catch (error) {
        console.log(error);
      }
    };

    getProductDetailsHandler();
  }, []);

  const onChangeQuantityInput = (text: string) => {
    if (text.length === 1 && text.match(/[0-9]/)) {
      setQuantity(text);
    }
  };

  const incrementQuantity = () => {
    // Add to Cart
  };
  const decrementQuantity = () => {
    // Subtract from Cart
  };

  if (productDetails === undefined) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={"large"} color={COLORS.fgPrimary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {/* <Image source={{ uri: productDetails?.imageUrl ?? ""}} /> */}
          <View style={styles.innerImageContainer}>
            <Image
              style={styles.imageStyles}
              source={require("../../../assets/images/productSample.png")}
              resizeMode={"cover"}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.informationContainer}>
            <Text style={styles.productName}>{productDetails?.name}</Text>
            <Text style={styles.productBrand}>{productDetails?.brand}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>
                {productDetails?.category}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name={"star"} size={24} color={COLORS.accent} />
              <Text style={styles.ratingText}>{productDetails?.rating}</Text>
            </View>
            <Text style={styles.descText}>{productDetails?.description}</Text>
            <Text style={styles.price}>$ {productDetails?.price}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.quantityControl}>
              <PlusButton onPressAction={incrementQuantity}>
                <Ionicons name="add" size={30} color={COLORS.fgPrimary} />
              </PlusButton>
              <TextInput
                keyboardType="number-pad"
                style={styles.quantityInput}
                onChangeText={onChangeQuantityInput}
                value={quantity}
                //  onBlur={onBlurMinPrice}
              />
              <PlusButton onPressAction={decrementQuantity}>
                <Ionicons name={"remove"} size={30} color={COLORS.fgPrimary} />
              </PlusButton>
            </View>
            <MainButton
              title="ADD TO CART"
              onPressAction={() => {}}
              // disabled={errors.email && errors.password ? true : false}
              isSubmitting={isLoading}
              variant="primary"
              paddingVertical={12}
              widthPC={30}
            />
          </View>
        </View>

        <View style={styles.specificationContainer}>
          <Text style={styles.specificationHeading}>Specifications</Text>
          <View style={styles.specEntryContainer}>
            <SpecificationEntry
              specificationName="Network Bandwidth"
              specificationValue={
                productDetails?.specifications["networkBand"] as NetworkBand
              }
            />
            <SpecificationEntry
              specificationName="Firmware"
              specificationValue={
                productDetails?.specifications["firmware"] as Firmware
              }
            />
            <SpecificationEntry
              specificationName="Protocol"
              specificationValue={
                productDetails?.specifications["protocol"] as Protocol
              }
            />
          </View>
        </View>

        <View style={styles.reviewContainer}>
          <Text style={styles.specificationHeading}>Ratings and Reviews</Text>
          <View style={styles.reviewInnerContainer}>
            <View style={styles.ratingControl}>
              {productDetails.reviews.length > 0 ? (
                <View style={styles.ratingTextContainer}>
                  <View style={styles.overallRatingContainer}>
                    {/* <Text>{productDetails?.rating}</Text> */}
                    <Text style={styles.numRating}>
                      {productDetails?.rating}
                    </Text>
                    <Text style={styles.totalRating}>/5</Text>
                  </View>
                  <Text style={styles.overallRatingText}>Overall Rating</Text>
                </View>
              ) : (
                <Text style={styles.reviewFallbackText}>
                  Be the First One To Rate
                </Text>
              )}
              <Pressable onPress={() => {}}>
                <View style={styles.rateButton}>
                  <Text style={styles.rateText}>Rate</Text>
                </View>
              </Pressable>
            </View>

            {productDetails.reviews.length > 0 && (
              <>
                <View>
                  {productDetails?.reviews.slice(0, 2).map((review, index) => (
                    <ReviewEntry
                      key={index}
                      comment={review.comment}
                      rating={Number(review.rating)}
                      userName={review.userName}
                      date={review.date}
                    />
                  ))}
                </View>
                <View style={styles.viewReviewContainer}>
                  <TextButton
                    title="View All Reviews"
                    onPressAction={() => {}}
                    fontSize={20}
                    fontWeight={"bold"}
                    fontFamily={"oxygen"}
                    color={COLORS.textPrimary}
                  />
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={COLORS.textPrimary}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  imageContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.textGray,
    height: 250,
  },
  innerImageContainer: {
    width: "100%",

    flex: 1,
  },

  imageStyles: {
    // aspectRatio: 1,
    width: "60%",
    margin: 10,
    flex: 1,
    alignSelf: "center",
  },
  mainContainer: {
    elevation: 2,
    // borderBottomWidth: 1,
    paddingBottom: 10,
  },
  informationContainer: {
    rowGap: 20,
    paddingHorizontal: 20,
  },
  productName: {
    ...h4Oxygen,
    color: COLORS.fgPrimary,
    fontWeight: "bold",
    marginTop: 20,
  },
  productBrand: {
    ...h5Oxygen,
    color: COLORS.textGray,
  },
  categoryContainer: {
    backgroundColor: "white",
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 10,
  },
  categoryText: {
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
  ratingContainer: {
    padding: 8,
    columnGap: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.fgPrimary,
    width: 80,
    borderRadius: 5,
  },
  ratingText: {
    color: COLORS.accent,
    fontSize: 18,
  },
  descText: {
    fontSize: 16,
  },
  price: {
    color: COLORS.fgPrimary,
    fontSize: 22,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  quantityControl: {
    flexDirection: "row",
    width: "40%",
    alignItems: "center",
  },
  quantityInput: {
    width: "40%",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  specificationContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  specificationHeading: {
    ...h2Oxygen,
    color: COLORS.fgPrimary,
    fontWeight: "bold",
    marginLeft: 10,
    marginBottom: 10,
  },
  specEntryContainer: {
    width: "90%",
    alignSelf: "center",
    elevation: 2,
    // borderWidth: 1,
    borderColor: COLORS.fgPrimary,
    padding: 20,
    backgroundColor: COLORS.bgSecondary,
  },
  reviewFallbackText: {
    alignItems: "center",
    fontSize: 18,
    marginTop: 5,
  },
  reviewContainer: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  reviewInnerContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: COLORS.bgSecondary,
  },
  ratingControl: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black",
    justifyContent: "space-between",
  },
  ratingTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    columnGap: 30,
  },
  overallRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  numRating: {
    ...h1Oxygen,
    color: "black",
  },
  totalRating: {
    ...h1Oxygen,
    color: COLORS.textGray,
  },
  overallRatingText: {
    fontSize: 16,
  },

  rateButton: {
    backgroundColor: COLORS.fgPrimary,
    paddingVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  rateText: {
    ...h3Oxygen,
    color: COLORS.accent,
  },
  viewReviewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
