"use client"; // This is important for Next.js to handle client-side rendering

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import video from "../../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";

function ServiceDetailScreenModalImage() {
  const modalData = useAppSelector(
    (state) => state.modals.ServiceDetailScreenModalImage
  );
  const dispatch = useAppDispatch();

  const ServiceDetailData = useAppSelector((state) => state.serviceDetail);

  const close = () => {
    dispatch(hideModal("ServiceDetailScreenModalImage"));
  };

  console.log("serviceimage", ServiceDetailData);

  const serviceImages = ServiceDetailData.serviceDetail.service_images;

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[80%] xl:w-[70%] 2xl:w-[40%]  ${
              isDarkMode ? " bg-[#2F2F2F] text-white" : "text-black   bg-white"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex h-auto w-full items-center justify-center rounded-xl p-4   ${
                isDarkMode ? "bg-[#FFFFFF0A]" : " borderxcolorwithshado"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium ">
                {ServiceDetailData.serviceDetail.service_name}
              </h3>
            </div>

            <button
              className="absolute top-1 right-1 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4]"
              onClick={close}
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/* Image Display with Scrolling */}
            <div
              className={`w-full h-fit ${
                serviceImages.length > 15 ? "max-h-[500px] overflow-y-auto" : ""
              } grid gap-4 px-2 md:px-4 md:grid-cols-3 grid-cols-2 xl:grid-cols-5 py-3`}
            >
              {/* Iterate over all images */}
              {serviceImages && serviceImages.length > 0 ? (
                serviceImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-full mt-4 h-32 rounded-xl cursor-pointer overflow-hidden"
                    onClick={() => {
                      dispatch(showModal("ServiceDetailScreenImageSubModal"));
                    }}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100%",
                        width: "100%",
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    ></div>
                  </div>
                ))
              ) : (
                <div className="flex h-auto min-h-screen w-full flex-col items-center justify-center text-center">
                  <div className="flex h-[8rem] w-[8rem] items-center justify-center">
                    <Image
                      src={video}
                      alt="Loading animation"
                      width={100}
                      height={100}
                    />
                  </div>
                  <h2 className="font-poppins font-medium text-black">
                    No Data Found
                  </h2>
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ServiceDetailScreenModalImage;
