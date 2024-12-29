import { userModel } from "@/models/user-model";
import { dbConnect } from "@/service/momgo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fname, lname, email, password } = await request.json();
  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name: `${fname} ${lname}`,
    email,
    password: hashedPassword,
  };
  try {
    await userModel.create(newUser);
    return new NextResponse("User create success", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message, { status: 500 });
  }
};
