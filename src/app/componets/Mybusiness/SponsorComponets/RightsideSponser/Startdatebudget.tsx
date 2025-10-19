import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs"; // Import dayjs for formatting
import { setStartDate } from "@/app/storeApp/Slice/startdatesponcerslice";

export default function Startdatebudget() {
  const dispatch = useDispatch();
  const startDate = useSelector((state) => state.startDateSponsor.startDate); // Get current start date from store

  const handleDateChange = (date) => {
    if (date) {
      // Format the date as 'YYYY-MM-DD' before saving it to the Redux store
      const formattedDate = date.format("YYYY-MM-DD");
      dispatch(setStartDate(formattedDate)); // Dispatch the formatted date to the store
    }
  };

  console.log(" my selecteed date", startDate);

  return (
    <div className="  w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Start Date"
            value={startDate ? dayjs(startDate) : null} // Ensure startDate is a valid dayjs object
            onChange={handleDateChange} // Update the store when the date changes
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
