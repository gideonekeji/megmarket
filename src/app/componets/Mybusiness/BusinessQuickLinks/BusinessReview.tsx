"use client";
import HeadingText from "@/app/componets/Profile/HeadingText";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import video from "../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import BusinessRevieweCard from "./BusinessRevieweCard";
import { useBusinessReview } from "@/app/storeApp/api/useBusinessReview";

function BusinessReview() {
  const user_id = Cookies.get("user_id");
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // State to manage current page
  const [page, setPage] = useState(1);
  const pageSize = 6; // Set to 6 cards per page

  // Modify API call to include pagination parameters
  const { data, error, isLoading } = useBusinessReview();

  // Log the API response data for debugging
  useEffect(() => {
    if (data) {
      // console.log("API Data:121212121212", data);
    }
  }, [data]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle the loading and error states
  if (isLoading) {
    return (
      <div className="w-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching reviews</div>;
  }

  // Calculate the total pages
  const totalPages = Math.ceil(data?.userReviews?.length / pageSize);

  // Handle the current reviews to display based on the current page
  const currentReviews = data?.userReviews.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="h-auto w-full  ">


      {totalPages === 0 ? (
        <div className="flex h-screen w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h2
              className={`font-poppins font-medium  ${isDarkMode ? "text-white" : "text-black"
                }`}
            >
              No Data Found
            </h2>
          </div>
        </div>
      ) : (
        <div>
          <div className="mt-[1rem] grid w-full   grid-rows-1 gap-6">
            {/* Render dynamic reviews */}
            {currentReviews?.map((review) => (
              <BusinessRevieweCard key={review.id} review={review} />
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessReview;
