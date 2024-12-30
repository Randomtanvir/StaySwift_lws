import SortHotel from "../sort/SortHotel";
import FilterByAmenities from "./FilterByAmenities";
import FilterByCategory from "./FilterByCategory";
import FilterByPrice from "./FilterByPrice";

const Filter = () => {
  return (
    <>
      <div className="col-span-3 space-y-4">
        <SortHotel />
        <FilterByPrice />
        <FilterByCategory />
        <FilterByAmenities />
      </div>
    </>
  );
};

export default Filter;
