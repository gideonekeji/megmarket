"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect } from "react";
import verfiyicon from "../../../../../../public/assets/Image/verfiy.png";
import Image from "next/image";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import useTranslation from "@/app/hooks/useTranslation";

function VenderDetailInformation() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const lastSegment = decodeString(lastSegment1);

  // Store service ID in cookies
  useEffect(() => {
    Cookies.set("detail_id", lastSegment);
  }, [lastSegment]);

  const dispatch = useAppDispatch();

  // Fetch service details
  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);

  console.log(
    " my details cren  detail from emaaployeee",
    data?.serviceDetail.employee_strength
  );

  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.vendorDetails
  );
  const listing = useAppSelector((state) => state.serviceDetail);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const listlenght = listing.serviceDetail.total_stores_count;

  console.log(" my list vbalues from detail service detail", listlenght);

  const handallist = () => {
    if (listlenght > 0) {
      dispatch(showModal("ServiceDetailScreenFiltterModal"));
    }
  };

  const { getTranslation } = useTranslation();

  return (
    <div
      className={`p-4 rounded-lg    ${isDarkMode
        ? " bg-[#2F2F2F]"
        : " bg-[#ffffff] photoservicedetailborderandshado"
        } `}
    >
      {/* Heading */}
      <div
        className={`text-lg font-medium font-poppins  mb-4  ${isDarkMode ? "text-[#ffffff]" : "text-[#3E5155]"
          }`}
      >
        {getTranslation("Vendor Information", "Vendor Information")}
      </div>

      {/* Avatar and Name */}
      <div className="flex gap-6 items-center">
        {/* Avatar */}
        {/* Avatar */}
        {ServiceDetailData?.image ? (
          <div
            className="h-12 w-12 bg-cover bg-center rounded-full"
            style={{
              backgroundImage: `url(${ServiceDetailData.image})`,
            }}
          ></div>
        ) : (
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center text-lg text-black dark:text-dark-darkcolor bg-[#226FE475] font-medium font-poppins
    `}
          >
            {(ServiceDetailData?.first_name?.[0] || "").toUpperCase()}
          </div>
        )}


        {/* Name and Details */}
        <div className="flex flex-col">
          <div
            className={`flex items-center font-poppins gap-2 text-lg font-medium    ${isDarkMode ? "text-[#ffffff]" : "text-[#3E5155]"
              }`}
          >
            <span>
              {ServiceDetailData.first_name} {ServiceDetailData.last_name}
            </span>

            {/* Verify Icon */}
            <Image className="h-5 w-5" src={verfiyicon} alt="Verified Icon" />
          </div>

          <div className="text-sm flex justify-center items-center text-[#757575] mt-1">
            <span
              className=" text-[#226FE4]  font-poppins  cursor-pointer"
              onClick={handallist}
            >
              {" "}
              {listing.serviceDetail.total_stores_count}   {getTranslation(
                "Services",
                "Services"
              )}
            </span>
            <span
              className={` ml-2   flex justify-center items-center gap-2 font-poppins  ${isDarkMode ? "text-[#ffffff]" : "text-[#929292]"
                }`}
            >
              <p className=" h-1 w-1 rounded-full bg-[#226FE4]"></p>
              {getTranslation(
                "Member since",
                "Member since"
              )} {listing.serviceDetail.published_year}{" "}
              {listing.serviceDetail.published_month}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenderDetailInformation;
