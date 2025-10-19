"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import bgimage from "../../../../public/assets/Image/CategoryHeaderbg.png";
import Arrowicon from "../../../../public/assets/Image/currentrouteArrow.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";

function Paymenthistry() {
  const router = useRouter();
  const vendor_id = Cookies.get("user_id");

  const service_id = Cookies.get("service_id");

  const [updateService, { data: updateservicedata, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  const service_name = updateservicedata?.service.service_name;

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
      <div className="mx-auto 2xl:w-[68%]  w-[90%] flex justify-between items-center">
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
              Payment History
            </h2>
          </div>
        </div>

        {/* Right Section */}
        <div className="cursor-pointer">
          <h2 className="text-white text-lg   hidden md:block font-normal font-poppins">
            Payment History
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Paymenthistry;
