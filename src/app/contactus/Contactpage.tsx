"use client";
import React from "react";
import Image from "next/image";
import callicon from "../../../public/assets/Image/calliconcontact.png";
import location from "../../../public/assets/Image/locationcontact.png";
import sms from "../../../public/assets/Image/smscontact.png";
import { useAppSelector } from "../hooks/hooks";
import bgimage from "../../../public/assets/Image/demo@@.png";
import useTranslation from "../hooks/useTranslation";
import bgdarkimage from "../../../public/assets/Image/darkimage.png"

function Contactpage() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { getTranslation } = useTranslation();

  return (
    <div
      className={`w-full h-[44rem] md:h-[20rem] 2xl:h-[30rem] flex justify-center items-center rounded-xl bg-cover bg-center ${isDarkMode ? "" : "text-[#000000] opacity-100"
        }`}
      style={{
        backgroundImage: `url(${isDarkMode ? bgdarkimage.src : bgimage.src})`,
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="flex flex-wrap xl:flex-nowrap items-center rounded-xl mx-auto  w-[90%] xl:w-[70%]  justify-center xl:justify-between  gap-6 p-6 xl:p-12">
        {/* Call Us */}
        <div className="flex flex-col items-center justify-center cursor-pointer gap-y-4 xl:gap-y-6">
          <div className="flex justify-center items-center h-[70px] w-[70px] bg-[#226FE4] rounded-xl">
            <Image
              src={callicon}
              alt="Call Icon"
              className="object-cover w-[50%] h-[50%]"
            />
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <h2
              className={`text-2xl sm:text-xl md:text-2xl xl:text-2xl  2xl:text-H6 font-poppins font-[600]  ${isDarkMode ? "text-white" : "text-[#000000]"
                }`}
            >
              {getTranslation("Call Us", "Call Us")}
            </h2>
            <p
              className={`text-lg sm:text-base md:text-lg xl:text-lg  font-poppins  ${isDarkMode ? "text-[#FFFFFFBA]" : "text-[#212121]"
                }`}
            >
              (123) 456-7890
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col items-center justify-center cursor-pointer gap-y-4 xl:gap-y-6">
          <div className="flex justify-center items-center h-[70px] w-[70px] bg-[#226FE4] rounded-xl">
            <Image
              src={location}
              alt="Location Icon"
              className="object-cover w-[50%] h-[50%]"
            />
          </div>


          <div className="text-center flex flex-col items-center gap-2">
            <h2
              className={`text-2xl sm:text-xl md:text-2xl xl:text-2xl  2xl:text-H6 font-poppins font-[600]  ${isDarkMode ? "text-white" : "text-[#000000]"
                }`}
            >
              {getTranslation("Address", "Address")}
            </h2>
            <p
              className={`text-lg sm:text-base md:text-lg xl:text-lg  font-poppins  ${isDarkMode ? "text-[#FFFFFFBA]" : "text-[#212121]"
                }`}
            >
              {getTranslation("Rruga e Detit, Golem", "Rruga e Detit, Golem")}
            </p>
          </div>
        </div>

        {/* Email Us */}
        <div className="flex flex-col items-center justify-center cursor-pointer gap-y-4 xl:gap-y-6">
          <div className="flex justify-center items-center h-[70px] w-[70px] bg-[#226FE4] rounded-xl">
            <Image
              src={sms}
              alt="Email Icon"
              className="object-cover w-[50%] h-[50%]"
            />
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <h2
              className={`text-2xl sm:text-xl md:text-2xl xl:text-2xl  2xl:text-H6 font-poppins font-[600]  ${isDarkMode ? "text-white" : "text-[#000000]"
                }`}
            >
              {getTranslation("Email Us", "Email Us")}
            </h2>
            <p
              className={`text-lg sm:text-base md:text-lg xl:text-lg  font-poppins  ${isDarkMode ? "text-[#FFFFFFBA]" : "text-[#212121]"
                }`}
            >
              info@megmarket.africa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactpage;
