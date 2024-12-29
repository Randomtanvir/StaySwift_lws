import Image from "next/image";
import HotelSummaryInfo from "./HotelSummaryInfo";

const HotelCard = ({ hotelInfo, checkin, checkout }) => {
  return (
    <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
      <Image
        src={hotelInfo?.thumbNailUrl}
        width={240}
        height={165}
        className="max-h-[162px] max-w-[240px]"
        alt=""
      />
      <HotelSummaryInfo
        fromListPage={true}
        hotelInfo={hotelInfo}
        checkin={checkin}
        checkout={checkout}
      />
    </div>
  );
};

export default HotelCard;
