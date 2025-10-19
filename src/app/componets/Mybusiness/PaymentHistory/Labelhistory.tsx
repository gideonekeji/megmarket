"use client";

import React, { useState } from "react";
import "../businesscss.css";
import tollsimage from "../../../../../public/assets/Image/payment.png";
import Image from "next/image";
import Arrowleftside from "../../../../../public/assets/Image/arrow-left.png";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import useTranslation from "@/app/hooks/useTranslation";

function Labelhistory() {
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();


  const serviceNameCookie = Cookies.get("servicename1");
  const service_name = serviceNameCookie ? decodeURIComponent(serviceNameCookie) : "";
  console.log("Decoded Service Name: monu", service_name);

  // const service_name = decodeURIComponent(Cookies.get("servicename1") || "");
  const is_store = Cookies.get("is_store");

  const disptach = useAppDispatch();
  const expire_status = Cookies.get("expire_status");

  const subscriber_user = Cookies.get("subscriber_user");
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleCardClick = () => {
    // Show loading immediately
    setIsBtnLoading(true);

    if (expire_status === "1") {
      disptach(showModal("PlaceExpireModal"));
      setIsBtnLoading(false);
      return;
    }

    if (Number(subscriber_user) === 0) {
      disptach(showModal("CheackStoreAdd"));
      disptach(hideModal("CheackStoreandPlaneModal"));
      setIsBtnLoading(false);
      return;
    }

    if (Number(subscriber_user) === 1 && Number(is_store) === 0) {
      disptach(showModal("CheackStoreandPlaneModal"));
      setIsBtnLoading(false);
      return;
    }

    // Add a slight delay so spinner is visible before redirect
    setTimeout(() => {
      router.push(
        `/bussines/paymenthistory/${service_name
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      );
    }, 300);
  };


  return (
    <>
      <div
        className={`mx-auto  2xl:w-[68%]  w-[90%]   gap-5 rounded-xl xl:rounded-3xl py-6 xl:py-[2rem] px-6 md:px-12 flex justify-between items-center cursor-pointer  ${isDarkMode
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
          <div className=" w-full flex-col flex  gap-[14px]">
            <h3 className="text-lg font-medium  2xl:text-H6 font-poppins">
              {" "}
              {getTranslation("Payment History", "Payment History")}
            </h3>
            <p className="text-[#B4B4B4]   font-poppins xl:text-T3 font-normal">
              {getTranslation(
                "See all the sponsored payment history",
                "See all the sponsored payment history"
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
    </>
  );
}

export default Labelhistory;
