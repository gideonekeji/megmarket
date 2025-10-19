"use client"; // This is important for Next.js to handle client-side rendering

import React, { useState } from "react";
import "../style.css";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useServiceLead } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceLead";
import { usePathname } from "next/navigation";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import useTranslation from "@/app/hooks/useTranslation";

function VenderDetail() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const lastSegment = decodeString(lastSegment1);
  const { mutate } = useServiceLead();

  const handalcallapi = () => {
    // Call the API
    mutate(lastSegment, {
      onSuccess: (data) => {
        console.log("API success:", data);
      },
      onError: (error) => {
        console.error("API error:", error);
      },
    });
  };

  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail.service_phone
  );
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();

  // State to handle whether the phone number is shown fully
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const togglePhoneNumberVisibility = () => {
    handalcallapi();

    if (!user_id) {
      dispatch(showModal("loginModal"));
      return;
    }

    // Set to true only if it's currently false
    if (!isNumberVisible) {
      setIsNumberVisible(true);
    }
  };

  // Show only the first 4 digits by default
  const displayedPhoneNumber = isNumberVisible
    ? ServiceDetailData
    : `${ServiceDetailData.slice(0, 4)}XXXXXX`; // Hides part of the number except for the first 4 digits



    const { getTranslation } = useTranslation();


  return (
    <div className="bordercolo p-3 gap-1 bg-[#226FE4] rounded-lg w-full flex flex-col justify-center items-center">
      {/* Description */}
      <h6 className="font-poppins text-[#FFFFFFBD] text-sm mb-2">  {getTranslation(
            "Phone",
            "Phone"
          )}</h6>

      {/* Phone number */}
      <h4 className="font-poppins text-white text-lg ">
        {displayedPhoneNumber}
      </h4>

      <div className="h-[1px] w-[90%] mx-auto bg-[#FFFFFF] opacity-[30%] "></div>

      {/* Show phone number button */}
      <button
        onClick={togglePhoneNumberVisibility}
        className={`w-full font-poppins text-sm py-2 px-4 rounded-lg bg-transparent transition-all duration-300  ${
          isNumberVisible ? " text-[#00B665]   font-bold" : "text-white"
        }`}
      >
        {getTranslation(
            "Show Number",
            "Show Number"
          )}
        {/* line */}
        {/* <div className="h-[1px] w-[29.7%] mx-auto bg-[#FFFFFF] opacity-[30%] "></div> */}
      </button>
    </div>
  );
}

export default VenderDetail;
