import { auth } from "@/auth";
import ProfileInfo from "@/components/user/ProfileInfo";
import PastBooking from "@/components/user/booking/PastBooking";
import UpcomingBooking from "@/components/user/booking/UpcomingBooking";
import { getBookingByUser, getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
  const secssion = await auth();
  if (!secssion?.user) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(secssion?.user?.email);
  const bookings = await getBookingByUser(loggedInUser?.id);
  const pastBookings = bookings?.filter(
    (booking) => new Date().getTime() > new Date(booking?.checkin).getTime()
  );
  const upCommigBookings = bookings?.filter(
    (booking) => new Date().getTime() <= new Date(booking?.checkin).getTime()
  );
  return (
    <>
      <section className="mt-[100px]">
        <div className="container">
          <ProfileInfo />
        </div>
      </section>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PastBooking bookings={pastBookings} />
            <UpcomingBooking bookings={upCommigBookings} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingsPage;
