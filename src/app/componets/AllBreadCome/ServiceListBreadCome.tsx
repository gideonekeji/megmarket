"use client";

import React from "react";
import { useRouter } from "next/navigation";
import bgimage from "../../../../public/assets/Image/CategoryHeaderbg.png";
import Arrowicon from "../../../../public/assets/Image/currentrouteArrow.png";
import Image from "next/image";
import useTranslation from "@/app/hooks/useTranslation";

function ServiceListBreadCome() {
  const router = useRouter();

    const { getTranslation } = useTranslation();

  return (
     <div
      className="flex items-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgimage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "80px",
      }}
    >
      <div className=" w-full ">
        <div className="mx-auto   2xl:w-[68%] w-[90%] flex   gap-6  justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center  space-x-2 cursor-pointer">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2">
            <h2
              className="text-[#FFD428] text-lg font-normal font-poppins"
              onClick={() => {
                router.push("/");
              }}
            >
                {getTranslation("Home", "Home")}
                
            </h2>
            <Image
              src={Arrowicon}
              alt="arrow icon"
              width={14}
              height={14}
              className="cursor-pointer"
            />
          </div>

          {/* Current Pathname */}
          <h2 className="text-white text-lg font-normal font-poppins">
               {getTranslation("Stores", "Stores")}
          </h2>
        </div>

        {/* Right Section */}
        <div className="cursor-pointer ">
          <h2 className="text-white text-lg font-normal font-poppins">
             {getTranslation("Stores", "Stores")}
          </h2>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ServiceListBreadCome;
