import { useAppSelector } from "@/app/hooks/hooks";
import { useGetDailyBuget } from "@/app/storeApp/api/useGetDailyBuget";
import { setSelectedPrice } from "@/app/storeApp/Slice/priceSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function RangedailyBudget() {
  const startdate = useAppSelector((state) => state.startDateSponsor.startDate);
  const enddate = useAppSelector((state) => state.endDateSponsor.endDate);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const dispatch = useDispatch();
  const { data } = useGetDailyBuget();

  // Convert start and end date to Date objects
  const start = new Date(startdate);
  let end = new Date(enddate);

  if (isNaN(end.getTime())) {
    end = new Date(); // Default end date to today if not selected
  }

  // Calculate total days
  const timeDifference = end - start;
  const totalDays = Math.max(timeDifference / (1000 * 3600 * 24), 1); // Minimum 1 day

  // State for range value
  const [rangeValue, setRangeValue] = useState(totalDays);

  // Calculate selected price based on range value
  const selectedPrice = data?.data?.[Math.min(rangeValue - 1, 29)]?.price || 0;

  // Sync rangeValue with totalDays when it changes
  useEffect(() => {
    setRangeValue(totalDays);
  }, [totalDays]);

  // Dispatch selectedPrice when it changes
  useEffect(() => {
    dispatch(setSelectedPrice(selectedPrice));
  }, [selectedPrice, dispatch]);

  // Handle range change
  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setRangeValue(Number(event.target.value));
  };

  return (
    <div className="mx-auto flex flex-col">
      {/* Range Input */}
      <div
        className={`rounded-lg mt-5 w-full ${
          isDarkMode ? "bg-transparent" : "bg-white"
        }`}
      >
        <div className="flex justify-between">
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            1 Day
          </span>
          <span id="currentPrice" className="text-light-button-base font-poppins">
            {rangeValue} Day
          </span>
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            30 Day
          </span>
        </div>
        <input
          type="range"
          id="area_distance"
          className="w-full accent-light-button-base cursor-pointer"
          min="1"
          max="30"
          value={rangeValue}
          onChange={handleRangeChange} // Fix read-only issue
        />
        <div className="flex justify-between">
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            {data?.data?.[0]?.price || 0} {/* Price for 1 day */}
          </span>
          <span id="currentPrice" className="text-light-button-base font-poppins">
            {selectedPrice}
          </span>
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            {data?.data?.[29]?.price || 0} {/* Price for 30 days */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RangedailyBudget;
