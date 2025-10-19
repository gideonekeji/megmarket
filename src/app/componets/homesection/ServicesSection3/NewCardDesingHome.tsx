"use client";
import React, { useState } from "react";
import "./cardStyle.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import { TailSpin } from "react-loader-spinner"; // Import the loader
import { sessionService } from "@/app/utils/sessionService.ts";

function NewCardDesingHome({ total, title, category_image, subCategoryId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const [loading, setLoading] = useState(false);


  const [location, setLocation] = useState(
    sessionService.getRecentLocation() || ""
  );

  const handleCardClick = () => {
    setLoading(true); // Show loading spinner

    dispatch(
      setSelectedCategoryListing({
        id: subCategoryId,
        category_name: title,
      })
    );

    sessionStorage.setItem("Category_Name", title);

    const encodedServiceId = encodeString(String(subCategoryId));
    const cid = decodeString(encodedServiceId);
    sessionStorage.setItem("Category_ID", cid);


    const slugname = title.toLowerCase().replace(/\s+/g, "-");


    const sluglocation = (location ?? "")
      .toLowerCase()
      .trim()
      .replace(/,/g, "")
      .replace(/\s+/g, "-");
    const encodedId = encodeString(String(subCategoryId));

    setTimeout(() => {
      // router.push(`/store`);
      router.push(`${sluglocation}/${slugname}/${encodedId}/store`);

      setLoading(false);
    }, 1000);
  };

  return (
    <div
      className="  w-full h-[195px] 3xl:h-[220px] flex flex-col gap-1 overflow-x-hidden justify-between items-center cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Card Image Section */}
      <div
        className={`w-full  h-[147px] 3xl:h-[175px] flex justify-center items-center rounded-lg 
          `}
      >
        {loading ? (
          <TailSpin
            color={isDarkMode ? "#fff" : "#226FE4"}
            height={40}
            width={40}
          />
        ) : (
          <div
            className="w-[100%] h-[100%] bg-cover  rounded-lg"
            style={{
              backgroundImage: `url(${category_image})`,
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        )}
      </div>

      {/* Card Content Section */}
      <div className="w-full h-[40px]   flex justify-center items-center text-center px-1">
        <p className=" text-T7  font-poppins  dark:text-dark-darkcolor line-clamp-2">
          {title}
        </p>
      </div>

    </div>
  );
}

export default NewCardDesingHome;