"use client";

import MybusinessBreadComeSupport from "@/app/componets/AllBreadCome/MybusinessBreadComeSupport";
import CustomreSupportFomr from "@/app/componets/Mybusiness/CustomreSupport/CustomreSupportFomr";
import FAQ from "@/app/componets/Mybusiness/CustomreSupport/FAQ";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import React, { useEffect } from "react";

function Support() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  console.log("My business is:!!!!!!!!!!!!!!!!!!!!!!!!!!!!", isDarkMode);
  return (
    <div
      className={`w-full h-auto flex flex-col gap-6  ${
        isDarkMode ? " bg-[#181818]" : "bg-white "
      }`}
    >
      <MybusinessBreadComeSupport />
      <FAQ />
      <CustomreSupportFomr />
    </div>
  );
}

export default Support;
