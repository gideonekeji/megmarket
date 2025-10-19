"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/computer-1.png";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useEffect, useState } from "react";
import useTranslation from "@/app/hooks/useTranslation";
import { useUpdateService } from "@/app/storeApp/api/useUpdateService";

function BusinessImages() {
  const dispatch = useDispatch();
  const { data: detaildata } = useUpdateService();
  const { getTranslation } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const [serviceImageLength, setServiceImageLength] = useState<number>(() => {
    const localValue = localStorage.getItem("service_image_length");
    return localValue ? Number(localValue) : detaildata?.service_images?.length || 0;
  });

  useEffect(() => {
    const checkLocalStorage = () => {
      const localValue = localStorage.getItem("service_image_length");
      setServiceImageLength(
        localValue ? Number(localValue) : detaildata?.service_images?.length || 0
      );
    };

    const interval = setInterval(checkLocalStorage, 2000);
    return () => clearInterval(interval);
  }, [detaildata?.service_images?.length]);

  return (
    <div
      className={`w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex cursor-pointer 
        ${isDarkMode
          ? "bg-dark-Modalbgcolortop text-white"
          : "bg-white businesslable text-black"
        }`}
      onClick={() => dispatch(showModal("BusinessImagesModal"))}
    >
      {/* Left Side */}
      <div className="flex gap-3 items-center">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl  font-poppins">
          {getTranslation("Business Images", "Business Images")}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex gap-3 items-center">
        <p className="text-[#B4B4B4] font-normal  font-poppins text-[18px]">
          {serviceImageLength}
        </p>
        <div className="h-[2rem] w-[2rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-cover ${isDarkMode ? "invert" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessImages;
