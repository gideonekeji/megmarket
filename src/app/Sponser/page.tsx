"use client";

import React from "react";
import { useHomeScreenApi } from "../storeApp/api/useHomeScreenApi";
import SponsorStoresCard from "../componets/homesection/SponsorStores/SponsorStoresCard";
import Header from "../componets/Category/Header";
import AvatarWithSpinner from "../componets/Loading/AvatarWithSpinner";

function Page() {
  const { data, isLoading, refetch } = useHomeScreenApi();

  if (isLoading) {
    return (
      <div className=" w-full h-full flex justify-center items-center">
        <AvatarWithSpinner />
      </div>
    );
  }

  const carddata = data?.sponser_store.services;
  return (
    <div className="w-full h-auto ">
      <div className=" w-full">
        <Header />
      </div>

      <div className="w-[90%] sm:w-[85%] md:w-[90%] 2xl:w-[70%] mx-auto  mt-[6rem]   ">
        <div className=" grid-cols-1 grid xl:grid-cols-2  mt-[5rem]   gap-4 w-full">
          {carddata?.map((item, index) => (
            <SponsorStoresCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
