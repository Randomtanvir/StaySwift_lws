import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import Signout from "./auth/Signout";

const Navbar = async ({ isAuth }) => {
  const session = await auth();

  return (
    <nav>
      <Link href="/">
        <Image
          src="/stayswift.svg"
          alt="Stay Swift Logo"
          width={200}
          height={200}
        />
      </Link>
      {!isAuth && (
        <ul>
          <li>
            <Link href="#">Recommended Places</Link>
          </li>

          <li>
            <Link href="#">About Us</Link>
          </li>

          <li>
            <Link href="#">Contact us</Link>
          </li>

          <li>
            <Link href="/bookings">Bookings</Link>
          </li>

          <li>
            {session?.user ? (
              <div className="flex gap-2 items-center">
                <span>{session?.user?.name}</span> |
                <Signout />
              </div>
            ) : (
              <Link href="/login" className="login">
                Login
              </Link>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
