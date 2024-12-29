"use client";

import { login } from "@/app/actions/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const handelSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const response = await login(formData);
      if (response.error) {
        setError(response.message);
      } else {
        router.push("/bookings");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <form className="login-form" onSubmit={handelSubmit}>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      {error && <div className="text-left text-sm text-red-600">{error}</div>}

      <button type="submit" className="btn-primary w-full mt-4">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
