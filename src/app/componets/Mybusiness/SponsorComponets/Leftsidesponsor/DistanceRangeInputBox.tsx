import React, { useEffect } from "react";
import "./Sponsorleftside.css";
import distance from "../../../../../../public/assets/Image/distance.png";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { setDistance } from "@/app/storeApp/Slice/distanceSlice";

function DistanceRangeInputBox() {
  const dispatch = useAppDispatch();

  // Access the distance from the store
  const distanceValue = useAppSelector((state) => state.distance.distance);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const handleRangeChange = (e) => {
    const newDistance = e.target.value;
    dispatch(setDistance(newDistance)); // Dispatch the updated value
  };

  useEffect(() => {
    console.log("Updated distance:", distanceValue);
  }, [distanceValue]);

  return (
    <div
      className=" p-4 w-[95%] rounded-xl   bg-white mx-auto flex flex-col"
      id="inputboxrange"
    >
      <div className="w-full justify-between items-center flex">
        <div className="items-center flex gap-2">
          <Image
            src={distance}
            className="w-6 h-6 object-cover"
            alt="distance"
          />
          <p className="font-poppins text-black  2xl:text-T7 font-normal text-lg">
            Distance
          </p>
        </div>
        <p className="font-poppins text-lg font-normal  text-light-button-base">
          {distanceValue} km
        </p>
      </div>

      {/* Range button */}
      <div
        className={`rounded-lg mt-5 w-full ${
          isDarkMode ? "bg-transparent" : "bg-white"
        }`}
      >
        <input
          type="range"
          id="area_distance"
          className="w-full accent-light-button-base cursor-pointer"
          min="1" // Minimum area_distance
          max="100" // Maximum area_distance
          value={distanceValue} // Bind the value to the Redux store
          onChange={handleRangeChange} // Update the Redux store when the value changes
        />
        <div className="flex justify-between">
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            1 km
          </span>
          <span id="currentPrice" className="text-light-button-base font-poppins">
            {distanceValue} km
          </span>
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            100 km
          </span>
        </div>
      </div>
    </div>
  );
}

export default DistanceRangeInputBox;
