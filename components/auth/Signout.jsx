"use client";

import { signOut } from "next-auth/react";

const Signout = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "http://localhost:3000/login" })}
      className="login text-xs"
    >
      Logout
    </button>
  );
};

export default Signout;
