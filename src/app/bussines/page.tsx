"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import { useUpdateServiceMutation } from "../storeApp/api/updateServiceApi";
import Cookies from "js-cookie";
import AvatarWithSpinner from "../componets/Loading/AvatarWithSpinner";
import { useGetUserDetail } from "../storeApp/api/useGetUserDetail";
import { showModal } from "../storeApp/Slice/modalSlice";
import dynamic from "next/dynamic";

// ❌ Removed per-component loader
const MainSectionQuickLink = dynamic(
  () => import("../componets/Mybusiness/BusinessQuickLinks/MainSectionQuickLink")
);
const Businesstools = dynamic(
  () => import("../componets/Mybusiness/BusinessTools/Businesstools")
);
const BusinessService = dynamic(
  () => import("../componets/Mybusiness/BusinessService/BusinessService")
);
const CustomeSupport = dynamic(
  () => import("../componets/Mybusiness/CustomreSupport/CustomeSupport")
);
const MybusinessBreadCome = dynamic(
  () => import("../componets/AllBreadCome/MybusinessBreadCome")
);
const SponsorLable = dynamic(
  () => import("../componets/Mybusiness/SponsorComponets/SponsorLable")
);
const Labelhistory = dynamic(
  () => import("../componets/Mybusiness/PaymentHistory/Labelhistory")
);
const ProfessionalDashboard = dynamic(
  () => import("../componets/Mybusiness/Dashboard/ProfessionalDashboard")
);
const MybusinessLable = dynamic(
  () => import("../componets/Mybusiness/MybusinessLable")
);

function Mybusiness() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  useEffect(() => {
    if (!vendor_id) {
      dispatch(showModal("loginModal"));
    }
  }, [vendor_id, dispatch]);

  const [updateService, { data, isLoading }] = useUpdateServiceMutation();

  // Trigger service update API on load
  useEffect(() => {
    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  // Set service name cookie only after successful response
  useEffect(() => {
    const serviceName = data?.service?.service_name;
    if (serviceName) {
      Cookies.set("servicename1", encodeURIComponent(serviceName));
    }
  }, [data]);

  const serviceNameCookie = Cookies.get("servicename1");
  const serviceName = serviceNameCookie
    ? decodeURIComponent(serviceNameCookie)
    : "";
  console.log("Decoded Service Name:", serviceName);

  // Handle demo user status
  const { data: userdetails } = useGetUserDetail();
  useEffect(() => {
    if (userdetails?.userdetails?.is_demo) {
      Cookies.set("demoUser", userdetails.userdetails.is_demo.toString());
    } else {
      Cookies.remove("demoUser");
    }
  }, [userdetails?.userdetails?.is_demo]);

  // ✅ Show only one loader globally
  if (isLoading) {
    return (
      <div className="w-full flex justify-center dark:bg-dark-background items-center h-screen">
        <AvatarWithSpinner />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-auto flex flex-col ${
        isDarkMode ? "bg-[#181818]" : "bg-white"
      }`}
    >
      <MybusinessBreadCome />
      <div className=" w-full flex flex-col mt-[80px]  gap-y-[40px]">
        <MybusinessLable />
        <ProfessionalDashboard />
        <SponsorLable />
        <MainSectionQuickLink />
        <Businesstools />
        <BusinessService />
        <Labelhistory />
        <CustomeSupport />
      </div>
    </div>
  );
}

export default Mybusiness;
