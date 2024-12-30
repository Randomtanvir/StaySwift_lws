import { getAllHotels } from "@/db/queries";
import HotelCard from "./HotelCard";

const HotelList = async ({ destination, checkin, checkout, category }) => {
  const allHotels = await getAllHotels(
    destination,
    checkin,
    checkout,
    category
  );

  return (
    <div className="col-span-9">
      <div className="space-y-4">
        {allHotels &&
          allHotels?.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotelInfo={hotel}
              checkin={checkin}
              checkout={checkout}
            />
          ))}
        {allHotels.length === 0 && (
          <div className="text-center bg-teal-500 text-white p-4 rounded-md text-xl">
            No Hotel Available
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelList;
