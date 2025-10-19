import React from "react";
import { useAppSelector } from "@/app/hooks/hooks";

function AudienceDetails() {
  const distanceValue = useAppSelector((state) => state.distance.distance);
  const { address } = useAppSelector((state) => state.sponsorLocation);

  return (
    <div className="w-full flex flex-col gap-6 pt-6">
      <h4 className="font-poppins text-black  dark:text-dark-darkcolor text-lg font-medium 2xl:text-[20px] 2xl:font-medium">
        Audience Details
      </h4>

      <div
        className="w-full rounded-xl gap-3 flex justify-between items-center py-6 px-6  dark:bg-[#B4B4B414] bg-white shadow-lg"
        id="Audiancedetail"
      >
        <h4 className="font-poppins dark:text-dark-darkcolor text-black text-lg font-medium">
          Locations
        </h4>
        <h3 className="text-[#226FE4] text-sm line-clamp-1 font-poppins">
          {address || "No location provided"}
        </h3>
      </div>

      <div
        className="w-full rounded-xl dark:border-none  dark:border-[#424242] flex justify-between items-center py-6 dark:bg-[#B4B4B414] px-6 bg-white shadow-lg"
        id="Audiancedetail"
      >
        <h4 className="font-poppins text-black   dark:text-dark-darkcolor text-lg font-medium">Area</h4>
        <h3 className="text-[#226FE4] text-sm font-poppins">
          {distanceValue ? `${distanceValue} kms` : "Distance not provided"}
        </h3>
      </div>
    </div>
  );
}

export default AudienceDetails;
