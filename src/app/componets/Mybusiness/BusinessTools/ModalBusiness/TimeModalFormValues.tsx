"use client"
import React, { useState, useEffect, useRef } from "react";
import iconcircle from "../../../../../../public/assets/Image/bookinghourscircle.png";
import Image from "next/image";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import useTranslation from "@/app/hooks/useTranslation";

const TimeModalFormValues: React.FC = () => {
  // Get the data from the Redux store
  const storevalues = useAppSelector((state) => state.service.service);

  // State to manage selected days, start time, and end time locally
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  console.log("fsdjfkosklsdjf###################", storevalues);

  const dispatch = useDispatch();

  // Use effect to set default values based on store data
  useEffect(() => {
    // Set the selected days based on the store's open_days value
    if (storevalues?.open_days) {
      const daysArray = storevalues.open_days.split(",");
      setSelectedDays(daysArray.map((day) => day.trim()));
    }

    // Set the start and end times based on store values
    if (storevalues?.open_time) {
      setStartTime(storevalues.open_time); // Set start time from store
    }

    if (storevalues?.close_time) {
      setEndTime(storevalues.close_time); // Set end time from store
    }
  }, [storevalues]);

  // Function to toggle the selection of days
  const toggleDaySelection = (day: string) => {
    const updatedSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedSelectedDays);

    // Update open_days in the Redux store
    dispatch(updateServiceField({ open_days: updatedSelectedDays.join(", ") }));
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
      setStartTime(formattedTime); // Update start time locally
      // Update open_time in Redux store
      dispatch(updateServiceField({ open_time: formattedTime }));
    } else {
      setStartTime(null); // Clear the start time if no time is selected
    }
  };

  // Handler for updating end time and closing the picker
  const handleEndTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      const formattedTime = value.format("hh:mm A");
      setEndTime(formattedTime); // Update end time locally
      // Update close_time in Redux store
      dispatch(updateServiceField({ close_time: formattedTime }));
    } else {
      setEndTime(null); // Clear the end time if no time is selected
    }
  };

  // Ref for the time picker elements to detect clicks outside
  const startTimePickerRef = useRef(null);
  const endTimePickerRef = useRef(null);

  // Close the time pickers if a click outside of them occurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startTimePickerRef.current &&
        !startTimePickerRef.current.contains(event.target)
      ) {
        // setOpenStartTimePicker(false);
      }

      if (
        endTimePickerRef.current &&
        !endTimePickerRef.current.contains(event.target)
      ) {
        // setOpenEndTimePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const { getTranslation } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center   gap-y-2 ">
      <div className="flex w-full items-start justify-start">
        <label
          className={`font-poppins text-lg font-medium   ${isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
            }`}
        >
        </label>
      </div>

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
              className={`font-poppins items-center rounded-lg px-8 py-2 ${getButtonClass(
                day
              )}`}
              onClick={() => toggleDaySelection(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Instructions */}


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
          // onClick={() => setOpenStartTimePicker(true)} // Open the time picker on click
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Start Time"
                  value={startTime ? dayjs(startTime, "hh:mm A") : null}
                  onChange={handleStartTimeChange} // Handle start time change
                  sx={{
                    width: "100%",
                  }}

                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          {/* End time */}
          <div
            className="w-full"
            ref={endTimePickerRef}
          // onClick={() => setOpenEndTimePicker(true)} // Open the time picker on click
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="End Time"
                  value={endTime ? dayjs(endTime, "hh:mm A") : null}
                  onChange={handleEndTimeChange} // Handle end time change
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

export default TimeModalFormValues;
