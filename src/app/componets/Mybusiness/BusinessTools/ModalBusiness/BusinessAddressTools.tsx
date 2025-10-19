"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/myaddress.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import useTranslation from "@/app/hooks/useTranslation";

function BusinessAddressTools() {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();
    const { getTranslation } = useTranslation();



  useEffect(() => {
    if (vendor_id && service_id) {
      // Make sure both vendor_id and service_id are available before calling the mutation
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  console.log(
    " my api responce  values from add ress modal ",
    data?.service.address
  );

  useEffect(() => {
    localStorage.setItem("locationupdate", data?.service.address || "");
    Cookies.set("lat", data?.service.lat || "");
    Cookies.set("lon", data?.service.lon || "");
  }, [data]);

  const [storevalues, setStoreValues] = useState<string | null>(
    localStorage.getItem("locationupdate")
  );

  // Effect to update storevalues every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStoreValues(localStorage.getItem("locationupdate"));
    }, 1000); // Update every 5 seconds

    // Clean up the interval when component is unmounted or updated
    return () => clearInterval(interval);
  }, []);

  return (
    <div
        className={`w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? " bg-dark-Modalbgcolortop text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("CompleteBusinessModal"));
      }}
    >
      <div className="flex gap-3 items-center">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl  font-poppins"> {getTranslation("Business Address", "Business Address ")}</div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#B4B4B4] font-normal    font-poppins text-[18px]">
          {storevalues}
        </p>

        <div className="h-[2rem] w-[2rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-cover ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessAddressTools;
