"use client";

import React, { useEffect, useState } from "react";
import detailscreenimage from "../../../../../../public/assets/Image/detailscreenbgimage.png";
import { GoHeart, GoHeartFill } from "react-icons/go";
import SecondSection from "./SecondSection";
import Image from "next/image";
import featureicon from "../../../../../../public/assets/Image/cardsection5iconfeacture.png";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setVendorServiceDetails } from "@/app/storeApp/Slice/ServiceDetail/ServiceDetailScreenSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { ToastContainer, toast } from "react-toastify";
import { decodeString } from "@/app/utils/enocodeAndDecode";

function FirstSection() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const service_id = decodeString(lastSegment1);
  const dispatch = useDispatch();
  const user_id = Cookies.get("user_id");

  // Fetch service details
  const { data, error, isLoading, refetch } = useServiceDetailApi(service_id);

  // Store vendor ID in cookies when data is available
  useEffect(() => {
    if (data?.vendor) {
      Cookies.set("from_user_id", data.vendor.toString());
    }
  }, [data]);

  // Update Redux store when service details are fetched
  useEffect(() => {
    if (data && !isLoading && !error) {
      dispatch(setVendorServiceDetails(data));
    }
  }, [data, dispatch]);

  const ServiceDetailData = useAppSelector((state) => state.serviceDetail);

  // Get like status directly from Redux
  const currentLikeStatus = ServiceDetailData.serviceDetail.isLike;
  console.log(" my current like status", currentLikeStatus);

  // Determine if the service is liked
  const isLiked = currentLikeStatus === 1; // Derive state directly from Redux

  const [serviceLike] = useServicelikeMutation();

  const Demo = Cookies.get("demoUser") === "true";

  const handleLikeToggle = async () => {
    // if (Demo) {
    //   toast.error("This action is disabled in the demo version.");
    //   return;
    // }
    if (!user_id) {
      dispatch(showModal("loginModal"));
      return;
    }

    try {
      const service_id = ServiceDetailData.serviceDetail.id;
      const newLikeStatus = isLiked ? 0 : 1; // Toggle like status

      // Call the like/unlike API
      await serviceLike({
        user_id: user_id,
        service_id: service_id,
        likeStatus: newLikeStatus,
      });

      // Update Redux store
      dispatch(setLikeStatus({ service_id, likeStatus: newLikeStatus }));

      // Show success messages
      toast.success(
        newLikeStatus === 1
          ? "Service liked successfully!"
          : "Service disliked!"
      );

      // Refetch data to get updated details
      refetch();
    } catch (error) {
      console.error("Error liking/disliking service:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  console.log(
    " my api responce value from detail screnn ",
    data?.serviceDetail.is_featured
  );

  const issponosor = data?.serviceDetail.is_featured;

  console.log(" my sponce values is monufdfsf ", issponosor);
  return (
    <div className="w-full h-[40rem] xl:h-[45rem] relative">
      {/* Background image */}
      <div
        className="w-full h-[20rem] md:h-[25rem] xl:h-[28.5rem] cursor-pointer rounded-t-[1rem]"
        style={{
          backgroundImage: `url(${ServiceDetailData.serviceDetail?.cover_image || detailscreenimage
            })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Right side heart icon */}
     
        <div
          className={`group   flex   absolute right-3 top-4   h-[30px] w-[30px] transform cursor-pointer items-center justify-center rounded-full       hearbgcolor`}
          onClick={handleLikeToggle}
        >
          {isLiked ? (
            <GoHeartFill className=" text-[#FF2929]  h-[50%]  w-[50%]" />
          ) : (
            <GoHeart className="  h-[50%]  w-[50%] text-black dark:text-dark-darkcolor " />
          )}
        </div>
      </div>

      {/* Featured section */}
      {issponosor === 1 && (
        <div className="absolute right-5   md:right-91 h-auto bg-[#FF2929] bottom-[50%] md:bottom-[37%] z-10 w-fit px-3 py-[7px] rounded-lg flex justify-center items-center">
          <Image
            src={featureicon || detailscreenimage}
            alt="feature icon"
            className="object-contain w-4 h-4"
          />
          <button className="text-white font-poppins   text-T12">Sponsored</button>
        </div>
      )}

      {/* Second Section */}
      <div className="w-full h-[20rem] md:h-[17rem] absolute bottom-2 md:bottom-1">
        <SecondSection />
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default FirstSection;
