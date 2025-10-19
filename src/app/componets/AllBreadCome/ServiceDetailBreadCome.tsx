"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import bgimage from "../../../../public/assets/Image/CategoryHeaderbg.png";
import Arrowicon from "../../../../public/assets/Image/currentrouteArrow.png";
import Image from "next/image";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";

function ServiceDetailBreadCome() {
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const lastSegment = decodeString(lastSegment1);

  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);

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
      <div className="mx-auto w-[90%]   2xl:w-[68%] flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center space-x-2 cursor-pointer">
          {/* Breadcrumb */}
          <div className="md:flex items-center hidden  md:block space-x-2">
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
              router.push("/store");
            }}
          >
            Stores
          </h2>
          <Image
            src={Arrowicon}
            alt="arrow icon"
            width={14}
            height={14}
            className="cursor-pointer"
          />
          <h2 className="text-white text-lg font-normal font-poppins">
            {data?.serviceDetail.service_name}
          </h2>
        </div>

        {/* Right Section */}
        <div className="cursor-pointer   hidden md:block">
          <h2 className="text-white text-lg font-normal font-poppins">
          {data?.serviceDetail.service_name}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailBreadCome;
