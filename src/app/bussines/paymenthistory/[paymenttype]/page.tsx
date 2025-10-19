"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";

// Lazy-load heavy components
const Paymenthistry = dynamic(
  () => import("@/app/componets/AllBreadCome/Paymenthistry"),
  {
    loading: () => <div className="p-4 text-center"></div>,
  }
);

const ListHistory = dynamic(
  () => import("@/app/componets/Mybusiness/PaymentHistory/ListHistory"),
  {
    loading: () => <div className="p-4 text-center"></div>,
  }
);

function PaymentHistory() {
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
      className={`w-full h-auto flex flex-col gap-6 ${
        isDarkMode ? "bg-[#181818]" : "bg-white"
      }`}
    >
      <Paymenthistry />
      <ListHistory />
    </div>
  );
}

export default PaymentHistory;
