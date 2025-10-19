"use client";

import MybusinessSponsor from "@/app/componets/AllBreadCome/MybusinessSponsor";
import CombineLeftSideAndRightSide from "@/app/componets/Mybusiness/SponsorComponets/CombineLeftSideAndRightSide";
import React from "react";

function Sponsor() {
  return (
    <div className=" w-full flex flex-col h-auto  dark:bg-dark-background ">
      {/*  breadCome */}
      <MybusinessSponsor />
      <CombineLeftSideAndRightSide/>
    </div>
  );
}

export default Sponsor;
