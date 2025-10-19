import React from "react";
import NewCitiesCard from "./NewCitiesCard";
import Heading from "../../Heading/Heading";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";

function NewCities() {
  const { data, isLoading, refetch } = useHomeScreenApi();

  const carddata = data?.new_cities.cities;
  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[4].status == 0) {
    return null;
  }
  return (
    <div className=" h-auto   w-[90%] mx-auto  2xl:w-[68%]  pr-4">
      <div className=" w-full  flex-col  gap-y-[3rem] flex   mx-auto   ">
        <div className="w-full ">
          <Heading
            title={data?.new_cities.title}
            highlightedTitle={data?.new_cities.subtitle}
          />
        </div>
        <div className=" w-full   grid 2xl:grid-cols-4  xl:grid-cols-3  md:grid-cols-2   gap-10       justify-center items-center">
          {carddata?.map((item, index) => (
            <NewCitiesCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewCities;
