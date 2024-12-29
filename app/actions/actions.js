"use server";
import { signIn } from "@/auth";

export const login = async (formData) => {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    return response;
  } catch (error) {
    if (error["cause"]?.["err"]?.toString().includes(" User not found")) {
      return { error: true, message: "User not found" };
    } else if (
      error["cause"]?.["err"]?.toString().includes("Email or password mismatch")
    ) {
      return { error: true, message: "Email or password mismatch" };
    } else {
      return { error: true, message: "Somthing went wrong" };
    }
  }
};
