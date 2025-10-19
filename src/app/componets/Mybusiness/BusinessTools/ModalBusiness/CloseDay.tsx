"use client";

import React, { useState, useEffect } from "react";
import iconcircle from "../../../../../../public/assets/Image/bookinghourscircle.png";
import Image from "next/image";
import redicon from "../../../../../../public/assets/Image/closetimeiconred.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { useDispatch } from "react-redux";
import useTranslation from "@/app/hooks/useTranslation";

const CloseDay: React.FC = () => {
  // State to keep track of selected days
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Redux state: selected days
  const selectedDaysAll = useAppSelector(
    (state) => state.service.service.open_days
  );

  console.log("flsdkjaksda;fsdkaf!!!!", selectedDays);

  const dispatch = useDispatch();

  // Function to toggle the selection of days
  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((item) => item !== day)
        : [...prevSelectedDays, day]
    );
  };

  // Sync selectedDays with selectedDaysAll from Redux (if needed)
  useEffect(() => {
    if (selectedDays !== selectedDaysAll) {
      setSelectedDays(selectedDaysAll);
    }
  }, [selectedDaysAll]);

  // Dispatch update when selectedDays change
  useEffect(() => {
    if (selectedDays.length > 0) {
      dispatch(
        updateServiceField({
          closed_days: selectedDays,
        })
      );
    }
  }, [selectedDays, dispatch]);

  // Function to get button class depending on whether the day is selected
  const getButtonClass = (day: string): string => {
    return selectedDays.includes(day)
      ? "border-2 border-[#226FE45C] dark:text-white text-black" // Selected day button will be black with white text
      : "bg-[#226FE4] text-white"; // Unselected day button will be blue with white text
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const { getTranslation } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center   gap-y-2 ">
      {/* Label */}


      <div className="flex w-full items-start justify-start">
        <label className="font-poppins text-lg   2xl:text-B4    dark:text-dark-darkcolor font-medium text-[#000000]">
          {getTranslation("Select Days of the Week", "Select Days of the Week")}

        </label>
      </div>
      <div className=" border border-[#F0F0F0]  dark:border-[#424242]  shadow-md w-full rounded-lg p-6">

        {/* Day buttons */}
        <div className="flex w-full flex-wrap gap-4 cursor-not-allowed">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <button
              key={day}
              className={`font-poppins items-center rounded-lg  cursor-not-allowed px-8 py-2 ${getButtonClass(
                day
              )}`}
            // onClick={() => toggleDaySelection(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Info Text */}


        <div className="flex w-full items-center gap-2 pt-5">
          <div className="flex items-center justify-center">
            <Image
              src={iconcircle}
              alt="iconcircle"
              className="h-4 w-4 "
            />
          </div>
          <div>
            <p className="font-poppins text-[10px] font-normal text-[#B0B0B0] md:text-sm">
              {getTranslation("Select the multiple days you want to provide the service to the users", "Select the multiple days you want to provide the service to the users")}

            </p>
          </div>
        </div>

        {/* Time inputs */}
       

        <div className="grid w-full cursor-pointer grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          {/* close time */}
          <div className="bordercoloricon flex w-full items-center justify-between rounded-lg px-3 py-4">
            <label className="font-poppins text-sm font-medium  dark:text-dark-darkcolor text-[#000000]">
                           {getTranslation("Closed", "Closed")}

            </label>
            {/* red icon */}
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
              <Image
                src={redicon}
                alt="iconcircle"
                className="h-[50%] w-[50%] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseDay;
