"use client";

import React, { useEffect, useState } from "react";
import SponsorStoresCard from "./SponsorStoresCard";
import Heading from "../../Heading/Heading";
import "./cardStyle.css";
import Image from "next/image";
import btnicon from "../../../../../public/assets/Image/btn.png";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import vectoreimage from "../../../../../public/assets/Image/Ellipse 2936.png"
import { RotatingLines } from "react-loader-spinner"; // Import Loader


function SponsorStores() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const carddata = data?.sponser_store.services;

  console.log(" my card values ", carddata);

  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[3].status == 0) {
    return null;
  }


  const handleClick = () => {
    setLoading(true); // Set loading state to true
    router.push("/Sponser").finally(() => setLoading(false)); // Reset loading after navigation
  };

  return (
    <div className="  w-full  relative">

      {/*   left side circle values  bg  color  */}

      {/* <div
        className="w-[10rem] h-[15rem] absolute top-[47%] bg-[#226FE45E] backdrop-blur-[200px] "
      /> */}


      <div className="  absolute top-[5%]   hidden xl:block w-[10rem]  h-[60rem] ">
        <Image src={vectoreimage} alt="vectoreimage" className=" w-full h-full" />
      </div>


      <div className=" h-auto  w-[90%] mx-auto  2xl:w-[68%] ">
        <div className=" w-full  flex-col  gap-y-[3rem] flex   mx-auto   ">
          <div className=" w-full">
            <Heading
              title={data?.sponser_store.title}
              highlightedTitle={data?.sponser_store.subtitle}
            />
          </div>
          <div className=" grid-cols-1 grid xl:grid-cols-2      gap-4 w-full">
            {carddata?.slice(0, 4).map((item, index) => (
              <SponsorStoresCard key={index} data={item} />
            ))}
          </div>
          {/*  btn  exprlore more btn  */}
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

export default SponsorStores;
