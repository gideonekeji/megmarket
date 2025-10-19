"use client";

import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import React, { useEffect } from "react";

const MybuinessBreadComeService = dynamic(
  () => import("@/app/componets/AllBreadCome/MybuinessBreadComeService"),
  { ssr: false, loading: () => <div></div> }
);

const CardlistService = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessService/Service/CardlistService"),
  { ssr: false, loading: () => <div></div> }
);

const Headingtittle = dynamic(
  () => import("@/app/componets/Mybusiness/BusinessService/Service/Headingtittle"),
  { ssr: false, loading: () => <div></div> }
);

function Services() {
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

  return (
    <div
      className={`w-full flex h-auto flex-col gap-6 ${
        isDarkMode ? "bg-[#181818]" : "bg-white"
      }`}
    >
      <MybuinessBreadComeService />
      <div className="mx-auto 2xl:w-[68%] flex-col gap-y-[30px] w-[90%] mt-[5rem] flex justify-between items-center">
        <Headingtittle />
        <CardlistService />
      </div>
    </div>
  );
}

export default Services;
