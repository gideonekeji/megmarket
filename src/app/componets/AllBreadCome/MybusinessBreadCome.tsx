"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import bgimage from "../../../../public/assets/Image/CategoryHeaderbg.png";
import Arrowicon from "../../../../public/assets/Image/currentrouteArrow.png";
import Image from "next/image";

function MybusinessBreadCome() {
  const pathname = usePathname();
  const segments = pathname.split("/");

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
      <div className="mx-auto  2xl:w-[68%]  w-[90%] flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2">
            <h2
              className="text-[#FFD428] text-lg xl:text-T6 font-normal font-poppins"
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
          <h2 className="text-white text-lg  xl:text-T6 font-normal font-poppins">
            My business
          </h2>
        </div>

        {/* Right Section */}
        <div className="cursor-pointer">
          <h2 className="text-white text-lg xl:text-T6 font-normal font-poppins">
            My business
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MybusinessBreadCome;
