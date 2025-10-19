"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/time.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function BusinessTimings() {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();
  return (
    <div
     className={`w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? " bg-dark-Modalbgcolortop text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("BusinessTimingsModal"));
      }}
    >
      <div className="flex gap-3 items-center">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl  font-poppins">  {getTranslation("Business Timings", "Business Timings")}</div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#B4B4B4] font-normal    font-poppins text-[18px]">
          Open Now
        </p>

        <div className="h-[2rem] w-[2rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-cover  ${
              isDarkMode? "invert" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessTimings;
