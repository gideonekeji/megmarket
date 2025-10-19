import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import Startdatebudget from "./Startdatebudget";
import EndDateBudget from "./EndDateBudget";
import DailyBudget from "./DailyBudget";

function BudgetDetail() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`mx-auto w-full rounded-xl  flex flex-col gap-6  px-10  2xl:px-[3rem] py-6 ${
        isDarkMode ? "bg-[#2F2F2F] text-[#ffffff]" : " bg-white businesslable"
      } `}
    >
      <div className=" w-full flex flex-col gap-4">
        <h3 className=" text-black dark:text-dark-darkcolor  2xl:text-[20px] 2xl:font-medium font-poppins  text-lg font-medium">
          What’s your ad budget?
        </h3>
        <p className=" text-sm font-poppins  2xl:text-T6 text-[#B4B4B4]">
          Excludes apple service fee and applicable taxes
        </p>
      </div>

      <div className=" w-full flex gap-2 flex-col  md:flex-row lg:justify-between items-center">
        <Startdatebudget />
        <EndDateBudget />
      </div>

      <div className=" w-full ">
        <DailyBudget />
      </div>
    </div>
  );
}

export default BudgetDetail;
