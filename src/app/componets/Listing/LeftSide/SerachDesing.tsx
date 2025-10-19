// LeftSide.tsx

"use client";
import "../../Listing/style.css";
import { useAppSelector } from "@/app/hooks/hooks";

import { useEffect } from "react";
import { useFilterMutation } from "@/app/storeApp/api/filter";
import { updateFilterData } from "@/app/storeApp/Slice/category/filterSlice";
import { useDispatch } from "react-redux";
import PriceListing from "./PriceListing";
import RatingListing from "./RatingListing";
import LocationCategorySubCategoryDropdwon from "./LocationCategorySubCategoryDropdwon";
import SerchboxLIsting from "./SerchboxLIsting";

// Your LeftSide component
function SerachDesing() {
  const dispatch = useDispatch();
  const filterslice = useAppSelector((state) => state.filterSlice);

  const rating = useAppSelector((state) => state.rating.selectedRating);
  const price = useAppSelector((state) => state.price.price);

  const statelocation = useAppSelector(
    (state) => state.SerachLocationSlice.selectedLocation
  );
  const state = statelocation ? statelocation.split(",")[0] : "";

  console.log("my filter slice values are", state);

  useEffect(() => {
    dispatch(
      updateFilterData({
        state: state,
        review_star: rating,
        price: price,
      })
    );
  }, [state, rating, price, dispatch]);

  const [filter, { data, error, isLoading }] = useFilterMutation();

  useEffect(() => {
    // Trigger the API call once the component mounts
    const fetchData = async () => {
      const filterData = {
        category_id: filterslice.category_id,
        price: price,
        review_star: filterslice.review_star,
        state: filterslice.state,
        subcategory_id: filterslice.subcategory_id,
        type: filterslice.type,
        user_id: filterslice.user_id,
      };

      // Call the mutation with the current filter data
      await filter(filterData);
    };

    fetchData();
  }, [filter, filterslice, price]); // Add `filterslice` as dependency

  useEffect(() => {
    // Log the response when data is available
    if (data) {
      console.log("API Response:1212121212121", data);
    }

    // Optionally handle the error case
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, error]);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);



  return (
    <div className={`w-full h-auto grid gap-6 grid-cols-1  `}>
      {/* Search Box */}
      <div className="relative flex items-center">
        <SerchboxLIsting />
      </div>
      <div className="w-full h-auto grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-1">
        {/* Location Search */}
        <div
          className={`w-full flex flex-col gap-6 h-auto  dark:bg-[#2F2F2F] rounded-lg   p-5  ${
            isDarkMode ? " " : "border-color"
          }`}
        >
          <LocationCategorySubCategoryDropdwon />
        </div>

        {/* Price range */}
       <div
          className={`w-full flex flex-col gap-6 h-auto  dark:bg-[#2F2F2F] rounded-lg   p-5  ${
            isDarkMode ? " " : "border-color"
          }`}
        >
          <PriceListing />
        </div>

        {/* type */}
        {/* <div
          className={` w-full rounded-lg  ${
            isDarkMode ? " bg-[#2F2F2F]" : "border-color"
          }`}
        >
          <TypesListing />
        </div> */}

        {/* Rating */}
        <div
          className={`w-full flex flex-col gap-6 h-auto  dark:bg-[#2F2F2F] rounded-lg     ${
            isDarkMode ? " " : "border-color"
          }`}
        >
          <RatingListing />
        </div>
      </div>
    </div>
  );
}

export default SerachDesing;
