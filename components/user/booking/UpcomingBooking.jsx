import BookingCard from "./BookingCard";

const UpcomingBooking = ({ bookings }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">⌛️ Upcomming Bookings</h2>

      <div className="bg-[#F6F3E9] p-4 rounded-md">
        {bookings &&
          bookings?.map((booking) => (
            <BookingCard
              key={booking?.id}
              hotelId={booking?.hotelId}
              checkin={booking?.checkin}
              checkout={booking?.checkout}
            />
          ))}
        {bookings?.length === 0 && <div>No booking </div>}
      </div>
    </div>
  );
};

export default UpcomingBooking;
