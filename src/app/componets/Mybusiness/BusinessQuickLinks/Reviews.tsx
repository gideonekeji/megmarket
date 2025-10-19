"use client";

import React from "react";
import addprofile from "../../../../../public/assets/Image/businesssreview.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import useTranslation from "@/app/hooks/useTranslation";
import { toast } from "react-toastify";

function Reviews() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  const { getTranslation } = useTranslation();
 const Demo = Cookies.get("demoUser") === "true";

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const subscriber_user = Cookies.get("subscriber_user");

  const is_store = Cookies.get("is_store");

  const expire_status = Cookies.get("expire_status");

  const handalmodalopne = () => {
    // if (Demo) {
    //   toast.error("This action is disabled in the demo version.");
    //   return;
    // }
    if (expire_status === "1") {
      dispatch(showModal("PlaceExpireModal"));
      return; // Stop further execution to prevent navigation
    }

    if (subscriber_user === "0") {
      dispatch(showModal("CheackStoreAdd"));
      dispatch(hideModal("BusinessRebiewListModal"));
      return;
    }

    if (subscriber_user === "1" && is_store === "0") {
      dispatch(showModal("CheackStoreandPlaneModal"));
      dispatch(hideModal("CheackStoreAdd"));
      return;
    }

    if (expire_status === "0" && subscriber_user === "1" && is_store === "1") {
      dispatch(showModal("BusinessRebiewListModal"));
    }

    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id }); // API call on button click
    }
  };
  return (
    <div
      className="  flex  flex-col gap-2 cursor-pointer "
      onClick={handalmodalopne}
    >
      <div className=" w-[6rem]  h-[6rem] rounded-lg  flex justify-center items-center  bg-[#B5E2FF]  ">
        <Image
          src={addprofile}
          alt="edit profile"
          className="w-[50%] h-[50%] object-cover rounded-lg"
        />
      </div>
      {/*  lable  */}
     <div
        className={`flex flex-col  items-center  gap-1  font-poppins pt-2   text-[14px] font-medium    2xl:text-B2  ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        } `}
      >
        <p> {getTranslation("Reviews", "Reviews")} </p>
      </div>
    </div>
  );
}

export default Reviews;
