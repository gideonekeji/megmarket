import React, { useEffect } from "react";
import "./style.css";
import { IoMdStar } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useGetReview } from "@/app/storeApp/api/useGetReview";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

function MyreviewCard({ review, onClick }) {
  // Function to render stars based on the rating

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const renderStars = (rating) => {
    const filledStars = Array.from({ length: 5 }, (_, index) => {
      return index < rating ? (
        <IoMdStar key={index} className="text-[#FFA41C]" />
      ) : (
        <IoMdStar key={index} className="text-[#FFA41C] opacity-[40%]" />
      );
    });
    return filledStars;
  };

  const dispatch = useAppDispatch();
  const { refetch } = useGetReview();

  useEffect(() => {
    refetch();
  }, [refetch]);

  console.log("reviewreviewreviewreviewmonu", review);



  return (
    <div
      className="cardborder flex w-full cursor-pointer flex-col gap-3 rounded-lg p-3   bg-[#FFFFFF12]
"
      onClick={onClick}
    >
      {/* heading with star */}
      <div className="flex w-full flex-row items-center justify-between">
        <h2
          className={`font-poppins line-clamp-1   text-[16px] font-semibold  ${isDarkMode ? "text-white" : "text-black"
            }  `}
        >
          {review.service_name}
        </h2>
      </div>
      {/* sub heading */}
      <div className="flex w-full flex-row items-center justify-between">
        {/* rating */}
        <div className="flex gap-1">
          {renderStars(Number(review.review_star))}
        </div>

        <p
          className={`font-poppins    text-[12px]  font-normal line-clamp-3 text-[#B4B4B4] `}
        >
          {review.time_ago}
        </p>
      </div>

      {/* paragraph */}
      <div className="flex w-full items-start justify-start">
        <p
          className={`font-poppins text-T9    line-clamp-3 ${isDarkMode ? "text-white" : "text-[#535353]"
            } `}
        >
          {review.review_message}
        </p>
      </div>

      {/* btn delete and edit */}
      <div className="mx-auto flex w-[80%] items-center justify-between gap-4">
        {/* delete btn */}
        <button
          className="font-poppins w-full rounded-lg   bg-light-button-base   py-[6px] text-white "
          onClick={() => {
            dispatch(showModal("DeleteReviewModal"));
          }}
        >
          Delete
        </button>
        {/* edit btn */}
        <button
          className={`btnbordercolor font-poppins w-full rounded-lg py-[6px]     text-light-button-base
             `}
          onClick={() => {
            dispatch(showModal("EditReviewModal"));
          }}
        >
          Edit
        </button>
      </div>
    
    </div>
  );
}

export default MyreviewCard;
