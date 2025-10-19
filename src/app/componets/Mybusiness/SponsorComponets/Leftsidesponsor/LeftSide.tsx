import { useAppSelector } from "@/app/hooks/hooks";
import React, { useState, useEffect } from "react";
import "./Sponsorleftside.css";
import { MdExpandLess } from "react-icons/md";
import CompaineName from "./CompaineName";
import GoogleMapInputBoxSponser from "./GoogleMapInputBoxSponser";
import AudienceDetails from "./AudienceDetails";
import NewCampaign from "./NewCampaign";
import Cookies from "js-cookie";
import {
  addServiceImage,
  updateServiceField,
} from "@/app/storeApp/Slice/serviceSlice";
import { useDispatch } from "react-redux";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";

function LeftSide() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const sponcer_id = Cookies.get("sponcer_id");

  const [isFormVisible, setFormVisible] = useState(true);

  // Handle button click to toggle the form visibility, but only if no sponcer_id exists
  const handleAddCampaignClick = () => {
    setFormVisible(!isFormVisible);
  };

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  // Handle the different states of the API call
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }

    if (error) {
      console.error("Error fetching service:", error);
    }

    if (data) {
      console.log("API Response:@@!!", data);

      dispatch(updateServiceField(data.service));
      dispatch(addServiceImage(data.service_images));
    }
  }, [data, isLoading, error]);

  return (
    <div
      className={`w-full rounded-lg flex flex-col gap-6  `}
    >
      {sponcer_id === "1" && (
        <div className="w-full flex flex-col gap-6">
          <NewCampaign />
          <div className="w-full px-5 justify-center items-center flex gap-3">
            <div className="w-[45%] h-[3px]    bg-light-button-base "></div>
            <div className="w-[10%] flex justify-center font-medium items-center text-light-button-base font-poppins">
              OR
            </div>
            <div className="w-[45%] h-[3px] bg-light-button-base"></div>
          </div>
        </div>
      )}

      <div className="w-full businesslable  dark:border-none dark:bg-[#2F2F2F]   rounded-2xl ">
        {/* Button */}
        <div
          className="w-full leftsidesponsor dark:rounded-xl rounded-t-lg cursor-pointer bg-[#226FE40F] flex justify-between  px-10  2xl:px-[3rem]  py-4"
          onClick={handleAddCampaignClick}
        >
          <p className="font-poppins text-lg  dark:text-dark-darkcolor   2xl:text-[20px] 2xl:font-medium font-normal">Add New Campaign</p>
          <MdExpandLess
            className={`text-3xl dark:text-dark-darkcolor  ${isFormVisible ? " rotate-180" : ""}`}
          />
        </div>

        {/* When clicked on the button, show this section */}
        {isFormVisible && (
          <div className="w-full flex flex-col gap-4 h-auto py-4   px-10  2xl:px-[3rem]">
            <CompaineName />
            <GoogleMapInputBoxSponser />
            <AudienceDetails />
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftSide;
