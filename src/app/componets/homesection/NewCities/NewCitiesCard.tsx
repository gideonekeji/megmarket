"use client";
import React, { useState } from "react";
import "./NewCitiesstyle.css";
import mumbai from "../../../../../public/assets/Image/Mumbai_03-2016_30_Gateway_of_India 1.png";
import Image from "next/image";
import arrow from "../../../../../public/assets/Image/arrow-up.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";

function NewCitiesCard({ data }) {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    sessionStorage.setItem("recentLocation", data.city);
    router.push("/store").finally(() => setLoading(false));
  };

  const storedLanguageString = JSON.parse(localStorage.getItem("selectedLanguage"));
  const isRTL = storedLanguageString?.language_alignment === "rtl";



  console.log("datadatadata monu", data)

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={` w-full flex cursor-pointer relative gap-6 rounded-lg h-auto p-4 shadow-lg transition-transform hover:scale-105  dark:text-dark-darkcolor  bg-light-background  dark:bg-dark-secondarybg ${isRTL ? "text-right" : "text-left"}`}
      id="shadow-radius"
      onClick={handleClick}
    >
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg bg-opacity-50">
          <TailSpin color="#226FE4" height={50} width={50} />
        </div>
      )}

      <div className="w-full sm:w-[25%] h-auto">
        <img
          className="object-cover w-full  h-[3rem] rounded-lg"
          src={data.city_image}
          alt="Mumbai"
        />
      </div>

      {/* Inner text */}
      <div className="flex flex-col gap-2 justify-center w-[70%]">
        <h6 className="font-poppins   text-B2 pr-2 line-clamp-1">
          {data.city}
        </h6>
        <p className="  text-light-button-base font-poppins      text-B4 ">
          Explore
        </p>
      </div>

      {/* Right side circle with arrow */}
      <div className="group">
        <div className={`absolute  dark:bg-dark-secondarybg  bg-light-background ${isRTL ? "left-[-0.8rem] md:left-[-1rem]" : "right-[-0.8rem]  md:right-[-1rem]"} group-hover:bg-light-button-base top-[76%] md:top-1/2 transform -translate-y-1/2 border-[5px] border-light-button-base h-[4rem] w-[4rem] rounded-full flex justify-center items-center`}>
          <Image
            src={arrow}
            alt="arrow"
            className={`w-[50%] h-[50%] object-cover group-hover:invert ${isRTL ? "rotate-180" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default NewCitiesCard;
