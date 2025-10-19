"use client";
import HeadingText from "@/app/componets/Profile/HeadingText";
import MyreviewCard from "@/app/componets/Profile/Myreview/MyreviewCard";
import React, { useEffect, useState, useCallback } from "react";
import { useGetAllReviewQuery } from "@/app/storeApp/api/reviewApi/userreviewlist";
import Cookies from "js-cookie";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetReview } from "@/app/storeApp/api/useGetReview";
import video from "../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import useTranslation from "@/app/hooks/useTranslation";

function Myreview() {
  const user_id = Cookies.get("user_id");
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { getTranslation } = useTranslation();
  const { data, isLoading, error, refetch: refetreviewlist } = useGetReview();



  if (!isLoading && data?.reviewlist?.length > 0) {
    const reviewTime = new Date(data.reviewlist[0].created_at).toLocaleString();
    console.log("Formatted review time:", reviewTime);
  }


  // Memoized refetch to prevent unnecessary re-renders
  const refetchReviews = useCallback(() => {
    refetreviewlist();
  }, [refetreviewlist]);

  useEffect(() => {
    refetchReviews();
  }, [refetchReviews]);

  // State for pagination
  const [page, setPage] = useState(1);
  const pageSize = 6; // 6 cards per page

  // Log API response
  useEffect(() => {
    if (data) {
      console.log("Updated API Data:");
    }
  }, [data]);

  useEffect(() => {
    refetreviewlist(); // Force API call when page changes
  }, [page, refetreviewlist]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="w-full  ">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching reviews</div>;
  }

  // Ensure correct totalPages calculation
  const totalPages = Math.ceil(data?.totalReviews / pageSize);
  const currentReviews = data?.reviewlist || [];

  console.log(" my    total reviews  count: ", currentReviews.length);

  const handleCardClick = (id) => {
    Cookies.set("reviewid", id);
  };

  return (
    <div className="h-full w-full py-[2rem] px-[30px] xl:px-[20px]   xl:px-[50px] ">
      <div className="flex w-full items-center justify-center gap-4">
        <h3
          className={`AmericanSign   text-H2 font-normal  text-light-button-base  `}
        >
          {getTranslation("My", "My")}
        </h3>

        <h3
          className={`AmericanSign   text-H2 font-normal  text-light-button-base  `}
        >
          {getTranslation("Review", "Review")}
        </h3>
      </div>

      {currentReviews.length === 0 ? (
        <div className="flex  h-full  w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src="/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif"
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
      ) : (
        <div>
          <div className="mt-[3rem] grid w-full px-3 xl:px-0 grid-cols-1 md:grid-cols-2 gap-6">
            {currentReviews.map((review) => (
              <MyreviewCard
                key={review.id}
                review={review}
                onClick={() => handleCardClick(review.id)}
              />
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-6 flex hidden justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: isDarkMode ? "#FFFFFF" : "#212121", // text color
                    borderColor: isDarkMode ? "#555555" : "#CCCCCC", // border color
                    backgroundColor: isDarkMode ? "#212121" : "#FFFFFF", // bg color
                  },
                  "& .Mui-selected": {
                    backgroundColor: isDarkMode ? "#555555" : "#1976d2", // selected bg
                    color: "#FFFFFF",
                    borderColor: isDarkMode ? "#777777" : "#1976d2",
                  },
                  "& .MuiPaginationItem-root:hover": {
                    backgroundColor: isDarkMode ? "#333333" : "#f0f0f0",
                  },
                }}
              />
            </Stack>
          </div>

        </div>
      )}
    </div>
  );
}

export default Myreview;
