"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/computer.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useEffect, useState } from "react";
import useTranslation from "@/app/hooks/useTranslation";

function BusinessVideo() {
  const dispatch = useDispatch();

  const [videoUrl, setVideoUrl] = useState(
    typeof window !== "undefined" ? localStorage.getItem("video_url") || "" : ""
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newUrl = localStorage.getItem("video_url");
      setVideoUrl(newUrl || "");
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { getTranslation } = useTranslation();

  return (
    <div
      className={`w-full flex justify-between items-center rounded-lg cursor-pointer 
        px-5 py-4 md:px-8 md:py-5 overflow-hidden transition
        ${isDarkMode
          ? "bg-dark-Modalbgcolortop text-white"
          : "bg-white businesslable text-black shadow-sm"
        }`}
      onClick={() => {
        dispatch(showModal("BusinessVideoModal"));
      }}
    >
      {/* Left Side */}
      <div className="flex items-center gap-4 min-w-[40%]">
        <div className="h-12 w-12 flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-lg md:text-xl font-poppins font-medium leading-snug">
          {getTranslation("Business Video Url", "Business Video Url")}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 overflow-hidden">
        <p className="text-[#6F6F6F] font-normal font-poppins text-sm md:text-base truncate max-w-[12rem] md:max-w-[20rem]">
          {videoUrl || getTranslation("No URL Added", "No URL Added")}
        </p>
        <div className="h-8 w-8 flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-contain ${isDarkMode ? "invert" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessVideo;
