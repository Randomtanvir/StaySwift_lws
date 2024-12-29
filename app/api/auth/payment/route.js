import { bookingModel } from "@/models/booking-model";
import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/momgo";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { hotelId, userId, checkin, checkout } = await request.json();
  await dbConnect();

  const payload = {
    hotelId: new mongoose.Types.ObjectId(hotelId),
    userId: new mongoose.Types.ObjectId(userId),
    checkin,
    checkout,
  };

  try {
    await bookingModel.create(payload);
    return new NextResponse("A New Booking has been made", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
