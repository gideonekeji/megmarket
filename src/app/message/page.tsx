"use client";

import React, { useEffect } from "react";
import "./messagestyle.css";
import Messagelist from "../componets/message/MessageBox/Messagelist";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";

export default function Message() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.body.style.overflowY = "hidden"; // Hide vertical scrolling

    return () => {
      document.body.style.overflowY = "auto"; // Restore scrolling when leaving
    };
  }, []);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  return (
    <div
      className={`w-full  pt-[3rem]  ${isDarkMode ? "  bg-[#181818]" : " bg-white"} `}
    >
      <div className="w-full mx-auto">
        <Messagelist />
      </div>
    </div>
  );
}
