import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { RootLoggedInStackParamList } from "../../navigation/LoggedInStack";
import { ReviewType } from "../../features/productDetail/ProductDetailApi";

type ProductReviewScreenRouteProp = RouteProp<
  RootLoggedInStackParamList,
  "review"
>;

type PropTypes = {
  route: ProductReviewScreenRouteProp;
};

const ProductReviewScreen = ({ route }: PropTypes) => {
  const [reviews, setReviews] = useState<ReviewType[]>();

  useEffect(() => {
    console.log(route.params.reviewArray);
  }, []);

  if (reviews?.length ?? false) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <Text>ProductReviewScreen</Text>
    </View>
  );
};

export default ProductReviewScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
