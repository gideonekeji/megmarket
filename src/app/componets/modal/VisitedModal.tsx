"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // For handling cookies
import locationicon from "../../../../public/assets/Image/locationcontact.png";
import Image from "next/image";
import "./style.css";
import { MdMyLocation } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showModal, hideModal } from "@/app/storeApp/Slice/modalSlice";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";

const VisitedModal = () => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const locationExited = sessionStorage.getItem("locationexited");

  console.log("my location !!!", locationExited);

  useEffect(() => {
    // Check if the location has exited and set visibility accordingly
    const locationExited = sessionStorage.getItem("locationexited");

    if (locationExited === "true") {
      setIsVisible(false); // Hide modal if location is already exited
      dispatch(hideModal("SelectLocationVisite")); // Close modal if already exited
    } else {
      setIsVisible(true); // Show modal if location has not been exited
    }
  }, [dispatch, locationExited]);

  // Check the cookie on initial load to control visibility
  useEffect(() => {
    const hasVisited = Cookies.get("hasVisited");
  
    if (hasVisited === "true") {
      setIsVisible(false); // Hide modal if the cookie is already set
    }
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    dispatch(hideModal("SelectLocationVisite"));
    
    // Set cookie when the user closes the modal
    Cookies.set("hasVisited", "true", { expires: 365 });
  };
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-[#1D2537] mt-12 ml-12 p-6 isvistedvbordercolor rounded-lg shadow-lg w-[27%]">
        {/* Location Icon and Description */}
        <div className="w-full flex gap-2">
          <div className="h-5 w-5 flex justify-center items-center">
            <Image
              src={locationicon}
              alt="Location icon"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="line-clamp-1 text-white font-poppins">
              We Need Your Location to Enhance Your Experience.
            </p>
          </div>
        </div>

        {/* Current location input box and manual location */}
        <div className="w-full flex mt-5 justify-between items-center space-x-4">
          {/* Button 1 - Use Current Location */}
          <div
            className="relative mt-2 flex items-center bg-transparent group py-3 cursor-pointer hover:bg-[#5465ff] rounded-lg border border-[#5465ff]"
            onClick={handleClose}
          >
            <span className="absolute flex h-[3rem] w-[3rem] items-center group-hover:text-white justify-center rounded-full">
              <MdMyLocation className="text-[#5465ff] text-lg group-hover:text-white" />
            </span>
            <button className="font-poppins w-full rounded-md text-[#5465ff] group-hover:text-white bg-transparent pr-3 pl-[3rem] placeholder-[#5465ff] focus:border-[#5465ff] focus:outline-none focus:ring-[#5465ff]">
              Use Current Location
            </button>
          </div>

          <div className="text-white font-poppins text-lg">OR</div>

          {/* Button 2 - Select Location Manually */}
          <div
            className="flex justify-center items-center mt-2"
            onClick={() => dispatch(showModal("SelectLocationVisite"))}
          >
            <button
              type="button"
              className="px-6 py-3 bg-[#5465ff] font-poppins text-white rounded-lg font-medium transition duration-300"
            >
              Select Manually
            </button>
          </div>
        </div>
      </div>
      <div className="hidden">
        <Currentlocation />
      </div>
    </div>
  );
};

export default VisitedModal;
