import React, { useState } from "react";
import { IoStarOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateFilterData } from "@/app/storeApp/Slice/category/filterSlice";

function Types() {
  const [isTypeDropdown, setIsTypeDropdown] = useState(true);
  const [isFeaturedChecked, setIsFeaturedChecked] = useState(false);
  const dispatch = useDispatch();

  const toggleTypeDropdown = () => {
    setIsTypeDropdown((prevState) => !prevState); // Toggle the dropdown visibility on click
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsFeaturedChecked(checked);
    // Update the `type` value in the Redux store
    dispatch(updateFilterData({ type: checked ? "1" : "0" }));
  };

  return (
    <div>
      <div className="btnshadow w-full flex justify-between items-center p-4 shadow-lg rounded-xl">
        <div className="flex items-center justify-start gap-3">
          <IoStarOutline className="text-lg" />
          <div>
            <h6 className="font-poppins text-black font-normal">Types</h6>
          </div>
        </div>

        {/* Icon dropdown */}
        <div onClick={toggleTypeDropdown}>
          <MdKeyboardArrowRight
            className={`rotate-${
              isTypeDropdown ? "90" : "0"
            } text-2xl text-[#000000] cursor-pointer transition-transform duration-300`}
          />
        </div>
      </div>

      {/* Dropdown Inputs */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col gap-4 px-6 ${
          isTypeDropdown ? "max-h-[300px] py-4" : "max-h-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        <div className="flex w-full px-3 py-4 rounded-lg typeborder items-center gap-3 cursor-pointer">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={isFeaturedChecked}
            onChange={handleCheckboxChange}
          />

          <div>
            <h4 className="font-poppins font-normal text-lg">Featured</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Types;
