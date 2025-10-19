"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

function ServiceDetailScreenImageSubModal() {
  const modalData = useAppSelector(
    (state) => state.modals.ServiceDetailScreenImageSubModal
  );
  const dispatch = useAppDispatch();

  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail.service_images
  );

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const close = () => {
    dispatch(hideModal("ServiceDetailScreenImageSubModal"));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === ServiceDetailData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? ServiceDetailData.length - 1 : prevIndex - 1
    );
  };

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center flex-col">
          <DialogPanel className="mx-auto h-auto w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[80%] xl:w-[70%] 2xl:w-[35%]">
            {/* Image Display */}
            <div className="flex flex-col items-center justify-center h-[38.5rem] w-full relative">
              {/*  total image and slice image count */}

              <div className="flex items-center justify-center  absolute top-1 left-2 bg-gray-300 rounded-lg p-2 text-2xl text-[#226FE4]">
                {currentImageIndex + 1} / {ServiceDetailData.length}
              </div>

              <button
                className="absolute top-1 right-1 bg-gray-300 rounded-full p-2 text-2xl text-[#226FE4]"
                onClick={close}
                aria-label="Close"
              >
                <IoClose />
              </button>

              {/*  image tag add  */}
              <div className="  w-fit h-full flex   justify-center items-center">
                <img
                  className="w-full h-full rounded-xl   "
                  src={ServiceDetailData[currentImageIndex]}
                  alt=""
                />
              </div>
              <div className="flex absolute w-full px-2 justify-between ">
                <button
                  onClick={prevImage}
                  disabled={ServiceDetailData.length === 1}
                  className={`mr-4 p-2 rounded-full  bg-gray-300  text-[#226FE4] ${
                    ServiceDetailData.length === 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <IoChevronBack size={24} />
                </button>
                <button
                  onClick={nextImage}
                  disabled={ServiceDetailData.length === 1}
                  className={`ml-4 p-2 rounded-full bg-gray-300  text-[#226FE4] ${
                    ServiceDetailData.length === 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <IoChevronForward size={24} />
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ServiceDetailScreenImageSubModal;
