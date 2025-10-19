"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation"; // Import from next/navigation
import bgimage from "../../../../public/assets/Image/CategoryHeaderbg.png";
import Arrowicon from "../../../../public/assets/Image/currentrouteArrow.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { setActiveComponent } from "@/app/storeApp/Slice/activeComponentSlice";
import { useDispatch } from "react-redux";

function MyProfileBreadCome() {
  const router = useRouter();
  const dispatch = useDispatch();

  //  active route

  const activeRoute = useAppSelector(
    (state) => state.activeComponent.activeComponent
  );

  console.log(" my active route!!!!!!!!!!!", activeRoute);

  // when click on my profile button

  const goToMyProfile = () => {
    dispatch(setActiveComponent("Profile"));
  };

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
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[95%]  flex  justify-between items-center ">
        {/* Left Section */}

        <div className="flex items-center space-x-2  cursor-pointer">
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

          <div className="flex items-center space-x-2">
            <h2
              className="text-[#FFFFFF] text-lg font-normal font-poppins"
              onClick={goToMyProfile}
            >
              My Account{" "}
            </h2>
            <Image
              src={Arrowicon}
              alt="arrow icon"
              width={14}
              height={14}
              className="cursor-pointer"
            />
          </div>

          {/* Current Pathname   dynamic */}
          <h2 className="text-white text-lg font-normal font-poppins">
            {activeRoute}
          </h2>
        </div>

        {/* Right Section   dynamic*/}
        <div className=" cursor-pointer">
          <h2 className="text-white text-lg font-normal font-poppins">
            {activeRoute}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MyProfileBreadCome;
