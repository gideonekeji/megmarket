"use client";

import React from "react";
import Image from "next/image";
import search from "../../../../../public/assets/Image/search-normal121.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/app/storeApp/Slice/Listing/searchSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const SearchboxListing = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          name="search"
          value={searchQuery}
          placeholder="Store search"
          onChange={handleInputChange}
          className={`font-poppins w-full rounded-[10px] py-3 pl-10  dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput  focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
        />
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Image
            src={search}
            alt="Search Icon"
            className="h-[1rem] w-[1rem] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchboxListing;
