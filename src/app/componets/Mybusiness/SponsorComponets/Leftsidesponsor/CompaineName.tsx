import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { setCampaignName } from "@/app/storeApp/Slice/campaignSlice";
import { TextField } from "@mui/material";
import React from "react";

function CompaineName() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const campaignName = useAppSelector((state) => state.campaign.campaignName);

  // Handle input change
  const handleInputChange = (event) => {
    dispatch(setCampaignName(event.target.value)); // Dispatch action to update store
  };

  return (
    <div className="w-full relative gap-2 flex flex-col">
      {/* Label */}
      <label className="text-sm font-medium font-poppins  2xl:text-B4 dark:text-dark-darkcolor text-black">
        Campaign Name <span className="text-[#FF0000] font-poppins">*</span>
      </label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={campaignName}
        onChange={handleInputChange}
        className={`font-poppins w-full rounded-[10px] py-[14px] pl-4  placeholder:text-sm placeholder:font-normal dark:text-dark-darkcolor placeholder-[#B4B4B4]  dark:bg-dark-bginput   focus:border-light-bordercolo-focusbordercolo focus:outline-none focus:ring-[#226FE480]  border dark:border-dark-bordercolorinput  border-light-bordercolo-maincolor`}
        placeholder="Enter campaign title"
      />
    </div>
  );
}

export default CompaineName;
