import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateFilterDataListing } from "@/app/storeApp/Slice/Listing/FilterListingSlice";
import { useAppSelector } from "@/app/hooks/hooks";

function TypesListing() {
  const [isTypeDropdown, setIsTypeDropdown] = useState(true);

  const toggleTypeDropdown = () => {
    setIsTypeDropdown((prevState) => !prevState); // Toggle the dropdown visibility on click
  };

  const dispatch = useDispatch();

  // Get 'type' directly from Redux store
  const isFeaturedChecked = useAppSelector(
    (state) => state.FilterListingSlice.type === "1"
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilterDataListing({ type: e.target.checked ? "1" : "0" }));
  };

  console.log(" my type !!!!", isFeaturedChecked);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div>
      <div
        className={` w-full flex justify-between items-center py-4 px-2  rounded-xl   ${
          isDarkMode ? "  bg-[ #FFFFFF21]  shadow-lg" : "btnshadow shadow-lg"
        }`}
      >
        <div className="flex items-center justify-start gap-3">
          <IoStarOutline
            className={`text-lg   ${
              isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
            }  
            
            `}
          />
          <div>
            <h6
              className={`font-poppins  font-normal ${
                isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
              }`}
            >
              Types
            </h6>
          </div>
        </div>

        {/* Icon dropdown */}
        <div onClick={toggleTypeDropdown}>
          <MdKeyboardArrowRight
            className={`
            ${isTypeDropdown ? "rotate-90" : "rotate-0"}
            
            text-2xl text-[#000000] cursor-pointer transition-transform duration-300     *:
            ${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]  "}
            
             
            `}
          />
        </div>
      </div>

      {/* Dropdown Inputs */}
      <div
        className={` overflow-hidden flex flex-col gap-4 px-4 ${
          isTypeDropdown ? "max-h-[300px] py-4" : "max-h-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        <div
          className={`flex w-full px-3 py-3 rounded-lg  items-center gap-3 cursor-pointer    ${
            isDarkMode
              ? "bg-[#FFFFFF21]  shadow-lg"
              : "btnshadow shadow-lg  typeborder"
          }`}
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isFeaturedChecked}
            onChange={handleCheckboxChange}
          />

          <div>
            <h4
              className={`font-poppins font-normal text-[16px]  ${
                isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
              }`}
            >
              Featured
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TypesListing;
