"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import LeftSide from "./Leftsidesponsor/LeftSide";
import Rightside from "./RightsideSponser/Rightside";

function CombineLeftSideAndRightSide() {

  return (
    <div
      className={`mx-auto 2xl:w-[68%]  w-[90%] mt-[3rem]     gap-6    flex  lg:flex-row  flex-col  `}
    >
      <LeftSide />
      <Rightside />
    </div>
  );
}

export default CombineLeftSideAndRightSide;
