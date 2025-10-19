"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { usePathname } from "next/navigation";
import React from "react";

function BusinessHoursDetail() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const { getTranslation } = useTranslation();


  const lastSegment = decodeString(lastSegment1);
  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);

  // Ensure the response data exists and then split open and closed days into arrays
  const openDays = (data?.serviceDetail?.open_days || [])
    .flat()
    .join(",")
    .split(",")
    .map((day) => day.trim()); // Ensure we split and trim spaces
  const closedDays = (data?.serviceDetail?.closed_days || [])
    .flat()
    .join(",")
    .split(",")
    .map((day) => day.trim()); // Ensure we split and trim spaces

  console.log("My open days and closed days", openDays, closedDays);

  const opnetime = data?.serviceDetail.open_time;
  const closetime = data?.serviceDetail.close_time;

  const daysOfWeek = [
    { day: "Mon", label: "Monday" },
    { day: "Tue", label: "Tuesday" },
    { day: "Wed", label: "Wednesday" },
    { day: "Thu", label: "Thursday" },
    { day: "Fri", label: "Friday" },
    { day: "Sat", label: "Saturday" },
    { day: "Sun", label: "Sunday" },
  ];

  // Function to get the status of a specific day
  const getDayStatus = (day, close) => {
    if (openDays.includes(day, close)) return `${opnetime} - ${closetime}`;
    if (closedDays.includes(day)) return "Closed";
    return "Closed"; // Default to closed if the day is not listed
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`p-4 rounded-lg      ${
        isDarkMode
          ? "text-[#ffffff]    bg-[#2F2F2F]"
          : "text-[#3E5155] bg-white photoservicedetailborderandshado"
      } `}
    >
      {/* Heading */}
      <div className="text-lg font-medium font-poppins  mb-4">
           {getTranslation(
            "Business Hours",
            "Business Hours"
          )}
      </div>

      {/* Loop through each day of the week */}
      <div className="w-full flex flex-col gap-4">
        {daysOfWeek.map((item) => {
          const status = getDayStatus(item.day);
          return (
            <div
              key={item.day}
              className="w-full justify-between flex items-center"
            >
              <div
                className={`text-sm font-medium font-poppins  ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#000000] "
                }`}
              >
                {item.label}
              </div>
              <div
                className={`text-sm font-medium font-poppins ${
                  status === "Closed"
                    ? "text-[#FF0000]"
                    : isDarkMode
                    ? "text-[#FFFFFF]" // White text for dark mode
                    : "text-[#000000]" // Black text for light mode
                }`}
              >
                {status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BusinessHoursDetail;
