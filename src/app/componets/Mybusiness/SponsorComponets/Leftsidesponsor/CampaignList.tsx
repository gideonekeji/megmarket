import React, { useState } from "react";
import "./Sponsorleftside.css"; // Keep for custom styles if needed
import { useGetAllCompain } from "@/app/storeApp/api/useGetAllCompain";
import { useDispatch } from "react-redux";
import { setSponsorLocation } from "@/app/storeApp/Slice/sponsorLocation";
import { setCampaignName } from "@/app/storeApp/Slice/campaignSlice";

function CampaignList() {
  // State to keep track of the selected campaign
  const [selectedCampaign, setSelectedCampaign] = useState("");

  const dispatch = useDispatch();

  // Function to handle radio button change
  const handleCampaignChange = (campaignName, lat, lon, address) => {
    setSelectedCampaign(campaignName);

    console.log(" my  lat long values ", lat, lon, address);

    // Dispatch the action to update the Redux store with the selected campaign data (address and latLng)
    dispatch(
      setSponsorLocation({
        address: address,
        latLng: { lat: lat, lng: lon },
      })
    );

    dispatch(setCampaignName(campaignName)); // Pass the campaign name as the payload
  };

  // Fetch campaign data
  const { data } = useGetAllCompain();

  return (
    <div className="w-full flex flex-col gap-5">
      {data && data.campaignData && data.campaignData.length > 0 ? (
        data.campaignData.map((campaign) => (
          <div
            key={campaign.id}
            className={`bordercolornewCampain    p-4 rounded-lg cursor-pointer gap-2 flex justify-between items-center  ${
              selectedCampaign === campaign.campaign_name
                ? "bordercolornewCampain"
                : "bordercolornewCampain12"
            }`}
            onClick={() =>
              handleCampaignChange(
                campaign.campaign_name,
                campaign.lat,
                campaign.lon,
                campaign.address
              )
            } // Handle click anywhere on the div
          >
            {/* Left side radio button and text */}
            <div className="flex items-center gap-2 w-full  ">
              <input
                type="radio"
                name="campaign"
                id={`campaign${campaign.id}`}
                value={campaign.campaign_name}
                checked={selectedCampaign === campaign.campaign_name}
                onChange={() =>
                  handleCampaignChange(
                    campaign.campaign_name,
                    campaign.lat,
                    campaign.lon,
                    campaign.address
                  )
                } // Ensure radio button updates correctly
                className={`w-5 h-5 border-2 rounded-full transition-all cursor-pointer duration-300 
                  ${
                    selectedCampaign === campaign.campaign_name
                      ? "bg-black border-black"
                      : "!border-red-500"
                  } 
                  focus:outline-none`}
              />
              <label
                htmlFor={`campaign${campaign.id}`}
                className="font-poppins text-[16px]  pl-4 dark:text-dark-darkcolor font-medium"
              >
                {campaign.campaign_name}
              </label>
            </div>

            {/* Right side */}
            <div className=" w-full">
              <p className="font-poppins text-[#4A4A4A] dark:text-dark-darkcolor line-clamp-1">
                {campaign.address} 
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>No campaigns available</p>
      )}
    </div>
  );
}

export default CampaignList;
