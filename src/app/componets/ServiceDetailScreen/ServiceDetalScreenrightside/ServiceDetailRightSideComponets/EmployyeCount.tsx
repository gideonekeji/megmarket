"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { HiOutlineUsers } from "react-icons/hi";
import profiletwo from "../../../../../../public/assets/Image/profile-2user.png";
import Image from "next/image";
import useTranslation from "@/app/hooks/useTranslation";

function EmployyeCount() {
  const pathname = usePathname();
  const lastSegment = decodeString(
    pathname.split("/").filter(Boolean).pop() || ""
  );

  const { getTranslation } = useTranslation();
  // Store service ID in cookies
  useEffect(() => {
    Cookies.set("detail_id", lastSegment);
  }, [lastSegment]);

  // Fetch service details
  const { data, error, isLoading } = useServiceDetailApi(lastSegment);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const count = data?.serviceDetail.employee_strength;

  console.log(" my addddddddddddddddddddd333333333333333333333333", count);

  if (!count) {
    return null;
  }





  return (
    <div
      className={` px-3 py-2 rounded-lg shadow-md border transition-all duration-300 ${isDarkMode ? "bg-[#2F2F2F] border-gray-700" : "bg-white bordercolo"
        }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        {/* Icon */}
        <div className="bg-transparent text-black p-3 rounded-full">
          <Image
            src={profiletwo}
            alt="icon"
            width={25}
            height={25}
            className={`${isDarkMode ? "bg-circle-icon" : ""}`}
          />
        </div>


        {/* Text */}
        {isLoading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">Error fetching data</p>
        ) : (
          <p
            className={`text-lg font-medium font-poppins ${isDarkMode ? "text-white" : "text-gray-700"
              }`}
          >
            {getTranslation(
              "Number of Employees:",
              "Number of Employees:"
            )}
            {data?.serviceDetail?.employee_strength || "N/A"}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmployyeCount;
