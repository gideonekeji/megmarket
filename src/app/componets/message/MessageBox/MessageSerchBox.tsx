// src/components/MessageSerchBox.tsx

import React from "react";
import Image from "next/image";
import { TextField, InputAdornment } from "@mui/material";
import search from "../../../../../public/assets/Image/search-normal.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/app/storeApp/Slice/Listing/searchSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const MessageSerchBox = () => {
  const dispatch = useDispatch();

  // Access the search query from Redux store
  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  // Handle the change in input field and dispatch the action to update the Redux state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  console.log(" updating search", searchQuery);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full relative  ">
      <div className="relative mt-[6px] flex items-center">
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Search User"
          value={searchQuery} // Bind the input value to Redux state
          onChange={handleInputChange} // Handle the change in the input field
          className={`font-poppins w-full  rounded-[10px] py-[14px] pl-4  placeholder:text-sm  bg-[#00000008] placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
        />
        <span className="absolute right-2 flex    h-10 w-10 items-center justify-center rounded-full bg-[#B4B4B414]">
          <Image
            src={search}
            alt="Email Icon"
            className="  h-[46%]  w-[46%] object-cover"
          />
        </span>
      </div>
    </div>
  );
};

export default MessageSerchBox;
