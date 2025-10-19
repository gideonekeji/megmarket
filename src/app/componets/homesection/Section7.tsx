"use client";

import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import Heading from "../Heading/Heading";
import Section5card from "./Section5card";
import Image from "next/image";
import btnicon from "../../../../public/assets/Image/btn.png";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";
import { useAppSelector } from "@/app/hooks/hooks";
import { RotatingLines } from "react-loader-spinner"; // Import Loader
import { useState } from "react";
import { useRouter } from "next/navigation";
import vectorimage from "../../../../public/assets/Image/homevector.png"

function Section7() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const carddata = data?.perfect_store.perfect_store;

  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[6].status == 0) {
    return null;
  }

  const handleClick = () => {
    setLoading(true); // Set loading state to true
    router.push("/store").finally(() => setLoading(false)); // Reset loading after navigation
  };

  return (
    <div className=" w-full relative">

      <div className=" absolute  left-0 h-[23rem] hidden md:block w-[7rem]  top-[-12rem] ">
        <Image src={vectorimage} alt="vectorimage" className=" w-full h-full" />
      </div>

      <div className=" h-auto w-[90%] mx-auto  2xl:w-[68%] ">
        <div className=" w-full mx-auto flex  gap-y-[3rem] flex-wrap xl:flex-nowrap justify-between  items-center flex-col">
          {/* Center content */}

          <div className=" w-full ">
            <Heading
              title={data?.perfect_store.title}
              highlightedTitle={data?.perfect_store.subtitle}
            />
          </div>

          {/* Arrows and Cards in a row */}
          <div className=" items-center justify-between w-full    grid grid-cols-1 md:grid-cols-2  gap-5  xl:grid-cols-3">
            {carddata?.map((item, index) => (
              <Section5card key={index} data={item} />
            ))}
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="w-fit relative" onClick={handleClick}>
              <button
                className={`font-poppins w-[230px] h-[50px] px-[30px] py-[12px]   2xl:text-[20px]   2xl:font-medium rounded-xl border-2 bg-light-button-base border-light-button-base text-light-inputbgcolor flex items-center justify-center transition duration-300 ease-in-out transform focus:outline-none  ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <RotatingLines
                    strokeColor={isDarkMode ? "#fff" : "#226FE4"}
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="24"
                    visible={true}
                  />
                ) : (
                  <>
                    Explore More
                    <Image
                      className="h-[12px] w-[14px] ml-[10px] transition-transform duration-300 ease-in-out"
                      src={btnicon}
                      alt="buttonicon"
                    />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section7;
