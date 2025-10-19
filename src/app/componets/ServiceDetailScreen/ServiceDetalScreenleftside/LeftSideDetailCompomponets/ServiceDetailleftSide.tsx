"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowright from "../../../../../../public/assets/Image/arrow-right.png";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import video from "../../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import { useAppSelector } from "@/app/hooks/hooks";
import { setCards } from "@/app/storeApp/Slice/cardsSlice";
import { usePathname } from "next/navigation";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import useTranslation from "@/app/hooks/useTranslation";

function ServiceDetailleftSide() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const lastSegment = decodeString(lastSegment1);

  const { data, error, isLoading } = useServiceDetailApi(lastSegment);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { getTranslation } = useTranslation();

  const storedata = data?.stores;
  const [showAll] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const displayedStores = storedata;

  const handleStoreDetail = (store: any) => {
    dispatch(setCards([store]));
    dispatch(showModal("StoresDetailModal"));
  };

  return (
    <div
      className={`w-full h-auto rounded-xl p-4 flex flex-col ${isDarkMode
        ? "text-white bg-[#2F2F2F]"
        : "text-black photoservicedetailborderandshado"
        }`}
    >
      <div className="text-lg font-medium items-start xl:text-T4 font-poppins">
        {getTranslation("Services", "Services")}
      </div>

      {displayedStores?.slice(0, 3).map((store) => (
        <div
          key={store.id}
          className={`w-full h-32 rounded-xl p-2 cursor-pointer flex mt-3 ${isDarkMode
            ? "text-white bg-[#FFFFFF05]"
            : "text-black bordercolorcard"
            }`}
          onClick={() => handleStoreDetail(store)}
        >
          <div
            className="w-[25%] rounded-xl h-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${store.store_images[0] || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="w-full flex flex-col items-center p-4 gap-4">
            <div className="w-full flex justify-between items-center">
              <div className="text-sm font-poppins font-medium text-light-button-base">
                {store.store_name}
              </div>
              <Image
                src={arrowright}
                alt="right-arrow"
                className="w-4 h-4 object-center"
              />
            </div>

            <div className="w-full flex justify-start items-start">
              <p
                className={`font-poppins line-clamp-3 text-sm 
                  [&_ul]:list-disc [&_ul]:list-inside 
                  [&_ol]:list-decimal [&_li]:ml-4
                  ${isDarkMode ? "text-white" : "text-[#535353]"}
                `}
                dangerouslySetInnerHTML={{ __html: store.store_description }}
              ></p>
            </div>
          </div>
        </div>
      ))}

      {displayedStores?.length === 0 && (
        <div className="flex h-auto min-h-[20rem] w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2
            className={`font-poppins font-medium ${isDarkMode ? "text-white" : "text-black"
              }`}
          >
            No Data Found
          </h2>
        </div>
      )}

      {(displayedStores ?? []).length > 3 && (
        <div className="w-full flex justify-center items-center mt-4">
          <button
            onClick={() =>
              dispatch(showModal("ServiceDetailScreenFiltterModal"))
            }
            className="text-light-button-base font-poppins font-medium btnbordercolor px-8 py-2 rounded-md"
          >
            {showAll ? "Close" : "All Services "}
          </button>
        </div>
      )}
    </div>
  );
}

export default ServiceDetailleftSide;
