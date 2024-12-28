import { hotelModel } from "@/models/hotel-model";
import { dbConnect } from "@/service/momgo";
import { replaceMongoIdInArray } from "@/utils/data-util";

export const getAllHotels = async () => {
  await dbConnect();
  const hotels = await hotelModel.find().lean();
  return replaceMongoIdInArray(hotels);
};
