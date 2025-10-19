import React from "react";
import "./RightSideSponceStyle.css";
import dollar from "../../../../../../public/assets/Image/dollar.png";
import Image from "next/image";
import RangedailyBudget from "./RangedailyBudget";
import { useAppSelector } from "@/app/hooks/hooks";
function DailyBudget() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode)

  return (
    <div className="bordercolordailybudget rounded-xl  p-4">
      <div className="w-full flex gap-3 justify-start items-center">
        <Image
          src={dollar}
          alt="dollar"
          width={24}
          height={24}
          className={`object-cover ${isDarkMode ? "bg-circle-icon" : ""}`}
        />
        <h2 className="text-sm font-medium 2xl:text-B3 font-poppins">
          Daily Budget
        </h2>
      </div>


      {/*  daily buget price  */}
      <div className=" w-full">
        <RangedailyBudget />
      </div>
    </div>
  );
}

export default DailyBudget;
