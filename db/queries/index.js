import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/momgo";
import {
  isDateInbetween,
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";

export const getAllHotels = async (
  destination,
  checkin,
  checkout,
  category
) => {
  const regex = new RegExp(destination, "i");
  const hotelsByDestination = await hotelModel
    .find({ city: { $regex: regex } })
    .select([
      "thumbNailUrl",
      "name",
      "highRate",
      "lowRate",
      "city",
      "propertyCategory",
    ])
    .lean();

  let allHotels = hotelsByDestination;

  if (category) {
    const categoryToMatch = category.split("|");
    allHotels = allHotels.filter((hotel) =>
      categoryToMatch.includes(hotel?.propertyCategory.toString())
    );
  }

  if (checkin && checkout) {
    allHotels = await Promise.all(
      allHotels.map(async (hotel) => {
        const found = await findBooking(hotel._id, checkin, checkout);

        if (found) {
          hotel["isBooked"] = true;
        } else {
          hotel["isBooked"] = false;
        }
        return hotel;
      })
    );
  }

  return replaceMongoIdInArray(allHotels);
};

export const findBooking = async (hotelId, checkin, checkout) => {
  const matches = await bookingModel
    .find({ hotelId: hotelId.toString() })
    .lean();

  const found = matches.find((match) => {
    return (
      isDateInbetween(checkin, match.checkin, match.checkout) ||
      isDateInbetween(checkout, match.checkin, match.checkout)
    );
  });

  return found;
};

export const getHotelById = async (hotelId, checkin, checkout) => {
  const hotel = await hotelModel.findById(hotelId).lean();

  if (checkin && checkout) {
    const found = await findBooking(hotel._id, checkin, checkout);
    if (found) {
      hotel["isBooked"] = true;
    } else {
      hotel["isBooked"] = false;
    }
  }
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

export const getUserByEmail = async (email) => {
  const users = await userModel.find({ email: email }).lean();
  return replaceMongoIdInObject(users[0]);
};

export const getBookingByUser = async (userId) => {
  const bookings = await bookingModel.find({ userId }).lean();
  return replaceMongoIdInArray(bookings);
};
