"use client";

import React from "react";
import { RiArrowRightWideFill } from "react-icons/ri";
import { SubCategoryData } from "@/app/types/Restypes";
import { useAppSelector } from "@/app/hooks/hooks";

const SubCategoryCard: React.FC<SubCategoryData> = ({
  services_count,
  subcategory_name,
  subcategory_image,
  onClick,
}) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full  flex items-center  shadobg justify-between p-4 rounded-lg cursor-pointer   ${
        isDarkMode ? " bg-[#2F2F2F] text-white" : " text-black"
      }`}
      onClick={onClick}
      style={{
        borderBottom: "3.3px solid #ECECEC",
        boxShadow: "6.6px 13.2px 47.53px 0px #0000000F",
      }}
    >
      {/* Category Name */}
      <div className="flex items-center gap-4">
        {/* image  */}
        <div
          className=" h-[4rem] w-[4rem] flex  justify-center items-center rounded-lg"
          style={{
            backgroundImage: `url(${subcategory_image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: "10px",
          }}
        ></div>
        {/* Category Name */}
        <div>
          <h2 className="font-medium text-xl font-poppins">
            {subcategory_name} 
          </h2>
        </div>
      </div>

      {/* Listings Info */}
      <div className="flex items-center gap-4">
        {/* Listing Count */}
        <div>
          <h2 className="text-[#226FE4] font-poppins">{services_count}</h2>
        </div>

        {/* Arrow Icon */}
        <div>
          <RiArrowRightWideFill
            size={30}
            className="cursor-pointer hover:text-[#226FE4]"
            aria-label="Next"
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
