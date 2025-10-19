"use client"
import React, { useState, useEffect, useRef } from "react";
import "../style.css";
import iconcircle from "../../../../public/assets/Image/bookinghourscircle.png";
import Image from "next/image";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch } from "react-redux";
import {
  setSelectedDays,
  setStartTime,
  setEndTime,
} from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/businessSlice";
import dayjs from "dayjs";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

const BusinessOpeningHours: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedDays, startTime, endTime } = useAppSelector(
    (state) => state.businessHours
  );

  console.log(" my opne time ", endTime);

  // State to manage the opening/closing of the TimePickers
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const [openEndTimePicker, setOpenEndTimePicker] = useState(false);

  // Ref for the time picker elements to detect clicks outside
  const startTimePickerRef = useRef(null);
  const endTimePickerRef = useRef(null);

  // Function to toggle the selection of days
  const toggleDaySelection = (day: string) => {
    const updatedSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day];

    dispatch(setSelectedDays(updatedSelectedDays));
  };

  // Function to get button class depending on whether the day is selected
  const getButtonClass = (day: string): string => {
    return selectedDays.includes(day)
      ? "bg-[#226FE4] text-white"
      : "border-2 border-[#226FE45C] dark:text-white text-black";
  };

  // Handler for updating start time and closing the picker
  const handleStartTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      const formattedTime = value.format("hh:mm A");
      dispatch(setStartTime(formattedTime)); // Update start time in the Redux store
    } else {
      dispatch(setStartTime(null)); // Clear the start time if no time is selected
    }
    setOpenStartTimePicker(false); // Close the time picker
  };

  // Handler for updating end time and closing the picker
  const handleEndTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      const formattedTime = value.format("hh:mm A");
      dispatch(setEndTime(formattedTime)); // Update end time in the Redux store
    } else {
      dispatch(setEndTime(null)); // Clear the end time if no time is selected
    }
    setOpenEndTimePicker(false); // Close the time picker
  };

  // Close the time pickers if a click outside of them occurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startTimePickerRef.current &&
        !startTimePickerRef.current.contains(event.target)
      ) {
        setOpenStartTimePicker(false);
      }

      if (
        endTimePickerRef.current &&
        !endTimePickerRef.current.contains(event.target)
      ) {
        setOpenEndTimePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Log the selected days and times whenever they change
  useEffect(() => { }, [selectedDays, startTime, endTime]);


    const { getTranslation } = useTranslation();
  
  return (
    <div className="flex w-full flex-col items-center   gap-y-2 ">
      {/* Label */}
      <div className="flex w-full items-start justify-start">
        <label className="font-poppins text-lg   2xl:text-B4   dark:text-dark-darkcolor font-medium text-[#000000]">
          {getTranslation("Business Opening Hours", "Business Opening Hours")}

        </label>
      </div>
      <div className="  border border-[#F0F0F0] dark:border-[#424242]  shadow-md w-full rounded-lg p-6">
        {/* Day buttons */}
        <div className="flex w-full flex-wrap gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <button
              key={day}
              className={`font-poppins items-center   text-T15 rounded-lg px-8 py-[10px] ${getButtonClass(
                day
              )}`}
              onClick={() => toggleDaySelection(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Label for instructions */}
        <div className="flex w-full items-center gap-2 pt-5">
          <div className="flex items-center justify-center">
            <Image
              src={iconcircle}
              alt="iconcircle"
              className="h-4 w-4"
            />
          </div>
          <div>
              <p className="font-poppins text-[10px] font-normal text-[#B0B0B0] md:text-sm">
                           {getTranslation("Select the multiple days you want to provide the service to the users", "Select the multiple days you want to provide the service to the users")}

            </p>
          </div>
        </div>

        {/* Time inputs */}
        <div className="grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          {/* Start time */}
          <div
            className="w-full"
            ref={startTimePickerRef}
            onClick={() => setOpenStartTimePicker(true)} // Open the time picker on click
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Start Time"
                  value={startTime ? dayjs(startTime, "hh:mm A") : null}
                  onChange={handleStartTimeChange} // Handle start time change
                  open={openStartTimePicker} // Control whether the picker is open
                  onClose={() => setOpenStartTimePicker(false)} // Close the picker when the user clicks outside
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          {/* End time */}
          <div
            className="w-full"
            ref={endTimePickerRef}
            onClick={() => setOpenEndTimePicker(true)} // Open the time picker on click
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="End Time"
                  value={endTime ? dayjs(endTime, "hh:mm A") : null}
                  onChange={handleEndTimeChange} // Handle end time change
                  open={openEndTimePicker} // Control whether the picker is open
                  onClose={() => setOpenEndTimePicker(false)} // Close the picker when the user clicks outside
                  sx={{ width: "100%" }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessOpeningHours;
