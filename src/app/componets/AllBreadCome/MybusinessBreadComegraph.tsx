"use client";

import React from "react";
import { useRouter } from "next/navigation";
import bgimage from "../../../../public/assets/Image/CategoryHeaderbg.png";
import Arrowicon from "../../../../public/assets/Image/currentrouteArrow.png";
import Image from "next/image";

function MybusinessBreadComegraph() {
  const router = useRouter();

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
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[95%] flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2">
            <h2
              className="text-[#FFD428] text-lg font-normal font-poppins"
              onClick={() => {
                router.push("/");
              }}
            >
              Home
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
          <h2
            className="text-[#FFD428] text-lg font-normal font-poppins"
            onClick={() => {
              router.push("/bussines");
            }}
          >
            My business
          </h2>

          <div className="flex items-center space-x-2">
            <Image
              src={Arrowicon}
              alt="arrow icon"
              width={14}
              height={14}
              className="cursor-pointer"
            />

            <h2 className="text-white text-lg font-normal font-poppins">
            View Insights
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="cursor-pointer">
          <h2 className="text-white text-lg hidden md:block font-normal font-poppins">
          View Insights
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MybusinessBreadComegraph;
