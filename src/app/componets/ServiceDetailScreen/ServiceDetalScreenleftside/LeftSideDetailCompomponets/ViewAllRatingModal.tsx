"use client"; // This is important for Next.js to handle client-side rendering
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import ServiceDetailScreenInputBox from "./ServiceDetailScreenInputBox";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { IoClose } from "react-icons/io5";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import video from "../../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";


function ViewAllRatingModal() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const lastSegment = decodeString(lastSegment1);
  const { data } = useServiceDetailApi(lastSegment);

  const modalData = useAppSelector((state) => state.modals.ViewAllRatingModal);
  const searchQuery = useAppSelector(
    (state) => state.serviceDetailScreenInput.searchQuery
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const reviewsData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail.reviews
  );



  console.log("reviewsDatareviewsDatareviewsDatareviewsDatareviewsDatareviewsDatareviewsDatareviewsDatareviewsDatareviewsDatareviewsData", reviewsData)

  // Function to close the modal
  const close = () => {
    dispatch(hideModal("ViewAllRatingModal"));
  };

  // Filter reviews based on the reviewer's full name
  const filteredReviews = reviewsData.filter((review) =>
    `${review.first_name} ${review.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[80%] xl:w-[70%] 2xl:w-[40%]  ${isDarkMode ? " bg-[#181818] text-white" : "bg-white text-black"
              }`}
          >
            {/* Modal Header */}
            <div
              className={`flex h-auto w-full items-center justify-center rounded-xl p-4  ${isDarkMode
                ? " border-[#212121] bg-[#FFFFFF0A]"
                : "border-white borderxcolorwithshado"
                }`}
            >
              <h3 className="font-poppins text-lg font-medium ">
                {data?.serviceDetail.service_name}
              </h3>

              {/* Close Button */}
              <button
                className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4]"
                onClick={close}
                aria-label="Close"
              >
                <IoClose />
              </button>
            </div>

            {/* Search input box */}
            <div className="w-full flex flex-col px-6">
              <div className="flex h-auto w-[70%] mx-auto items-center justify-between  my-5">
                <ServiceDetailScreenInputBox />
              </div>

              {/* Cards */}
              <div className="w-full flex flex-col gap-4 ">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review, idx) => {
                    const rating = parseFloat(review.review_star);
                    return (
                      <div
                        className={`w-full h-auto p-4 rounded-lg mb-4 relative ${isDarkMode
                          ? "bg-[#FFFFFF05] text-white"
                          : "bg-white text-black photoservicedetailborderandshado"
                          }`}
                        id={String(idx)}
                        key={idx}
                      >
                        <div className="w-full flex justify-between items-center ">
                          <div className="flex  gap-2 items-center  ">
                            {review.image ? (
                              <div className="w-12 h-12 relative">
                                <div
                                  className="h-full w-full rounded-full"
                                  style={{
                                    backgroundImage: `url(${review.image || ""})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className=" w-10 h-10  relative">
                                <div className="h-full w-full rounded-full bg-[#226FE475]   flex items-center justify-center text-black font-bold">
                                  {review.first_name?.[0]?.toUpperCase() || ""}
                                </div>
                              </div>
                            )}
                            <div
                              className={`text-base font-medium  font-poppins ${isDarkMode ? "text-white" : "text-black"
                                }`}
                            >
                              <span>
                                {review.first_name && review.first_name}{" "}
                                {review.last_name && review.last_name}
                              </span>
                            </div>
                          </div>

                          <div className="flex  gap-1  flex-col   ">
                            <div className=" w-full flex justify-end items-center gap-1">
                              {[...Array(Math.floor(rating))].map((_, index) => (
                                <MdOutlineStar
                                  key={`full-${index}`}
                                  className="text-[#FFA41C] text-lg cursor-pointer"
                                />
                              ))}
                              {rating % 1 !== 0 && (
                                <IoIosStarHalf className="text-[#FFA41C] text-lg cursor-pointer" />
                              )}
                              {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                                <MdOutlineStar
                                  key={`empty-${index}`}
                                  className="text-[#D1D1D1] text-lg cursor-pointer"
                                />
                              ))}
                            </div>
                            {/*  time  */}
                            <div>
                              <p
                                className={`text-sm font-poppins  ${isDarkMode ? "text-white" : "text-[#535353]"
                                  }`}
                              >
                                {review.time_ago}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Review Content */}
                        <div className="w-full flex  relative mt-2 flex-col gap-2">
                          <p
                            className={`font-poppins text-sm ${isDarkMode ? "text-white" : "text-[#535353]"
                              }`}
                          >
                            {review.review_message}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex h-auto min-h-[20rem] w-full flex-col items-center justify-center text-center">
                    <div className="flex h-[8rem] w-[8rem] items-center justify-center">
                      <Image
                        src={video}
                        alt="Loading animation"
                        width={100}
                        height={100}
                      />
                    </div>
                    <h2
                      className={`font-poppins font-medium ${isDarkMode ? "text-white" : "text-black"
                        }`}
                    >
                      No Ratings to show
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ViewAllRatingModal;
