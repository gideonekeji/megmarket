"use client"; // Required for Next.js client-side rendering

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import starIcon from "../../../../../public/assets/Image/starindetailscreen.png";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useUserEditReview,
  useUpdateReview,
} from "@/app/storeApp/api/reviewApi/userEditReview";
import "./style.css";
import Cookies from "js-cookie";
import { useGetReview } from "@/app/storeApp/api/useGetReview";

const EditReviewModal = () => {
  const modalData = useAppSelector((state) => state.modals.EditReviewModal);
  const dispatch = useAppDispatch();
  const user_id = Cookies.get("user_id");
  const review_id = Cookies.get("reviewid");
  const { refetch: userlistrefetch } = useGetReview();

  // Fetch and update data
  const { data, refetch } = useUserEditReview();
  const updateReview = useUpdateReview();

  // State for selected stars and review message
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");

  // Load data into state when modal opens
  useEffect(() => {
    if (modalData && data?.reviewdata) {
      setSelectedStars(data.reviewdata.review_star || 0);
      setReviewMessage(data.reviewdata.review_message || "");
    }
  }, [modalData, data]);

  // Close modal function
  const close = () => {
    dispatch(hideModal("EditReviewModal"));
  };

  // Handle star selection
  const handleStarClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  // Handle message change
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewMessage(e.target.value);
  };


  const Demo = Cookies.get("demoUser") === "true";

  const [isSubmitting, setIsSubmitting] = useState(false);



  // Handle review update
  const handleSubmit = async () => {
    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }

    if (!data?.reviewdata?.service_id) {
      toast.error("Error: Missing review data.");
      return;
    }
    setIsSubmitting(true); // start loading

    userlistrefetch(); // Ensure user list is refreshed when review is updated

    try {
      await updateReview.mutateAsync(
        {
          user_id: user_id,
          id: review_id,
          service_id: data.reviewdata.service_id,
          review_star: selectedStars,
          review_message: reviewMessage,
        },
        {
          onSuccess: () => {
            toast.success("Review updated successfully!");
            refetch(); // Ensure updated data is fetched
            userlistrefetch(); // Ensure user list is refreshed when review is updated
            close();
          },
          onError: () => {
            toast.error("Failed to update review. Please try again later.");
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false); // stop loading
    }
    userlistrefetch(); // Ensure user list is refreshed when review is updated
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 bg-black bg-opacity-55 backdrop-blur-sm flex items-center justify-center">
        <DialogPanel
          className={`relative mx-auto w-[90%] sm:w-[80%] xl:w-[70%] 2xl:w-[30%] rounded-2xl shadow-lg  ${isDarkMode ? "bg-[#2F2F2F]" : "bg-white"
            }`}
        >
          {/* Modal Header */}
          <div
            className={`flex justify-center p-4 rounded-xl ${isDarkMode ? "bg-[#FFFFFF0A]" : "borderxcolorwithshado"
              }`}
          >
            <h3
              className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-black"
                }`}
            >
              Ratings
            </h3>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 text-2xl text-light-button-base hover:bg-gray-400"
            onClick={close}
            aria-label="Close"
          >
            <IoClose />
          </button>

          {/* Modal Body */}
          <div className="flex flex-col items-center gap-6 p-4">
            <h4
              className={`text-lg font-medium ${isDarkMode ? "text-white" : "text-black"
                }`}
            >
              Start Your Review
            </h4>

            {/* Star Rating */}
            <div className="flex justify-center gap-4">
              {[...Array(5)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStarClick(idx)}
                  className={`h-12 w-12 flex items-center justify-center rounded-lg p-1 transition-all ${selectedStars > idx ? "bg-yellow-500" : "bg-[#E8E8E8]"
                    }`}
                >
                  <Image src={starIcon} alt="star" width={24} height={24} />
                </button>
              ))}
            </div>

            {/* Message Input */}
            <textarea
              placeholder="Write your review..."
              value={reviewMessage}
              onChange={handleMessageChange}
              className={`w-[80%] h-[10rem]   px-4 py-2 mt-4 rounded-lg resize-none border ${isDarkMode
                ? "bg-[#FFFFFF0A] border-light-button-base text-white"
                : "bg-white border-gray-300 text-black"
                } focus:outline-none dark:focus:ring-0 focus:ring-2 focus:ring-light-button-base`}
            />

            {/* Submit Button */}
            <button
              disabled={isSubmitting}
              className={`h-12 px-6 text-lg font-medium text-white bg-light-button-base rounded-md transition-all 
    ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#003B89]"}`}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>

          </div>
        </DialogPanel>
      </div>

    </Dialog>
  );
};

export default EditReviewModal;
