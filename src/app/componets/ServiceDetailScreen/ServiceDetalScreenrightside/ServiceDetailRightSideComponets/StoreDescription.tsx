"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import useTranslation from "@/app/hooks/useTranslation";

function StoreDescription() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const lastSegment = decodeString(lastSegment1);

  useEffect(() => {
    Cookies.set("detail_id", lastSegment);
  }, [lastSegment]);

  const dispatch = useAppDispatch();
  const { data } = useServiceDetailApi(lastSegment);
  const StoreDescription = data?.serviceDetail.service_description;
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const [isExpanded, setIsExpanded] = useState(false);
  const { getTranslation } = useTranslation();

  return (
    <div
      className={`p-4 rounded-lg ${
        isDarkMode
          ? "bg-[#2F2F2F]"
          : "bg-[#ffffff] photoservicedetailborderandshado"
      }`}
    >
      <div
        className={`text-lg font-medium font-poppins xl:text-T4 mb-4 ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        }`}
      >
        {getTranslation("Store Description", "Store Description")}
      </div>

      <div
        className={`text-sm font-poppins overflow-hidden 
          [&_ul]:list-disc [&_ul]:list-inside 
          [&_ol]:list-decimal [&_li]:ml-4
          ${isDarkMode ? "text-[#ffffff]" : "text-[#3E5155]"}
        `}
        style={{
          maxHeight: isExpanded ? "none" : "6.5em",
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? "none" : 3,
          WebkitBoxOrient: "vertical",
        }}
        dangerouslySetInnerHTML={{
          __html: StoreDescription || "No description available.",
        }}
      />

      {StoreDescription && StoreDescription.length > 300 && (
        <button
          className="mt-2 text-light-button-base font-semibold text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}

export default StoreDescription;
