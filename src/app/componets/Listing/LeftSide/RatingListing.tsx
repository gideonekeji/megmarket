"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";
import { setSelectedRatingListing } from "@/app/storeApp/Slice/Listing/RatingSliceListing";
import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const RatingListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedRating = useAppSelector(
    (state) => state.RatingSliceListing.selectedRating
  );
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  const [open, setOpen] = useState<boolean>(true);

  const handleRatingSelect = (value: number) => {
    dispatch(setSelectedRatingListing(value));
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div
        className={`w-full flex justify-between items-center   dark:text-dark-darkcolor cursor-pointer p-4 shadow-md rounded-xl 
          ${isDarkMode ? "bg-[#2F2F2F] text-white" : "bg-white text-black"}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <IoStarOutline className="text-lg" />
          <h6 className="font-medium font-poppins">
            {getTranslation("Rating", "Rating")}
          </h6>
        </div>

        <MdKeyboardArrowRight
          className={`transform transition-transform duration-300 text-2xl 
            ${open ? "rotate-90" : "rotate-0"} 
            ${isDarkMode ? "text-white" : "text-black"}`}
        />
      </div>

      {/* Dropdown */}
      <div
        className={`transition-all duration-300     ease-in-out overflow-hidden 
          ${open ? "max-h-[400px]" : "max-h-0"}`}
      >
        <div className="flex flex-col mt-2 rounded-xl shadow-sm">
          {[1, 2, 3, 4, 5].map((value) => (
            <label
              key={value}
              className={`flex items-center w-full dark:text-dark-darkcolor px-4 py-3 cursor-pointer border-b last:border-none 
                ${
                  selectedRating === value
                    ? "bg-gray-100 dark:bg-[#B4B4B414] font-semibold"
                    : " hover:bg-[#B4B4B414] font-normal"
                }
                ${isDarkMode ? "border-[#444]" : "border-gray-200"}
              `}
            >
              <input
                type="radio"
                name="rating"
                value={value}
                checked={selectedRating === value}
                onChange={() => handleRatingSelect(value)}
                className="mr-3 accent-blue-600 cursor-pointer"
              />
              {value} {getTranslation("Star", "Star")}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingListing;
