"use client";

import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { useState } from "react";
import Cookies from "js-cookie";
import { useFavouriteProperties } from "@/app/storeApp/api/LikeService";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import { useRouter } from "next/navigation";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import PriceRangeButton from "../../ReuseCompnets/PriceRangeButton";

const Section5card: React.FC<{ favorite: any }> = ({ favorite }) => {
  const [isLiked, setIsLiked] = useState(favorite.isLike); // Track like state
  const [serviceLike] = useServicelikeMutation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const featured = favorite.is_featured;
  const rating = favorite.totalAvgReview;
  const user_id = Cookies.get("user_id");
  const { data, error, isLoading, refetch } = useFavouriteProperties();
  const dispatch = useDispatch();

  const Demo = Cookies.get("demoUser") === "true";

  const handleLikeToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event propagation before API call and state changes



    try {
      // Call API to toggle like status
      await serviceLike({ user_id, service_id: favorite.id });

      // Toggle the local like state
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);

      // Dispatch the action to update the like status in Redux
      dispatch(
        setLikeStatus({
          service_id: favorite.id,
          likeStatus: newLikeStatus ? 1 : 0,
        })
      );

      // Show success message based on new like status
      if (newLikeStatus) {
        toast.success("You liked this item!");
      } else {
        toast.error("You disliked this item!");
      }

      // Refetch data to update any necessary state
      refetch();
    } catch (error) {
      console.error("Error while toggling like status:", error);
      toast.error("Error while updating like status.");
    }
  };

  const router = useRouter();

  const handleCardClick = (serviceId, serviceName, e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation to avoid triggering other click handlers
    if (!serviceId || !serviceName) {
      console.error("Invalid serviceId or serviceName");
      return;
    }

    const encodedServiceId = encodeString(String(serviceId)); // Ensure serviceId is a string
    const serviceSlug = serviceName.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL slug

    console.log("Encoded Service ID:", encodedServiceId);

    // Navigate to the encoded route
    router.push(`/stores/${serviceSlug}/${encodedServiceId}`);

    serviceId = decodeString(encodedServiceId);

    // Store in sessionStorage for later use
    sessionStorage.setItem("serviceId", serviceId);
  };

  console.log(" image url ", favorite?.vendor_image);

  return (
    <div
      className={`h-[26rem]  cursor-pointer overflow-hidden w-full relative rounded-xl flex flex-col shadow-md    ${isDarkMode ? "bg-[#2F2F2F] " : "bg-[#ffffff] "
        } `}
      onClick={(e) => handleCardClick(favorite.id, favorite.service_name, e)}
    >
      {/* Image Section */}
      <div
        className="relative w-full   h-full  xl:h-[50%]   rounded-t-xl bg-cover"
        style={{
          backgroundImage: `url(${favorite.service_images})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top-left button */}


        <div className="absolute left-0 top-2 w-fit  bg-light-button-base rounded-r-md px-1 md:px-2 ">
          <button className="text-white font-poppins py-1 text-T9 ">
            {favorite.category_name}
          </button>
        </div>

        {/* Top-right heart icon */}



        <div
          className="absolute   hearbgcolor right-3 group top-2 h-[32px] w-[32px] rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleLikeToggle} // Add click event handler
        >
          {/* Conditionally render the heart icon based on isLiked */}
          {isLiked ? (
            <GoHeartFill className="h-[50%]  w-[50%] text-[#FF2929]" />
          ) : (
            <GoHeart className="h-[50%]  w-[50%] text-black   dark:text-dark-darkcolor transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full h-full  xl:h-[60%] mt-[-1rem]    bg-light-background   dark:bg-dark-secondarybg shadow-md  z-30   flex justify-center items-center rounded-xl relative">

        {/* Top-right feature badge */}
        {featured == 1 && (
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
        )}

        <div className="flex w-full flex-col gap-3 px-4 xl:px-6">
          {/* Avatar with detail */}
          <div className="flex items-center gap-x-2">



            {favorite?.vendor_image ? (
              <div
                className=" w-7 h-7 bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(${favorite?.vendor_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "50%",
                }}
              ></div>
            ) : (
              <div className="w-8 h-7  rounded-full bg-[#226FE475]   flex items-center justify-center text-black font-bold">
                {favorite.vendor_first_name?.[0]?.toUpperCase() || ""}
              </div>
            )}

            <div>
              <h5
                className={`font-poppins flex gap-1 text-T8 ${isDarkMode ? "text-white" : "text-[#212121]"
                  }`}
              >
                {`${favorite.vendor_first_name} ${favorite.vendor_last_name}`}
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
              {favorite.service_name}
            </h3>
          </div>

          {/* Ratings and Business Info */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-center gap-1">
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
                  ({favorite.totalReviewCount})
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <p className="font-poppins line-clamp-1 text-[12px] font-medium text-[#636363] xl:text-sm">
                {favorite.last_name}
              </p>
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
              {favorite.address}
            </p>
          </div>

          {/* Button */}


          <div className="  w-full">
            <PriceRangeButton priceRange={favorite.price_range} />
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Section5card;
