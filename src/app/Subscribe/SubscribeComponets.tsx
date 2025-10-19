"use client";

import React, { useEffect } from "react";
import Header from "../componets/Category/Header";
import Heading from "../componets/Heading/Heading";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import SameTypeCard from "../componets/homesection/Section9/SameTypeCard";
import Card3 from "../componets/homesection/Section9/Card3";
import Card2 from "../componets/homesection/Section9/Card2";
import { useServicePlane } from "../storeApp/api/useserviceplane";
import { setSubscriptionPlan } from "../storeApp/Slice/subscriptionSlice";
import AvatarWithSpinner from "../componets/Loading/AvatarWithSpinner";
import Image from "next/image";
import video from "../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import Card4 from "../componets/homesection/Section9/Card4";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

function SubscribeComponets() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  // Use your API hook to fetch data
  const { data, isLoading, isError, error, refetch } = useServicePlane();

  // Dispatch the data to the Redux store when the data is successfully fetched
  useEffect(() => {
    if (data && !isLoading && !isError) {
      dispatch(setSubscriptionPlan(data)); // Assuming data matches the SubscriptionPlan shape
    }
  }, [data, isLoading, isError, dispatch]);

  // You can also handle loading and error states
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center  dark:bg-dark-background h-full w-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  // Check if the store list is empty
  if (data?.subscriptionDetail.length === 0) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center text-center">
        <div className="flex h-[8rem] w-[8rem] items-center justify-center">
          <Image src={video} alt="Loading animation" width={100} height={100} />
        </div>
        <h2
          className={`font-poppins font-medium  ${isDarkMode ? "text-white" : "text-black"
            }`}
        >
          No Service Found
        </h2>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div
      className={`h-auto w-full ${isDarkMode ? "bg-[#181818]" : "bg-white"}`}
    >
      {/* header  */}
      <div>
        <Header />
      </div>

      {/* heading */}
      <div className="mt-[3rem] w-full xl:mt-[5rem]">
        <Heading
          title="Our Pricing Plan"
          highlightedTitle=" Affordable price Packages"
        />
      </div>

 
      <div className="   mx-auto    mt-[4rem]  2xl:w-[68%]  w-[90%]">
        {/* Slider for all screen sizes */}
        <div className="w-full    2xl:hidden">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            slidesPerView={1} // default for mobile
            spaceBetween={20}
            className="w-full"
            breakpoints={{
              640: { slidesPerView: 1 },    // mobile
              768: { slidesPerView: 2 },    // tablets
              1024: { slidesPerView: 3 },   // laptops
            }}
          >
            <SwiperSlide><SameTypeCard /></SwiperSlide>
            <SwiperSlide><Card2 /></SwiperSlide>
            <SwiperSlide><Card3 /></SwiperSlide>
            <SwiperSlide><Card4 /></SwiperSlide>
          </Swiper>

        </div>

        <div className="hidden 2xl:grid   grid-cols-4 gap-6 ">
          <SameTypeCard />
          <Card2 />
          <Card3 />
          <Card4 />
        </div>
      </div>
    </div>
  );
}

export default SubscribeComponets;
