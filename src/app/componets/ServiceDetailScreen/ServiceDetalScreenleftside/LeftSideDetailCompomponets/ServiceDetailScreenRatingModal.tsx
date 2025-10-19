"use client"; // This is important for Next.js to handle client-side rendering

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import staricon from "../../../../../../public/assets/Image/starindetailscreen.png";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAddReviewScreenApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useAddReviewScreenApi";
import { toast } from "react-toastify";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { usePathname } from "next/navigation";
import { decodeString } from "@/app/utils/enocodeAndDecode";

const ServiceDetailScreenRatingModal = () => {
  const modalData = useAppSelector(
    (state) => state.modals.ServiceDetailScreenRatingModal
  );
  const dispatch = useAppDispatch();
  const user_id = Cookies.get("user_id");
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const service_id = decodeString(lastSegment1);;
  const { refetch } = useServiceDetailApi(service_id);

  // Use the mutate function from useMutation
  const { mutate, isLoading } = useAddReviewScreenApi();

  const close = () => {
    dispatch(hideModal("ServiceDetailScreenRatingModal"));
  };

  // State for selected stars and review message
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");

  // Handle star click
  const handleStarClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  // Handle review message input
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewMessage(e.target.value);
  };



  const Demo = Cookies.get("demoUser") === "true";

  const handleSubmit = async () => {

    if (Demo) {
      toast.error("This action is disabled in the demo version.");
      return;
    }
    refetch();

    // Validation to ensure a rating and review message are provided
    if (!selectedStars || !reviewMessage.trim()) {
      toast.error("Please provide a rating and a review message.");
      return;
    }

    try {
      // Submit the review using the mutate function from the API hook
      await mutate(
        {
          service_id,
          user_id,
          review_star: String(selectedStars),
          review_message: reviewMessage,
        },
        {
          onSuccess: (data) => {
            console.log("API Success Response:", data);
            toast.success("Review submitted successfully!");
            refetch();
            close();
          },
          onError: (error) => {
            console.error(
              "API Error Response:",
              error?.response?.data || error
            );
            toast.error(
              error?.response?.data?.message ||
              "Something went wrong. Please try again."
            );
          },
        }
      );
    } catch (error) {
      console.error("Unexpected API Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl flex flex-col gap-6 shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[80%] xl:w-[70%] 2xl:w-[30%]   ${isDarkMode ? " bg-[#2F2F2F]" : "bg-white "
              } `}
          >
            {/* Modal Header */}
            <div
              className={`flex h-auto w-full items-center justify-center rounded-xl p-4  ${isDarkMode ? "  bg-[#FFFFFF0A]" : " borderxcolorwithshado  "
                }`}
            >
              <h3
                className={`font-poppins text-lg font-medium   ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                Ratings
              </h3>
            </div>

            <button
              className="absolute top-1 right-1 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4]"
              onClick={close}
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/* Modal Body */}
            <div className="w-full flex flex-col items-center gap-6 p-4">
              <h4
                className={`font-poppins  text-lg font-medium  ${isDarkMode ? "text-white" : "text-black"
                  }`}
              >
                Start Your Review
              </h4>

              <div className="w-full flex justify-center gap-4">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleStarClick(idx)}
                    className={`h-12 w-12 rounded-lg p-1 flex justify-center items-center cursor-pointer 
                    ${selectedStars > idx ? "bg-yellow-500" : "bg-[#E8E8E8]"}`}
                  >
                    <Image
                      src={staricon}
                      alt="star"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Message Box */}
              <textarea
                placeholder="Write your review..."
                value={reviewMessage}
                onChange={handleMessageChange}
                className={`w-[80%] mx-auto h-[10rem] p-4 mt-4  dark:text-dark-darkcolor rounded-lg resize-none ${isDarkMode
                  ? "bg-[#FFFFFF0A]  border border-[#FFFFFF52]"
                  : "bg-white border border-[#F0F0F0] revirecardbnt"
                  }`}
                style={{
                  boxShadow: "2px 4px 14.4px 0px #0000000F",
                }}
              />


              {/* Submit Button */}


              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className={`w-fit rounded-lg px-[5.5rem] py-3 font-poppins text-white 
                    ${isLoading ? "bg-light-button-base cursor-not-allowed" : "bg-light-button-base"}`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <div>
                    Save
                  </div>
                )}
              </button>


            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ServiceDetailScreenRatingModal;
