"use client";
import React from "react";
import bgimage from "../../../../public/assets/Image/profileheader.png";
import Addicon from "../../../../public/assets/Image/add.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslation";

function HeadingProfile() {
  const isStore = Cookies.get("store_approval");
  const isServiceId = Cookies.get("service_id");

  console.log("my isServiceId", isServiceId); // Check the value of isServiceId
  console.log("my isStore", isStore); // Check the value of isStore

  // Define the title based on the conditions
  const titleText =
    isStore === "0" && (!isServiceId || isServiceId === "undefined")
      ? "List your Business"
      : isStore === "0" && isServiceId
      ? "Pending"
      : "Your Business ";

  const router = useRouter();

  const handleClick = () => {
    //  store approval values 0 then move list route to the
    if (isStore === "0") {
      router.push("/Subscribe");
    }

    // Only push to the route when isStore equals "1" and isServiceId is not "undefined"
    if (isStore === "1" && isServiceId !== "undefined") {
      router.push("/bussines");
    }
  };

  const { getTranslation } = useTranslation();


  return (
    <div className="w-full ">
      <div
        className="h-[6rem] bg-center bg-cover  flex    justify-center items-center w-full rounded-xl"
        style={{
          backgroundImage: `url(${bgimage.src})`,
         
        }}

        onClick={handleClick}
      >
      
          <div className="flex h-full w-full items-center  cursor-pointer  justify-center gap-4">
            {/* Circle Icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Image src={Addicon} alt="add" width={30} height={30} />
            </div>
            {/* Title */}
            <h4 className="font-poppins text-xl font-medium text-white">
              {getTranslation("Your Business ", "Your Business ")}
            </h4>
          </div>
      </div>
    </div>
  );
}

export default HeadingProfile;
