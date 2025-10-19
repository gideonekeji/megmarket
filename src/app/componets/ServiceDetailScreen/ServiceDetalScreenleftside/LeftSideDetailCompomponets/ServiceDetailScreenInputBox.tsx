import React from "react";
import Image from "next/image";
import { TextField, InputAdornment } from "@mui/material";
import search from "../../../../../../public/assets/Image/search-normal.png";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/app/storeApp/Slice/ServiceDetail/serviceDetailScreenInputSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const ServiceDetailScreenInputBox: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useAppSelector(
    (state) => state.serviceDetailScreenInput.searchQuery
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  console.log(" my service name is 12121212121 ", searchQuery);


  return (
    <div className="w-full relative">
      {/* Search Icon */}
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
        <Image
          src={search}
          alt="Search Icon"
          className="h-[1rem] w-[1rem] object-cover"
        />
      </div>

      {/* Input */}
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={searchQuery} // Bind to Redux state
        onChange={handleChange} // Update Redux state
        className={`font-poppins w-full rounded-[10px] py-[14px] pl-10 placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4] dark:bg-dark-bginput focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480] border dark:border-dark-bordercolorinput border-light-bordercolo-maincolor`}
        placeholder="Listing Search"
      />
    </div>

  );
};

export default ServiceDetailScreenInputBox;
