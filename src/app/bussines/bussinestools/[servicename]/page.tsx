"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import dynamic from "next/dynamic";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";

// ✅ removed individual loaders
const MybusinessToolsBreadCome = dynamic(
  () => import("@/app/componets/AllBreadCome/MybusinessToolsBreadCome")
);
const BusinessNameMyBusiness = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/BusinessNameMyBusiness")
);
const BusinessAddressTools = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessAddressTools")
);
const BusinessImages = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessImages")
);
const BusinessTimings = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessTimings")
);
const BusinessVideo = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessVideo")
);
const BusinessWebsite = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessWebsite")
);
const ContactDetails = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/ContactDetails")
);
const FollowSocialMedia = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/FollowSocialMedia")
);
const NumberofEmployees = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/NumberofEmployees")
);
const YearEstablishment = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/YearEstablishment")
);
const BusinesscategoriesModal = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinesscategoriesModal")
);

function BusinessTools() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // dark mode persistence
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  // if user not logged in
  useEffect(() => {
    if (!vendor_id) {
      dispatch(showModal("loginModal"));
    }
  }, [vendor_id, dispatch]);

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  // API trigger
  useEffect(() => {
    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  // ✅ one global loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full dark:bg-dark-background">
        <AvatarWithSpinner />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-auto flex flex-col gap-6 ${isDarkMode ? "bg-[#181818]" : "bg-white text-black"
        }`}
    >
      {/* header */}
      <div className="w-full h-auto">
        <MybusinessToolsBreadCome />
      </div>

      <div className="mx-auto 2xl:w-[68%]  w-[90%]  overflow-hidden md:overflow-visible flex-col gap-6 mt-[1rem] md:mt-[3rem] flex justify-between items-center">
        <BusinessNameMyBusiness />
        <ContactDetails />
        <BusinessAddressTools />
        <BusinessTimings />
        <YearEstablishment />
        <BusinesscategoriesModal />
        <NumberofEmployees />
        <BusinessImages />
        <BusinessWebsite />
        <FollowSocialMedia />
        <BusinessVideo />
      </div>

      <ToastContainer />
    </div>
  );
}

export default BusinessTools;
