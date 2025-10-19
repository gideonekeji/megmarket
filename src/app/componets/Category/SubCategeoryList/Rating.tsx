// src/Rating.tsx
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setSelectedRating } from "@/app/storeApp/Slice/category/ratingSlice";
import React, { useState, useEffect } from "react";
import { IoStarOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const Rating: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedRatingFromStore = useAppSelector(
    (state) => state.rating.selectedRating
  );
  const [rating, setRating] = useState<boolean>(true);

  // Sync local state with Redux store
  useEffect(() => {
    setSelectedRating(selectedRatingFromStore);
  }, [selectedRatingFromStore]);

  const togglerating = () => {
    setRating((prevState) => !prevState);
  };

  const handleRatingSelect = (ratingValue: number) => {
    // Dispatch selected rating to Redux store
    dispatch(setSelectedRating(ratingValue));
  };

  return (
    <div>
      <div className="btnshadow w-full flex justify-between items-center h-auto p-4 shadow-lg rounded-xl  cursor-pointer"  onClick={togglerating}>
        <div className="flex items-center justify-start gap-3">
          <IoStarOutline className="text-lg" />

          <div>
            <h6 className="font-poppins text-black font-normal">Rating</h6>
          </div>
        </div>

        {/* icon dropdown */}
        <div onClick={togglerating}>
          <MdKeyboardArrowRight
            className={`rotate-${
              rating ? "90" : "0"
            } text-2xl text-[#000000] cursor-pointer transition-transform duration-300`}
          />
        </div>
      </div>

      {/* Dropdown Inputs */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-4 px-6 ${
          rating ? "max-h-[400px] py-4 " : "max-h-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <div
            key={value}
            onClick={() => handleRatingSelect(value)}
            className={`flex w-full px-3 py-4 rounded-lg items-center gap-3 cursor-pointer ${
              selectedRatingFromStore === value ? "typeborder text-black" : ""
            }`}
          >
            {/* Circle left side */}
            <div
              className={`h-4 w-4 rounded-full p-[2px] flex justify-center items-center ${
                selectedRatingFromStore === value
                  ? "circlbordercolor"
                  : " circlbordercolor"
              }`}
            >
              <div
                className={`h-full w-full  rounded-full ${
                  selectedRatingFromStore === value ? "bg-[#226FE4]" : ""
                }`}
              ></div>
            </div>

            <div>
              <h4
                className={`font-poppins text-lg ${
                  selectedRatingFromStore === value
                    ? "font-semibold"
                    : "font-normal"
                }`}
              >
                {value} Star
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
