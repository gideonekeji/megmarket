"use client";

import React, { useEffect, useState } from "react";
import "../businesscss.css";
import tollsimage from "../../../../../public/assets/Image/businesstools.png";
import Image from "next/image";
import Arrowleftside from "../../../../../public/assets/Image/arrow-left.png";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import Cookies from "js-cookie";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import useTranslation from "@/app/hooks/useTranslation";
import { toast } from "react-toastify";
import Link from "next/link";
import leftsideimage from "../../../../../public/assets/Image/HomeScrennVectorleft.png"
import business from "../../../../../public/assets/Image/business.png"

function Businesstools() {



  //  if user id not exit then navcigate route /business





  const Demo = Cookies.get("demoUser") === "true";
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const vendor_id = Cookies.get("user_id");

  const { getTranslation } = useTranslation();

  const service_id = Cookies.get("service_id");

  const dispatch = useAppDispatch();


  const serviceNameCookie = Cookies.get("servicename1");
  const service_name = serviceNameCookie ? decodeURIComponent(serviceNameCookie) : "";
  console.log("Decoded Service Name: monu", service_name);

  // const service_name = decodeURIComponent(Cookies.get("servicename1") || "");


  console.log("Decoded Service Name:", service_name);

  const is_store = Cookies.get("is_store");
  const subscriber_user = Cookies.get("subscriber_user");
  const expire_status = Cookies.get("expire_status");
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleCardClick = () => {

    if (expire_status === "1") {
      dispatch(showModal("PlaceExpireModal"));
      return; // Stop further execution to prevent navigation
    }

    if (Number(subscriber_user) === 0) {
      dispatch(showModal("CheackStoreAdd"));
      dispatch(hideModal("CheackStoreandPlaneModal"));
      return; // Stop further execution
    }

    if (Number(subscriber_user) === 1 && Number(is_store) === 0) {
      dispatch(showModal("CheackStoreandPlaneModal"));
      return; // Prevent navigation
    }


    setIsBtnLoading(true);
    router.push(`/bussines/bussinestools/${service_name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <>


      <div className=" w-full relative">


        <div className=" absolute left-[-11.45rem] hidden xl:block ">
          <Image src={leftsideimage} alt="leftsideimage" className=" h-[25rem]  object-contain" />
        </div>

        {/* righsdei side add image  */}

        <div className=" absolute   right-[-16rem] hidden xl:block ">
          <Image src={business} alt="leftsideimage" className=" h-[25rem]  object-contain" />
        </div>


        <div
          className={`mx-auto  2xl:w-[68%]  w-[90%]   gap-5 rounded-xl xl:rounded-3xl py-6 xl:py-[2rem]  px-6 md:px-12 flex justify-between items-center cursor-pointer  ${isDarkMode
            ? "bg-[#2F2F2F] text-[#ffffff]"
            : "bg-[#ffffff] businesslable text-[#212121]"
            } `}
          onClick={handleCardClick}
        >
          {/* Left Side */}
          <div className="flex justify-start items-center gap-6">
            {/* Image */}
            <Image
              className="rounded-lg w-[6rem] h-[6rem] object-cover"
              src={tollsimage}
              alt="Tolls"
            />
            <div className=" w-full flex-col flex  gap-[14px] ">
              <h3 className="text-lg font-medium   2xl:text-H6 font-poppins">
                {" "}
                {getTranslation("Business Tools", "Business Tools")}
              </h3>
              <p className="text-[#B4B4B4] font-poppins xl:text-T3   font-normal">
                {getTranslation(
                  "Manage Offers, Reviews and more",
                  "Manage Offers, Reviews and more"
                )}
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex justify-end items-center gap-4 cursor-pointer">
            {/* Arrow left */}
            {isBtnLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-[#226FE4]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                  ></path>
                </svg>
                {getTranslation("Loading...", "Loading...")}
              </span>
            ) : (
              <Image
                className={`w-[2rem] h-[2rem] object-cover    ${isDarkMode ? "invert" : ""
                  }`}
                src={Arrowleftside}
                alt="Arrow left"
              />
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Businesstools;
