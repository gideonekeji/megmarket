'use client'

import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationhome.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

import Image from "next/image";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import Cookies from "js-cookie";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import PriceRangeButton from "../../ReuseCompnets/PriceRangeButton";

const GridCard = ({
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
  isLike, // this can be passed as a prop, indicating the initial like state
  service_id,
  onclicknavigate,
  isLoadingloader,
}) => {
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();
  const likeStatus = useSelector((state: any) => state.likeStatus[service_id]);
  const [localLikeStatus, setLocalLikeStatus] = useState(likeStatus ?? isLike);
  const [islike] = useServicelikeMutation();

  console.log(" all avatar image", avatar);

  const Demo = Cookies.get("demoUser") === "true";

  const handleLike = useCallback(
    (event) => {
      event.stopPropagation(); // Prevent event bubbling to parent div
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

  const router = useRouter();



  console.log("featuredhisd", featured)

  return (
    <div
      className={`h-[26rem]  cursor-pointer overflow-hidden w-full relative rounded-xl flex flex-col shadow-md    ${isDarkMode ? "bg-[#2F2F2F] " : "bg-[#ffffff] "
        } `}
      onClick={onclicknavigate}
    >
      {/* Image Section */}
      <div
        className="relative w-full   h-full  xl:h-[50%]   rounded-t-xl bg-cover"
        style={{
          backgroundImage: `url(${service_images?.src || ""})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Loading Spinner */}
        {isLoadingloader && (
          <div className="absolute inset-0  flex items-center justify-center  bg-black  bg-opacity-50">
            <TailSpin color="#FFFFFF" height={50} width={50} />
          </div>
        )}
        {/* Category Button */}
        <div className="absolute left-0 top-2 w-fit  bg-light-button-base rounded-r-md px-1 md:px-2 ">
          <button className="text-white font-poppins py-1 text-T9 ">
            {category}
          </button>
        </div>

        {/* Like Button */}

        <div
          className="absolute   hearbgcolor right-3 group top-4 h-[32px] w-[32px] rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleLike} // Add click event handler
        >
          {/* Conditionally render the heart icon based on isLiked */}
          {localLikeStatus ? (
            <GoHeartFill className="h-[50%]  w-[50%] text-[#FF2929]" />
          ) : (
            <GoHeart className="h-[50%]  w-[50%] text-black   dark:text-dark-darkcolor transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full h-full  xl:h-[60%] mt-[-1rem]    bg-light-background   dark:bg-dark-secondarybg shadow-md    flex justify-center items-center rounded-xl relative">

        {featured == 1 ? (
          <div className="absolute right-4 h-auto  top-[-1rem] w-fit  rounded-lg flex justify-center items-center">
            <div className=" w-fit bg-[#FF2929] px-[10px] py-[4px] rounded-lg flex justify-center items-center gap-1">
              <Image
                src={featureicon}
                alt="feature icon"
                className="object-contain w-4 h-4"
              />
              <button className="text-white font-poppins    text-T9">
                Sponsored
              </button>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col w-full  gap-3 md:gap-3  py-[1px] px-4">
          {/* Avatar */}
          <div className="flex items-center gap-x-2">


            {avatar ? (
              <div
                className=" w-7 h-7 bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(${avatar})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ) : (
              <div className="w-8 h-7  rounded-full bg-[#226FE475]   flex items-center justify-center text-black font-bold">
                {name?.[0]?.toUpperCase() || ""}
              </div>
            )}


            {/* <div
              className="w-10 h-10 rounded-full"
              style={{
                backgroundImage: `url(${avatar || ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div> */}
            <div>
              <h5
                className={` font-poppins text-T8
                ${isDarkMode ? "text-white" : "text-[#212121]"}
              `}
              >
                {name}
              </h5>
            </div>
          </div>

          {/* Service Name */}
          <div>
            <h3
              className={` text-B2  font-poppins  text-light-secondary   dark:text-dark-secondary "
                }
            }`}
            >
              {service_name}
            </h3>
          </div>

          {/* Ratings and Business Info */}
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-1">
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
                  ({reviews})
                </p>
              </div>
            </div>

          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            {/* Location Icon */}
            <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-[-0.2rem] ">
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
              {location}
            </p>
          </div>

          {/* Price Range Button */}
          <div className="  w-full">
            <PriceRangeButton priceRange={priceRange} />
          </div>
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default GridCard;
