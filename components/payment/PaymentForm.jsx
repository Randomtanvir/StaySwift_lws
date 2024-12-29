"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const PaymentForm = ({ checkin, checkout, loggedInUser, hotelInfo }) => {
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const hotelId = hotelInfo?.id;
      const userId = loggedInUser?.id;
      const checkin = formData.get("checkin");
      const checkout = formData.get("checkout");

      const res = await fetch("/api/auth/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hotelId,
          userId,
          checkin,
          checkout,
        }),
      });
      res.status === 201 && router.push("/bookings");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <form className="my-8" onSubmit={onSubmit}>
      <div className="my-4 space-y-2">
        <label htmlFor="name" className="block">
          Name
        </label>
        <input
          defaultValue={loggedInUser.name}
          type="text"
          id="name"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          defaultValue={loggedInUser.email}
          type="email"
          id="email"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <span>Check in</span>
        <h4 className="mt-2">
          <input
            type="date"
            defaultValue={checkin}
            name="checkin"
            id="checkin"
          />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <span>Checkout</span>
        <h4 className="mt-2">
          <input
            type="date"
            defaultValue={checkout}
            name="checkout"
            id="checkout"
          />
        </h4>
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="card" className="block">
          Card Number
        </label>
        <input
          type="text"
          id="card"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="expiry" className="block">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiry"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>

      <div className="my-4 space-y-2">
        <label htmlFor="cvv" className="block">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
        />
      </div>
      {error && (
        <div className="text-sm text-left text-red-600 my-2">{error}</div>
      )}
      <button
        disabled={hotelInfo?.isBooked}
        type="submit"
        className="btn-primary w-full"
      >
        Pay Now (${(hotelInfo?.highRate + hotelInfo?.lowRate) / 2})
      </button>
    </form>
  );
};

export default PaymentForm;
