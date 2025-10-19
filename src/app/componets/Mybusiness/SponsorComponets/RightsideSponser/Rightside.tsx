import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import BudgetDetail from "./budgetDetail";
import PriceDetailsSponcer from "./PriceDetailsSponcer";
import AddConpainAndAddGoal from "./AddConpainAndAddGoal";
import ServiceCardSponcer from "./ServiceCardSponcer";

function Rightside() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`mx-auto w-full rounded-lg   flex  flex-col gap-6 h-fit    `}
    >
      <BudgetDetail />

      <div
        className={`mx-auto w-full rounded-lg  flex flex-col gap-6 p-8  dark:bg-[#2F2F2F] `}
      >
        <ServiceCardSponcer />
        <AddConpainAndAddGoal />
      </div>
    </div>
  );
}

export default Rightside;
