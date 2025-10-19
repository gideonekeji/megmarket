"use client";
import React, { useEffect } from "react";
import HeadingText from "@/app/componets/Profile/HeadingText";
import { usePrivacypolicyResQuery } from "@/app/storeApp/api/PrivacypolicyRes";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import { useAppSelector } from "@/app/hooks/hooks";
import useTranslation from "@/app/hooks/useTranslation";

function Privacypolicy() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  const {
    data: PrivacypolicyData,
    isLoading,
    isError,
  } = usePrivacypolicyResQuery();

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="flex items-center   dark:bg-dark-background justify-center">
        <AvatarWithSpinner />
      </div>
    );
  if (isError || !PrivacypolicyData)
    return <div>Error loading terms and conditions.</div>;

  // Extract the actual content from the data
  const content = PrivacypolicyData?.data[0]?.text;

  return (
    <div className="h-auto w-full  py-[2rem]">
      {/* Heading */}

      <div className="flex w-full items-center justify-center gap-4">
        <h3
          className={`AmericanSign text-H2 font-normal  text-light-button-base `}
        >
          {getTranslation("Privacy", "Privacy")}
        </h3>

        <h3
          className={`AmericanSign   text-H2 font-normal text-light-button-base `}
        >
          {getTranslation("Policy", "Policy")}
        </h3>
      </div>

      {/* Content */}
      <div className="mt-10 flex w-full flex-col  px-[30px]  xl:px-[20px]   xl:px-[50px]  items-center justify-start">
        {/* Heading and content */}
        <div className="flex w-[90%] mx-auto xl:w-full flex-col items-start justify-start gap-4">
          <div
            className={`font-poppins text-lg font-normal   w-full    ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}

export default Privacypolicy;
