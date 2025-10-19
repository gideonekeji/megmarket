"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import { setVendorServiceDetails } from "@/app/storeApp/Slice/ServiceDetail/ServiceDetailScreenSlice";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import { usePathname } from "next/navigation";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import ServiceDetailBreadCome from "../componets/AllBreadCome/ServiceDetailBreadCome";
import ServiceDetalScreenleftside from "../componets/ServiceDetailScreen/ServiceDetalScreenleftside/ServiceDetalScreenleftside";
import ServiceDetalScreenrightside from "../componets/ServiceDetailScreen/ServiceDetalScreenrightside/ServiceDetalScreenrightside";



interface Props {
  serviceName: string;
  serviceId: string;
}

function StoresDetailDemoRouteTest({ serviceName, serviceId }: Props) {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  const pathname = usePathname();
  const lastSegmentEncoded = pathname.split("/").filter(Boolean).pop() || "";
  const lastSegment = decodeString(lastSegmentEncoded);

  const { data, error, isLoading } = useServiceDetailApi(lastSegment);

  // Save API response to Redux & session storage when available
  useEffect(() => {
    if (data && !isLoading && !error) {
      dispatch(setVendorServiceDetails(data));
      sessionStorage.setItem("apiresponce", data?.serviceDetail?.service_description || "");
    }
  }, [data, isLoading, error, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-[5rem] h-full w-full dark:bg-dark-background">
        <AvatarWithSpinner />
      </div>
    );
  }

  return (
    <div className={`w-full h-auto ${isDarkMode ? "bg-[#181818]" : "bg-white"}`}>
      {/* Header */}
      <ServiceDetailBreadCome />

      {/* Main content */}
      <div className="mx-auto w-[90%] 2xl:w-[68%] flex flex-col lg:flex-row gap-6 mt-[70px] items-start">
        {/* Left side */}
        <div className="w-full lg:w-[65%]">
          <ServiceDetalScreenleftside />
        </div>

        {/* Right side */}
        <div className="w-full lg:w-[35%]">
          <ServiceDetalScreenrightside />
        </div>
      </div>
    </div>
  );
}

export default StoresDetailDemoRouteTest;
