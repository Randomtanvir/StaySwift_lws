import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/momgo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fname, lname, email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password: hashedPassword,
  };
  try {
    await dbConnect();
    const found = await userModel.findOne({ email });
    console.log(found);
    if (found) {
      return new NextResponse("User already exists", { status: 409 });
    }
    await userModel.create(newUser);
    return new NextResponse("User create success", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
