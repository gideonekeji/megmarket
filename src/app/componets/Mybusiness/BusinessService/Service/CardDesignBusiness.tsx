"use client";

import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import serviceicon from "../../../../../../public/assets/Image/servicelist.png"
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { updateStoreFailure, updateStoreSuccess } from "@/app/storeApp/Slice/UpdateStoreSlice";
import { useUpdateStoreMutation } from "@/app/storeApp/api/UpdateStoreApi";
import { useAppSelector } from "@/app/hooks/hooks";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import useTranslation from "@/app/hooks/useTranslation";

interface CardDesignBusinessProps {
  name: string;
  store_name: string;
  store_description: string;
  priceRange: string;
  mainImage: string;
  avatar: string;
  store_id: string;
  service_name: string;
}

const CardDesignBusiness: React.FC<CardDesignBusinessProps> = ({
  name,
  store_name,
  store_description,
  priceRange,
  mainImage,
  avatar,
  store_id,
  service_name,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getTranslation } = useTranslation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const service_id = Cookies.get("service_id");

  const [menuOpen, setMenuOpen] = useState(false);
  const [updateStore] = useUpdateStoreMutation();

  const handleStoreAction = async (id: string, modalType: "UpdateAddStoreModal" | "DeleteStoreModal") => {
    try {
      const response = await updateStore({ store_id: id });
      if (response.data && response.data.status) {
        dispatch(updateStoreSuccess({ store: response.data.store }));
        sessionStorage.setItem("Storeid", response.data.store.subcategory_id);
        sessionStorage.setItem("updatestorenamesubcategory", response.data.store.subcategory_name);
        dispatch(showModal(modalType));
      } else {
        dispatch(updateStoreFailure(`Failed to ${modalType.includes("Delete") ? "delete" : "update"} the store`));
      }
    } catch {
      dispatch(updateStoreFailure(`An error occurred while trying to ${modalType.includes("Delete") ? "delete" : "update"} the store`));
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!service_id || !service_name) return console.error("Invalid serviceId or serviceName");

    const encodedServiceId = encodeString(String(service_id));
    const serviceSlug = service_name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/stores/${serviceSlug}/${encodedServiceId}`);

    const decodedId = decodeString(encodedServiceId);
    sessionStorage.setItem("serviceId", decodedId);
  };

  return (
    <div
      className=" overflow-hidden w-full relative rounded-xl h-[382px] flex flex-col mb-2 shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div
        className="w-full rounded-t-xl  h-[265px] relative bg-cover bg-right-top"
        style={{ backgroundImage: `url(${mainImage})`, backgroundRepeat: "no-repeat" }}
      >
        {/* More Options Menu */}
        <div className="absolute top-3 right-3">


          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="p-2 bg-black/15 backdrop-blur-[1.66922378540039px] rounded-full "
          >
            <FiMoreVertical size={18} className="text-white" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-28 bg-white shadow-[3px_6px_10px_0px_#00000012] rounded-lg overflow-hidden z-20"
            >

              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100   text-T6"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  handleStoreAction(store_id, "UpdateAddStoreModal");
                }}
              >
                Edit
              </button>
              <hr />
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-T6"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  handleStoreAction(store_id, "DeleteStoreModal");
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div
        className={`w-full py-4 flex mt-[-1rem]  z-30 h-[182px] justify-center shadow-md   rounded-xl  items-center px-4 sm:px-6 ${isDarkMode ? "bg-[#2F2F2F]" : "bg-white"}`}
      >
        <div className="flex flex-col w-full gap-3">


          {/* Store Name */}
          <h3 className={`  xl:text-B2 text-xl  py-2 font-semibold font-poppins line-clamp-1 ${isDarkMode ? "text-white" : "text-black"}`}>
            {store_name}
          </h3>

          {/* Store Description */}
          <p
            className={`font-poppins text-[15px]  font-normal line-clamp-2 ${isDarkMode ? "text-[#FFFFFFBA]" : "text-[#636363]"}`}
            dangerouslySetInnerHTML={{ __html: store_description || "No description available." }}
          />

          {/* Price Range */}
          <div
            className={`w-full border-2 border-light-button-base px-4 py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer ${isDarkMode ? "bg-[#226FE42B]" : ""}`}
          >
            <button className="text-light-button-base font-medium font-poppins group-hover:text-white z-10 relative">
              {priceRange}
            </button>
            <div className="absolute top-0 left-0 w-full h-full bg-light-button-base transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDesignBusiness;
