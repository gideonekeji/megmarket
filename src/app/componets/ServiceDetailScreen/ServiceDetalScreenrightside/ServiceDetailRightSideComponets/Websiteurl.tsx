"use client";
import React from "react";
import exorticon from "../../../../../../public/assets/Image/export.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function Websiteurl() {
  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail
  );

  const websitelink = ServiceDetailData.service_website;
  const vendorEmail = ServiceDetailData.vendor_email;
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { getTranslation } = useTranslation();

  return (
    <div
      className={`items-center justify-center w-full  gap-1  flex flex-col p-4 h-full rounded-lg   ${
        isDarkMode
          ? "bg-[#2F2F2F] text-[#ffffff]"
          : "bg-[#ffffff] text-[#000000] photoservicedetailborderandshado"
      }`}
    >
      {/* Website */}
      <div className="w-full flex justify-between items-center cursor-pointer">
        <div className="text-[16px] font-normal items-start font-poppins ">
           {getTranslation(
            "Visit Website",
            "Visit Website"
          )}
        </div>
        {/* Export icon with link */}
        <a href={websitelink} target="_blank" rel="noreferrer">
          <Image src={exorticon} alt="export" className="h-[20px] w-[20px] " />
        </a>
      </div>

      {/* Email */}
      <div className="w-full flex justify-between items-center cursor-pointer">
        <div className="text-[16px] font-normal  items-start font-poppins ">
             {getTranslation(
            "Email on",
            "Email on"
          )}
        </div>
        <h5 className="text-[#226FE4] font-poppins text-[16px] font-medium">
          {/* Email link */}
          <a href={`mailto:${vendorEmail}`}>{vendorEmail}</a>
        </h5>
      </div>
    </div>
  );
}

export default Websiteurl;
