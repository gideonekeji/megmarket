"use client";
import React, { useEffect, useState } from "react";
import "./businesscss.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTotalPercentage } from "@/app/storeApp/api/useTotalPercentage";
import { useAppSelector } from "@/app/hooks/hooks";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import useTranslation from "@/app/hooks/useTranslation";
import Link from "next/link";

function MybusinessLable() {
  const router = useRouter();
  const { getTranslation } = useTranslation();

  const dispatch = useDispatch();

  const vendor_id = Cookies.get("user_id");

  const { data, refetch } = useTotalPercentage(vendor_id);

  console.log(" my total percentage data", data);

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const totalPercentage = data?.percentage;

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my dark mode121212121@", isDarkMode);


  const serviceNameCookie = Cookies.get("servicename1");
  const serviceName = serviceNameCookie ? decodeURIComponent(serviceNameCookie) : "";
  console.log("Decoded Service Name: monu", serviceName);


  const name = decodeURIComponent(Cookies.get("servicename1") || "");
  const is_store = Cookies.get("is_store");
  const subscriber_user = Cookies.get("subscriber_user");
  const expire_status = Cookies.get("expire_status");
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleCardClick = async () => {
    if (expire_status === "1") {
      dispatch(showModal("PlaceExpireModal"));
      return;
    }

    if (subscriber_user === "0") {
      dispatch(showModal("CheackStoreAdd"));
      dispatch(hideModal("CheackStoreandPlaneModal"));
      return;
    }

    if (subscriber_user === "1" && is_store === "0") {
      dispatch(showModal("CheackStoreandPlaneModal"));
      return;
    }

    setIsBtnLoading(true);

    // Navigate after all conditions are passed
    router.push(`/bussines/bussinestools/${serviceName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  
  return (
    <>
      <div
        className={`mx-auto 2xl:w-[68%]  w-[90%]     rounded-xl xl:rounded-3xl gap-6  justify-items-center py-[28px] px-6 md:px-16 grid  grid-cols-1  md:grid-cols-2  items-center    ${isDarkMode ? "bg-[#2F2F2F] text-[#ffffff]" : " bg-white businesslable"
          } `}
      >
        {/* left side circle with text */}
        <div className="  flex  w-full  justify-start items-center gap-5">
          <div className="relative flex justify-center items-center">

            <div className="relative w-[6.5rem] h-[6.5rem]">
              <svg className="w-full h-full transform rotate-[-70deg] " viewBox="0 0 100 100">
                <circle
                  className="text-[#00ae5d1f]"
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-[#00ae5d]"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="transparent"
                  r="45"
                  cx="50"
                  cy="50"
                  strokeDasharray="282.6"
                  strokeDashoffset={282.6 - (282.6 * (totalPercentage || 0)) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#00AE5D] font-medium text-lg font-poppins">
                  {totalPercentage || 0}%
                </p>
              </div>
            </div>

          </div>
          {/* content  */}
          <div className=" flex gap-3 flex-col">
            <p
              className={`  font-poppins  text-lg  font-semibold    xl:text-H6   ${isDarkMode
                ? "text-[#ffffff]  font-medium"
                : "text-[#000000]  font-medium"
                } `}
            >
              {getTranslation(
                "Increase Business Profile Score",
                "Increase Business Profile Score"
              )}
            </p>
            <p className=" text-[#B4B4B4]   font-poppins    xl:text-T3">
              {" "}
              {getTranslation(
                "Reach out to more Customers",
                "Reach out to more Customers"
              )}
            </p>
          </div>
        </div>
        {/*  right side btn  */}
        <div
          className="  w-full   flex justify-center items-center md:justify-end  md:items-end "
          onClick={handleCardClick}
        >
          <button
            className="py-3 w-[221px] text-white rounded-lg  font-medium   font-poppins  bg-light-button-base flex items-center justify-center gap-2"
            disabled={isBtnLoading}
          >
            {isBtnLoading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              getTranslation("Increase Score", "Increase Score")
            )}
          </button>

        </div>
      </div>

    </>
  );
}

export default MybusinessLable;
