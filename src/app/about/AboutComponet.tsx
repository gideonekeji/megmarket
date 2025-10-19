"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import aboutimage from "../../../public/assets/Image/aboutus.png";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import useTranslation from "../hooks/useTranslation";
import Heading from "../componets/Heading/Heading";
import Version from "../componets/About/Version";
import Section3 from "../componets/About/Section3";

function AboutComponet() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  // Load dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  return (
    <div
      className={`w-full h-auto mt-4 relative ${isDarkMode ? "bg-[#181818]" : "bg-white"
        }`}
    >


      {/* Main Section */}
      <div className="relative z-10 2xl:w-[68%] w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

        {/* Left Side (Heading + Image + Background Highlight) */}
        <div className="flex flex-col md:flex-row lg:flex-col items-center gap-10 relative">
          {/* Background Highlight (Behind bottom part of image) */}

          {/* Heading */}
          <div className="flex flex-col gap-4 text-center md:text-left lg:text-center">
            <Heading title="Find deals in" highlightedTitle="Nearby Stores" />
            <p
              className={`font-poppins text-sm md:text-lg leading-relaxed max-w-lg mx-auto ${isDarkMode ? "text-[#FFFFFFBA]" : "text-[#4A4A4A]"
                }`}
            >
              {getTranslation(
                "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.",
                "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change."
              )}
            </p>
          </div>

          {/* Image */}
          <div className="w-full relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
            <Image
              src={aboutimage}
              alt="About American Sign"
              className="h-full w-full object-cover rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Right Side (Years of Service + Core Values) */}
        <div className="flex flex-col gap-10 xl:mt-[9rem]">
          {/* Years of Service */}
          <div className="text-center lg:text-left space-y-4">
            <h2 className="text-3xl xl:text-H1 font-poppins font-semibold text-light-button-base">
              {getTranslation("15 Years Of Service", "15 Years Of Service")}
            </h2>
            <p
              className={`font-poppins text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${isDarkMode ? "text-[#FFFFFFBA]" : "text-[#4A4A4A]"
                }`}
            >
              {getTranslation(
                "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.",
                "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change."
              )}
            </p>
          </div>

          {/* Core Values Box */}
          <div
            className={`w-full rounded-[2rem] p-8 md:p-12 xl:p-[60px] flex flex-col items-start gap-6 ${isDarkMode ? "bg-[#2F2F2F]" : "bg-white shadow-lg"
              }`}
            style={{
              boxShadow: "9px 9px 23px 0px #00000017",
              border: "1px solid #226FE44a",
            }}
          >
            {/* Heading */}
            <div className="flex flex-col gap-y-4">
              <h4 className="AmericanSign text-3xl 2xl:text-H2 text-light-button-base">
                {getTranslation("Value", "Value")}
              </h4>
              <h4
                className={`font-poppins font-semibold text-3xl 2xl:text-H1 tracking-wide ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                {getTranslation("Core Values", "Core Values")}
              </h4>
            </div>

            {/* Paragraph */}
            <p
              className={`font-poppins text-sm md:text-base leading-relaxed xl:text-T6 max-w-xl ${isDarkMode ? "text-[#FFFFFFBA]" : "text-[#000000B5]"
                }`}
            >
              {getTranslation(
                "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change.",
                "We are dedicated to delivering innovative solutions that empower our customers and drive meaningful change."
              )}
            </p>

            {/* List */}
            <ul className="flex flex-col gap-4 md:gap-6">
              {[
                "Community Responsiveness",
                "Integrity",
                "Team Work",
                "Effort",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="rounded-full h-2 w-2 bg-[#226FE4]" />
                  <p
                    className={`font-poppins text-base md:text-lg xl:text-B2 font-medium ${isDarkMode ? "text-white" : "text-[#226FE4]"
                      }`}
                  >
                    {getTranslation(item, item)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className=" w-[50%]  hidden xl:block mt-[-12rem]  h-[180px] bg-[#226FE436] rounded-r-xl -z-10"></div>


      {/* Lower Sections */}
      <div className="2xl:w-[68%] w-[90%] mx-auto space-y-16 mt-16">
        <Version />
        <Section3 />
      </div>
    </div>
  );
}

export default AboutComponet;
