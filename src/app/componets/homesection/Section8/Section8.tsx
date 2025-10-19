"use client";
import React from "react";
import bgimage from "../../../../../public/assets/Image/section8bgimage.png";
import rightsideimage from "../../../../../public/assets/Image/section8rightimage.png";

import CausalSection8 from "./Carusal";
import Heading from "../../Heading/Heading";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";
import { useAppSelector } from "@/app/hooks/hooks";
import vector from "../../../../../public/assets/Image/Vector 172.png"
import Image from "next/image";
function Section8() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my @@@@@@@@@@@@@", data?.testimonials[0].title);

  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[7].status == 0) {
    return null;
  }


  return (
    <div className=" w-full relative ">
      {/*  vector line */}

      <div className=" absolute  h-[12rem]   top-[10rem] w-[10rem] left-0">
        <Image src={vector} alt="vector" className=" w-full  h-full" />
      </div>


      <div
        className=" h-auto  w-[90%] mx-auto  2xl:w-[68%]    bg-cover bg-no-repeat overflow-hidden   "
        style={{
          backgroundImage: `url(${bgimage.src})`,
        }}
      >
        <div className=" w-full mx-auto relative  2xl:h-[28rem] rounded-[1rem]     gap-8    flex flex-col xl:flex-row   ">
          {/* Left side */}
          <div className="w-full xl:w-[50%] h-full rounded-l-[1rem] flex flex-col  justify-end items-center gap-4  relative top-10 xl:top-0   xl:pb-2">
            {/* Top part */}
            <div className="md:w-[70%]  flex flex-col gap-y-3 mx-auto text-center ">
              <div className=" w-full">
                <Heading
                  title={data?.testimonials[0].title}
                  highlightedTitle={data?.testimonials[0].subtext}
                />
              </div>
              <p
                className={`text-[#000000] font-poppins   text-T7 line-clamp-3 font-normal tracking-wide  ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                  }`}
              >
                {data?.testimonials[0].body}
              </p>
            </div>

            {/* Card section */}
            <div className="w-full flex   items-center justify-center ">
              <div className="w-full  ">
                <CausalSection8 />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div
            className="w-full xl:w-[50%]  h-full  bg-cover  rounded-2xl bg-no-repeat overflow-hidden  bg-transparent"
            style={{
              backgroundImage: `url(${rightsideimage.src})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Section8;
