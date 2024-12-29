import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { dbConnect } from "@/service/momgo";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export const getAllHotels = async () => {
  await dbConnect();
  const hotels = await hotelModel
    .find()
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();
  return replaceMongoIdInArray(hotels);
};

export const getHotelById = async (hotelId) => {
  const hotel = await hotelModel.findById(hotelId).lean();
  return replaceMongoIdInObject(hotel);
};

export const getRatingsForHotel = async (hotelId) => {
  const rating = await ratingModel.find({ hotelId }).lean();
  return replaceMongoIdInArray(rating);
};
export const getReviewsForHotel = async (hotelId) => {
  const rating = await reviewModel.find({ hotelId: hotelId }).lean();
  return replaceMongoIdInArray(rating);
};
