"use client";

import React, { useEffect, useState } from "react";
import "../businesscss.css";
import handsake from "../../../../../public/assets/Image/handshake.png";
import Image from "next/image";
import arrow from "../../../../../public/assets/Image/arrow-left.png";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi"; // Adjust import
import {
  addServiceImage,
  updateServiceField,
} from "@/app/storeApp/Slice/serviceSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function BusinessNameMyBusiness() {
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const { getTranslation } = useTranslation();



  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);


  // Handle the different states of the API call
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }

    if (error) {
      console.error("Error fetching service:", error);
    }

    if (data) {
      console.log("API Response:@@!!", data);

      dispatch(updateServiceField(data.service));
      dispatch(addServiceImage(data.service_images));
    }
  }, [data, isLoading, error]);

  const serviceupdatafromstore = useAppSelector((state) => state.service);

 

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  return (
    <div
      className={`w-full justify-between px-4 md:px-8 py-4  rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? " bg-dark-Modalbgcolortop text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("BusinessNameModal"));
      }}
    >
      <div className="flex gap-3 items-center">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl  font-poppins ">   {getTranslation("Business Name", "Business Name")}  </div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#B4B4B4] font-normal font-poppins  text-[18px]">
          {serviceupdatafromstore.service.service_name}
        </p>

        <div className="h-[1.5rem] w-[1.5rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-cover   ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessNameMyBusiness;
