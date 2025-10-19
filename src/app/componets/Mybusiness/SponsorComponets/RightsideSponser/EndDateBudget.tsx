import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import dayjs from "dayjs"; // dayjs for manipulating date
import { setEndDate } from "@/app/storeApp/Slice/EnddateSponcerSlice";

export default function EndDateBudget() {
  const dispatch = useAppDispatch();
  const startDate = useAppSelector((state) => state.startDateSponsor.startDate);

  console.log("My start date is@@ ", startDate);

  // Check if startDate is valid (not null or undefined)
  const startDateFormatted = startDate ? dayjs(startDate) : null;

  // Calculate the range for the end date selection (1 month after the start date)
  const maxEndDate = startDateFormatted
    ? startDateFormatted.add(1, "month")
    : null;

  // Handle the end date change
  const handleEndDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      // Format the date to YYYY-MM-DD
      const formattedEndDate = date.format("YYYY-MM-DD");
      // Dispatch the action to store the end date in Redux
      dispatch(setEndDate(formattedEndDate));
    }
  };

  return (
    <div className="  w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="End Date"
            minDate={startDateFormatted || undefined}
            maxDate={maxEndDate || undefined}
            disabled={!startDateFormatted}
            onChange={handleEndDateChange}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
