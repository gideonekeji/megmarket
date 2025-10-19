"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect, useState } from "react";
import SponsorLableicon from "../../../../../public/assets/Image/Sponsor.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetAllCompain } from "@/app/storeApp/api/useGetAllCompain";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import useTranslation from "@/app/hooks/useTranslation";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { toast } from "react-toastify";

function SponsorLable() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const router = useRouter();
  const { getTranslation } = useTranslation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false); // <-- loading state added

  const sponcer_id = Cookies.get("businesspaymentsuccess");
  const { data } = useGetAllCompain();
  const is_store = Cookies.get("is_store");
  const Demo = Cookies.get("demoUser") === "true";
  const subscriber_user = Cookies.get("subscriber_user");

  const handleCardClick = () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    setLoading(true); // start loading

    if (Number(subscriber_user) === 0) {
      dispatch(showModal("CheackStoreAdd"));
      dispatch(hideModal("CheackStoreandPlaneModal"));
      setLoading(false); // stop loading immediately if modal opens
    } else if (Number(subscriber_user) === 1 && Number(is_store) === 0) {
      dispatch(showModal("CheackStoreandPlaneModal"));
      setLoading(false);
    } else {
      router.push(`/bussines/sponsor`);
      // No setLoading(false) here so loading stays until page changes
    }
  };

  const user_id = Cookies.get("user_id");
  const [triggerUpdateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id }).then((response) => {
        if (response?.data) {
          Cookies.set("is_store", response.data?.is_store);
          Cookies.set("store_approval", response.data?.store_approval);
          Cookies.set("service_id", response.data?.service_id);
          Cookies.set("subscriber_user", response.data?.subscriber_user);
          Cookies.set("sponcer_id", response.data.campaign);
          Cookies.set("email", response.data.userdetails.email);
          Cookies.set("mobile", response.data.userdetails.mobile);
          Cookies.set("ispaymentsuccess", response.data.sponser);
          Cookies.set("start_date", response.data.start_date);
          Cookies.set("end_date", response.data.end_date);
          Cookies.set("expire_status", response.data.expire_status);
          Cookies.set(
            "fullname",
            `${response.data.userdetails.first_name} ${response.data.userdetails.last_name}`
          );
          Cookies.set(
            "plane_name",
            response.data.subscriptionDetails.plan_name
          );
          Cookies.set(
            "plane_name",
            response.data?.subscriptionDetails.plan_name.split(" ")[0]
          );
          Cookies.set(
            "subscription_id",
            response.data.subscriptionDetails.subscription_id
          );
        }
      });
    }
  }, [user_id, triggerUpdateProfile]);

  const ispaymentsuccess = Cookies.get("ispaymentsuccess");
  const startdate = Cookies.get("start_date");
  const enddate = Cookies.get("end_date");

  return (
    <div
      className={`mx-auto 2xl:w-[68%] w-[90%]  rounded-xl xl:rounded-3xl gap-6 py-[1rem] px-6 md:px-16 ${
        isDarkMode ? "bg-[#2F2F2F] text-[#ffffff]" : "bg-white businesslable"
      }`}
    >
      <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center h-auto">
        {/* Left side */}
        <div className="w-full flex gap-2">
          <h4
            className={`font-poppins text-xl  font-semibold xl:text-H6 ${
              isDarkMode ? "text-[#ffffff]" : "text-[#212121]"
            }`}
          >
            {getTranslation("Grow Your", "Grow Your")}
            <span className="text-[#FF5249] pl-2">
              {getTranslation("Business By Boosting", "Business By Boosting")}
            </span>
          </h4>
          <div>
            <Image
              src={SponsorLableicon}
              alt="Sponsor Lable"
              className="w-[25px] h-[25px] object-contain"
            />
          </div>
        </div>

        {ispaymentsuccess === "1" ? (
          <div
            className="md:w-[50%] xl:w-[60%] 2xl:w-[50%] w-full px-3 md:px-0 cursor-pointer rounded-xl py-2 bg-[#ACD4F7] flex flex-col gap-2 justify-center items-center"
            onClick={() => {
              dispatch(showModal("SponcerModalAfterAdd"));
            }}
          >
            <p className="font-poppins text-lg font-normal">
              Your Store has been sponsored
            </p>
            <p className="font-poppins text-lg font-semibold text-black">
              From: {startdate} to {enddate}
            </p>
          </div>
        ) : (
          <div
            className="w-full flex md:justify-end justify-center items-center"
            onClick={handleCardClick}
          >
            <button
              className="py-3 px-8 text-white rounded-lg font-medium font-poppins bg-light-button-base flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
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
                getTranslation("Sponsor Now", "Sponsor Now")
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SponsorLable;
