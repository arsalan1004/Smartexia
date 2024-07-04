import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OneStars from "../../../assets/images/oneStars.svg";
import TwoStars from "../../../assets/images/twoStars.svg";
import ThreeStars from "../../../assets/images/threeStars.svg";
import FourStars from "../../../assets/images/fourStars.svg";
import FiveStars from "../../../assets/images/fiveStars.svg";
import ZeroStars from "../../../assets/images/zeroStars.svg";

type PropTypes = {
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

const formatDate = (dateString: string) => {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const ReviewEntry = ({ userName, rating, comment, date }: PropTypes) => {
  const ratingNum = Math.round(rating);

  const dateText = formatDate(date);

  console.log(dateText);
  let ratingStars;

  switch (ratingNum) {
    case 1:
      ratingStars = <OneStars scale={2} width={110} height={30} />;
      break;
    case 2:
      ratingStars = <TwoStars scale={2} width={110} height={30} />;
      break;
    case 3:
      ratingStars = <ThreeStars scale={2} width={110} height={30} />;
      break;
    case 4:
      ratingStars = <FourStars scale={5} width={110} height={30} />;
      break;
    case 5:
      ratingStars = <FiveStars scale={2} width={110} height={30} />;
      break;
    default:
      ratingStars = <ZeroStars scale={2} width={110} height={30} />;
      break;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{userName}</Text>
      <View style={styles.ratingContainer}>{ratingStars}</View>
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.date}>Reviewed On {dateText}</Text>
    </View>
  );
};

export default ReviewEntry;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "gray",
  },
});
