"use client";
import featureicon from "../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../public/assets/Image/locationhome.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import { useDispatch } from "react-redux";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import { TailSpin } from "react-loader-spinner";
import PriceRangeButton from "../ReuseCompnets/PriceRangeButton";
const Section5card = ({ data }) => {
  const [isLiked, setIsLiked] = useState(data.isLike); // Track like state

  const dispatch = useDispatch();
  const [serviceLike] = useServicelikeMutation();
  const user_id = Cookies.get("user_id");

  const Demo = Cookies.get("demoUser") === "true";

  const handleLikeToggle = async (e) => {
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

    try {
      // Call API to toggle like status
      await serviceLike({ user_id, service_id: data.id });

      // Toggle the local like state
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);

      // Dispatch the action to update the like status in Redux
      dispatch(
        setLikeStatus({
          service_id: data.id,
          likeStatus: newLikeStatus ? 1 : 0,
        })
      );

      // Show success message based on new like status
      toast.success(
        newLikeStatus ? "You liked this item!" : "You disliked this item!"
      );
    } catch (error) {
      console.error("Error while toggling like status:", error);
      toast.error("Error while updating like status.");
    }
  };

  const rating = data.totalAvgReview;

  const [loading, setLoading] = useState(false);

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
    router
      .push(`/stores/${serviceSlug}/${encodedServiceId}`)
      .finally(() => setLoading(false));

    serviceId = decodeString(encodedServiceId);

    // Store in sessionStorage for later use
    sessionStorage.setItem("serviceId", serviceId);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my card data detail ", data);

  const is_featured = data.is_featured;

  return (
    <div
      className="    h-[24rem] md:h-[26rem]   cursor-pointer   overflow-hidden  w-full relative rounded-xl flex flex-col  shadow-md         "
      onClick={() => handleCardClick(data.id, data.service_name)}
    >
      {/* Image Section (60% height of parent) */}
      <div
        className="relative w-full h-[60%]  md:h-[50%] rounded-t-xl"
        style={{
          backgroundImage: `url(${data.cover_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <TailSpin color="#ffffff" height={50} width={50} />
          </div>
        )}
        {/* Top-left button */}
        <div className="absolute left-0 top-4 w-fit  bg-light-button-base rounded-r-md px-1 md:px-2 ">
          <button className="text-white font-poppins py-1 text-T9 ">
            {data.category_name}
          </button>
        </div>

        {/* Top-right heart icon */}
        <div
          className="absolute   hearbgcolor right-3 group top-4 h-[32px] w-[32px] rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
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

      {/* Content Section (40% height of parent) */}
      <div
        className={`w-full h-[65%]   relative  mt-[-1rem]  z-30    bg-light-background dark:bg-dark-secondarybg shadow-md   md:h-[70%] lg:h-[50%] xl:h-[55%]    flex justify-center items-center rounded-xl  `}
      >
        {/* top right */}
        {is_featured == 0 ? (
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

        <div className="flex flex-col w-full gap-3  xl:px-6 px-4">
          {/* Avatar with detail */}
          <div className="flex items-center  gap-x-2">

            {/* 
            {data.vendor_image ? (
              <div
                className="md:w-10 md:h-10 w-7 h-7 bg-cover bg-center rounded-full"
                style={{
                  backgroundImage: `url(${data.vendor_image})`,
                }}
              ></div>
            ) : (
              <div className="w-10 h-9 rounded-full bg-[#226FE475]   flex items-center justify-center text-black font-bold">
                {data.vendor_first_name?.[0]?.toUpperCase() || ""}
              </div>
            )} */}


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
          <div className="flex items-center w-full  justify-between">
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
                  ({data.totalReviewCount} Review)
                </p>
              </div>
            </div>

            {/* <div className="flex items-center justify-center">
              <p className="font-medium font-poppins text-[#636363] text-[12px] xl:text-sm line-clamp-1">
                {data.total_years_count}
              </p>
            </div> */}
          </div>

          {/* Location */}

          {/* <div className="flex gap-2 w-full">
            <div className="w-6 h-6">
              <Image
                src={locationicon}
                alt="Location icon"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full">
              <p
                className={` font-poppins font-normal text-sm line-clamp-2  ${isDarkMode ? "  text-white " : " text-[#636363] "
                  }`}
              >
                {data.address}
              </p>
            </div>
          </div> */}


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
              {data.address}
            </p>
          </div>

          {/* Button */}
          <div>
            <PriceRangeButton priceRange={data.price_range} />
          </div>

        </div>
      </div>
      {/* <ToastContainer position="top-right" autoClose={5000} /> */}
    </div>
  );
};

export default Section5card;
