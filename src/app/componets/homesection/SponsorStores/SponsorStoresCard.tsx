"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import "./cardStyle.css";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import { TailSpin } from "react-loader-spinner";
import PriceRangeButton from "../../ReuseCompnets/PriceRangeButton";

function SponsorStoresCard({ data }) {
  console.log(" my card detail @@@@@@@@@@ ", data);
  const rating = data.totalAvgReview;
  const [isLiked, setIsLiked] = useState(data.isLike); // Track like state

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const [serviceLike] = useServicelikeMutation();
  const user_id = Cookies.get("user_id");


  const handleLikeToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();



    if (!user_id) {
      dispatch(showModal("loginModal"));
      return;
    }

    try {
      // Call API to toggle like status
      await serviceLike({ user_id, service_id: data.id });

      // Toggle the local like state
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);

      // Update Redux state
      dispatch(
        setLikeStatus({
          service_id: data.id,
          likeStatus: newLikeStatus ? 1 : 0,
        })
      );

      // Show success toast
      toast.success(
        newLikeStatus ? "You liked this item!" : "You disliked this item!"
      );
    } catch (error) {
      console.error("Error while toggling like status:", error);
      toast.error("Error while updating like status.");
    }
  };

  const router = useRouter();
  const handleCardClick = (serviceId, serviceName) => {
    setLoading(true);

    if (!serviceId || !serviceName) {
      console.error("Invalid serviceId or serviceName");
      return;
    }

    const encodedServiceId = encodeString(String(serviceId)); // Ensure serviceId is a string
    const serviceSlug = serviceName.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL slug

    console.log("Encoded Service ID:", encodedServiceId);

    // Navigate to the encoded route
    router.push(`/stores/${serviceSlug}/${encodedServiceId}`).then(() => setLoading(false));


    serviceId = decodeString(encodedServiceId);

    // Store in sessionStorage for later use
    sessionStorage.setItem("serviceId", serviceId);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);


  const Review = data.totalReviewCount;

  console.log("my card is dark id @@@@@@@@@@@@@@@@@@@ ", Review);

  return (
    <div
      className={`w-full h-auto  rounded-lg  relative cursor-pointer  flex flex-row  gap-2    bg-light-background dark:bg-dark-secondarybg  `}
      id="border-color"
      onClick={() => handleCardClick(data.id, data.service_name)}
    >
      {/* Image Section */}
      <div className=" w-[50%]  pl-[16px]  md:w-[35%]   h-[87%] my-auto relative">
        <div
          className=" w-full h-full"
          style={{
            backgroundImage: `url(${data.cover_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        ></div>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center  rounded-lg  bg-black justify-center bg-opacity-50">
            <TailSpin color="#226FE4" height={50} width={50} />
          </div>
        )}
        <div className="absolute left-4 top-4 w-fit  bg-light-button-base rounded-r-md px-1 md:px-2 ">
          <button className="text-white font-poppins py-1 text-T9 ">
            {data.category_name}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full py-[16px] md:w-[70%] h-full flex justify-center items-center flex-col   sm:rounded-xl relative ">
        <div className="flex flex-col w-full gap-1 md:gap-2 sm:pl-6 sm:pr-[16px] px-1">
          {/*  sponcer  */}

          <div className=" w-full flex justify-between items-center">
            <div className=" w-fit bg-[#FF2929] px-2 py-[4px] rounded-lg flex justify-center items-center gap-1">
              <Image
                src={featureicon}
                alt="feature icon"
                className="object-contain w-4 h-4"
              />
              <button className="text-white font-poppins    text-T9">
                Sponsored
              </button>
            </div>

            <div
              className={`group   flex    h-[30px] w-[30px] transform cursor-pointer items-center justify-center rounded-full       hearbgcolor`}
              onClick={handleLikeToggle}
            >
              {isLiked ? (
                <GoHeartFill className=" text-[#FF2929]  h-[50%]  w-[50%]" />
              ) : (
                <GoHeart className="  h-[50%]  w-[50%] text-black dark:text-dark-darkcolor " />
              )}
            </div>
          </div>
          {/* Avatar with details */}
          <div className="flex items-center gap-x-2">


            {data.vendor_image ? (
              <div
                className=" w-7 h-7 bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(${data.vendor_image})`,
                }}
              ></div>
            ) : (
              <div className="w-10 h-9 rounded-full bg-[#226FE475]   flex items-center justify-center text-black font-bold">
                {data.vendor_first_name?.[0]?.toUpperCase() || ""}
              </div>
            )}


            <div>
              <h5
                className={` font-poppins text-T8
                ${isDarkMode ? "text-white" : "text-[#212121]"}
              `}
              >
                {data.vendor_first_name} <span>{data.vendor_last_name}</span>
              </h5>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h3
              className={` text-B2  font-poppins  text-light-secondary   dark:text-dark-secondary "
                }
            }`}
            >
              {data.service_name}
            </h3>
          </div>

          {/* Ratings and Business Info */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 ">
              {[...Array(Math.floor(rating))].map((_, index) => (
                <MdOutlineStar
                  key={`full-${index}`}
                  className="text-[#FFA41C]"
                />
              ))}
              {rating % 1 !== 0 && <IoIosStarHalf className="text-[#FFA41C]" />}
              {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                <MdOutlineStar
                  key={`empty-${index}`}
                  className="text-[#D1D1D1]"
                />
              ))}
              <div>
                <p
                  className={` font-poppins  text-T9  line-clamp-1    text-light-darkcolor   dark:text-dark-darkcolor "
                    }`}
                >
                  ({Review} Review)
                </p>
              </div>
            </div>

            {/* <div>
              <p className="text-[#636363] font-poppins text-[10px] sm:text-sm line-clamp-1">
                {data.total_years_count} Years in Business
              </p>
            </div> */}
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            {/* Location Icon */}
            <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-[2px]">
              <Image
                src={locationicon}
                alt="Location Icon"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Address Text */}
            <p
              className={`font-poppins   text-T9 line-clamp-2 ${isDarkMode ? "text-white" : "text-[#636363]"
                }`}
            >
              {data.address}
            </p>
          </div>



          {/* Button */}
          <div className=" w-full justify-start items-start flex mt-1 ">
            <PriceRangeButton priceRange={data.price_range} />
          </div>
        </div>
      </div>
      {/* <ToastContainer/> */}
    </div>
  );
}

export default SponsorStoresCard;
