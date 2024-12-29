import Link from "next/link";
import HotelRating from "./HotelRating";
import HotelReview from "./HotelReview";

const HotelSummaryInfo = ({ fromListPage, hotelInfo, checkin, checkout }) => {
  let params = "";
  if (checkin && checkout) {
    params = `?checkin=${checkin}&checkout=${checkout}`;
  }
  return (
    <>
      <div className={fromListPage ? "flex-1" : "flex-1 container"}>
        <h2
          className={fromListPage ? "font-bold text-lg" : "font-bold text-2xl"}
        >
          {hotelInfo?.name}
        </h2>
        <p>📍 {hotelInfo?.city}</p>
        <div className="flex gap-2 items-center my-4">
          <HotelRating id={hotelInfo?.id} />
          <HotelReview id={hotelInfo?.id} />
          {hotelInfo?.isBooked && <span>Sold Out</span>}
        </div>
        <div>
          <span className="bg-yellow-400 p-2 rounded-md text-sm ">
            {hotelInfo?.propertyCategory} star property
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-end justify-center">
        <h2 className="text-2xl font-bold text-right">
          ${(hotelInfo?.highRate + hotelInfo?.lowRate) / 2}/night
        </h2>
        <p className=" text-right">Per Night for 2 Rooms</p>
        {fromListPage ? (
          <Link
            href={`/hotels/${hotelInfo?.id}${params}`}
            className="btn-primary "
          >
            Details
          </Link>
        ) : (
          <button
            className={hotelInfo?.isBooked ? "btn-disabled" : "btn-primary"}
          >
            Book
          </button>
        )}
      </div>
    </>
  );
};

export default HotelSummaryInfo;
