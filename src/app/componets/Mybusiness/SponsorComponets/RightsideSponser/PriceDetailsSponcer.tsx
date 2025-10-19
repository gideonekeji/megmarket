import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";

function PriceDetailsSponcer() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const startdate = useAppSelector((state) => state.startDateSponsor.startDate);
  const enddate = useAppSelector((state) => state.endDateSponsor.endDate);

  // Convert both start and end date to Date objects
  const start = new Date(startdate);
  let end = new Date(enddate);

  // Check if end date is invalid or not selected
  if (isNaN(end.getTime())) {
    // Default end date to current date if not selected
    end = new Date();
  }

  // Calculate the difference in time (in milliseconds)
  const timeDifference = end - start;

  // Convert time difference from milliseconds to days
  const totalDays = Math.max(timeDifference / (1000 * 3600 * 24), 1); // Ensure minimum is 1 day

  const compainDetail = useAppSelector((state) => state.campaignGoal);

  return (
    <div
      className={`mx-auto w-full rounded-lg  flex flex-col   ${
        isDarkMode ? "bg-[#2F2F2F] text-[#ffffff]" : " bg-white "
      } `}
    >
      <div className=" w-full bordercolordailybudget rounded-xl p-4">
        <div className=" w-full flex   justify-start items-center">
          <h3 className=" text-lg font-medium font-poppins ">Price Details</h3>
        </div>

        <div className=" w-full flex gap-4 pt-4 flex-col">
          <div className=" w-full flex justify-between items-center ">
            <div className=" text-black   font-poppins text-sm">
              Selected Ad Days
            </div>
            <div className=" text-black   font-poppins text-sm">
              {compainDetail.totalDays} 
            </div>
          </div>
          <div className=" w-full flex justify-between items-center ">
            <div className=" text-black   font-poppins text-sm">Price</div>
            <div className=" text-black   font-poppins text-sm">
              {compainDetail.price}
            </div>
          </div>
          <div className=" w-full flex justify-between items-center ">
            <div className=" text-black   font-poppins text-sm">Tax/GST</div>
            <div className=" text-black   font-poppins text-sm">$20</div>
          </div>

          <div className=" w-full flex justify-between items-center ">
            <div className=" text-black   font-poppins text-sm">
              Platform Charges
            </div>
            <div className=" text-black   font-poppins text-sm">$2</div>
          </div>
          <hr />
          <div className=" w-full flex justify-between items-center ">
            <div className=" text-black   font-poppins text-[16px]  font-medium">
              Total Amount
            </div>
            <div className=" text-black   font-poppins text-[16px] font-medium">
              {compainDetail.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceDetailsSponcer;
