"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import "./style.css"; // Ensure the styles are correctly applied
import { useAppSelector } from "@/app/hooks/hooks";
import { TailSpin } from "react-loader-spinner";
import PriceRangeButton from "../../ReuseCompnets/PriceRangeButton";

function ListCard({
  service_images,
  category,
  avatar,
  name,
  service_name,
  reviews,
  yearsInBusiness,
  location,
  priceRange,
  featured,
  rating,
  isLike,
  service_id,
  onclicknavigate,
  isLoadingloader,
}) {
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();
  const likeStatus = useSelector((state) => state.likeStatus[service_id]);
  const [localLikeStatus, setLocalLikeStatus] = useState(likeStatus ?? isLike);
  const [islike] = useServicelikeMutation();

  console.log(" my like  service: ", localLikeStatus);

  const Demo = Cookies.get("demoUser") === "true";
  const handleLike = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // if (Demo) {
      //   toast.error("This action is disabled in the demo version.");
      //   return;
      // }
      if (!user_id) {
        dispatch(showModal("loginModal"));
        return;
      }

      const action = localLikeStatus === 1 ? "dislike" : "like";

      islike({ user_id, service_id, action }).then((response) => {
        if (response?.data?.status) {
          const newLikeStatus = action === "like" ? 1 : 0;
          setLocalLikeStatus(newLikeStatus);
          dispatch(setLikeStatus({ service_id, likeStatus: newLikeStatus }));

          if (action === "like") {
            toast.success("Service liked successfully!");
          } else {
            toast.error("Service disliked!");
          }
        } else {
          toast.error("Failed to update the service's like status.");
        }
      });
    },
    [user_id, localLikeStatus, service_id, islike, dispatch]
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (

    <div
      className={`w-full h-auto rounded-lg relative cursor-pointer flex flex-row gap-3 p-3 bg-light-background dark:bg-dark-secondarybg`}
      id="border-color"
      onClick={onclicknavigate}
    >
      {/* Image Section */}
      <div className="w-[65%] md:w-[30%] relative">
        <div
          className="h-full w-full rounded-lg"
          style={{
            backgroundImage: `url(${service_images?.src || ""})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        {isLoadingloader && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <TailSpin color="#FFFFFF" height={50} width={50} />
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute left-0 top-4 w-fit bg-light-button-base rounded-r-md px-2  py-[2px]  md:py-1">
          <button className="text-white font-poppins  text-T9">{category}</button>
        </div>

        {/* Heart Icon */}
        <div
          className="absolute  top-4 md:top-3 right-1 md:right-3 h-[30px] w-[30px] bg-[#FFFFFF3D] rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 hover:scale-110"
          onClick={handleLike}
        >
          {localLikeStatus === 1 ? (
            <GoHeartFill className="text-[#FF2929] h-[50%] w-[50%]" />
          ) : (
            <GoHeart className="h-[50%] w-[50%] text-black dark:text-dark-darkcolor" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full    md:w-[70%] flex flex-col justify-center relative gap-3">
        {/* Sponsor Badge */}
        {featured === "sponosor " && (
          <div className="absolute right-[-1rem]  md:right-2 top-[-1.8rem] md:top-2 w-fit bg-[#FF2929] px-2 py-1 rounded-lg flex items-center gap-1">
            <Image
              src={featureicon}
              alt="feature icon"
              className="object-contain w-4 h-4"
            />
            <button className="text-white font-poppins text-T9">{featured}</button>
          </div>
        )}

        {/* Avatar and Name */}
        <div className="flex items-center gap-2">
          {avatar ? (
            <div
              className="w-8 h-8 bg-cover bg-center rounded-full"
              style={{ backgroundImage: `url(${avatar})` }}
            ></div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#226FE475] flex items-center justify-center text-black font-bold">
              {name?.[0]?.toUpperCase() || ""}
            </div>
          )}
          <h5
            className={`font-poppins text-T8 ${isDarkMode ? "text-white" : "text-[#212121]"}`}
          >
            {name}
          </h5>
        </div>

        {/* Service Name */}
        <h3 className=" text-[16px] font-medium md:text-B2 font-poppins text-light-secondary dark:text-dark-secondary">
          {service_name}
        </h3>

        {/* Ratings */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1">
            {[...Array(Math.floor(rating))].map((_, index) => (
              <MdOutlineStar key={`full-${index}`} className="text-[#FFA41C]" />
            ))}
            {rating % 1 !== 0 && <IoIosStarHalf className="text-[#FFA41C]" />}
            {[...Array(5 - Math.ceil(rating))].map((_, index) => (
              <MdOutlineStar key={`empty-${index}`} className="text-[#D1D1D1]" />
            ))}
            <p className="font-poppins text-T9 text-light-darkcolor dark:text-dark-darkcolor">
              ({reviews})
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
            <Image
              src={locationicon}
              alt="Location Icon"
              className="w-full h-full object-contain"
            />
          </div>
          <p
            className={`font-poppins text-T9 line-clamp-2 ${isDarkMode ? "text-white" : "text-[#636363]"
              }`}
          >
            {location}
          </p>
        </div>

        {/* Price Range Button */}
        <div className=" w-full  md:w-[50%]">
          <PriceRangeButton priceRange={priceRange} />
        </div>
      </div>
      <ToastContainer />
    </div>

  );
}

export default ListCard;
