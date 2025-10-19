"use client";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import LocationSerachHomeScreeen from "./HomeScrennSerch/LocationSerachHomeScreeen";
import CategorySearchHomeScrenn from "./HomeScrennSerch/CategorySearchHomeScrenn";
import { useAppSelector } from "@/app/hooks/hooks";
import serachicon from "../../../../public/assets/Image/search-normal1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslation";
import { sessionService } from "@/app/utils/sessionService.ts";

function HomeSectionSerachBox() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const router = useRouter();
  const { getTranslation } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(
    sessionService.getRecentLocation() || ""
  );


  const filteredLocation = location.includes(",")
  ? location.split(",").pop()?.trim()
  : location.trim();

console.log("Filtered Location:", filteredLocation);

  useEffect(() => {
    const handleUpdate = (e: CustomEvent) => {
      setLocation(e.detail);
      console.log("Updated recentLocation:", e.detail);
    };

    window.addEventListener("sessionLocationUpdated", handleUpdate as EventListener);

    return () => {
      window.removeEventListener("sessionLocationUpdated", handleUpdate as EventListener);
    };
  }, []);


    console.log("locationlocation" , location)


const sluglocation = (location ?? "")
  .toLowerCase()           
  .trim()                   
  .replace(/,/g, "")       
  .replace(/\s+/g, "-");    

console.log("sluglocationsluglocation@!", sluglocation);

  const handleSearchClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`${sluglocation}/store`);
    }, 10); // Simulate a loading delay before navigating
  };

  return (
    <div className="relative   h-fit w-full ">
      <div
        className={`relative top-[-8rem] mx-auto h-fit w-[90%]  p-4 rounded-[35px] shadow md:top-[-4rem]  lg:top-[-2.5rem] xl:top-[-6.4rem] xl:p-6 2xl:w-[68%] 2xl:p-10  bg-light-background  dark:bg-dark-secondarybg`}
      >
        <div className="mx-auto flex w-[95%] flex-col items-start justify-start gap-6  xl:gap-8">
          <div>
            <h3 className="font-poppins  text-lg font-semibold xl:text-H6  text-light-button-base ">
              {getTranslation("Search across’1.22Crore+’ Businesses", "Search across’1.22Crore+’ Businesses")}
            </h3>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            <div className="relative w-full lg:w-[70%] ">
              <LocationSerachHomeScreeen />
            </div>
            <div className="relative w-full">
              <CategorySearchHomeScrenn />
            </div>

            {/* Search Button with Loading Spinner */}
            <div
              className="relative flex w-fit items-center justify-center md:mt-7"
              onClick={handleSearchClick}
            >
              <div className="flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-xl   bg-light-button-base">
                {isLoading ? (
                  <TailSpin color="#ffffff" height={30} width={30} />
                ) : (
                  <Image
                    src={serachicon}
                    className="h-[40%] w-[40%]"
                    alt="search icon"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSectionSerachBox;
