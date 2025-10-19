"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Image from "next/image";
import image12 from "../../../../../public/assets/Image/Dark analytics-bro 1.png";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { useRouter } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslation";
import Link from "next/link";
function ProfessionalDashboard() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const service_id = Cookies.get("service_id");

  const { getTranslation } = useTranslation();

  const vendor_id = Cookies.get("user_id");


  const disptach = useAppDispatch();

  const router = useRouter();

  const [isBtnLoading, setIsBtnLoading] = useState(false);



  const serviceNameCookie = Cookies.get("servicename1");
  const service_name = serviceNameCookie ? decodeURIComponent(serviceNameCookie) : "";
  console.log("Decoded Service Name: monu", service_name);

  // const service_name = decodeURIComponent(Cookies.get("servicename1") || "");

  const is_store = Cookies.get("is_store");
  const subscriber_user = Cookies.get("subscriber_user");
  const expire_status = Cookies.get("expire_status");

  const handleCardClick = () => {
    if (expire_status === "1") {
      disptach(showModal("PlaceExpireModal"));
      return; // Stop further execution to prevent navigation
    }

    if (Number(subscriber_user) === 0) {
      disptach(showModal("CheackStoreAdd"));
      disptach(hideModal("CheackStoreandPlaneModal"));
      return;
    }
    if (Number(subscriber_user) === 1 && Number(is_store) === 0) {
      disptach(showModal("CheackStoreandPlaneModal"));
      return;
    }
    setIsBtnLoading(true);
    router.push(`/bussines/ViewInsights/${service_name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  return (
    <>

      <div
        className={`mx-auto  2xl:w-[68%]  w-[90%]     cursor-pointer rounded-xl xl:rounded-3xl gap-6 py-[1.5rem]      px-6 md:px-16  ${isDarkMode
          ? "bg-[#2F2F2F] text-[#ffffff]"
          : " bg-[#E1EDFF]  sahdograpg"
          } `}
        onClick={handleCardClick}
      >
        <div className=" w-full  flex flex-col md:flex-row gap-4 justify-between items-center h-auto">
          {/* left side  */}

          <div className=" flex gap-1 md:gap-3 flex-col">
            <p
              className={`  font-poppins   text-xl xl:text-H6  ${isDarkMode
                ? "text-[#ffffff]  font-medium"
                : "text-[#000000]  font-medium"
                } `}
            >
              {getTranslation("Professional Dashboard", "Professional Dashboard")}
            </p>
            <p className=" text-[#212121]   dark:text-[#B4B4B4] font-poppins   text-lg xl:text-T3">
              {" "}
              {getTranslation(
                "Reach out to more Customers",
                "Reach out to more Customers"
              )}
            </p>
          </div>

          <div className="w-full md:w-auto justify-end items-end  flex     relative">
            <Image
              src={image12}
              className="max-w-full md:w-[250px]   mb-[-1.5rem] h-[8rem]  "
              alt="Dark analytics image"
            />

            {isBtnLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded">
                <span className="flex items-center gap-2 text-white">
                  <svg
                    className="animate-spin w-6 h-6 text-white"
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
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default ProfessionalDashboard;
