"use client";

import CategorySubdetailBreadCome from "@/app/componets/AllBreadCome/CategorisBreadCome/CategorySubdetailBreadCome";
import LeftSide from "@/app/componets/Category/SubCategeoryList/LeftSide";
import RightSideCardListing from "@/app/componets/Category/SubCategeoryList/RightSideCardListing";
import SerachDesing from "@/app/componets/Listing/LeftSide/SerachDesing";
import CardListing from "@/app/componets/Listing/RightSide/CardListing";
import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";

function SubcategeoyDetail() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full h-auto    ${
        isDarkMode ? "  bg-[#181818]" : "  bg-white"
      } `}
    >
      {/* Header */}
      <div>
        <CategorySubdetailBreadCome />
      </div>

      <div
        className={`mx-auto 2xl:w-[80%] xl:w-[80%] w-[90%] mt-[5rem] grid xl:grid-cols-[20%_80%] gap-6     grid-cols-1   ${
          isDarkMode ? " bg-[#181818] " : " bg-[#FFFFFF]"
        }`}
      >
        {/* First column */}
        <div className=" h-auto">
          <SerachDesing />
        </div>

        {/* Second column */}
        <div className=" h-auto ">
          <CardListing />
        </div>
      </div>
    </div>
  );
}

export default SubcategeoyDetail;
